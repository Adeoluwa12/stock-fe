"use client"

import type React from "react"
import { useState, useEffect } from "react"
import "./App.css"

// Update this to your actual Render URL
const API_BASE_URL = "https://stock-be-j9p2.onrender.com"

interface StockData {
  PRICE: number
  ACCURACY: number
  CONFIDENCE_SCORE: number
  VERDICT: string
  DETAILS: {
    individual_verdicts: {
      rsi_verdict: string
      adx_verdict: string
      momentum_verdict: string
      pattern_verdict: string
      fundamental_verdict: string
      sentiment_verdict: string
      cycle_verdict: string
    }
    price_data: {
      current_price: number
      entry_price: number
      target_prices: number[]
      stop_loss: number
      change_1d: number
      change_1w: number
    }
    technical_indicators: {
      rsi: number
      adx: number
      atr: number
      cycle_phase: string
      cycle_momentum: number
    }
    patterns: {
      geometric: string[]
      elliott_wave: string[]
      confluence_factors: string[]
    }
    fundamentals: {
      pe_ratio: number
      eps: number
      revenue_growth: number
      net_income_growth: number
    }
    sentiment_analysis: {
      score: number
      interpretation: string
      market_mood: string
    }
    cycle_analysis: {
      current_phase: string
      stage: string
      duration_days: number
      momentum: number
      momentum_visual: string
      bull_continuation_probability: number
      bear_transition_probability: number
      expected_continuation: string
      risk_level: string
    }
    trading_parameters: {
      position_size: string
      timeframe: string
      risk_level: string
    }
  }
}

interface ApiResponse {
  timestamp: string
  stocks_analyzed: number
  status: string
  data_sources?: {
    twelve_data_count: number
    yfinance_count: number
  }
  [key: string]: any
}

const App: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState<"DAILY" | "WEEKLY">("DAILY")
  const [expandedStocks, setExpandedStocks] = useState<Set<string>>(new Set())

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      // Always use the Render URL for production
      const apiUrl = `${API_BASE_URL}/analyze`

      console.log("Fetching from:", apiUrl)

      const response = await fetch(apiUrl, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })

      console.log("Response status:", response.status)
      console.log("Response ok:", response.ok)

      if (!response.ok) {
        const errorText = await response.text()
        console.log("Error response:", errorText)
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result = await response.json()
      console.log("Analysis result received, stocks:", result.stocks_analyzed)
      setData(result)
    } catch (err) {
      console.error("Fetch error:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  // Test API connection
  const testConnection = async () => {
    try {
      console.log("Testing API connection...")
      const response = await fetch(`${API_BASE_URL}/health`)
      const result = await response.json()
      console.log("Health check result:", result)
    } catch (err) {
      console.error("Health check failed:", err)
    }
  }

  useEffect(() => {
    testConnection()
    // Don't auto-fetch on load due to long processing time
    // fetchData()
  }, [])

  const toggleStockDetails = (symbol: string) => {
    const newExpanded = new Set(expandedStocks)
    if (newExpanded.has(symbol)) {
      newExpanded.delete(symbol)
    } else {
      newExpanded.add(symbol)
    }
    setExpandedStocks(newExpanded)
  }

  const getVerdictColor = (verdict: string) => {
    switch (verdict.toLowerCase()) {
      case "strong buy":
        return "verdict-strong-buy"
      case "buy":
        return "verdict-buy"
      case "strong sell":
        return "verdict-strong-sell"
      case "sell":
        return "verdict-sell"
      default:
        return "verdict-neutral"
    }
  }

  const getChangeColor = (change: number) => {
    if (change > 0) return "change-positive"
    if (change < 0) return "change-negative"
    return "change-neutral"
  }

  const renderStockCard = (symbol: string, stockData: any) => {
    const timeframeKey = `${timeframe}_TIMEFRAME`
    const currentData: StockData = stockData[timeframeKey]

    if (!currentData) return null

    const isExpanded = expandedStocks.has(symbol)
    const dataSource = stockData.data_source || "unknown"

    return (
      <div key={symbol} className="stock-card">
        <div className="stock-header" onClick={() => toggleStockDetails(symbol)}>
          <div className="stock-symbol">
            {symbol}
            <span className={`data-source ${dataSource}`}>{dataSource === "twelve_data" ? "12D" : "YF"}</span>
          </div>
          <div className="stock-price">${currentData.PRICE}</div>
          <div className={`stock-verdict ${getVerdictColor(currentData.VERDICT)}`}>{currentData.VERDICT}</div>
          <div className="stock-accuracy">Accuracy: {currentData.ACCURACY}%</div>
          <div className="expand-icon">{isExpanded ? "▼" : "▶"}</div>
        </div>

        {isExpanded && (
          <div className="stock-details">
            <div className="details-grid">
              <div className="detail-section">
                <h4>Price Data</h4>
                <div className="detail-item">
                  <span>Current Price:</span>
                  <span>${currentData.DETAILS.price_data.current_price}</span>
                </div>
                <div className="detail-item">
                  <span>Entry Price:</span>
                  <span>${currentData.DETAILS.price_data.entry_price}</span>
                </div>
                <div className="detail-item">
                  <span>Stop Loss:</span>
                  <span>${currentData.DETAILS.price_data.stop_loss}</span>
                </div>
                <div className="detail-item">
                  <span>Targets:</span>
                  <span>{currentData.DETAILS.price_data.target_prices.map((t) => `$${t}`).join(", ")}</span>
                </div>
                <div className="detail-item">
                  <span>1D Change:</span>
                  <span className={getChangeColor(currentData.DETAILS.price_data.change_1d)}>
                    {currentData.DETAILS.price_data.change_1d > 0 ? "+" : ""}
                    {currentData.DETAILS.price_data.change_1d}%
                  </span>
                </div>
                <div className="detail-item">
                  <span>1W Change:</span>
                  <span className={getChangeColor(currentData.DETAILS.price_data.change_1w)}>
                    {currentData.DETAILS.price_data.change_1w > 0 ? "+" : ""}
                    {currentData.DETAILS.price_data.change_1w}%
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h4>Technical Indicators</h4>
                <div className="detail-item">
                  <span>RSI:</span>
                  <span
                    className={
                      currentData.DETAILS.technical_indicators.rsi > 70
                        ? "indicator-overbought"
                        : currentData.DETAILS.technical_indicators.rsi < 30
                          ? "indicator-oversold"
                          : "indicator-neutral"
                    }
                  >
                    {currentData.DETAILS.technical_indicators.rsi}
                  </span>
                </div>
                <div className="detail-item">
                  <span>ADX:</span>
                  <span>{currentData.DETAILS.technical_indicators.adx}</span>
                </div>
                <div className="detail-item">
                  <span>ATR:</span>
                  <span>{currentData.DETAILS.technical_indicators.atr}</span>
                </div>
                <div className="detail-item">
                  <span>Cycle Phase:</span>
                  <span>{currentData.DETAILS.technical_indicators.cycle_phase}</span>
                </div>
                <div className="detail-item">
                  <span>Momentum:</span>
                  <span className={getChangeColor(currentData.DETAILS.technical_indicators.cycle_momentum * 100)}>
                    {(currentData.DETAILS.technical_indicators.cycle_momentum * 100).toFixed(2)}%
                  </span>
                </div>
              </div>

              <div className="detail-section">
                <h4>Individual Verdicts</h4>
                <div className="verdict-grid">
                  <div className="verdict-item">
                    <span>RSI:</span>
                    <span
                      className={`verdict-badge ${currentData.DETAILS.individual_verdicts.rsi_verdict.toLowerCase()}`}
                    >
                      {currentData.DETAILS.individual_verdicts.rsi_verdict}
                    </span>
                  </div>
                  <div className="verdict-item">
                    <span>ADX:</span>
                    <span className="verdict-badge neutral">{currentData.DETAILS.individual_verdicts.adx_verdict}</span>
                  </div>
                  <div className="verdict-item">
                    <span>Momentum:</span>
                    <span
                      className={`verdict-badge ${currentData.DETAILS.individual_verdicts.momentum_verdict.toLowerCase()}`}
                    >
                      {currentData.DETAILS.individual_verdicts.momentum_verdict}
                    </span>
                  </div>
                  <div className="verdict-item">
                    <span>Patterns:</span>
                    <span className="verdict-badge neutral">
                      {currentData.DETAILS.individual_verdicts.pattern_verdict}
                    </span>
                  </div>
                  <div className="verdict-item">
                    <span>Fundamentals:</span>
                    <span
                      className={`verdict-badge ${currentData.DETAILS.individual_verdicts.fundamental_verdict.toLowerCase().replace(" ", "-")}`}
                    >
                      {currentData.DETAILS.individual_verdicts.fundamental_verdict}
                    </span>
                  </div>
                  <div className="verdict-item">
                    <span>Sentiment:</span>
                    <span
                      className={`verdict-badge ${currentData.DETAILS.individual_verdicts.sentiment_verdict.toLowerCase()}`}
                    >
                      {currentData.DETAILS.individual_verdicts.sentiment_verdict}
                    </span>
                  </div>
                </div>
              </div>

              <div className="detail-section">
                <h4>Fundamentals</h4>
                <div className="detail-item">
                  <span>P/E Ratio:</span>
                  <span>{currentData.DETAILS.fundamentals.pe_ratio}</span>
                </div>
                <div className="detail-item">
                  <span>EPS:</span>
                  <span>${currentData.DETAILS.fundamentals.eps}</span>
                </div>
                <div className="detail-item">
                  <span>Revenue Growth:</span>
                  <span className="change-positive">{currentData.DETAILS.fundamentals.revenue_growth}%</span>
                </div>
                <div className="detail-item">
                  <span>Income Growth:</span>
                  <span className="change-positive">{currentData.DETAILS.fundamentals.net_income_growth}%</span>
                </div>
              </div>

              <div className="detail-section">
                <h4>Sentiment Analysis</h4>
                <div className="detail-item">
                  <span>Score:</span>
                  <span>{currentData.DETAILS.sentiment_analysis.score}</span>
                </div>
                <div className="detail-item">
                  <span>Interpretation:</span>
                  <span
                    className={`verdict-badge ${currentData.DETAILS.sentiment_analysis.interpretation.toLowerCase()}`}
                  >
                    {currentData.DETAILS.sentiment_analysis.interpretation}
                  </span>
                </div>
                <div className="detail-item">
                  <span>Market Mood:</span>
                  <span>{currentData.DETAILS.sentiment_analysis.market_mood}</span>
                </div>
              </div>

              <div className="detail-section">
                <h4>Cycle Analysis</h4>
                <div className="detail-item">
                  <span>Current Phase:</span>
                  <span className={`verdict-badge ${currentData.DETAILS.cycle_analysis.current_phase.toLowerCase()}`}>
                    {currentData.DETAILS.cycle_analysis.current_phase}
                  </span>
                </div>
                <div className="detail-item">
                  <span>Stage:</span>
                  <span>{currentData.DETAILS.cycle_analysis.stage}</span>
                </div>
                <div className="detail-item">
                  <span>Duration:</span>
                  <span>{currentData.DETAILS.cycle_analysis.duration_days} days</span>
                </div>
                <div className="detail-item">
                  <span>Bull Probability:</span>
                  <span className="change-positive">
                    {currentData.DETAILS.cycle_analysis.bull_continuation_probability}%
                  </span>
                </div>
                <div className="detail-item">
                  <span>Bear Probability:</span>
                  <span className="change-negative">
                    {currentData.DETAILS.cycle_analysis.bear_transition_probability}%
                  </span>
                </div>
                <div className="detail-item">
                  <span>Risk Level:</span>
                  <span>{currentData.DETAILS.cycle_analysis.risk_level}</span>
                </div>
              </div>

              <div className="detail-section">
                <h4>Trading Parameters</h4>
                <div className="detail-item">
                  <span>Position Size:</span>
                  <span>{currentData.DETAILS.trading_parameters.position_size}</span>
                </div>
                <div className="detail-item">
                  <span>Timeframe:</span>
                  <span>{currentData.DETAILS.trading_parameters.timeframe}</span>
                </div>
                <div className="detail-item">
                  <span>Risk Level:</span>
                  <span>{currentData.DETAILS.trading_parameters.risk_level}</span>
                </div>
              </div>

              <div className="detail-section">
                <h4>Patterns Detected</h4>
                <div className="pattern-list">
                  <div>
                    <strong>Geometric:</strong> {currentData.DETAILS.patterns.geometric.join(", ")}
                  </div>
                  <div>
                    <strong>Elliott Wave:</strong> {currentData.DETAILS.patterns.elliott_wave.join(", ")}
                  </div>
                  <div>
                    <strong>Confluence:</strong> {currentData.DETAILS.patterns.confluence_factors.join(", ")}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Analyzing 175 stocks from US and Nigerian markets...</p>
          <p>This process takes 15-25 minutes due to API rate limits.</p>
          <p>Processing US stocks (Twelve Data) and Nigerian stocks (yfinance)...</p>
          <p>Please keep this tab open and be patient.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <h2>Error</h2>
          <p>{error}</p>
          <p>API URL: {API_BASE_URL}</p>
          <button onClick={fetchData} className="retry-button">
            Retry Analysis
          </button>
        </div>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="app">
        <div className="no-data-container">
          <h2>Multi-Market Stock Analysis Dashboard</h2>
          <p>Analyze 175 stocks from US and Nigerian markets</p>
          <p>⚠️ This process takes 15-25 minutes due to API rate limits</p>
          <p>📊 US Stocks: 20 | Nigerian Stocks: 155</p>
          <button onClick={fetchData} className="retry-button">
            Start Comprehensive Analysis
          </button>
        </div>
      </div>
    )
  }

  const stocks = Object.keys(data).filter(
    (key) => !["timestamp", "stocks_analyzed", "status", "data_sources"].includes(key),
  )

  return (
    <div className="app">
      <header className="app-header">
        <h1>Stock Analysis Dashboard</h1>
        <div className="header-info">
          <span>Last Updated: {data.timestamp}</span>
          <span>Stocks Analyzed: {data.stocks_analyzed}</span>
          {data.data_sources && (
            <>
              <span>Twelve Data: {data.data_sources.twelve_data_count}</span>
              <span>yfinance: {data.data_sources.yfinance_count}</span>
            </>
          )}
          <span className={`status ${data.status}`}>Status: {data.status}</span>
        </div>
      </header>

      <div className="controls">
        <div className="timeframe-toggle">
          <button className={timeframe === "DAILY" ? "active" : ""} onClick={() => setTimeframe("DAILY")}>
            Daily
          </button>
          <button className={timeframe === "WEEKLY" ? "active" : ""} onClick={() => setTimeframe("WEEKLY")}>
            Weekly
          </button>
        </div>
        <button onClick={fetchData} className="refresh-button">
          Refresh Analysis
        </button>
      </div>

      <div className="stocks-container">{stocks.map((symbol) => renderStockCard(symbol, data[symbol]))}</div>
    </div>
  )
}

export default App
