// "use client"

// import type React from "react"
// import { useState, useEffect } from "react"
// import "./App.css"

// // Update this to your actual Render URL
// const API_BASE_URL = "http://localhost:5000"
// // const API_BASE_URL = "https://stock-be-j9p2.onrender.com"

// interface StockData {
//   PRICE: number
//   ACCURACY: number
//   CONFIDENCE_SCORE: number
//   VERDICT: string
//   DETAILS: {
//     individual_verdicts: {
//       rsi_verdict: string
//       adx_verdict: string
//       momentum_verdict: string
//       pattern_verdict: string
//       fundamental_verdict: string
//       sentiment_verdict: string
//       cycle_verdict: string
//     }
//     price_data: {
//       current_price: number
//       entry_price: number
//       target_prices: number[]
//       stop_loss: number
//       change_1d: number
//       change_1w: number
//     }
//     technical_indicators: {
//       rsi: number
//       adx: number
//       atr: number
//       cycle_phase: string
//       cycle_momentum: number
//     }
//     patterns: {
//       geometric: string[]
//       elliott_wave: string[]
//       confluence_factors: string[]
//     }
//     fundamentals: {
//       pe_ratio: number
//       eps: number
//       revenue_growth: number
//       net_income_growth: number
//     }
//     sentiment_analysis: {
//       score: number
//       interpretation: string
//       market_mood: string
//     }
//     cycle_analysis: {
//       current_phase: string
//       stage: string
//       duration_days: number
//       momentum: number
//       momentum_visual: string
//       bull_continuation_probability: number
//       bear_transition_probability: number
//       expected_continuation: string
//       risk_level: string
//     }
//     trading_parameters: {
//       position_size: string
//       timeframe: string
//       risk_level: string
//     }
//   }
// }

// interface ApiResponse {
//   timestamp: string
//   stocks_analyzed: number
//   status: string
//   data_sources?: {
//     twelve_data_count: number
//     yfinance_count: number
//   }
//   [key: string]: any
// }

// const App: React.FC = () => {
//   const [data, setData] = useState<ApiResponse | null>(null)
//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string | null>(null)
//   const [timeframe, setTimeframe] = useState<"DAILY" | "WEEKLY">("DAILY")
//   const [expandedStocks, setExpandedStocks] = useState<Set<string>>(new Set())

//   const fetchData = async () => {
//     setLoading(true)
//     setError(null)
//     try {
//       // Always use the Render URL for production
//       const apiUrl = `${API_BASE_URL}/analyze`

//       console.log("Fetching from:", apiUrl)

//       const response = await fetch(apiUrl, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//         },
//       })

//       console.log("Response status:", response.status)
//       console.log("Response ok:", response.ok)

//       if (!response.ok) {
//         const errorText = await response.text()
//         console.log("Error response:", errorText)
//         throw new Error(`HTTP ${response.status}: ${errorText}`)
//       }

//       const result = await response.json()
//       console.log("Analysis result received, stocks:", result.stocks_analyzed)
//       setData(result)
//     } catch (err) {
//       console.error("Fetch error:", err)
//       setError(err instanceof Error ? err.message : "An error occurred")
//     } finally {
//       setLoading(false)
//     }
//   }

//   // Test API connection
//   const testConnection = async () => {
//     try {
//       console.log("Testing API connection...")
//       const response = await fetch(`${API_BASE_URL}/health`)
//       const result = await response.json()
//       console.log("Health check result:", result)
//     } catch (err) {
//       console.error("Health check failed:", err)
//     }
//   }

//   useEffect(() => {
//     testConnection()
//     // Don't auto-fetch on load due to long processing time
//     // fetchData()
//   }, [])

//   const toggleStockDetails = (symbol: string) => {
//     const newExpanded = new Set(expandedStocks)
//     if (newExpanded.has(symbol)) {
//       newExpanded.delete(symbol)
//     } else {
//       newExpanded.add(symbol)
//     }
//     setExpandedStocks(newExpanded)
//   }

//   const getVerdictColor = (verdict: string) => {
//     switch (verdict.toLowerCase()) {
//       case "strong buy":
//         return "verdict-strong-buy"
//       case "buy":
//         return "verdict-buy"
//       case "strong sell":
//         return "verdict-strong-sell"
//       case "sell":
//         return "verdict-sell"
//       default:
//         return "verdict-neutral"
//     }
//   }

//   const getChangeColor = (change: number) => {
//     if (change > 0) return "change-positive"
//     if (change < 0) return "change-negative"
//     return "change-neutral"
//   }

//   const renderStockCard = (symbol: string, stockData: any) => {
//     const timeframeKey = `${timeframe}_TIMEFRAME`
//     const currentData: StockData = stockData[timeframeKey]

//     if (!currentData) return null

//     const isExpanded = expandedStocks.has(symbol)
//     const dataSource = stockData.data_source || "unknown"

//     return (
//       <div key={symbol} className="stock-card">
//         <div className="stock-header" onClick={() => toggleStockDetails(symbol)}>
//           <div className="stock-symbol">
//             {symbol}
//             <span className={`data-source ${dataSource}`}>{dataSource === "twelve_data" ? "12D" : "YF"}</span>
//           </div>
//           <div className="stock-price">${currentData.PRICE}</div>
//           <div className={`stock-verdict ${getVerdictColor(currentData.VERDICT)}`}>{currentData.VERDICT}</div>
//           <div className="stock-accuracy">Accuracy: {currentData.ACCURACY}%</div>
//           <div className="expand-icon">{isExpanded ? "▼" : "▶"}</div>
//         </div>

//         {isExpanded && (
//           <div className="stock-details">
//             <div className="details-grid">
//               <div className="detail-section">
//                 <h4>Price Data</h4>
//                 <div className="detail-item">
//                   <span>Current Price:</span>
//                   <span>${currentData.DETAILS.price_data.current_price}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Entry Price:</span>
//                   <span>${currentData.DETAILS.price_data.entry_price}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Stop Loss:</span>
//                   <span>${currentData.DETAILS.price_data.stop_loss}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Targets:</span>
//                   <span>{currentData.DETAILS.price_data.target_prices.map((t) => `$${t}`).join(", ")}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>1D Change:</span>
//                   <span className={getChangeColor(currentData.DETAILS.price_data.change_1d)}>
//                     {currentData.DETAILS.price_data.change_1d > 0 ? "+" : ""}
//                     {currentData.DETAILS.price_data.change_1d}%
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>1W Change:</span>
//                   <span className={getChangeColor(currentData.DETAILS.price_data.change_1w)}>
//                     {currentData.DETAILS.price_data.change_1w > 0 ? "+" : ""}
//                     {currentData.DETAILS.price_data.change_1w}%
//                   </span>
//                 </div>
//               </div>

//               <div className="detail-section">
//                 <h4>Technical Indicators</h4>
//                 <div className="detail-item">
//                   <span>RSI:</span>
//                   <span
//                     className={
//                       currentData.DETAILS.technical_indicators.rsi > 70
//                         ? "indicator-overbought"
//                         : currentData.DETAILS.technical_indicators.rsi < 30
//                           ? "indicator-oversold"
//                           : "indicator-neutral"
//                     }
//                   >
//                     {currentData.DETAILS.technical_indicators.rsi}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>ADX:</span>
//                   <span>{currentData.DETAILS.technical_indicators.adx}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>ATR:</span>
//                   <span>{currentData.DETAILS.technical_indicators.atr}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Cycle Phase:</span>
//                   <span>{currentData.DETAILS.technical_indicators.cycle_phase}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Momentum:</span>
//                   <span className={getChangeColor(currentData.DETAILS.technical_indicators.cycle_momentum * 100)}>
//                     {(currentData.DETAILS.technical_indicators.cycle_momentum * 100).toFixed(2)}%
//                   </span>
//                 </div>
//               </div>

//               <div className="detail-section">
//                 <h4>Individual Verdicts</h4>
//                 <div className="verdict-grid">
//                   <div className="verdict-item">
//                     <span>RSI:</span>
//                     <span
//                       className={`verdict-badge ${currentData.DETAILS.individual_verdicts.rsi_verdict.toLowerCase()}`}
//                     >
//                       {currentData.DETAILS.individual_verdicts.rsi_verdict}
//                     </span>
//                   </div>
//                   <div className="verdict-item">
//                     <span>ADX:</span>
//                     <span className="verdict-badge neutral">{currentData.DETAILS.individual_verdicts.adx_verdict}</span>
//                   </div>
//                   <div className="verdict-item">
//                     <span>Momentum:</span>
//                     <span
//                       className={`verdict-badge ${currentData.DETAILS.individual_verdicts.momentum_verdict.toLowerCase()}`}
//                     >
//                       {currentData.DETAILS.individual_verdicts.momentum_verdict}
//                     </span>
//                   </div>
//                   <div className="verdict-item">
//                     <span>Patterns:</span>
//                     <span className="verdict-badge neutral">
//                       {currentData.DETAILS.individual_verdicts.pattern_verdict}
//                     </span>
//                   </div>
//                   <div className="verdict-item">
//                     <span>Fundamentals:</span>
//                     <span
//                       className={`verdict-badge ${currentData.DETAILS.individual_verdicts.fundamental_verdict.toLowerCase().replace(" ", "-")}`}
//                     >
//                       {currentData.DETAILS.individual_verdicts.fundamental_verdict}
//                     </span>
//                   </div>
//                   <div className="verdict-item">
//                     <span>Sentiment:</span>
//                     <span
//                       className={`verdict-badge ${currentData.DETAILS.individual_verdicts.sentiment_verdict.toLowerCase()}`}
//                     >
//                       {currentData.DETAILS.individual_verdicts.sentiment_verdict}
//                     </span>
//                   </div>
//                 </div>
//               </div>

//               <div className="detail-section">
//                 <h4>Fundamentals</h4>
//                 <div className="detail-item">
//                   <span>P/E Ratio:</span>
//                   <span>{currentData.DETAILS.fundamentals.pe_ratio}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>EPS:</span>
//                   <span>${currentData.DETAILS.fundamentals.eps}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Revenue Growth:</span>
//                   <span className="change-positive">{currentData.DETAILS.fundamentals.revenue_growth}%</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Income Growth:</span>
//                   <span className="change-positive">{currentData.DETAILS.fundamentals.net_income_growth}%</span>
//                 </div>
//               </div>

//               <div className="detail-section">
//                 <h4>Sentiment Analysis</h4>
//                 <div className="detail-item">
//                   <span>Score:</span>
//                   <span>{currentData.DETAILS.sentiment_analysis.score}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Interpretation:</span>
//                   <span
//                     className={`verdict-badge ${currentData.DETAILS.sentiment_analysis.interpretation.toLowerCase()}`}
//                   >
//                     {currentData.DETAILS.sentiment_analysis.interpretation}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Market Mood:</span>
//                   <span>{currentData.DETAILS.sentiment_analysis.market_mood}</span>
//                 </div>
//               </div>

//               <div className="detail-section">
//                 <h4>Cycle Analysis</h4>
//                 <div className="detail-item">
//                   <span>Current Phase:</span>
//                   <span className={`verdict-badge ${currentData.DETAILS.cycle_analysis.current_phase.toLowerCase()}`}>
//                     {currentData.DETAILS.cycle_analysis.current_phase}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Stage:</span>
//                   <span>{currentData.DETAILS.cycle_analysis.stage}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Duration:</span>
//                   <span>{currentData.DETAILS.cycle_analysis.duration_days} days</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Bull Probability:</span>
//                   <span className="change-positive">
//                     {currentData.DETAILS.cycle_analysis.bull_continuation_probability}%
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Bear Probability:</span>
//                   <span className="change-negative">
//                     {currentData.DETAILS.cycle_analysis.bear_transition_probability}%
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Risk Level:</span>
//                   <span>{currentData.DETAILS.cycle_analysis.risk_level}</span>
//                 </div>
//               </div>

//               <div className="detail-section">
//                 <h4>Trading Parameters</h4>
//                 <div className="detail-item">
//                   <span>Position Size:</span>
//                   <span>{currentData.DETAILS.trading_parameters.position_size}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Timeframe:</span>
//                   <span>{currentData.DETAILS.trading_parameters.timeframe}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Risk Level:</span>
//                   <span>{currentData.DETAILS.trading_parameters.risk_level}</span>
//                 </div>
//               </div>

//               <div className="detail-section">
//                 <h4>Patterns Detected</h4>
//                 <div className="pattern-list">
//                   <div>
//                     <strong>Geometric:</strong> {currentData.DETAILS.patterns.geometric.join(", ")}
//                   </div>
//                   <div>
//                     <strong>Elliott Wave:</strong> {currentData.DETAILS.patterns.elliott_wave.join(", ")}
//                   </div>
//                   <div>
//                     <strong>Confluence:</strong> {currentData.DETAILS.patterns.confluence_factors.join(", ")}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   }

//   if (loading) {
//     return (
//       <div className="app">
//         <div className="loading-container">
//           <div className="loading-spinner"></div>
//           <p>Analyzing 175 stocks from US and Nigerian markets...</p>
//           <p>This process takes 15-25 minutes due to API rate limits.</p>
//           <p>Processing US stocks (Twelve Data) and Nigerian stocks (yfinance)...</p>
//           <p>Please keep this tab open and be patient.</p>
//         </div>
//       </div>
//     )
//   }

//   if (error) {
//     return (
//       <div className="app">
//         <div className="error-container">
//           <h2>Error</h2>
//           <p>{error}</p>
//           <p>API URL: {API_BASE_URL}</p>
//           <button onClick={fetchData} className="retry-button">
//             Retry Analysis
//           </button>
//         </div>
//       </div>
//     )
//   }

//   if (!data) {
//     return (
//       <div className="app">
//         <div className="no-data-container">
//           <h2>Multi-Market Stock Analysis Dashboard</h2>
//           <p>Analyze 175 stocks from US and Nigerian markets</p>
//           <p>⚠️ This process takes 15-25 minutes due to API rate limits</p>
//           <p>📊 US Stocks: 20 | Nigerian Stocks: 155</p>
//           <button onClick={fetchData} className="retry-button">
//             Start Comprehensive Analysis
//           </button>
//         </div>
//       </div>
//     )
//   }

//   const stocks = Object.keys(data).filter(
//     (key) => !["timestamp", "stocks_analyzed", "status", "data_sources"].includes(key),
//   )

//   return (
//     <div className="app">
//       <header className="app-header">
//         <h1>Stock Analysis Dashboard</h1>
//         <div className="header-info">
//           <span>Last Updated: {data.timestamp}</span>
//           <span>Stocks Analyzed: {data.stocks_analyzed}</span>
//           {data.data_sources && (
//             <>
//               <span>Twelve Data: {data.data_sources.twelve_data_count}</span>
//               <span>yfinance: {data.data_sources.yfinance_count}</span>
//             </>
//           )}
//           <span className={`status ${data.status}`}>Status: {data.status}</span>
//         </div>
//       </header>

//       <div className="controls">
//         <div className="timeframe-toggle">
//           <button className={timeframe === "DAILY" ? "active" : ""} onClick={() => setTimeframe("DAILY")}>
//             Daily
//           </button>
//           <button className={timeframe === "WEEKLY" ? "active" : ""} onClick={() => setTimeframe("WEEKLY")}>
//             Weekly
//           </button>
//         </div>
//         <button onClick={fetchData} className="refresh-button">
//           Refresh Analysis
//         </button>
//       </div>

//       <div className="stocks-container">{stocks.map((symbol) => renderStockCard(symbol, data[symbol]))}</div>
//     </div>
//   )
// }

// export default App



"use client"

import type React from "react"
import { useState, useEffect } from "react"
import "./App.css"

// Update this to your actual Render URL
// const API_BASE_URL = "http://localhost:5000"
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
      hierarchy_override?: string
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
      PE_Ratio?: number
      eps?: number
      revenue_growth?: number
      net_income_growth?: number
      Market_Cap_Rank?: number
      Adoption_Score?: number
      Technology_Score?: number
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
  data_source?: string
  note?: string
  processing_time_minutes?: number
  data_sources?: {
    twelve_data_count: number
    alpha_vantage_count: number
    coingecko_count: number
  }
  markets?: {
    us_stocks: number
    nigerian_stocks: number
    crypto_assets: number
  }
  processing_info?: {
    hierarchical_analysis: boolean
    timeframes_analyzed: string[]
    ai_analysis_available: boolean
    background_processing: boolean
    daily_auto_refresh: string
  }
  [key: string]: any
}

interface AIAnalysisResponse {
  symbol: string
  ai_analysis: {
    analysis: string
    timestamp: string
    model: string
    symbol: string
    error?: string
    message?: string
  }
  technical_analysis: any
  timestamp: string
}

const App: React.FC = () => {
  const [data, setData] = useState<ApiResponse | null>(null)
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)
  const [timeframe, setTimeframe] = useState<"MONTHLY" | "WEEKLY" | "DAILY" | "4HOUR">("DAILY")
  const [expandedStocks, setExpandedStocks] = useState<Set<string>>(new Set())
  const [aiAnalysis, setAiAnalysis] = useState<{ [key: string]: AIAnalysisResponse } | null>(null)
  const [aiLoading, setAiLoading] = useState<{ [key: string]: boolean }>({})
  const [showAiModal, setShowAiModal] = useState<string | null>(null)
  const [hasInitialData, setHasInitialData] = useState<boolean>(false)

  const fetchData = async (fresh = false) => {
    setLoading(true)
    setError(null)
    try {
      const endpoint = fresh ? "/analyze/fresh" : "/analyze"
      const apiUrl = `${API_BASE_URL}${endpoint}`
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
      console.log("Analysis result received, assets:", result.stocks_analyzed)
      console.log("Data source:", result.data_source)

      setData(result)
      setHasInitialData(true)
    } catch (err) {
      console.error("Fetch error:", err)
      setError(err instanceof Error ? err.message : "An error occurred")
    } finally {
      setLoading(false)
    }
  }

  const fetchAiAnalysis = async (symbol: string) => {
    setAiLoading((prev) => ({ ...prev, [symbol]: true }))
    try {
      const apiUrl = `${API_BASE_URL}/ai-analysis`
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ symbol }),
      })

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`HTTP ${response.status}: ${errorText}`)
      }

      const result: AIAnalysisResponse = await response.json()
      setAiAnalysis((prev) => ({ ...prev, [symbol]: result }))
      setShowAiModal(symbol)
    } catch (err) {
      console.error("AI Analysis error:", err)
      setError(err instanceof Error ? err.message : "Failed to get AI analysis")
    } finally {
      setAiLoading((prev) => ({ ...prev, [symbol]: false }))
    }
  }

  // Test API connection and load initial data
  const testConnection = async () => {
    try {
      console.log("Testing API connection...")
      const response = await fetch(`${API_BASE_URL}/health`)
      const result = await response.json()
      console.log("Health check result:", result)

      // If healthy and has cached data, load it automatically
      if (result.data_status?.has_cached_data) {
        console.log("Found cached data, loading automatically...")
        await fetchData(false) // Load cached data
      }
    } catch (err) {
      console.error("Health check failed:", err)
    }
  }

  useEffect(() => {
    testConnection()
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

  const getAssetTypeIcon = (symbol: string, market: string) => {
    if (market === "Crypto") return "₿"
    if (symbol.endsWith(".NG")) return "🇳🇬"
    return "🇺🇸"
  }

  const getDataSourceBadge = (dataSource: string) => {
    switch (dataSource) {
      case "twelve_data":
        return { text: "12D", class: "twelve-data" }
      case "alpha_vantage":
        return { text: "AV", class: "alpha-vantage" }
      case "coingecko":
        return { text: "CG", class: "coingecko" }
      case "database_cache":
        return { text: "CACHE", class: "cache" }
      default:
        return { text: "UNK", class: "unknown" }
    }
  }

  const renderStockCard = (symbol: string, stockData: any) => {
    const timeframeKey = `${timeframe}_TIMEFRAME`
    const currentData: StockData = stockData[timeframeKey]
    if (!currentData) return null

    const isExpanded = expandedStocks.has(symbol)
    const dataSource = stockData.data_source || "unknown"
    const market = stockData.market || "Unknown"
    const assetIcon = getAssetTypeIcon(symbol, market)
    const sourceBadge = getDataSourceBadge(dataSource)

    return (
      <div key={symbol} className="stock-card">
        <div className="stock-header" onClick={() => toggleStockDetails(symbol)}>
          <div className="stock-symbol">
            {assetIcon} {symbol}
            <span className={`data-source ${sourceBadge.class}`}>{sourceBadge.text}</span>
            <span className={`market-badge ${market.toLowerCase()}`}>{market}</span>
          </div>
          <div className="stock-price">
            {market === "Crypto" ? "$" : "$"}
            {currentData.PRICE}
          </div>
          <div className={`stock-verdict ${getVerdictColor(currentData.VERDICT)}`}>{currentData.VERDICT}</div>
          <div className="stock-accuracy">Accuracy: {currentData.ACCURACY}%</div>
          <div className="expand-icon">{isExpanded ? "▼" : "▶"}</div>
        </div>

        {isExpanded && (
          <div className="stock-details">
            <div className="ai-analysis-section">
              <button
                className="ai-analysis-button"
                onClick={(e) => {
                  e.stopPropagation()
                  fetchAiAnalysis(symbol)
                }}
                disabled={aiLoading[symbol]}
              >
                {aiLoading[symbol] ? "Generating AI Analysis..." : "🤖 Get AI Analysis"}
              </button>
            </div>

            <div className="timeframe-indicators">
              <h4>Hierarchical Analysis</h4>
              <div className="timeframe-grid">
                {["MONTHLY", "WEEKLY", "DAILY", "4HOUR"].map((tf) => {
                  const tfData = stockData[`${tf}_TIMEFRAME`]
                  if (!tfData) return null
                  return (
                    <div key={tf} className={`timeframe-indicator ${tf.toLowerCase()}`}>
                      <span className="tf-label">{tf}</span>
                      <span className={`tf-verdict ${getVerdictColor(tfData.VERDICT)}`}>{tfData.VERDICT}</span>
                      <span className="tf-confidence">{tfData.CONFIDENCE_SCORE}</span>
                    </div>
                  )
                })}
              </div>
            </div>

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
                  {Object.entries(currentData.DETAILS.individual_verdicts).map(([key, value]) => (
                    <div key={key} className="verdict-item">
                      <span>{key.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}:</span>
                      <span className={`verdict-badge ${String(value).toLowerCase().replace(" ", "-")}`}>
                        {String(value)}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-section">
                <h4>Fundamentals</h4>
                {market === "Crypto" ? (
                  <>
                    <div className="detail-item">
                      <span>Market Cap Rank:</span>
                      <span>{currentData.DETAILS.fundamentals.Market_Cap_Rank}</span>
                    </div>
                    <div className="detail-item">
                      <span>Adoption Score:</span>
                      <span className="change-positive">
                        {(currentData.DETAILS.fundamentals.Adoption_Score! * 100).toFixed(1)}%
                      </span>
                    </div>
                    <div className="detail-item">
                      <span>Technology Score:</span>
                      <span className="change-positive">
                        {(currentData.DETAILS.fundamentals.Technology_Score! * 100).toFixed(1)}%
                      </span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="detail-item">
                      <span>P/E Ratio:</span>
                      <span>{currentData.DETAILS.fundamentals.PE_Ratio}</span>
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
                  </>
                )}
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

  // AI Analysis Modal
  const renderAiModal = () => {
    if (!showAiModal || !aiAnalysis || !aiAnalysis[showAiModal]) return null

    const analysis = aiAnalysis[showAiModal]

    return (
      <div className="ai-modal-overlay" onClick={() => setShowAiModal(null)}>
        <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
          <div className="ai-modal-header">
            <h2>🤖 AI Analysis for {analysis.symbol}</h2>
            <button className="close-button" onClick={() => setShowAiModal(null)}>
              ×
            </button>
          </div>
          <div className="ai-modal-content">
            {analysis.ai_analysis.error ? (
              <div className="ai-error">
                <p>
                  <strong>Error:</strong> {analysis.ai_analysis.error}
                </p>
                <p>{analysis.ai_analysis.message}</p>
              </div>
            ) : (
              <div className="ai-analysis-text">
                <div className="ai-meta">
                  <span>Model: {analysis.ai_analysis.model}</span>
                  <span>Generated: {analysis.ai_analysis.timestamp}</span>
                </div>
                <div className="ai-content">
                  {analysis.ai_analysis.analysis.split("\n").map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="app">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Analyzing 70 assets from US, Nigerian, and Crypto markets...</p>
          <p>Using hierarchical timeframe analysis (Monthly → Weekly → Daily → 4H)...</p>
          <p>This process takes 10-15 minutes with optimized rate limiting.</p>
          <p>Processing: US Stocks (Twelve Data) + Nigerian Stocks (Simulated) + Crypto (CoinGecko)...</p>
          <p>Please keep this tab open and be patient.</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="app">
        <div className="error-container">
          <h2>Something went wrong!</h2>
          <p>{error}</p>
          <p>API URL: {API_BASE_URL}</p>
          <button onClick={() => fetchData(false)} className="retry-button">
            Try Loading Cached Data
          </button>
          <button onClick={() => fetchData(true)} className="retry-button">
            Force Fresh Analysis
          </button>
        </div>
      </div>
    )
  }

  if (!data && !hasInitialData) {
    return (
      <div className="app">
        <div className="no-data-container">
          <h2>Multi-Asset Analysis Dashboard v4.0</h2>
          <p>Analyze 70 assets from US, Nigerian, and Crypto markets</p>
          <p>🚀 Features: Persistent Data + Background Processing + AI Integration</p>
          <p>⚡ Optimized: 6-10 minutes processing time</p>
          <p>📊 US Stocks: 25 | Nigerian Stocks: 30 | Crypto: 15</p>
          <p>🤖 AI Analysis: Available with Claude integration</p>
          <p>🕐 Auto-refresh: Daily at 5:00 PM</p>

          <div className="action-buttons">
            <button onClick={() => fetchData(false)} className="primary-button">
              📊 Go to Analysis
            </button>
            <button onClick={() => fetchData(true)} className="secondary-button">
              🔄 Start Fresh Analysis
            </button>
          </div>

          <p className="note">
            "Go to Analysis" loads cached data instantly.
            <br />
            "Start Fresh Analysis" runs new analysis (6-10 minutes).
          </p>
        </div>
      </div>
    )
  }

  // Group stocks by market type
  const groupStocksByMarket = () => {
    const stocks = Object.keys(data || {}).filter(
      (key) =>
        ![
          "timestamp",
          "stocks_analyzed",
          "status",
          "data_sources",
          "markets",
          "processing_info",
          "data_source",
          "note",
          "processing_time_minutes",
        ].includes(key),
    )

    const grouped = {
      US: [] as string[],
      Nigerian: [] as string[],
      Crypto: [] as string[],
    }

    stocks.forEach((symbol) => {
      const market = data![symbol]?.market || "Unknown"
      if (market === "US") {
        grouped.US.push(symbol)
      } else if (market === "Nigerian") {
        grouped.Nigerian.push(symbol)
      } else if (market === "Crypto") {
        grouped.Crypto.push(symbol)
      }
    })

    // Sort each group alphabetically
    grouped.US.sort()
    grouped.Nigerian.sort()
    grouped.Crypto.sort()

    return grouped
  }

  const groupedStocks = groupStocksByMarket()

  return (
    <div className="app">
      <header className="app-header">
        <h1>Multi-Asset Analysis Dashboard v4.0</h1>
        <div className="header-info">
          <span>Last Updated: {data?.timestamp}</span>
          <span>Assets Analyzed: {data?.stocks_analyzed}</span>
          {data?.processing_time_minutes && <span>Processing Time: {data.processing_time_minutes}min</span>}
          {data?.markets && (
            <>
              <span>US: {data.markets.us_stocks}</span>
              <span>Nigerian: {data.markets.nigerian_stocks}</span>
              <span>Crypto: {data.markets.crypto_assets}</span>
            </>
          )}
          {data?.data_sources && (
            <>
              <span>Twelve Data: {data.data_sources.twelve_data_count}</span>
              <span>Alpha Vantage: {data.data_sources.alpha_vantage_count}</span>
              <span>CoinGecko: {data.data_sources.coingecko_count}</span>
            </>
          )}
          <span className={`status ${data?.status}`}>Status: {data?.status}</span>
          {data?.processing_info?.ai_analysis_available && (
            <span className="ai-available">🤖 AI Analysis Available</span>
          )}
          {data?.data_source === "database_cache" && <span className="cache-indicator">📦 Cached Data</span>}
        </div>
        {data?.note && (
          <div className="data-note">
            <p>{data.note}</p>
          </div>
        )}
      </header>

      <div className="controls">
        <div className="timeframe-toggle">
          {(["MONTHLY", "WEEKLY", "DAILY", "4HOUR"] as const).map((tf) => (
            <button key={tf} className={timeframe === tf ? "active" : ""} onClick={() => setTimeframe(tf)}>
              {tf === "4HOUR" ? "4H" : tf.charAt(0) + tf.slice(1).toLowerCase()}
            </button>
          ))}
        </div>

        <div className="action-buttons">
          <button onClick={() => fetchData(false)} className="cache-button">
            📦 Load Cached
          </button>
          <button onClick={() => fetchData(true)} className="refresh-button">
            🔄 Fresh Analysis
          </button>
        </div>
      </div>

      <div className="markets-container">
        {/* US Stocks Section */}
        {groupedStocks.US.length > 0 && (
          <div className="market-section">
            <div className="market-header">
              <h2>🇺🇸 US Stocks ({groupedStocks.US.length})</h2>
              <div className="market-stats">
                <span>Data Source: Twelve Data</span>
                <span>Market: NASDAQ, NYSE</span>
              </div>
            </div>
            <div className="stocks-container">
              {groupedStocks.US.map((symbol) => renderStockCard(symbol, data![symbol]))}
            </div>
          </div>
        )}

        {/* Nigerian Stocks Section */}
        {groupedStocks.Nigerian.length > 0 && (
          <div className="market-section">
            <div className="market-header">
              <h2>🇳🇬 Nigerian Stocks ({groupedStocks.Nigerian.length})</h2>
              <div className="market-stats">
                <span>Data Source: Simulated (NSE)</span>
                <span>Market: Nigerian Stock Exchange</span>
              </div>
            </div>
            <div className="stocks-container">
              {groupedStocks.Nigerian.map((symbol) => renderStockCard(symbol, data![symbol]))}
            </div>
          </div>
        )}

        {/* Crypto Section */}
        {groupedStocks.Crypto.length > 0 && (
          <div className="market-section">
            <div className="market-header">
              <h2>₿ Cryptocurrency ({groupedStocks.Crypto.length})</h2>
              <div className="market-stats">
                <span>Data Source: CoinGecko</span>
                <span>Market: Global Crypto Markets</span>
              </div>
            </div>
            <div className="stocks-container">
              {groupedStocks.Crypto.map((symbol) => renderStockCard(symbol, data![symbol]))}
            </div>
          </div>
        )}
      </div>

      {renderAiModal()}
    </div>
  )
}

export default App
