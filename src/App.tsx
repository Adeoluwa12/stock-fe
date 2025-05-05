// "use client"

// import { useEffect, useState } from "react"
// import "./App.css"

// interface StockSignal {
//   symbol: string
//   price: number | null
//   macd_signal: string
//   elliott_wave: string
//   wave_verdict: string
//   auto_chart_pattern: string
//   auto_pattern_verdict: string
//   all_chart_pattern: string
//   all_pattern_verdict: string
//   market_cycle: string
//   cycle_verdict: string
// }

// function App() {
//   const [stocks, setStocks] = useState<StockSignal[]>([])
//   const [loading, setLoading] = useState(true)
//   const [timeframe, setTimeframe] = useState<"daily" | "weekly">("daily")
//   const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
//   const [error, setError] = useState<string | null>(null)

// // In your App.tsx file, update the fetch call:
// const fetchData = async () => {
//   setLoading(true)
//   setError(null)
//   try {
//     // Use environment variable or fallback to localhost for development
//     const apiUrl = process.env.REACT_APP_API_URL || "https://stock-be-j9p2.onrender.com";
//     const res = await fetch(`${apiUrl}/analyze?timeframe=${timeframe}`)
//     if (!res.ok) {
//       throw new Error(`Server responded with status: ${res.status}`)
//     }
//     const data = await res.json()
//     setStocks(data)
//     setLastUpdated(new Date())
//   } catch (err) {
//     console.error("Failed to fetch stock data", err)
//     setError("Failed to fetch data. Please check if the backend server is running.")
//   } finally {
//     setLoading(false)
//   }
// }

//   useEffect(() => {
//     fetchData()
//   }, [timeframe])

//   const getSignalColor = (signal: string) => {
//     if (signal === "BUY") return "signal-buy"
//     if (signal === "SELL") return "signal-sell"
//     return "signal-hold"
//   }

//   const renderSkeletonRows = () => {
//     return Array(10)
//       .fill(0)
//       .map((_, index) => (
//         <tr key={index} className="skeleton-row">
//           <td>
//             <div className="skeleton"></div>
//           </td>
//           <td>
//             <div className="skeleton"></div>
//           </td>
//           <td>
//             <div className="skeleton"></div>
//           </td>
//           <td>
//             <div className="skeleton"></div>
//           </td>
//           <td>
//             <div className="skeleton"></div>
//           </td>
//           <td>
//             <div className="skeleton"></div>
//           </td>
//         </tr>
//       ))
//   }

//   const getStrongSignal = (stock: StockSignal) => {
//     const signals = [
//       stock.macd_signal,
//       stock.wave_verdict,
//       stock.auto_pattern_verdict,
//       stock.all_pattern_verdict,
//       stock.cycle_verdict,
//     ]

//     const buyCount = signals.filter((signal) => signal === "BUY").length
//     const sellCount = signals.filter((signal) => signal === "SELL").length

//     if (buyCount >= 4) return "STRONG BUY"
//     if (sellCount >= 4) return "STRONG SELL"
//     if (buyCount >= 3) return "BUY"
//     if (sellCount >= 3) return "SELL"
//     return buyCount > sellCount ? "WEAK BUY" : "WEAK SELL"
//   }

//   return (
//     <div className="app-container">
//       <header className="app-header">
//         <div>
//           <h1>Stock Analysis Dashboard</h1>
//           <p className="subtitle">Technical analysis using multiple indicators</p>
//         </div>
//         <div className="header-actions">
//           <div className="last-updated">
//             {lastUpdated && <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>}
//           </div>
//           <button className="refresh-button" onClick={fetchData} disabled={loading}>
//             <span className={`refresh-icon ${loading ? "spinning" : ""}`}>↻</span>
//             Refresh
//           </button>
//         </div>
//       </header>

//       <div className="timeframe-selector">
//         <button className={timeframe === "daily" ? "active" : ""} onClick={() => setTimeframe("daily")}>
//           Daily
//         </button>
//         <button className={timeframe === "weekly" ? "active" : ""} onClick={() => setTimeframe("weekly")}>
//           Weekly
//         </button>
//       </div>

//       {error && <div className="error-message">{error}</div>}

//       <div className="table-container">
//         <table className="stock-table">
//           <thead>
//             <tr>
//               <th>Symbol</th>
//               <th>Price ($)</th>
//               <th>MACD</th>
//               <th>Elliott Wave</th>
//               <th>Auto Chart</th>
//               <th>All Chart</th>
//               <th>Market Cycle</th>
//               <th>Overall</th>
//             </tr>
//           </thead>
//           <tbody>
//             {loading
//               ? renderSkeletonRows()
//               : stocks.map((stock) => {
//                   const overallSignal = getStrongSignal(stock)
//                   return (
//                     <tr key={stock.symbol} className={overallSignal.includes("BUY") ? "row-buy" : "row-sell"}>
//                       <td className="symbol-cell">{stock.symbol}</td>
//                       <td>{stock.price !== null ? stock.price.toFixed(2) : "N/A"}</td>
//                       <td>
//                         <span className={`signal-badge ${getSignalColor(stock.macd_signal)}`}>{stock.macd_signal}</span>
//                       </td>
//                       <td>
//                         <span className={`signal-badge ${getSignalColor(stock.wave_verdict)}`}>
//                           {stock.wave_verdict}
//                         </span>
//                       </td>
//                       <td>
//                         <span className={`signal-badge ${getSignalColor(stock.auto_pattern_verdict)}`}>
//                           {stock.auto_pattern_verdict}
//                         </span>
//                       </td>
//                       <td>
//                         <span className={`signal-badge ${getSignalColor(stock.all_pattern_verdict)}`}>
//                           {stock.all_pattern_verdict}
//                         </span>
//                       </td>
//                       <td>
//                         <span className={`signal-badge ${getSignalColor(stock.cycle_verdict)}`}>
//                           {stock.cycle_verdict}
//                         </span>
//                       </td>
//                       <td>
//                         <span
//                           className={`signal-badge overall-signal ${overallSignal.includes("BUY") ? "signal-buy" : "signal-sell"}`}
//                         >
//                           {overallSignal}
//                         </span>
//                       </td>
//                     </tr>
//                   )
//                 })}
//           </tbody>
//         </table>
//       </div>

//       <div className="info-cards">
//         <div className="card">
//           <h2>Indicator Explanation</h2>
//           <div className="card-content">
//             <div className="info-item">
//               <h3>MACD</h3>
//               <p>Moving Average Convergence Divergence compares two moving averages to identify momentum changes.</p>
//             </div>
//             <div className="info-item">
//               <h3>Elliott Wave</h3>
//               <p>
//                 Identifies market cycles based on the Elliott Wave Theory of market movements in predictable patterns.
//               </p>
//             </div>
//             <div className="info-item">
//               <h3>Auto Chart Patterns</h3>
//               <p>Automatically detects trend lines and classifies patterns like channels, wedges, and triangles.</p>
//             </div>
//             <div className="info-item">
//               <h3>All Chart Patterns</h3>
//               <p>Detects specific chart patterns like double tops/bottoms, head and shoulders, flags, and wedges.</p>
//             </div>
//             <div className="info-item">
//               <h3>Market Cycles</h3>
//               <p>Identifies the current market phase: bullish, bearish, accumulation, or distribution.</p>
//             </div>
//           </div>
//         </div>

//         <div className="card">
//           <h2>Signal Summary</h2>
//           <div className="card-content">
//             {loading ? (
//               <div className="skeleton-container">
//                 <div className="skeleton"></div>
//                 <div className="skeleton"></div>
//                 <div className="skeleton"></div>
//               </div>
//             ) : (
//               <>
//                 <div className="info-item">
//                   <h3>Buy Signals</h3>
//                   <p>
//                     {
//                       stocks.filter(
//                         (s) =>
//                           s.macd_signal === "BUY" ||
//                           s.wave_verdict === "BUY" ||
//                           s.auto_pattern_verdict === "BUY" ||
//                           s.all_pattern_verdict === "BUY" ||
//                           s.cycle_verdict === "BUY",
//                       ).length
//                     }{" "}
//                     stocks showing buy signals
//                   </p>
//                 </div>
//                 <div className="info-item">
//                   <h3>Sell Signals</h3>
//                   <p>
//                     {
//                       stocks.filter(
//                         (s) =>
//                           s.macd_signal === "SELL" ||
//                           s.wave_verdict === "SELL" ||
//                           s.auto_pattern_verdict === "SELL" ||
//                           s.all_pattern_verdict === "SELL" ||
//                           s.cycle_verdict === "SELL",
//                       ).length
//                     }{" "}
//                     stocks showing sell signals
//                   </p>
//                 </div>
//                 <div className="info-item">
//                   <h3>Strong Buy</h3>
//                   <p>
//                     {
//                       stocks.filter(
//                         (s) =>
//                           [
//                             s.macd_signal,
//                             s.wave_verdict,
//                             s.auto_pattern_verdict,
//                             s.all_pattern_verdict,
//                             s.cycle_verdict,
//                           ].filter((signal) => signal === "BUY").length >= 4,
//                       ).length
//                     }{" "}
//                     stocks with 4+ buy signals
//                   </p>
//                 </div>
//                 <div className="info-item">
//                   <h3>Strong Sell</h3>
//                   <p>
//                     {
//                       stocks.filter(
//                         (s) =>
//                           [
//                             s.macd_signal,
//                             s.wave_verdict,
//                             s.auto_pattern_verdict,
//                             s.all_pattern_verdict,
//                             s.cycle_verdict,
//                           ].filter((signal) => signal === "SELL").length >= 4,
//                       ).length
//                     }{" "}
//                     stocks with 4+ sell signals
//                   </p>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   )
// }

// export default App




"use client"

import { useEffect, useState } from "react"
import "./App.css"

interface StockSignal {
  symbol: string
  price: number | null
  macd_signal: string
  elliott_wave: string
  wave_verdict: string
  auto_chart_pattern: string
  auto_pattern_verdict: string
  all_chart_pattern: string
  all_pattern_verdict: string
  market_cycle: string
  cycle_verdict: string
}

function App() {
  const [stocks, setStocks] = useState<StockSignal[]>([])
  const [loading, setLoading] = useState(true)
  const [timeframe, setTimeframe] = useState<"daily" | "weekly">("daily")
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)
  const [error, setError] = useState<string | null>(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    try {
      // Direct URL without environment variable for simplicity
      const apiUrl = "https://stock-be-j9p2.onrender.com"

      console.log(`Fetching data from: ${apiUrl}/analyze?timeframe=${timeframe}`)

      const res = await fetch(`${apiUrl}/analyze?timeframe=${timeframe}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Remove any credentials or cookies to simplify the request
        },
        // Don't include credentials for now to avoid CORS preflight issues
        // credentials: 'include',
      })

      if (!res.ok) {
        throw new Error(`Server responded with status: ${res.status}`)
      }

      const data = await res.json()
      console.log("Received data:", data)
      setStocks(data)
      setLastUpdated(new Date())
    } catch (err) {
      console.error("Failed to fetch stock data", err)
      setError(`Failed to fetch data: ${err instanceof Error ? err.message : String(err)}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [timeframe])

  const getSignalColor = (signal: string) => {
    if (signal === "BUY") return "signal-buy"
    if (signal === "SELL") return "signal-sell"
    return "signal-hold"
  }

  const renderSkeletonRows = () => {
    return Array(10)
      .fill(0)
      .map((_, index) => (
        <tr key={index} className="skeleton-row">
          <td>
            <div className="skeleton"></div>
          </td>
          <td>
            <div className="skeleton"></div>
          </td>
          <td>
            <div className="skeleton"></div>
          </td>
          <td>
            <div className="skeleton"></div>
          </td>
          <td>
            <div className="skeleton"></div>
          </td>
          <td>
            <div className="skeleton"></div>
          </td>
        </tr>
      ))
  }

  const getStrongSignal = (stock: StockSignal) => {
    const signals = [
      stock.macd_signal,
      stock.wave_verdict,
      stock.auto_pattern_verdict,
      stock.all_pattern_verdict,
      stock.cycle_verdict,
    ]

    const buyCount = signals.filter((signal) => signal === "BUY").length
    const sellCount = signals.filter((signal) => signal === "SELL").length

    if (buyCount >= 4) return "STRONG BUY"
    if (sellCount >= 4) return "STRONG SELL"
    if (buyCount >= 3) return "BUY"
    if (sellCount >= 3) return "SELL"
    return buyCount > sellCount ? "WEAK BUY" : "WEAK SELL"
  }

  return (
    <div className="app-container">
      <header className="app-header">
        <div>
          <h1>Stock Analysis Dashboard</h1>
          <p className="subtitle">Technical analysis using multiple indicators</p>
        </div>
        <div className="header-actions">
          <div className="last-updated">
            {lastUpdated && <span>Last updated: {lastUpdated.toLocaleTimeString()}</span>}
          </div>
          <button className="refresh-button" onClick={fetchData} disabled={loading}>
            <span className={`refresh-icon ${loading ? "spinning" : ""}`}>↻</span>
            Refresh
          </button>
        </div>
      </header>

      <div className="timeframe-selector">
        <button className={timeframe === "daily" ? "active" : ""} onClick={() => setTimeframe("daily")}>
          Daily
        </button>
        <button className={timeframe === "weekly" ? "active" : ""} onClick={() => setTimeframe("weekly")}>
          Weekly
        </button>
      </div>

      {error && <div className="error-message">{error}</div>}

      <div className="table-container">
        <table className="stock-table">
          <thead>
            <tr>
              <th>Symbol</th>
              <th>Price ($)</th>
              <th>MACD</th>
              <th>Elliott Wave</th>
              <th>Auto Chart</th>
              <th>All Chart</th>
              <th>Market Cycle</th>
              <th>Overall</th>
            </tr>
          </thead>
          <tbody>
            {loading
              ? renderSkeletonRows()
              : stocks.map((stock) => {
                  const overallSignal = getStrongSignal(stock)
                  return (
                    <tr key={stock.symbol} className={overallSignal.includes("BUY") ? "row-buy" : "row-sell"}>
                      <td className="symbol-cell">{stock.symbol}</td>
                      <td>{stock.price !== null ? stock.price.toFixed(2) : "N/A"}</td>
                      <td>
                        <span className={`signal-badge ${getSignalColor(stock.macd_signal)}`}>{stock.macd_signal}</span>
                      </td>
                      <td>
                        <span className={`signal-badge ${getSignalColor(stock.wave_verdict)}`}>
                          {stock.wave_verdict}
                        </span>
                      </td>
                      <td>
                        <span className={`signal-badge ${getSignalColor(stock.auto_pattern_verdict)}`}>
                          {stock.auto_pattern_verdict}
                        </span>
                      </td>
                      <td>
                        <span className={`signal-badge ${getSignalColor(stock.all_pattern_verdict)}`}>
                          {stock.all_pattern_verdict}
                        </span>
                      </td>
                      <td>
                        <span className={`signal-badge ${getSignalColor(stock.cycle_verdict)}`}>
                          {stock.cycle_verdict}
                        </span>
                      </td>
                      <td>
                        <span
                          className={`signal-badge overall-signal ${overallSignal.includes("BUY") ? "signal-buy" : "signal-sell"}`}
                        >
                          {overallSignal}
                        </span>
                      </td>
                    </tr>
                  )
                })}
          </tbody>
        </table>
      </div>

      <div className="info-cards">
        <div className="card">
          <h2>Indicator Explanation</h2>
          <div className="card-content">
            <div className="info-item">
              <h3>MACD</h3>
              <p>Moving Average Convergence Divergence compares two moving averages to identify momentum changes.</p>
            </div>
            <div className="info-item">
              <h3>Elliott Wave</h3>
              <p>
                Identifies market cycles based on the Elliott Wave Theory of market movements in predictable patterns.
              </p>
            </div>
            <div className="info-item">
              <h3>Auto Chart Patterns</h3>
              <p>Automatically detects trend lines and classifies patterns like channels, wedges, and triangles.</p>
            </div>
            <div className="info-item">
              <h3>All Chart Patterns</h3>
              <p>Detects specific chart patterns like double tops/bottoms, head and shoulders, flags, and wedges.</p>
            </div>
            <div className="info-item">
              <h3>Market Cycles</h3>
              <p>Identifies the current market phase: bullish, bearish, accumulation, or distribution.</p>
            </div>
          </div>
        </div>

        <div className="card">
          <h2>Signal Summary</h2>
          <div className="card-content">
            {loading ? (
              <div className="skeleton-container">
                <div className="skeleton"></div>
                <div className="skeleton"></div>
                <div className="skeleton"></div>
              </div>
            ) : (
              <>
                <div className="info-item">
                  <h3>Buy Signals</h3>
                  <p>
                    {
                      stocks.filter(
                        (s) =>
                          s.macd_signal === "BUY" ||
                          s.wave_verdict === "BUY" ||
                          s.auto_pattern_verdict === "BUY" ||
                          s.all_pattern_verdict === "BUY" ||
                          s.cycle_verdict === "BUY",
                      ).length
                    }{" "}
                    stocks showing buy signals
                  </p>
                </div>
                <div className="info-item">
                  <h3>Sell Signals</h3>
                  <p>
                    {
                      stocks.filter(
                        (s) =>
                          s.macd_signal === "SELL" ||
                          s.wave_verdict === "SELL" ||
                          s.auto_pattern_verdict === "SELL" ||
                          s.all_pattern_verdict === "SELL" ||
                          s.cycle_verdict === "SELL",
                      ).length
                    }{" "}
                    stocks showing sell signals
                  </p>
                </div>
                <div className="info-item">
                  <h3>Strong Buy</h3>
                  <p>
                    {
                      stocks.filter(
                        (s) =>
                          [
                            s.macd_signal,
                            s.wave_verdict,
                            s.auto_pattern_verdict,
                            s.all_pattern_verdict,
                            s.cycle_verdict,
                          ].filter((signal) => signal === "BUY").length >= 4,
                      ).length
                    }{" "}
                    stocks with 4+ buy signals
                  </p>
                </div>
                <div className="info-item">
                  <h3>Strong Sell</h3>
                  <p>
                    {
                      stocks.filter(
                        (s) =>
                          [
                            s.macd_signal,
                            s.wave_verdict,
                            s.auto_pattern_verdict,
                            s.all_pattern_verdict,
                            s.cycle_verdict,
                          ].filter((signal) => signal === "SELL").length >= 4,
                      ).length
                    }{" "}
                    stocks with 4+ sell signals
                  </p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
