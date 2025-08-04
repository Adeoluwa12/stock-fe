// "use client"

// import type React from "react"
// import { useState, useEffect, useCallback, useRef } from "react"
// import "./App.css"

// // Update to your actual API URL
// const API_BASE_URL = "http://localhost:5000"
// // const API_BASE_URL = "https://stock-be-j9p2.onrender.com"

// interface StockData {
//   PRICE: number
//   ACCURACY: number
//   CONFIDENCE_SCORE: number
//   VERDICT: string
//   status?: string
//   message?: string
//   DETAILS: {
//     individual_verdicts: {
//       rsi_verdict: string
//       adx_verdict: string
//       momentum_verdict: string
//       pattern_verdict: string
//       fundamental_verdict: string
//       sentiment_verdict: string
//       cycle_verdict: string
//       hierarchy_override?: string
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
//       PE_Ratio?: number
//       EPS?: number
//       revenue_growth?: number
//       net_income_growth?: number
//       Market_Cap_Rank?: number
//       Adoption_Score?: number
//       Technology_Score?: number
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
//   total_requested: number
//   success_rate: number
//   status: string
//   data_source?: string
//   note?: string
//   processing_time_minutes?: number
//   data_sources?: {
//     twelve_data_count: number
//     naijastocks_count: number
//     twelve_data_crypto_count?: number
//     cryptcompare_count: number
//   }
//   markets?: {
//     us_stocks: number
//     nigerian_stocks: number
//     crypto_assets: number
//   }
//   processing_info?: {
//     hierarchical_analysis: boolean
//     timeframes_analyzed: string[]
//     ai_analysis_available: boolean
//     background_processing: boolean
//     daily_auto_refresh: string
//     crypto_data_source?: string
//   }
//   [key: string]: any
// }

// interface AIAnalysisResponse {
//   symbol: string
//   ai_analysis: {
//     analysis: string
//     timestamp: string
//     model: string
//     symbol: string
//     error?: string
//     message?: string
//   }
//   technical_analysis: any
//   timestamp: string
// }

// interface ProgressInfo {
//   current: number
//   total: number
//   percentage: number
//   currentSymbol: string
//   stage: string
//   estimatedTimeRemaining: number
//   startTime?: number
// }

// const US_STOCKS = [
//   "AAPL", "MSFT", "GOOGL", "TSLA", "AMZN", "NVDA", "META", "NFLX", "JPM", "V",
//   "JNJ", "WMT", "PG", "UNH", "HD", "MA", "DIS", "PYPL", "ADBE", "CRM",
//   "INTC", "VZ", "T", "PFE", "KO", "PEP", "MRK", "ABT", "TMO", "NKE"
// ]
// const NIGERIAN_STOCKS = [
//   "ACCESS", "GTCO", "UBA", "ZENITHBANK", "FBNH", "DANGCEM", "BUACEMENT", "WAPCO",
//   "DANGSUGAR", "NESTLE", "UNILEVER", "SEPLAT", "TOTAL", "MTNN", "TRANSCORP"
// ]
// const CRYPTO_STOCKS = [
//   "BTC", "ETH", "BNB", "SOL", "ADA", "AVAX", "DOT", "LINK", "MATIC", "LTC",
//   "XRP", "DOGE", "SHIB", "TRX", "ATOM", "FTM", "ALGO", "VET", "ICP", "NEAR"
// ]
// const ALL_SYMBOLS = [...US_STOCKS, ...NIGERIAN_STOCKS, ...CRYPTO_STOCKS]

// const getMarketForSymbol = (symbol: string) => {
//   if (CRYPTO_STOCKS.includes(symbol)) return "Crypto"
//   if (NIGERIAN_STOCKS.includes(symbol)) return "Nigerian"
//   if (US_STOCKS.includes(symbol)) return "US"
//   return "Unknown"
// }

// const getDataSourceForSymbol = (symbol: string) => {
//   if (CRYPTO_STOCKS.includes(symbol)) return "twelve_data_crypto"
//   if (NIGERIAN_STOCKS.includes(symbol)) return "naijastocks"
//   if (US_STOCKS.includes(symbol)) return "twelve_data"
//   return "unknown"
// }

// const BLANK_STOCKDATA: StockData = {
//   PRICE: 0,
//   ACCURACY: 0,
//   CONFIDENCE_SCORE: 0,
//   VERDICT: "No Data",
//   status: "Not Available",
//   message: "No data available for this asset/timeframe.",
//   DETAILS: {
//     individual_verdicts: {
//       rsi_verdict: "N/A",
//       adx_verdict: "N/A",
//       momentum_verdict: "N/A",
//       pattern_verdict: "N/A",
//       fundamental_verdict: "N/A",
//       sentiment_verdict: "N/A",
//       cycle_verdict: "N/A",
//     },
//     price_data: {
//       current_price: 0,
//       entry_price: 0,
//       target_prices: [0, 0],
//       stop_loss: 0,
//       change_1d: 0,
//       change_1w: 0,
//     },
//     technical_indicators: {
//       rsi: 0,
//       adx: 0,
//       atr: 0,
//       cycle_phase: "N/A",
//       cycle_momentum: 0,
//     },
//     patterns: {
//       geometric: ["N/A"],
//       elliott_wave: ["N/A"],
//       confluence_factors: ["N/A"],
//     },
//     fundamentals: {
//       PE_Ratio: 0,
//       EPS: 0,
//       revenue_growth: 0,
//       net_income_growth: 0,
//       Market_Cap_Rank: 0,
//       Adoption_Score: 0,
//       Technology_Score: 0,
//     },
//     sentiment_analysis: {
//       score: 0,
//       interpretation: "N/A",
//       market_mood: "N/A",
//     },
//     cycle_analysis: {
//       current_phase: "N/A",
//       stage: "N/A",
//       duration_days: 0,
//       momentum: 0,
//       momentum_visual: "N/A",
//       bull_continuation_probability: 0,
//       bear_transition_probability: 0,
//       expected_continuation: "N/A",
//       risk_level: "N/A",
//     },
//     trading_parameters: {
//       position_size: "N/A",
//       timeframe: "N/A",
//       risk_level: "N/A",
//     },
//   },
// }

// const App: React.FC = () => {
//   const [data, setData] = useState<ApiResponse | null>(null)
//   const [loading, setLoading] = useState<boolean>(false)
//   const [error, setError] = useState<string | null>(null)
//   const [timeframe, setTimeframe] = useState<"MONTHLY" | "WEEKLY" | "DAILY" | "4HOUR">("DAILY")
//   const [expandedStocks, setExpandedStocks] = useState<Set<string>>(new Set())
//   const [aiAnalysis, setAiAnalysis] = useState<{ [key: string]: AIAnalysisResponse } | null>(null)
//   const [aiLoading, setAiLoading] = useState<{ [key: string]: boolean }>({})
//   const [showAiModal, setShowAiModal] = useState<string | null>(null)
//   const [hasInitialData, setHasInitialData] = useState<boolean>(false)
//   const [showAnalysisPage, setShowAnalysisPage] = useState<boolean>(false)
//   const [progress, setProgress] = useState<ProgressInfo>({
//     current: 0,
//     total: 65,
//     percentage: 0,
//     currentSymbol: "",
//     stage: "Initializing...",
//     estimatedTimeRemaining: 0,
//   })
//   const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "error">("connecting")
//   const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)

//   // Refs for cleanup
//   const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
//   const dataPollingRef = useRef<NodeJS.Timeout | null>(null)
//   const isRequestingRef = useRef<boolean>(false)
//   const lastRequestTimeRef = useRef<number>(0)

//   // Generate placeholder data for loading state
//   const generatePlaceholderData = useCallback((): ApiResponse => {
//     const placeholderStocks: { [key: string]: any } = {}
//     ALL_SYMBOLS.forEach((symbol) => {
//       const market = getMarketForSymbol(symbol)
//       const dataSource = getDataSourceForSymbol(symbol)
//       const createTimeframeData = (isAvailable = true) => ({
//         PRICE: 0,
//         ACCURACY: 0,
//         CONFIDENCE_SCORE: 0,
//         VERDICT: isAvailable ? "Loading..." : "No Data",
//         status: isAvailable ? undefined : "Not Available",
//         message: isAvailable ? undefined : "No data available for this asset/timeframe.",
//         DETAILS: BLANK_STOCKDATA.DETAILS,
//       })
//       placeholderStocks[symbol] = {
//         data_source: dataSource,
//         market: market,
//         DAILY_TIMEFRAME: createTimeframeData(true),
//         WEEKLY_TIMEFRAME: createTimeframeData(true),
//         MONTHLY_TIMEFRAME: createTimeframeData(true),
//         "4HOUR_TIMEFRAME": createTimeframeData(true),
//       }
//     })
//     return {
//       timestamp: new Date().toISOString(),
//       stocks_analyzed: 0,
//       total_requested: 65,
//       success_rate: 0,
//       status: "loading",
//       data_source: "loading",
//       markets: {
//         us_stocks: US_STOCKS.length,
//         nigerian_stocks: NIGERIAN_STOCKS.length,
//         crypto_assets: CRYPTO_STOCKS.length,
//       },
//       data_sources: {
//         twelve_data_count: 0,
//         naijastocks_count: 0,
//         twelve_data_crypto_count: 0,
//         cryptcompare_count: 0,
//       },
//       processing_info: {
//         hierarchical_analysis: true,
//         timeframes_analyzed: ["monthly", "weekly", "daily", "4hour"],
//         ai_analysis_available: true,
//         background_processing: true,
//         daily_auto_refresh: "5:00 PM",
//         crypto_data_source: "TwelveData with CryptoCompare fallback",
//       },
//       ...placeholderStocks,
//     }
//   }, [])

//   const cleanup = useCallback(() => {
//     if (progressIntervalRef.current) {
//       clearInterval(progressIntervalRef.current)
//       progressIntervalRef.current = null
//     }
//     if (dataPollingRef.current) {
//       clearTimeout(dataPollingRef.current)
//       dataPollingRef.current = null
//     }
//   }, [])

//   const pollProgress = useCallback(async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/progress`, {
//         headers: { Accept: "application/json" },
//       })
//       if (response.ok) {
//         const progressData: ProgressInfo = await response.json()
//         setProgress(progressData)
//         const isComplete =
//           progressData.percentage >= 100 ||
//           progressData.stage.toLowerCase().includes("complete") ||
//           progressData.stage.toLowerCase().includes("finished") ||
//           progressData.stage.toLowerCase().includes("ready")

//         if (isComplete) {
//           setIsAnalyzing(false)
//           cleanup()
//           dataPollingRef.current = setTimeout(() => {
//             fetchFinalData()
//           }, 1000)
//         }
//       } else {
//         throw new Error(`Progress fetch failed: HTTP ${response.status}`)
//       }
//     } catch (err) {
//       setError("Failed to poll progress")
//     }
//   }, [cleanup])

//   // Updated fetchFinalData to handle all timeframes robustly
//   const fetchFinalData = useCallback(async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/analyze`, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//         },
//       })
//       if (response.ok) {
//         const result: ApiResponse = await response.json()
//         if (result.status === "success" || result.data_source === "database_cache" || result.stocks_analyzed > 0) {
//           // Patch: Ensure all stocks and all timeframes are present, fill with "No Data" if missing
//           ALL_SYMBOLS.forEach((symbol) => {
//             if (!result[symbol]) {
//               result[symbol] = {
//                 data_source: getDataSourceForSymbol(symbol),
//                 market: getMarketForSymbol(symbol),
//                 DAILY_TIMEFRAME: { ...BLANK_STOCKDATA },
//                 WEEKLY_TIMEFRAME: { ...BLANK_STOCKDATA },
//                 MONTHLY_TIMEFRAME: { ...BLANK_STOCKDATA },
//                 "4HOUR_TIMEFRAME": { ...BLANK_STOCKDATA },
//               }
//             } else {
//               ["DAILY_TIMEFRAME", "WEEKLY_TIMEFRAME", "MONTHLY_TIMEFRAME", "4HOUR_TIMEFRAME"].forEach((tf) => {
//                 if (!result[symbol][tf]) {
//                   result[symbol][tf] = { ...BLANK_STOCKDATA }
//                 }
//               })
//             }
//           })
//           setData(result)
//           setLoading(false)
//           setHasInitialData(true)
//           setError(null)
//         } else if (result.status === "analysis_triggered") {
//           if (!progressIntervalRef.current) {
//             progressIntervalRef.current = setInterval(pollProgress, 2000)
//           }
//         }
//       } else {
//         throw new Error(`HTTP ${response.status}`)
//       }
//     } catch (err) {
//       setError("Failed to fetch final analysis data")
//       setLoading(false)
//     }
//   }, [pollProgress])

//   const startAnalysis = useCallback(
//     async (fresh = false) => {
//       setShowAnalysisPage(true)
//       setIsAnalyzing(true)
//       setLoading(true)
//       setError(null)
//       cleanup()
//       const placeholderData = generatePlaceholderData()
//       setData(placeholderData)
//       setHasInitialData(true)
//       setProgress({
//         current: 0,
//         total: 65,
//         percentage: 0,
//         currentSymbol: "Initializing...",
//         stage: "Starting analysis...",
//         estimatedTimeRemaining: 600,
//       })
//       try {
//         const endpoint = fresh ? "/analyze/fresh" : "/analyze"
//         const apiUrl = `${API_BASE_URL}${endpoint}`
//         const response = await fetch(apiUrl, {
//           method: "GET",
//           headers: {
//             Accept: "application/json",
//           },
//         })
//         if (response.ok) {
//           const result = await response.json()
//           if (result.status === "success" || result.data_source === "database_cache") {
//             // Patch: Ensure all stocks and all timeframes are present, fill with "No Data" if missing
//             ALL_SYMBOLS.forEach((symbol) => {
//               if (!result[symbol]) {
//                 result[symbol] = {
//                   data_source: getDataSourceForSymbol(symbol),
//                   market: getMarketForSymbol(symbol),
//                   DAILY_TIMEFRAME: { ...BLANK_STOCKDATA },
//                   WEEKLY_TIMEFRAME: { ...BLANK_STOCKDATA },
//                   MONTHLY_TIMEFRAME: { ...BLANK_STOCKDATA },
//                   "4HOUR_TIMEFRAME": { ...BLANK_STOCKDATA },
//                 }
//               } else {
//                 ["DAILY_TIMEFRAME", "WEEKLY_TIMEFRAME", "MONTHLY_TIMEFRAME", "4HOUR_TIMEFRAME"].forEach((tf) => {
//                   if (!result[symbol][tf]) {
//                     result[symbol][tf] = { ...BLANK_STOCKDATA }
//                   }
//                 })
//               }
//             })
//             setData(result)
//             setIsAnalyzing(false)
//             setLoading(false)
//           } else if (result.status === "analysis_triggered" || result.status === "analysis_in_progress") {
//             progressIntervalRef.current = setInterval(pollProgress, 2000)
//           }
//         } else {
//           throw new Error(`HTTP ${response.status}`)
//         }
//       } catch (err) {
//         setError("Analysis failed")
//         setIsAnalyzing(false)
//         setLoading(false)
//         cleanup()
//       }
//     },
//     [generatePlaceholderData, pollProgress, cleanup],
//   )

//   const fetchData = useCallback(
//     async (fresh = false) => {
//       if (isRequestingRef.current) return
//       if (isAnalyzing) {
//         setShowAnalysisPage(true)
//         return
//       }
//       await startAnalysis(fresh)
//     },
//     [isAnalyzing, startAnalysis],
//   )

//   const fetchAiAnalysis = async (symbol: string) => {
//     setAiLoading((prev) => ({ ...prev, [symbol]: true }))
//     try {
//       const apiUrl = `${API_BASE_URL}/ai-analysis`
//       const response = await fetch(apiUrl, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Accept: "application/json",
//         },
//         body: JSON.stringify({ symbol }),
//       })
//       if (!response.ok) {
//         const errorText = await response.text()
//         throw new Error(`HTTP ${response.status}: ${errorText}`)
//       }
//       const result: AIAnalysisResponse = await response.json()
//       setAiAnalysis((prev) => ({ ...prev, [symbol]: result }))
//       setShowAiModal(symbol)
//     } catch (err) {
//       setError("Failed to get AI analysis")
//     } finally {
//       setAiLoading((prev) => ({ ...prev, [symbol]: false }))
//     }
//   }

//   const testConnection = useCallback(async () => {
//     if (isRequestingRef.current) return
//     const now = Date.now()
//     if (now - lastRequestTimeRef.current < 2000) return
//     try {
//       isRequestingRef.current = true
//       lastRequestTimeRef.current = now
//       setConnectionStatus("connecting")
//       const response = await fetch(`${API_BASE_URL}/health`, {
//         headers: { Accept: "application/json" },
//       })
//       if (!response.ok) throw new Error(`Health check failed: HTTP ${response.status}`)
//       const result = await response.json()
//       setConnectionStatus("connected")
//       if (result.data_status?.has_cached_data && !hasInitialData) {
//         await fetchData(false)
//       }
//     } catch (err) {
//       setConnectionStatus("error")
//       setError("Failed to connect to API. Please check if the backend is running.")
//     } finally {
//       isRequestingRef.current = false
//     }
//   }, [fetchData, hasInitialData])

//   useEffect(() => {
//     let mounted = true
//     const initializeConnection = async () => {
//       if (mounted && connectionStatus === "connecting") {
//         await testConnection()
//       }
//     }
//     initializeConnection()
//     return () => {
//       mounted = false
//       cleanup()
//     }
//   }, [testConnection, cleanup])

//   useEffect(() => {
//     return () => {
//       isRequestingRef.current = false
//       cleanup()
//     }
//   }, [cleanup])

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
//     if (verdict === "Loading..." || verdict === "Not Available" || verdict === "No Data") return "verdict-loading"
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

//   const getAssetTypeIcon = (_symbol: string, market: string) => {
//     if (market === "Crypto") return "₿"
//     if (market === "Nigerian") return "🇳🇬"
//     return "🇺🇸"
//   }

//   const getDataSourceBadge = (dataSource: string) => {
//     switch (dataSource) {
//       case "twelve_data":
//         return { text: "12D", class: "twelve-data" }
//       case "twelve_data_crypto":
//         return { text: "12D-C", class: "twelve-data-crypto" }
//       case "naijastocks":
//         return { text: "NS", class: "naijastocks" }
//       case "cryptcompare":
//         return { text: "CC", class: "cryptcompare" }
//       case "database_cache":
//         return { text: "CACHE", class: "cache" }
//       case "loading":
//         return { text: "...", class: "loading" }
//       default:
//         return { text: "UNK", class: "unknown" }
//     }
//   }

//   const renderProgressBar = () => {
//     if (!isAnalyzing && !loading) return null
//     const isComplete =
//       progress.stage.toLowerCase().includes("complete") ||
//       progress.stage.toLowerCase().includes("finished") ||
//       progress.stage.toLowerCase().includes("ready")
//     return (
//       <div className="progress-container">
//         <div className="progress-header">
//           <h3>{isComplete ? "Analysis Complete!" : "Analysis in Progress"}</h3>
//           <div className="progress-stats">
//             <span>
//               {progress.current} / {progress.total} assets processed
//             </span>
//             <span className="progress-percentage">{isComplete ? "100%" : `${progress.percentage.toFixed(1)}%`}</span>
//           </div>
//         </div>
//         <div className="progress-bar">
//           <div className="progress-fill" style={{ width: `${isComplete ? 100 : progress.percentage}%` }} />
//         </div>
//         <div className="progress-details">
//           <div className="current-stage">
//             {isComplete ? "✅ Analysis Complete - Loading Results..." : progress.stage}
//           </div>
//           {!isComplete && progress.currentSymbol && (
//             <div className="current-symbol">Analyzing: {progress.currentSymbol}</div>
//           )}
//           {!isComplete && progress.estimatedTimeRemaining > 0 && (
//             <div className="time-remaining">
//               Est. time remaining: {Math.ceil(progress.estimatedTimeRemaining / 60)} minutes
//             </div>
//           )}
//           {isComplete && <div className="completion-message">Results are being loaded. This may take a moment...</div>}
//         </div>
//       </div>
//     )
//   }

//   // Always show all stocks, and always show a card (with "No Data" if missing)
//   const renderStockCard = (symbol: string, stockData: any) => {
//     const timeframeKey = `${timeframe}_TIMEFRAME`
//     let currentData: StockData = BLANK_STOCKDATA
//     if (stockData && stockData[timeframeKey]) {
//       currentData = stockData[timeframeKey]
//     }
//     // If the data is missing or marked as Not Available, show "No Data"
//     if (!stockData || !stockData[timeframeKey] || currentData.status === "Not Available" || currentData.VERDICT === "No Data") {
//       const market = getMarketForSymbol(symbol)
//       const dataSource = getDataSourceForSymbol(symbol)
//       const assetIcon = getAssetTypeIcon(symbol, market)
//       const sourceBadge = getDataSourceBadge(dataSource)
//       const isExpanded = expandedStocks.has(symbol)
//       return (
//         <div key={symbol} className="stock-card not-available">
//           <div className="stock-header" onClick={() => toggleStockDetails(symbol)}>
//             <div className="stock-symbol">
//               {assetIcon} {symbol}
//               <span className={`data-source ${sourceBadge.class}`}>{sourceBadge.text}</span>
//               <span className={`market-badge ${market.toLowerCase()}`}>{market}</span>
//             </div>
//             <div className="stock-price">N/A</div>
//             <div className={`stock-verdict verdict-loading`}>NO DATA</div>
//             <div className="stock-accuracy">N/A</div>
//             <div className="expand-icon">{isExpanded ? "▼" : "▶"}</div>
//           </div>
//           {isExpanded && (
//             <div className="stock-details">
//               <div className="not-available-message">
//                 <p>No data available for this asset/timeframe.</p>
//               </div>
//             </div>
//           )}
//         </div>
//       )
//     }
//     // Otherwise, show the normal card
//     return renderStockCardContent(symbol, stockData, currentData)
//   }

//   // FULL DETAILS GRID: Show all analysis details, not just hierarchical analysis
//   const renderStockCardContent = (symbol: string, stockData: any, currentData: StockData) => {
//     const isExpanded = expandedStocks.has(symbol)
//     const dataSource = stockData.data_source || "unknown"
//     const market = stockData.market || "Unknown"
//     const assetIcon = getAssetTypeIcon(symbol, market)
//     const sourceBadge = getDataSourceBadge(dataSource)
//     const isLoadingData = dataSource === "loading" || currentData.VERDICT === "Loading..."
//     const isNotAvailable = currentData.status === "Not Available" || currentData.VERDICT === "No Data"

//     if (isNotAvailable && currentData.message) {
//       return (
//         <div key={symbol} className="stock-card not-available">
//           <div className="stock-header" onClick={() => toggleStockDetails(symbol)}>
//             <div className="stock-symbol">
//               {assetIcon} {symbol}
//               <span className={`data-source ${sourceBadge.class}`}>{sourceBadge.text}</span>
//               <span className={`market-badge ${market.toLowerCase()}`}>{market}</span>
//             </div>
//             <div className="stock-price">N/A</div>
//             <div className={`stock-verdict ${getVerdictColor(currentData.VERDICT)}`}>{currentData.VERDICT}</div>
//             <div className="stock-accuracy">N/A</div>
//             <div className="expand-icon">{isExpanded ? "▼" : "▶"}</div>
//           </div>
//           {isExpanded && (
//             <div className="stock-details">
//               <div className="not-available-message">
//                 <p>{currentData.message}</p>
//                 {market === "Nigerian" && timeframe !== "DAILY" && (
//                   <p>Please select DAILY timeframe for Nigerian stocks.</p>
//                 )}
//                 {market === "Crypto" && timeframe === "4HOUR" && (
//                   <p>4-hour data availability depends on data source (TwelveData vs CryptoCompare).</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       )
//     }

//     return (
//       <div key={symbol} className={`stock-card ${isLoadingData ? "loading-card" : ""}`}>
//         <div className="stock-header" onClick={() => toggleStockDetails(symbol)}>
//           <div className="stock-symbol">
//             {assetIcon} {symbol}
//             <span className={`data-source ${sourceBadge.class}`}>{sourceBadge.text}</span>
//             <span className={`market-badge ${market.toLowerCase()}`}>{market}</span>
//           </div>
//           <div className="stock-price">
//             {isLoadingData ? (
//               <div className="loading-placeholder">--</div>
//             ) : (
//               <>
//                 {market === "Crypto" ? "$" : market === "Nigerian" ? "₦" : "$"}
//                 {currentData.PRICE ? currentData.PRICE.toFixed(2) : "0.00"}
//               </>
//             )}
//           </div>
//           <div className={`stock-verdict ${getVerdictColor(currentData.VERDICT)}`}>
//             {isLoadingData ? (
//               <div className="loading-dots">
//                 <span></span>
//                 <span></span>
//                 <span></span>
//               </div>
//             ) : (
//               currentData.VERDICT
//             )}
//           </div>
//           <div className="stock-accuracy">
//             {isLoadingData ? <div className="loading-placeholder">--</div> : `Accuracy: ${currentData.ACCURACY || 0}%`}
//           </div>
//           <div className="expand-icon">{isExpanded ? "▼" : "▶"}</div>
//         </div>
//         {isExpanded && (
//           <div className="stock-details">
//             <div className="ai-analysis-section">
//               <button
//                 className="ai-analysis-button"
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   fetchAiAnalysis(symbol)
//                 }}
//                 disabled={aiLoading[symbol] || isLoadingData || isNotAvailable}
//               >
//                 {aiLoading[symbol] ? "Generating AI Analysis..." : "🤖 Get AI Analysis (OpenRouter)"}
//               </button>
//             </div>
//             <div className="timeframe-indicators">
//               <h4>Hierarchical Analysis</h4>
//               <div className="timeframe-grid">
//                 {(["MONTHLY", "WEEKLY", "DAILY", "4HOUR"] as const).map((tf) => {
//                   const tfData = stockData[`${tf}_TIMEFRAME`] || BLANK_STOCKDATA
//                   const isLoadingTf = tfData.VERDICT === "Loading..."
//                   const isTfNotAvailable = tfData.status === "Not Available" || tfData.VERDICT === "No Data"
//                   return (
//                     <div
//                       key={tf}
//                       className={`timeframe-indicator ${tf.toLowerCase()} ${isLoadingTf || isTfNotAvailable ? "loading" : ""}`}
//                     >
//                       <span className="tf-label">
//                         {tf === "4HOUR" ? "4H" : tf.charAt(0) + tf.slice(1).toLowerCase()}
//                       </span>
//                       <span className={`tf-verdict ${getVerdictColor(tfData.VERDICT)}`}>
//                         {isLoadingTf ? (
//                           <div className="loading-dots small">
//                             <span></span>
//                             <span></span>
//                             <span></span>
//                           </div>
//                         ) : isTfNotAvailable ? (
//                           "NO DATA"
//                         ) : (
//                           tfData.VERDICT
//                         )}
//                       </span>
//                       <span className="tf-confidence">
//                         {isLoadingTf || isTfNotAvailable ? "--" : tfData.CONFIDENCE_SCORE || "--"}
//                       </span>
//                     </div>
//                   )
//                 })}
//               </div>
//             </div>
//             <div className="details-grid">
//               {/* Price Data Section */}
//               <div className="detail-section">
//                 <h4>Price Data</h4>
//                 <div className="detail-item">
//                   <span>Current Price:</span>
//                   <span>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       `${market === "Crypto" ? "$" : market === "Nigerian" ? "₦" : "$"}${(currentData.DETAILS?.price_data?.current_price || 0).toFixed(2)}`
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Entry Price:</span>
//                   <span>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       `${market === "Crypto" ? "$" : market === "Nigerian" ? "₦" : "$"}${(currentData.DETAILS?.price_data?.entry_price || 0).toFixed(2)}`
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Stop Loss:</span>
//                   <span>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       `${market === "Crypto" ? "$" : market === "Nigerian" ? "₦" : "$"}${(currentData.DETAILS?.price_data?.stop_loss || 0).toFixed(2)}`
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Targets:</span>
//                   <span>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       (currentData.DETAILS?.price_data?.target_prices || [0, 0])
//                         .map((t) => `${market === "Crypto" ? "$" : market === "Nigerian" ? "₦" : "$"}${t.toFixed(2)}`)
//                         .join(", ")
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>1D Change:</span>
//                   <span
//                     className={isLoadingData ? "" : getChangeColor(currentData.DETAILS?.price_data?.change_1d || 0)}
//                   >
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       <>
//                         {(currentData.DETAILS?.price_data?.change_1d || 0) > 0 ? "+" : ""}
//                         {(currentData.DETAILS?.price_data?.change_1d || 0).toFixed(2)}%
//                       </>
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>1W Change:</span>
//                   <span
//                     className={isLoadingData ? "" : getChangeColor(currentData.DETAILS?.price_data?.change_1w || 0)}
//                   >
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       <>
//                         {(currentData.DETAILS?.price_data?.change_1w || 0) > 0 ? "+" : ""}
//                         {(currentData.DETAILS?.price_data?.change_1w || 0).toFixed(2)}%
//                       </>
//                     )}
//                   </span>
//                 </div>
//               </div>
//               {/* Technical Indicators */}
//               <div className="detail-section">
//                 <h4>Technical Indicators</h4>
//                 <div className="detail-item">
//                   <span>RSI:</span>
//                   <span>{isLoadingData ? <div className="loading-placeholder">--</div> : currentData.DETAILS?.technical_indicators?.rsi ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>ADX:</span>
//                   <span>{isLoadingData ? <div className="loading-placeholder">--</div> : currentData.DETAILS?.technical_indicators?.adx ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>ATR:</span>
//                   <span>{isLoadingData ? <div className="loading-placeholder">--</div> : currentData.DETAILS?.technical_indicators?.atr ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Cycle Phase:</span>
//                   <span>{isLoadingData ? <div className="loading-placeholder">--</div> : currentData.DETAILS?.technical_indicators?.cycle_phase ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Cycle Momentum:</span>
//                   <span>{isLoadingData ? <div className="loading-placeholder">--</div> : currentData.DETAILS?.technical_indicators?.cycle_momentum ?? "--"}</span>
//                 </div>
//               </div>
//               {/* Individual Verdicts */}
//               <div className="detail-section">
//                 <h4>Individual Verdicts</h4>
//                 <div className="detail-item">
//                   <span>RSI:</span>
//                   <span>{currentData.DETAILS?.individual_verdicts?.rsi_verdict ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>ADX:</span>
//                   <span>{currentData.DETAILS?.individual_verdicts?.adx_verdict ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Momentum:</span>
//                   <span>{currentData.DETAILS?.individual_verdicts?.momentum_verdict ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Pattern:</span>
//                   <span>{currentData.DETAILS?.individual_verdicts?.pattern_verdict ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Fundamental:</span>
//                   <span>{currentData.DETAILS?.individual_verdicts?.fundamental_verdict ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Sentiment:</span>
//                   <span>{currentData.DETAILS?.individual_verdicts?.sentiment_verdict ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Cycle:</span>
//                   <span>{currentData.DETAILS?.individual_verdicts?.cycle_verdict ?? "--"}</span>
//                 </div>
//                 {currentData.DETAILS?.individual_verdicts?.hierarchy_override && (
//                   <div className="detail-item">
//                     <span>Hierarchy Override:</span>
//                     <span>{currentData.DETAILS?.individual_verdicts?.hierarchy_override}</span>
//                   </div>
//                 )}
//               </div>
//               {/* Fundamentals */}
//               <div className="detail-section">
//                 <h4>Fundamentals</h4>
//                 {market === "Crypto" ? (
//                   <>
//                     <div className="detail-item">
//                       <span>Market Cap Rank:</span>
//                       <span>{currentData.DETAILS?.fundamentals?.Market_Cap_Rank ?? "--"}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span>Adoption Score:</span>
//                       <span>{currentData.DETAILS?.fundamentals?.Adoption_Score ?? "--"}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span>Technology Score:</span>
//                       <span>{currentData.DETAILS?.fundamentals?.Technology_Score ?? "--"}</span>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="detail-item">
//                       <span>P/E Ratio:</span>
//                       <span>{currentData.DETAILS?.fundamentals?.PE_Ratio ?? "--"}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span>EPS:</span>
//                       <span>{currentData.DETAILS?.fundamentals?.EPS ?? "--"}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span>Revenue Growth:</span>
//                       <span>{currentData.DETAILS?.fundamentals?.revenue_growth ?? "--"}</span>
//                     </div>
//                     <div className="detail-item">
//                       <span>Net Income Growth:</span>
//                       <span>{currentData.DETAILS?.fundamentals?.net_income_growth ?? "--"}</span>
//                     </div>
//                   </>
//                 )}
//               </div>
//               {/* Sentiment Analysis */}
//               <div className="detail-section">
//                 <h4>Sentiment Analysis</h4>
//                 <div className="detail-item">
//                   <span>Score:</span>
//                   <span>{currentData.DETAILS?.sentiment_analysis?.score ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Interpretation:</span>
//                   <span>{currentData.DETAILS?.sentiment_analysis?.interpretation ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Market Mood:</span>
//                   <span>{currentData.DETAILS?.sentiment_analysis?.market_mood ?? "--"}</span>
//                 </div>
//               </div>
//               {/* Cycle Analysis */}
//               <div className="detail-section">
//                 <h4>Cycle Analysis</h4>
//                 <div className="detail-item">
//                   <span>Current Phase:</span>
//                   <span>{currentData.DETAILS?.cycle_analysis?.current_phase ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Stage:</span>
//                   <span>{currentData.DETAILS?.cycle_analysis?.stage ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Duration (days):</span>
//                   <span>{currentData.DETAILS?.cycle_analysis?.duration_days ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Momentum:</span>
//                   <span>{currentData.DETAILS?.cycle_analysis?.momentum ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Momentum Visual:</span>
//                   <span>{currentData.DETAILS?.cycle_analysis?.momentum_visual ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Bull Continuation %:</span>
//                   <span>{currentData.DETAILS?.cycle_analysis?.bull_continuation_probability ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Bear Transition %:</span>
//                   <span>{currentData.DETAILS?.cycle_analysis?.bear_transition_probability ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Expected Continuation:</span>
//                   <span>{currentData.DETAILS?.cycle_analysis?.expected_continuation ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Risk Level:</span>
//                   <span>{currentData.DETAILS?.cycle_analysis?.risk_level ?? "--"}</span>
//                 </div>
//               </div>
//               {/* Trading Parameters */}
//               <div className="detail-section">
//                 <h4>Trading Parameters</h4>
//                 <div className="detail-item">
//                   <span>Position Size:</span>
//                   <span>{currentData.DETAILS?.trading_parameters?.position_size ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Timeframe:</span>
//                   <span>{currentData.DETAILS?.trading_parameters?.timeframe ?? "--"}</span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Risk Level:</span>
//                   <span>{currentData.DETAILS?.trading_parameters?.risk_level ?? "--"}</span>
//                 </div>
//               </div>
//               {/* Patterns */}
//               <div className="detail-section">
//                 <h4>Patterns</h4>
//                 <div className="detail-item">
//                   <span>Geometric:</span>
//                   <span>
//                     {(currentData.DETAILS?.patterns?.geometric || []).length > 0
//                       ? currentData.DETAILS?.patterns?.geometric.join(", ")
//                       : "--"}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Elliott Wave:</span>
//                   <span>
//                     {(currentData.DETAILS?.patterns?.elliott_wave || []).length > 0
//                       ? currentData.DETAILS?.patterns?.elliott_wave.join(", ")
//                       : "--"}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Confluence Factors:</span>
//                   <span>
//                     {(currentData.DETAILS?.patterns?.confluence_factors || []).length > 0
//                       ? currentData.DETAILS?.patterns?.confluence_factors.join(", ")
//                       : "--"}
//                   </span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   }

//   const renderAiModal = () => {
//     if (!showAiModal || !aiAnalysis || !aiAnalysis[showAiModal]) return null
//     const analysis = aiAnalysis[showAiModal]
//     return (
//       <div className="ai-modal-overlay" onClick={() => setShowAiModal(null)}>
//         <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
//           <div className="ai-modal-header">
//             <h2>🤖 AI Analysis for {analysis.symbol} (OpenRouter)</h2>
//             <button className="close-button" onClick={() => setShowAiModal(null)}>
//               ×
//             </button>
//           </div>
//           <div className="ai-modal-content">
//             {analysis.ai_analysis.error ? (
//               <div className="ai-error">
//                 <p>
//                   <strong>Error:</strong> {analysis.ai_analysis.error}
//                 </p>
//                 <p>{analysis.ai_analysis.message}</p>
//               </div>
//             ) : (
//               <div className="ai-analysis-text">
//                 <div className="ai-meta">
//                   <span>Model: {analysis.ai_analysis.model}</span>
//                   <span>Generated: {analysis.ai_analysis.timestamp}</span>
//                 </div>
//                 <div className="ai-content">
//                   {analysis.ai_analysis.analysis.split("\n").map((paragraph, index) => (
//                     <p key={index}>{paragraph}</p>
//                   ))}
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     )
//   }

//   if (connectionStatus === "error" && !showAnalysisPage) {
//     return (
//       <div className="app">
//         <div className="error-container">
//           <h2>Connection Error</h2>
//           <p>{error}</p>
//           <p>API URL: {API_BASE_URL}</p>
//           <div className="connection-status">
//             Status: <span className="status-error">Disconnected</span>
//           </div>
//           <button onClick={testConnection} className="retry-button">
//             🔄 Retry Connection
//           </button>
//         </div>
//       </div>
//     )
//   }

//   if (connectionStatus === "connecting" && !showAnalysisPage) {
//     return (
//       <div className="app">
//         <div className="loading-container">
//           <h2>Connecting to Analysis API...</h2>
//           <div className="loading-spinner"></div>
//           <p>Testing connection to {API_BASE_URL}</p>
//         </div>
//       </div>
//     )
//   }

//   if (!showAnalysisPage && !hasInitialData) {
//     return (
//       <div className="app">
//         <div className="no-data-container">
//           <h2>Multi-Asset Analysis Dashboard v5.0</h2>
//           <p>Analyze 65 popular assets from US, Nigerian, and Crypto markets</p>
//           <div className="connection-status">
//             Status:{" "}
//             <span className={`status-${connectionStatus}`}>
//               {connectionStatus === "connected" ? "✅ Connected" : "🔄 Connecting..."}
//             </span>
//           </div>
//           <div className="features-list">
//             <p>🚀 Features: Expanded Dataset + TwelveData Crypto + OpenRouter AI + Persistent Data</p>
//             <p>⚡ Optimized: ~8 minutes processing time (more assets)</p>
//             <p>📊 US Stocks: 30 | Nigerian Stocks: 15 | Crypto: 20</p>
//             <p>🤖 AI Analysis: Available with OpenRouter</p>
//             <p>🕐 Auto-refresh: Daily at 5:00 PM</p>
//             <p>📡 Data Sources: TwelveData (US + Crypto), NaijaStocksAPI, CryptoCompare (fallback)</p>
//           </div>
//           <div className="action-buttons">
//             <button
//               onClick={() => fetchData(false)}
//               className="primary-button"
//               disabled={connectionStatus !== "connected"}
//             >
//               📊 Go to Analysis
//             </button>
//             <button
//               onClick={() => fetchData(true)}
//               className="secondary-button"
//               disabled={connectionStatus !== "connected"}
//             >
//               🔄 Start Fresh Analysis
//             </button>
//           </div>
//           <p className="note">
//             "Go to Analysis" loads cached data instantly.
//             <br />
//             "Start Fresh Analysis" runs new analysis (~8 minutes for 65 assets).
//             <br />
//             Note: Nigerian stocks only available in DAILY timeframe. Crypto 4H data depends on source.
//           </p>
//         </div>
//       </div>
//     )
//   }

//   // Always group all stocks, even if not in data
//   const groupStocksByMarket = () => {
//     const grouped = {
//       US: [...US_STOCKS],
//       Nigerian: [...NIGERIAN_STOCKS],
//       Crypto: [...CRYPTO_STOCKS],
//     }
//     return grouped
//   }

//   const groupedStocks = groupStocksByMarket()

//   return (
//     <div className="app">
//       <header className="app-header">
//         <h1>Multi-Asset Analysis Dashboard v5.0</h1>
//         <div className="header-info">
//           <span>Last Updated: {data?.timestamp || "N/A"}</span>
//           <span>
//             Assets Analyzed: {data?.stocks_analyzed || 0}/{data?.total_requested || 65}
//           </span>
//           {data?.processing_time_minutes && <span>Processing Time: {data.processing_time_minutes.toFixed(2)}min</span>}
//           {data?.markets && (
//             <>
//               <span>US: {data.markets.us_stocks}</span>
//               <span>Nigerian: {data.markets.nigerian_stocks}</span>
//               <span>Crypto: {data.markets.crypto_assets}</span>
//             </>
//           )}
//           {data?.data_sources && (
//             <>
//               <span>TwelveData: {data.data_sources.twelve_data_count}</span>
//               <span>NaijaStocks: {data.data_sources.naijastocks_count}</span>
//               <span>TwelveData-Crypto: {data.data_sources.twelve_data_crypto_count || 0}</span>
//               <span>CryptoCompare: {data.data_sources.cryptcompare_count}</span>
//             </>
//           )}
//           <span className={`status ${data?.status}`}>Status: {data?.status || "loading"}</span>
//           {data?.processing_info?.ai_analysis_available && (
//             <span className="ai-available">🤖 AI Analysis Available (OpenRouter)</span>
//           )}
//           {data?.data_source === "database_cache" && <span className="cache-indicator">📦 Cached Data (24hr)</span>}
//           {isAnalyzing && <span className="analyzing-indicator">🔄 Analyzing...</span>}
//           <span className={`connection-status status-${connectionStatus}`}>
//             {connectionStatus === "connected"
//               ? "🟢 Connected"
//               : connectionStatus === "connecting"
//                 ? "🟡 Connecting"
//                 : "🔴 Disconnected"}
//           </span>
//         </div>
//         {data?.note && (
//           <div className="data-note">
//             <p>{data.note}</p>
//           </div>
//         )}
//         {data?.processing_info?.crypto_data_source && (
//           <div className="crypto-source-note">
//             <p>Crypto Data: {data.processing_info.crypto_data_source}</p>
//           </div>
//         )}
//       </header>

//       {renderProgressBar()}

//       <div className="controls">
//         <div className="timeframe-toggle">
//           {(["MONTHLY", "WEEKLY", "DAILY", "4HOUR"] as const).map((tf) => (
//             <button
//               key={tf}
//               className={timeframe === tf ? "active" : ""}
//               onClick={() => setTimeframe(tf)}
//               title={
//                 tf !== "DAILY"
//                   ? "Some assets may have limited or no data for this timeframe"
//                   : undefined
//               }
//             >
//               {tf === "4HOUR" ? "4H" : tf.charAt(0) + tf.slice(1).toLowerCase()}
//             </button>
//           ))}
//         </div>
//         <div className="action-buttons">
//           <button
//             onClick={() => fetchData(false)}
//             className="cache-button"
//             disabled={isAnalyzing || connectionStatus !== "connected"}
//           >
//             📦 Load Cached
//           </button>
//           <button
//             onClick={() => fetchData(true)}
//             className="refresh-button"
//             disabled={isAnalyzing || connectionStatus !== "connected"}
//           >
//             🔄 Fresh Analysis
//           </button>
//         </div>
//       </div>

//       <div className="markets-container">
//         <div className="market-section">
//           <div className="market-header">
//             <h2>🇺🇸 US Stocks ({groupedStocks.US.length})</h2>
//             <div className="market-stats">
//               <span>Data Source: TwelveData</span>
//               <span>Market: NASDAQ, NYSE</span>
//               <span>All timeframes available</span>
//             </div>
//           </div>
//           <div className="stocks-container">
//             {groupedStocks.US.map((symbol) =>
//               renderStockCard(symbol, data ? data[symbol] : undefined)
//             )}
//           </div>
//         </div>
//         <div className="market-section">
//           <div className="market-header">
//             <h2>🇳🇬 Nigerian Stocks ({groupedStocks.Nigerian.length})</h2>
//             <div className="market-stats">
//               <span>Data Source: NaijaStocksAPI</span>
//               <span>Market: Nigerian Stock Exchange</span>
//               <span className="timeframe-note">Note: Only DAILY timeframe available</span>
//             </div>
//           </div>
//           <div className="stocks-container">
//             {groupedStocks.Nigerian.map((symbol) =>
//               renderStockCard(symbol, data ? data[symbol] : undefined)
//             )}
//           </div>
//         </div>
//         <div className="market-section">
//           <div className="market-header">
//             <h2>₿ Cryptocurrency ({groupedStocks.Crypto.length})</h2>
//             <div className="market-stats">
//               <span>Data Source: TwelveData (Primary), CryptoCompare (Fallback)</span>
//               <span>Market: Global Crypto Markets</span>
//               <span className="timeframe-note">Note: 4H data availability varies by source</span>
//             </div>
//           </div>
//           <div className="stocks-container">
//             {groupedStocks.Crypto.map((symbol) =>
//               renderStockCard(symbol, data ? data[symbol] : undefined)
//             )}
//           </div>
//         </div>
//       </div>

//       {renderAiModal()}
//     </div>
//   )
// }

// export default App


"use client"
import type React from "react"
import { useState, useEffect, useCallback, useRef } from "react"
import "./App.css"

// Update to your actual API URL
// const API_BASE_URL = "http://localhost:5000"
const API_BASE_URL = "https://stock-be-j9p2.onrender.com"

interface StockData {
  PRICE: number
  ACCURACY: number
  CONFIDENCE_SCORE: number
  VERDICT: string
  status?: string
  message?: string
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
      EPS?: number
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
  total_requested: number
  success_rate: number
  status: string
  data_source?: string
  note?: string
  processing_time_minutes?: number
  // UPDATED: New data source structure from backend
  data_sources?: {
    yfinance_count: number
    tradingview_scraper_count: number
    twelve_data_count: number
    cryptcompare_count: number
    alpha_vantage_count?: number
    investpy_count?: number
    stockdata_org_count?: number
    rapidapi_tradingview_count?: number
    realistic_nse_data_count?: number
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
    primary_data_source?: string
    ai_provider?: string
    expanded_coverage?: string
    data_source_strategy?: string
    yfinance_integration?: string
    tradingview_scraper_integration?: string
    error_handling?: string
  }
  [key: string]: any
}

interface AIAnalysisResponse {
  symbol: string
  ai_analysis: {
    analysis: string
    timestamp: string
    model: string
    provider: string
    symbol: string
    error?: string
    message?: string
  }
  technical_analysis: any
  timestamp: string
}

interface ProgressInfo {
  current: number
  total: number
  percentage: number
  currentSymbol: string
  stage: string
  estimatedTimeRemaining: number
  startTime?: number
  isComplete?: boolean
  hasError?: boolean
  errorMessage?: string
  lastUpdate?: number
  server_time?: string
  analysis_in_progress?: boolean
}

// UPDATED: Stock lists to match backend exactly (120 total)
const US_STOCKS = [
  // Tech Giants
  "AAPL",
  "MSFT",
  "GOOGL",
  "AMZN",
  "META",
  "TSLA",
  "NVDA",
  "NFLX",
  "ADBE",
  "CRM",
  // Financial
  "JPM",
  "BAC",
  "WFC",
  "GS",
  "MS",
  "C",
  "V",
  "MA",
  "PYPL",
  "SQ",
  // Healthcare & Pharma
  "JNJ",
  "PFE",
  "UNH",
  "ABBV",
  "MRK",
  "TMO",
  "ABT",
  "MDT",
  "GILD",
  "AMGN",
  // Consumer & Retail
  "WMT",
  "HD",
  "PG",
  "KO",
  "PEP",
  "NKE",
  "SBUX",
  "MCD",
  "DIS",
  "COST",
  // Industrial & Energy
  "GE",
  "CAT",
  "BA",
  "MMM",
  "XOM",
  "CVX",
  "COP",
  "SLB",
  "EOG",
  "KMI",
]

// UPDATED: Exact Nigerian stocks list from backend (45 stocks)
const NIGERIAN_STOCKS = [
  // Banks (Tier 1)
  "ACCESS",
  "GTCO",
  "UBA",
  "ZENITHBANK",
  "FBNH",
  "STERLNBANK",
  "FIDELITYBK",
  "WEMABANK",
  "UNIONBANK",
  "ECOBANK",
  "FCMB",
  "JAIZBANK",
  "SUNUBANK",
  "PROVIDUSBANK",
  "POLARIS",
  // Industrial/Cement/Construction
  "DANGCEM",
  "BUACEMENT",
  "WAPCO",
  "LAFARGE",
  "CUTIX",
  "BERGER",
  "JBERGER",
  "MEYER",
  // Consumer Goods/Food & Beverages
  "DANGSUGAR",
  "NASCON",
  "FLOURMILL",
  "HONEYFLOUR",
  "CADBURY",
  "NESTLE",
  "UNILEVER",
  "GUINNESS",
  "NB",
  "CHAMPION",
  "VITAFOAM",
  "PZ",
  // Oil & Gas
  "SEPLAT",
  "TOTAL",
  "OANDO",
  "CONOIL",
  "ETERNA",
  "FORTE",
  "JAPAULGOLD",
  "MRS",
  // Telecom & Technology
  "MTNN",
  "AIRTELAFRI",
  "IHS",
  // Others
  "TRANSCORP",
  "LIVESTOCK",
]

// UPDATED: Exact crypto list from backend (25 assets)
const CRYPTO_STOCKS = [
  // Top Market Cap
  "BTC",
  "ETH",
  "BNB",
  "XRP",
  "SOL",
  "ADA",
  "AVAX",
  "DOT",
  "MATIC",
  "LTC",
  // DeFi & Layer 1
  "LINK",
  "UNI",
  "AAVE",
  "ATOM",
  "ALGO",
  "VET",
  "ICP",
  "NEAR",
  "FTM",
  "HBAR",
  // Meme & Others
  "DOGE",
  "SHIB",
  "TRX",
  "XLM",
  "ETC",
]

const ALL_SYMBOLS = [...US_STOCKS, ...NIGERIAN_STOCKS, ...CRYPTO_STOCKS]

const getMarketForSymbol = (symbol: string) => {
  if (CRYPTO_STOCKS.includes(symbol)) return "Crypto"
  if (NIGERIAN_STOCKS.includes(symbol)) return "Nigerian"
  if (US_STOCKS.includes(symbol)) return "US"
  return "Unknown"
}

// UPDATED: Data source mapping based on new backend structure
const getDataSourceForSymbol = (symbol: string, actualDataSource?: string) => {
  // If we have actual data source from API, use it
  if (actualDataSource) {
    return actualDataSource
  }

  // Otherwise, predict based on symbol type
  if (CRYPTO_STOCKS.includes(symbol)) return "yfinance" // Primary for crypto
  if (NIGERIAN_STOCKS.includes(symbol)) return "tradingview_scraper" // Primary for Nigerian
  if (US_STOCKS.includes(symbol)) return "yfinance" // Primary for US
  return "unknown"
}

const BLANK_STOCKDATA: StockData = {
  PRICE: 0,
  ACCURACY: 0,
  CONFIDENCE_SCORE: 0,
  VERDICT: "No Data",
  status: "Not Available",
  message: "No data available for this asset/timeframe.",
  DETAILS: {
    individual_verdicts: {
      rsi_verdict: "N/A",
      adx_verdict: "N/A",
      momentum_verdict: "N/A",
      pattern_verdict: "N/A",
      fundamental_verdict: "N/A",
      sentiment_verdict: "N/A",
      cycle_verdict: "N/A",
    },
    price_data: {
      current_price: 0,
      entry_price: 0,
      target_prices: [0, 0],
      stop_loss: 0,
      change_1d: 0,
      change_1w: 0,
    },
    technical_indicators: {
      rsi: 0,
      adx: 0,
      atr: 0,
      cycle_phase: "N/A",
      cycle_momentum: 0,
    },
    patterns: {
      geometric: ["N/A"],
      elliott_wave: ["N/A"],
      confluence_factors: ["N/A"],
    },
    fundamentals: {
      PE_Ratio: 0,
      EPS: 0,
      revenue_growth: 0,
      net_income_growth: 0,
      Market_Cap_Rank: 0,
      Adoption_Score: 0,
      Technology_Score: 0,
    },
    sentiment_analysis: {
      score: 0,
      interpretation: "N/A",
      market_mood: "N/A",
    },
    cycle_analysis: {
      current_phase: "N/A",
      stage: "N/A",
      duration_days: 0,
      momentum: 0,
      momentum_visual: "N/A",
      bull_continuation_probability: 0,
      bear_transition_probability: 0,
      expected_continuation: "N/A",
      risk_level: "N/A",
    },
    trading_parameters: {
      position_size: "N/A",
      timeframe: "N/A",
      risk_level: "N/A",
    },
  },
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
  const [showAnalysisPage, setShowAnalysisPage] = useState<boolean>(false)
  const [progress, setProgress] = useState<ProgressInfo>({
    current: 0,
    total: 120, // Confirmed 120 total
    percentage: 0,
    currentSymbol: "",
    stage: "Initializing...",
    estimatedTimeRemaining: 0,
  })
  const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "error">("connecting")
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)

  // Refs for cleanup
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
  const dataPollingRef = useRef<NodeJS.Timeout | null>(null)
  const isRequestingRef = useRef<boolean>(false)
  const lastRequestTimeRef = useRef<number>(0)
  const autoLoadTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  // UPDATED: Generate placeholder data with new data source structure
  const generatePlaceholderData = useCallback((): ApiResponse => {
    const placeholderStocks: { [key: string]: any } = {}
    ALL_SYMBOLS.forEach((symbol) => {
      const market = getMarketForSymbol(symbol)
      const dataSource = getDataSourceForSymbol(symbol)

      const createTimeframeData = (isAvailable = true) => ({
        PRICE: 0,
        ACCURACY: 0,
        CONFIDENCE_SCORE: 0,
        VERDICT: isAvailable ? "Loading..." : "No Data",
        status: isAvailable ? undefined : "Not Available",
        message: isAvailable ? undefined : "No data available for this asset/timeframe.",
        DETAILS: BLANK_STOCKDATA.DETAILS,
      })

      placeholderStocks[symbol] = {
        data_source: dataSource,
        market: market,
        DAILY_TIMEFRAME: createTimeframeData(true),
        WEEKLY_TIMEFRAME: createTimeframeData(true),
        MONTHLY_TIMEFRAME: createTimeframeData(true),
        "4HOUR_TIMEFRAME": createTimeframeData(true),
      }
    })

    return {
      timestamp: new Date().toISOString(),
      stocks_analyzed: 0,
      total_requested: 120,
      success_rate: 0,
      status: "loading",
      data_source: "loading",
      markets: {
        us_stocks: US_STOCKS.length,
        nigerian_stocks: NIGERIAN_STOCKS.length,
        crypto_assets: CRYPTO_STOCKS.length,
      },
      // UPDATED: New data source structure
      data_sources: {
        yfinance_count: 0,
        tradingview_scraper_count: 0,
        twelve_data_count: 0,
        cryptcompare_count: 0,
        alpha_vantage_count: 0,
        investpy_count: 0,
        stockdata_org_count: 0,
        rapidapi_tradingview_count: 0,
        realistic_nse_data_count: 0,
      },
      processing_info: {
        hierarchical_analysis: true,
        timeframes_analyzed: ["monthly", "weekly", "daily", "4hour"],
        ai_analysis_available: true,
        background_processing: true,
        daily_auto_refresh: "5:00 PM",
        primary_data_source: "yfinance for US/Crypto, TradingView Scraper for Nigerian stocks",
        ai_provider: "Groq (Llama3-8B)",
        expanded_coverage: "120 total assets with multiple Nigerian data sources",
        data_source_strategy: "US/Crypto: yfinance → TwelveData, Nigerian: Multiple sources → Synthetic",
        yfinance_integration: "Available",
        tradingview_scraper_integration: "Available",
        error_handling: "Improved - continues processing even if individual stocks fail",
      },
      ...placeholderStocks,
    }
  }, [])

  const cleanup = useCallback(() => {
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current)
      progressIntervalRef.current = null
    }
    if (dataPollingRef.current) {
      clearTimeout(dataPollingRef.current)
      dataPollingRef.current = null
    }
    if (autoLoadTimeoutRef.current) {
      clearTimeout(autoLoadTimeoutRef.current)
      autoLoadTimeoutRef.current = null
    }
  }, [])

  // Enhanced progress polling with better completion detection
  const pollProgress = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/progress`, {
        headers: { Accept: "application/json" },
      })
      if (response.ok) {
        const progressData: ProgressInfo = await response.json()
        setProgress(progressData)

        // Better completion detection
        const isComplete =
          progressData.isComplete ||
          progressData.percentage >= 100 ||
          progressData.stage.toLowerCase().includes("complete") ||
          progressData.stage.toLowerCase().includes("finished") ||
          progressData.stage.toLowerCase().includes("ready")

        if (isComplete) {
          setIsAnalyzing(false)
          cleanup()
          // Auto-load results with retry mechanism
          autoLoadTimeoutRef.current = setTimeout(() => {
            fetchFinalDataWithRetry()
          }, 2000)
        }
      } else {
        throw new Error(`Progress fetch failed: HTTP ${response.status}`)
      }
    } catch (err) {
      console.error("Progress polling error:", err)
      setError("Failed to poll progress")
    }
  }, [cleanup])

  // Enhanced final data fetching with retry mechanism
  const fetchFinalDataWithRetry = useCallback(async (retryCount = 0, maxRetries = 3) => {
    try {
      const response = await fetch(`${API_BASE_URL}/analyze`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })

      if (response.ok) {
        const result: ApiResponse = await response.json()
        if (result.status === "success" || result.data_source === "database_cache" || result.stocks_analyzed > 0) {
          // Ensure all stocks and all timeframes are present
          ALL_SYMBOLS.forEach((symbol) => {
            if (!result[symbol]) {
              result[symbol] = {
                data_source: getDataSourceForSymbol(symbol),
                market: getMarketForSymbol(symbol),
                DAILY_TIMEFRAME: { ...BLANK_STOCKDATA },
                WEEKLY_TIMEFRAME: { ...BLANK_STOCKDATA },
                MONTHLY_TIMEFRAME: { ...BLANK_STOCKDATA },
                "4HOUR_TIMEFRAME": { ...BLANK_STOCKDATA },
              }
            } else {
              ;["DAILY_TIMEFRAME", "WEEKLY_TIMEFRAME", "MONTHLY_TIMEFRAME", "4HOUR_TIMEFRAME"].forEach((tf) => {
                if (!result[symbol][tf]) {
                  result[symbol][tf] = { ...BLANK_STOCKDATA }
                }
              })
            }
          })

          setData(result)
          setLoading(false)
          setHasInitialData(true)
          setError(null)
          console.log("✅ Results loaded successfully")
        } else if (retryCount < maxRetries) {
          console.log(`🔄 Data not ready, retrying... (${retryCount + 1}/${maxRetries})`)
          setTimeout(() => {
            fetchFinalDataWithRetry(retryCount + 1, maxRetries)
          }, 3000)
        } else {
          throw new Error("Max retries reached, data still not ready")
        }
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (err) {
      console.error("Final data fetch error:", err)
      if (retryCount < maxRetries) {
        console.log(`🔄 Retrying final data fetch... (${retryCount + 1}/${maxRetries})`)
        setTimeout(() => {
          fetchFinalDataWithRetry(retryCount + 1, maxRetries)
        }, 5000)
      } else {
        setError("Failed to load final analysis data after multiple attempts")
        setLoading(false)
      }
    }
  }, [])

  const fetchFinalData = useCallback(async () => {
    await fetchFinalDataWithRetry()
  }, [fetchFinalDataWithRetry])

  const startAnalysis = useCallback(
    async (fresh = false) => {
      setShowAnalysisPage(true)
      setIsAnalyzing(true)
      setLoading(true)
      setError(null)
      cleanup()

      const placeholderData = generatePlaceholderData()
      setData(placeholderData)
      setHasInitialData(true)

      setProgress({
        current: 0,
        total: 120,
        percentage: 0,
        currentSymbol: "Initializing...",
        stage: "Starting analysis...",
        estimatedTimeRemaining: 900, // Increased for more stocks
        isComplete: false,
        hasError: false,
        errorMessage: "",
      })

      try {
        const endpoint = fresh ? "/analyze/fresh" : "/analyze"
        const apiUrl = `${API_BASE_URL}${endpoint}`
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Accept: "application/json",
          },
        })

        if (response.ok) {
          const result = await response.json()
          if (result.status === "success" || result.data_source === "database_cache") {
            // Ensure all stocks and all timeframes are present
            ALL_SYMBOLS.forEach((symbol) => {
              if (!result[symbol]) {
                result[symbol] = {
                  data_source: getDataSourceForSymbol(symbol),
                  market: getMarketForSymbol(symbol),
                  DAILY_TIMEFRAME: { ...BLANK_STOCKDATA },
                  WEEKLY_TIMEFRAME: { ...BLANK_STOCKDATA },
                  MONTHLY_TIMEFRAME: { ...BLANK_STOCKDATA },
                  "4HOUR_TIMEFRAME": { ...BLANK_STOCKDATA },
                }
              } else {
                ;["DAILY_TIMEFRAME", "WEEKLY_TIMEFRAME", "MONTHLY_TIMEFRAME", "4HOUR_TIMEFRAME"].forEach((tf) => {
                  if (!result[symbol][tf]) {
                    result[symbol][tf] = { ...BLANK_STOCKDATA }
                  }
                })
              }
            })

            setData(result)
            setIsAnalyzing(false)
            setLoading(false)
          } else if (result.status === "analysis_triggered" || result.status === "analysis_in_progress") {
            // Start progress polling
            progressIntervalRef.current = setInterval(pollProgress, 2000)
          }
        } else {
          throw new Error(`HTTP ${response.status}`)
        }
      } catch (err) {
        console.error("Analysis start error:", err)
        setError("Analysis failed to start")
        setIsAnalyzing(false)
        setLoading(false)
        cleanup()
      }
    },
    [generatePlaceholderData, pollProgress, cleanup],
  )

  const fetchData = useCallback(
    async (fresh = false) => {
      if (isRequestingRef.current) return
      if (isAnalyzing) {
        setShowAnalysisPage(true)
        return
      }
      await startAnalysis(fresh)
    },
    [isAnalyzing, startAnalysis],
  )

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
      console.error("AI analysis error:", err)
      setError("Failed to get AI analysis")
    } finally {
      setAiLoading((prev) => ({ ...prev, [symbol]: false }))
    }
  }

  const testConnection = useCallback(async () => {
    if (isRequestingRef.current) return
    const now = Date.now()
    if (now - lastRequestTimeRef.current < 2000) return

    try {
      isRequestingRef.current = true
      lastRequestTimeRef.current = now
      setConnectionStatus("connecting")

      const response = await fetch(`${API_BASE_URL}/health`, {
        headers: { Accept: "application/json" },
      })

      if (!response.ok) throw new Error(`Health check failed: HTTP ${response.status}`)

      const result = await response.json()
      setConnectionStatus("connected")

      if (result.data_status?.has_cached_data && !hasInitialData) {
        await fetchData(false)
      }
    } catch (err) {
      console.error("Connection test error:", err)
      setConnectionStatus("error")
      setError("Failed to connect to API. Please check if the backend is running.")
    } finally {
      isRequestingRef.current = false
    }
  }, [fetchData, hasInitialData])

  useEffect(() => {
    let mounted = true
    const initializeConnection = async () => {
      if (mounted && connectionStatus === "connecting") {
        await testConnection()
      }
    }
    initializeConnection()

    return () => {
      mounted = false
      cleanup()
    }
  }, [testConnection, cleanup])

  useEffect(() => {
    return () => {
      isRequestingRef.current = false
      cleanup()
    }
  }, [cleanup])

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
    if (verdict === "Loading..." || verdict === "Not Available" || verdict === "No Data") return "verdict-loading"
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

  const getAssetTypeIcon = (_symbol: string, market: string) => {
    if (market === "Crypto") return "₿"
    if (market === "Nigerian") return "🇳🇬"
    return "🇺🇸"
  }

  // UPDATED: Data source badge mapping for new backend sources
  const getDataSourceBadge = (dataSource: string) => {
    // Handle data source notes (e.g., "tradingview_scraper (Realistic NSE-pattern data)")
    const cleanSource = dataSource.split(" ")[0].toLowerCase()

    switch (cleanSource) {
      case "yfinance":
        return { text: "YF", class: "yfinance" }
      case "tradingview_scraper":
        return { text: "TVS", class: "tradingview-scraper" }
      case "twelve_data":
        return { text: "12D", class: "twelve-data" }
      case "cryptcompare":
        return { text: "CC", class: "cryptcompare" }
      case "alpha_vantage":
        return { text: "AV", class: "alpha-vantage" }
      case "investpy":
        return { text: "INV", class: "investpy" }
      case "stockdata_org":
        return { text: "SDO", class: "stockdata-org" }
      case "rapidapi_tradingview":
        return { text: "RTV", class: "rapidapi-tradingview" }
      case "realistic_nse_data":
        return { text: "NSE", class: "realistic-nse" }
      case "database_cache":
        return { text: "CACHE", class: "cache" }
      case "loading":
        return { text: "...", class: "loading" }
      default:
        return { text: "UNK", class: "unknown" }
    }
  }

  // Enhanced progress bar with better completion handling
  const renderProgressBar = () => {
    if (!isAnalyzing && !loading) return null

    const isComplete =
      progress.isComplete ||
      progress.stage.toLowerCase().includes("complete") ||
      progress.stage.toLowerCase().includes("finished") ||
      progress.stage.toLowerCase().includes("ready")

    return (
      <div className="progress-container">
        <div className="progress-header">
          <h3>{isComplete ? "Analysis Complete!" : "Analysis in Progress"}</h3>
          <div className="progress-stats">
            <span>
              {progress.current} / {progress.total} assets processed
            </span>
            <span className="progress-percentage">{isComplete ? "100%" : `${progress.percentage.toFixed(1)}%`}</span>
          </div>
        </div>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${isComplete ? 100 : progress.percentage}%` }} />
        </div>
        <div className="progress-details">
          <div className="current-stage">
            {isComplete ? "✅ Analysis Complete - Loading Results..." : progress.stage}
          </div>
          {!isComplete && progress.currentSymbol && (
            <div className="current-symbol">Analyzing: {progress.currentSymbol}</div>
          )}
          {!isComplete && progress.estimatedTimeRemaining > 0 && (
            <div className="time-remaining">
              Est. time remaining: {Math.ceil(progress.estimatedTimeRemaining / 60)} minutes
            </div>
          )}
          {isComplete && (
            <div className="completion-message">Results are being loaded automatically. This may take a moment...</div>
          )}
          {progress.hasError && (
            <div className="progress-error">⚠️ {progress.errorMessage || "An error occurred during analysis"}</div>
          )}
        </div>
      </div>
    )
  }

  // Always show all stocks, and always show a card (with "No Data" if missing)
  const renderStockCard = (symbol: string, stockData: any) => {
    const timeframeKey = `${timeframe}_TIMEFRAME`
    let currentData: StockData = BLANK_STOCKDATA

    if (stockData && stockData[timeframeKey]) {
      currentData = stockData[timeframeKey]
    }

    // If the data is missing or marked as Not Available, show "No Data"
    if (
      !stockData ||
      !stockData[timeframeKey] ||
      currentData.status === "Not Available" ||
      currentData.VERDICT === "No Data"
    ) {
      const market = getMarketForSymbol(symbol)
      const dataSource = getDataSourceForSymbol(symbol)
      const assetIcon = getAssetTypeIcon(symbol, market)
      const sourceBadge = getDataSourceBadge(dataSource)
      const isExpanded = expandedStocks.has(symbol)

      return (
        <div key={symbol} className="stock-card not-available">
          <div className="stock-header" onClick={() => toggleStockDetails(symbol)}>
            <div className="stock-symbol">
              {assetIcon} {symbol}
              <span className={`data-source ${sourceBadge.class}`}>{sourceBadge.text}</span>
              <span className={`market-badge ${market.toLowerCase()}`}>{market}</span>
            </div>
            <div className="stock-price">N/A</div>
            <div className={`stock-verdict verdict-loading`}>NO DATA</div>
            <div className="stock-accuracy">N/A</div>
            <div className="expand-icon">{isExpanded ? "▼" : "▶"}</div>
          </div>
          {isExpanded && (
            <div className="stock-details">
              <div className="not-available-message">
                <p>No data available for this asset/timeframe.</p>
              </div>
            </div>
          )}
        </div>
      )
    }

    // Otherwise, show the normal card
    return renderStockCardContent(symbol, stockData, currentData)
  }

  // FULL DETAILS GRID: Show all analysis details, not just hierarchical analysis
  const renderStockCardContent = (symbol: string, stockData: any, currentData: StockData) => {
    const isExpanded = expandedStocks.has(symbol)
    const dataSource = stockData.data_source || "unknown"
    const market = stockData.market || "Unknown"
    const assetIcon = getAssetTypeIcon(symbol, market)
    const sourceBadge = getDataSourceBadge(dataSource)
    const isLoadingData = dataSource === "loading" || currentData.VERDICT === "Loading..."
    const isNotAvailable = currentData.status === "Not Available" || currentData.VERDICT === "No Data"

    if (isNotAvailable && currentData.message) {
      return (
        <div key={symbol} className="stock-card not-available">
          <div className="stock-header" onClick={() => toggleStockDetails(symbol)}>
            <div className="stock-symbol">
              {assetIcon} {symbol}
              <span className={`data-source ${sourceBadge.class}`}>{sourceBadge.text}</span>
              <span className={`market-badge ${market.toLowerCase()}`}>{market}</span>
            </div>
            <div className="stock-price">N/A</div>
            <div className={`stock-verdict ${getVerdictColor(currentData.VERDICT)}`}>{currentData.VERDICT}</div>
            <div className="stock-accuracy">N/A</div>
            <div className="expand-icon">{isExpanded ? "▼" : "▶"}</div>
          </div>
          {isExpanded && (
            <div className="stock-details">
              <div className="not-available-message">
                <p>{currentData.message}</p>
                {market === "Nigerian" && timeframe !== "DAILY" && (
                  <p>Note: Nigerian stocks may have limited data for non-daily timeframes.</p>
                )}
                {market === "Crypto" && timeframe === "4HOUR" && (
                  <p>4-hour data availability depends on data source.</p>
                )}
              </div>
            </div>
          )}
        </div>
      )
    }

    return (
      <div key={symbol} className={`stock-card ${isLoadingData ? "loading-card" : ""}`}>
        <div className="stock-header" onClick={() => toggleStockDetails(symbol)}>
          <div className="stock-symbol">
            {assetIcon} {symbol}
            <span className={`data-source ${sourceBadge.class}`}>{sourceBadge.text}</span>
            <span className={`market-badge ${market.toLowerCase()}`}>{market}</span>
            {/* Show data source note if available */}
            {dataSource.includes("(") && (
              <span className="data-source-note" title={dataSource}>
                ℹ️
              </span>
            )}
          </div>
          <div className="stock-price">
            {isLoadingData ? (
              <div className="loading-placeholder">--</div>
            ) : (
              <>
                {market === "Crypto" ? "$" : market === "Nigerian" ? "₦" : "$"}
                {currentData.PRICE ? currentData.PRICE.toFixed(2) : "0.00"}
              </>
            )}
          </div>
          <div className={`stock-verdict ${getVerdictColor(currentData.VERDICT)}`}>
            {isLoadingData ? (
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            ) : (
              currentData.VERDICT
            )}
          </div>
          <div className="stock-accuracy">
            {isLoadingData ? <div className="loading-placeholder">--</div> : `Accuracy: ${currentData.ACCURACY || 0}%`}
          </div>
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
                disabled={aiLoading[symbol] || isLoadingData || isNotAvailable}
              >
                {aiLoading[symbol] ? "Generating AI Analysis..." : "🤖 Get AI Analysis (Groq)"}
              </button>
            </div>

            <div className="timeframe-indicators">
              <h4>Hierarchical Analysis</h4>
              <div className="timeframe-grid">
                {(["MONTHLY", "WEEKLY", "DAILY", "4HOUR"] as const).map((tf) => {
                  const tfData = stockData[`${tf}_TIMEFRAME`] || BLANK_STOCKDATA
                  const isLoadingTf = tfData.VERDICT === "Loading..."
                  const isTfNotAvailable = tfData.status === "Not Available" || tfData.VERDICT === "No Data"

                  return (
                    <div
                      key={tf}
                      className={`timeframe-indicator ${tf.toLowerCase()} ${isLoadingTf || isTfNotAvailable ? "loading" : ""}`}
                    >
                      <span className="tf-label">
                        {tf === "4HOUR" ? "4H" : tf.charAt(0) + tf.slice(1).toLowerCase()}
                      </span>
                      <span className={`tf-verdict ${getVerdictColor(tfData.VERDICT)}`}>
                        {isLoadingTf ? (
                          <div className="loading-dots small">
                            <span></span>
                            <span></span>
                            <span></span>
                          </div>
                        ) : isTfNotAvailable ? (
                          "NO DATA"
                        ) : (
                          tfData.VERDICT
                        )}
                      </span>
                      <span className="tf-confidence">
                        {isLoadingTf || isTfNotAvailable ? "--" : tfData.CONFIDENCE_SCORE || "--"}
                      </span>
                    </div>
                  )
                })}
              </div>
            </div>

            <div className="details-grid">
              {/* Price Data Section */}
              <div className="detail-section">
                <h4>Price Data</h4>
                <div className="detail-item">
                  <span>Current Price:</span>
                  <span>
                    {isLoadingData ? (
                      <div className="loading-placeholder">--</div>
                    ) : (
                      `${market === "Crypto" ? "$" : market === "Nigerian" ? "₦" : "$"}${(currentData.DETAILS?.price_data?.current_price || 0).toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="detail-item">
                  <span>Entry Price:</span>
                  <span>
                    {isLoadingData ? (
                      <div className="loading-placeholder">--</div>
                    ) : (
                      `${market === "Crypto" ? "$" : market === "Nigerian" ? "₦" : "$"}${(currentData.DETAILS?.price_data?.entry_price || 0).toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="detail-item">
                  <span>Stop Loss:</span>
                  <span>
                    {isLoadingData ? (
                      <div className="loading-placeholder">--</div>
                    ) : (
                      `${market === "Crypto" ? "$" : market === "Nigerian" ? "₦" : "$"}${(currentData.DETAILS?.price_data?.stop_loss || 0).toFixed(2)}`
                    )}
                  </span>
                </div>
                <div className="detail-item">
                  <span>Targets:</span>
                  <span>
                    {isLoadingData ? (
                      <div className="loading-placeholder">--</div>
                    ) : (
                      (currentData.DETAILS?.price_data?.target_prices || [0, 0])
                        .map((t) => `${market === "Crypto" ? "$" : market === "Nigerian" ? "₦" : "$"}${t.toFixed(2)}`)
                        .join(", ")
                    )}
                  </span>
                </div>
                <div className="detail-item">
                  <span>1D Change:</span>
                  <span
                    className={isLoadingData ? "" : getChangeColor(currentData.DETAILS?.price_data?.change_1d || 0)}
                  >
                    {isLoadingData ? (
                      <div className="loading-placeholder">--</div>
                    ) : (
                      <>
                        {(currentData.DETAILS?.price_data?.change_1d || 0) > 0 ? "+" : ""}
                        {(currentData.DETAILS?.price_data?.change_1d || 0).toFixed(2)}%
                      </>
                    )}
                  </span>
                </div>
                <div className="detail-item">
                  <span>1W Change:</span>
                  <span
                    className={isLoadingData ? "" : getChangeColor(currentData.DETAILS?.price_data?.change_1w || 0)}
                  >
                    {isLoadingData ? (
                      <div className="loading-placeholder">--</div>
                    ) : (
                      <>
                        {(currentData.DETAILS?.price_data?.change_1w || 0) > 0 ? "+" : ""}
                        {(currentData.DETAILS?.price_data?.change_1w || 0).toFixed(2)}%
                      </>
                    )}
                  </span>
                </div>
              </div>

              {/* Technical Indicators */}
              <div className="detail-section">
                <h4>Technical Indicators</h4>
                <div className="detail-item">
                  <span>RSI:</span>
                  <span>
                    {isLoadingData ? (
                      <div className="loading-placeholder">--</div>
                    ) : (
                      (currentData.DETAILS?.technical_indicators?.rsi ?? "--")
                    )}
                  </span>
                </div>
                <div className="detail-item">
                  <span>ADX:</span>
                  <span>
                    {isLoadingData ? (
                      <div className="loading-placeholder">--</div>
                    ) : (
                      (currentData.DETAILS?.technical_indicators?.adx ?? "--")
                    )}
                  </span>
                </div>
                <div className="detail-item">
                  <span>ATR:</span>
                  <span>
                    {isLoadingData ? (
                      <div className="loading-placeholder">--</div>
                    ) : (
                      (currentData.DETAILS?.technical_indicators?.atr ?? "--")
                    )}
                  </span>
                </div>
                <div className="detail-item">
                  <span>Cycle Phase:</span>
                  <span>
                    {isLoadingData ? (
                      <div className="loading-placeholder">--</div>
                    ) : (
                      (currentData.DETAILS?.technical_indicators?.cycle_phase ?? "--")
                    )}
                  </span>
                </div>
                <div className="detail-item">
                  <span>Cycle Momentum:</span>
                  <span>
                    {isLoadingData ? (
                      <div className="loading-placeholder">--</div>
                    ) : (
                      (currentData.DETAILS?.technical_indicators?.cycle_momentum ?? "--")
                    )}
                  </span>
                </div>
              </div>

              {/* Individual Verdicts */}
              <div className="detail-section">
                <h4>Individual Verdicts</h4>
                <div className="detail-item">
                  <span>RSI:</span>
                  <span>{currentData.DETAILS?.individual_verdicts?.rsi_verdict ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>ADX:</span>
                  <span>{currentData.DETAILS?.individual_verdicts?.adx_verdict ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Momentum:</span>
                  <span>{currentData.DETAILS?.individual_verdicts?.momentum_verdict ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Pattern:</span>
                  <span>{currentData.DETAILS?.individual_verdicts?.pattern_verdict ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Fundamental:</span>
                  <span>{currentData.DETAILS?.individual_verdicts?.fundamental_verdict ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Sentiment:</span>
                  <span>{currentData.DETAILS?.individual_verdicts?.sentiment_verdict ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Cycle:</span>
                  <span>{currentData.DETAILS?.individual_verdicts?.cycle_verdict ?? "--"}</span>
                </div>
                {currentData.DETAILS?.individual_verdicts?.hierarchy_override && (
                  <div className="detail-item">
                    <span>Hierarchy Override:</span>
                    <span>{currentData.DETAILS?.individual_verdicts?.hierarchy_override}</span>
                  </div>
                )}
              </div>

              {/* Fundamentals */}
              <div className="detail-section">
                <h4>Fundamentals</h4>
                {market === "Crypto" ? (
                  <>
                    <div className="detail-item">
                      <span>Market Cap Rank:</span>
                      <span>{currentData.DETAILS?.fundamentals?.Market_Cap_Rank ?? "--"}</span>
                    </div>
                    <div className="detail-item">
                      <span>Adoption Score:</span>
                      <span>{currentData.DETAILS?.fundamentals?.Adoption_Score ?? "--"}</span>
                    </div>
                    <div className="detail-item">
                      <span>Technology Score:</span>
                      <span>{currentData.DETAILS?.fundamentals?.Technology_Score ?? "--"}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="detail-item">
                      <span>P/E Ratio:</span>
                      <span>{currentData.DETAILS?.fundamentals?.PE_Ratio ?? "--"}</span>
                    </div>
                    <div className="detail-item">
                      <span>EPS:</span>
                      <span>{currentData.DETAILS?.fundamentals?.EPS ?? "--"}</span>
                    </div>
                    <div className="detail-item">
                      <span>Revenue Growth:</span>
                      <span>{currentData.DETAILS?.fundamentals?.revenue_growth ?? "--"}</span>
                    </div>
                    <div className="detail-item">
                      <span>Net Income Growth:</span>
                      <span>{currentData.DETAILS?.fundamentals?.net_income_growth ?? "--"}</span>
                    </div>
                  </>
                )}
              </div>

              {/* Sentiment Analysis */}
              <div className="detail-section">
                <h4>Sentiment Analysis</h4>
                <div className="detail-item">
                  <span>Score:</span>
                  <span>{currentData.DETAILS?.sentiment_analysis?.score ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Interpretation:</span>
                  <span>{currentData.DETAILS?.sentiment_analysis?.interpretation ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Market Mood:</span>
                  <span>{currentData.DETAILS?.sentiment_analysis?.market_mood ?? "--"}</span>
                </div>
              </div>

              {/* Cycle Analysis */}
              <div className="detail-section">
                <h4>Cycle Analysis</h4>
                <div className="detail-item">
                  <span>Current Phase:</span>
                  <span>{currentData.DETAILS?.cycle_analysis?.current_phase ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Stage:</span>
                  <span>{currentData.DETAILS?.cycle_analysis?.stage ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Duration (days):</span>
                  <span>{currentData.DETAILS?.cycle_analysis?.duration_days ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Momentum:</span>
                  <span>{currentData.DETAILS?.cycle_analysis?.momentum ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Momentum Visual:</span>
                  <span>{currentData.DETAILS?.cycle_analysis?.momentum_visual ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Bull Continuation %:</span>
                  <span>{currentData.DETAILS?.cycle_analysis?.bull_continuation_probability ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Bear Transition %:</span>
                  <span>{currentData.DETAILS?.cycle_analysis?.bear_transition_probability ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Expected Continuation:</span>
                  <span>{currentData.DETAILS?.cycle_analysis?.expected_continuation ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Risk Level:</span>
                  <span>{currentData.DETAILS?.cycle_analysis?.risk_level ?? "--"}</span>
                </div>
              </div>

              {/* Trading Parameters */}
              <div className="detail-section">
                <h4>Trading Parameters</h4>
                <div className="detail-item">
                  <span>Position Size:</span>
                  <span>{currentData.DETAILS?.trading_parameters?.position_size ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Timeframe:</span>
                  <span>{currentData.DETAILS?.trading_parameters?.timeframe ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Risk Level:</span>
                  <span>{currentData.DETAILS?.trading_parameters?.risk_level ?? "--"}</span>
                </div>
              </div>

              {/* Patterns */}
              <div className="detail-section">
                <h4>Patterns</h4>
                <div className="detail-item">
                  <span>Geometric:</span>
                  <span>
                    {(currentData.DETAILS?.patterns?.geometric || []).length > 0
                      ? currentData.DETAILS?.patterns?.geometric.join(", ")
                      : "--"}
                  </span>
                </div>
                <div className="detail-item">
                  <span>Elliott Wave:</span>
                  <span>
                    {(currentData.DETAILS?.patterns?.elliott_wave || []).length > 0
                      ? currentData.DETAILS?.patterns?.elliott_wave.join(", ")
                      : "--"}
                  </span>
                </div>
                <div className="detail-item">
                  <span>Confluence Factors:</span>
                  <span>
                    {(currentData.DETAILS?.patterns?.confluence_factors || []).length > 0
                      ? currentData.DETAILS?.patterns?.confluence_factors.join(", ")
                      : "--"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    )
  }

  const renderAiModal = () => {
    if (!showAiModal || !aiAnalysis || !aiAnalysis[showAiModal]) return null

    const analysis = aiAnalysis[showAiModal]

    return (
      <div className="ai-modal-overlay" onClick={() => setShowAiModal(null)}>
        <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
          <div className="ai-modal-header">
            <h2>🤖 AI Analysis for {analysis.symbol} (Groq)</h2>
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
                  <span>Provider: {analysis.ai_analysis.provider}</span>
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

  if (connectionStatus === "error" && !showAnalysisPage) {
    return (
      <div className="app">
        <div className="error-container">
          <h2>Connection Error</h2>
          <p>{error}</p>
          <p>API URL: {API_BASE_URL}</p>
          <div className="connection-status">
            Status: <span className="status-error">Disconnected</span>
          </div>
          <button onClick={testConnection} className="retry-button">
            🔄 Retry Connection
          </button>
        </div>
      </div>
    )
  }

  if (connectionStatus === "connecting" && !showAnalysisPage) {
    return (
      <div className="app">
        <div className="loading-container">
          <h2>Connecting to Analysis API...</h2>
          <div className="loading-spinner"></div>
          <p>Testing connection to {API_BASE_URL}</p>
        </div>
      </div>
    )
  }

  if (!showAnalysisPage && !hasInitialData) {
    return (
      <div className="app">
        <div className="no-data-container">
          <h2>Multi-Asset Analysis Dashboard v8.5</h2>
          <p>Analyze 120 popular assets from US, Nigerian, and Crypto markets</p>
          <div className="connection-status">
            Status:{" "}
            <span className={`status-${connectionStatus}`}>
              {connectionStatus === "connected" ? "✅ Connected" : "🔄 Connecting..."}
            </span>
          </div>
          <div className="features-list">
            <p>🚀 Features: yfinance for US/Crypto + TradingView Scraper for Nigerian + Multiple Fallbacks</p>
            <p>⚡ Optimized: Smart data source selection for each market</p>
            <p>📊 US Stocks: 50 | Nigerian Stocks: 45 | Crypto: 25</p>
            <p>🤖 AI Analysis: Available with Groq (Llama3-8B)</p>
            <p>🕐 Auto-refresh: Daily at 5:00 PM</p>
            <p>📡 Data Sources: yfinance (Primary), TradingView Scraper (Nigerian), Multiple Fallbacks</p>
            <p>🇳🇬 Nigerian Stocks: Multiple data sources with smart fallbacks</p>
          </div>
          <div className="action-buttons">
            <button
              onClick={() => fetchData(false)}
              className="primary-button"
              disabled={connectionStatus !== "connected"}
            >
              📊 Go to Analysis
            </button>
            <button
              onClick={() => fetchData(true)}
              className="secondary-button"
              disabled={connectionStatus !== "connected"}
            >
              🔄 Start Fresh Analysis
            </button>
          </div>
          <p className="note">
            "Go to Analysis" loads cached data instantly.
            <br />
            "Start Fresh Analysis" runs new analysis (~12 minutes for 120 assets).
            <br />
            <strong>NEW in v8.5:</strong> yfinance for US stocks and crypto, TradingView Scraper for Nigerian stocks!
            <br />
            <strong>Enhanced:</strong> Multiple Nigerian data sources with smart fallbacks for reliability.
          </p>
        </div>
      </div>
    )
  }

  // Always group all stocks, even if not in data
  const groupStocksByMarket = () => {
    const grouped = {
      US: [...US_STOCKS],
      Nigerian: [...NIGERIAN_STOCKS],
      Crypto: [...CRYPTO_STOCKS],
    }
    return grouped
  }

  const groupedStocks = groupStocksByMarket()

  return (
    <div className="app">
      <header className="app-header">
        <h1>Multi-Asset Analysis Dashboard v8.5</h1>
        <div className="header-info">
          <span>Last Updated: {data?.timestamp || "N/A"}</span>
          <span>
            Assets Analyzed: {data?.stocks_analyzed || 0}/{data?.total_requested || 120}
          </span>
          {data?.processing_time_minutes && <span>Processing Time: {data.processing_time_minutes.toFixed(2)}min</span>}
          {data?.markets && (
            <>
              <span>US: {data.markets.us_stocks}</span>
              <span>Nigerian: {data.markets.nigerian_stocks}</span>
              <span>Crypto: {data.markets.crypto_assets}</span>
            </>
          )}
          {/* UPDATED: Display new data source counts */}
          {data?.data_sources && (
            <>
              <span>yfinance: {data.data_sources.yfinance_count}</span>
              <span>TradingView Scraper: {data.data_sources.tradingview_scraper_count}</span>
              <span>TwelveData: {data.data_sources.twelve_data_count}</span>
              <span>CryptoCompare: {data.data_sources.cryptcompare_count}</span>
              {data.data_sources.alpha_vantage_count && data.data_sources.alpha_vantage_count > 0 && (
                <span>Alpha Vantage: {data.data_sources.alpha_vantage_count}</span>
              )}
              {data.data_sources.realistic_nse_data_count && data.data_sources.realistic_nse_data_count > 0 && (
                <span>Realistic NSE: {data.data_sources.realistic_nse_data_count}</span>
              )}
            </>
          )}
          <span className={`status ${data?.status}`}>Status: {data?.status || "loading"}</span>
          {data?.processing_info?.ai_analysis_available && (
            <span className="ai-available">
              🤖 AI Analysis Available ({data.processing_info.ai_provider || "Groq"})
            </span>
          )}
          {data?.data_source === "database_cache" && <span className="cache-indicator">📦 Cached Data (24hr)</span>}
          {isAnalyzing && <span className="analyzing-indicator">🔄 Analyzing...</span>}
          <span className={`connection-status status-${connectionStatus}`}>
            {connectionStatus === "connected"
              ? "🟢 Connected"
              : connectionStatus === "connecting"
                ? "🟡 Connecting"
                : "🔴 Disconnected"}
          </span>
        </div>
        {data?.note && (
          <div className="data-note">
            <p>{data.note}</p>
          </div>
        )}
        {data?.processing_info?.expanded_coverage && (
          <div className="expanded-coverage-note">
            <p>📈 {data.processing_info.expanded_coverage}</p>
          </div>
        )}
        {data?.processing_info?.data_source_strategy && (
          <div className="data-source-strategy-note">
            <p>📡 {data.processing_info.data_source_strategy}</p>
          </div>
        )}
      </header>

      {renderProgressBar()}

      <div className="controls">
        <div className="timeframe-toggle">
          {(["MONTHLY", "WEEKLY", "DAILY", "4HOUR"] as const).map((tf) => (
            <button
              key={tf}
              className={timeframe === tf ? "active" : ""}
              onClick={() => setTimeframe(tf)}
              title={tf !== "DAILY" ? "Some assets may have limited or no data for this timeframe" : undefined}
            >
              {tf === "4HOUR" ? "4H" : tf.charAt(0) + tf.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        <div className="action-buttons">
          <button
            onClick={() => fetchData(false)}
            className="cache-button"
            disabled={isAnalyzing || connectionStatus !== "connected"}
          >
            📦 Load Cached
          </button>
          <button
            onClick={() => fetchData(true)}
            className="refresh-button"
            disabled={isAnalyzing || connectionStatus !== "connected"}
          >
            🔄 Fresh Analysis
          </button>
        </div>
      </div>

      <div className="markets-container">
        <div className="market-section">
          <div className="market-header">
            <h2>🇺🇸 US Stocks ({groupedStocks.US.length})</h2>
            <div className="market-stats">
              <span>Data Source: yfinance (Primary) → TwelveData (Fallback)</span>
              <span>Market: NASDAQ, NYSE</span>
              <span>All timeframes available</span>
            </div>
          </div>
          <div className="stocks-container">
            {groupedStocks.US.map((symbol) => renderStockCard(symbol, data ? data[symbol] : undefined))}
          </div>
        </div>

        <div className="market-section">
          <div className="market-header">
            <h2>🇳🇬 Nigerian Stocks ({groupedStocks.Nigerian.length})</h2>
            <div className="market-stats">
              <span>Data Source: TradingView Scraper → Alpha Vantage → Multiple Fallbacks</span>
              <span>Market: Nigerian Stock Exchange (NSE)</span>
              <span className="timeframe-note">Note: Multiple data sources with smart fallbacks</span>
              <span className="expanded-note">✨ ENHANCED: 45 Nigerian stocks with multiple data sources!</span>
            </div>
          </div>
          <div className="stocks-container">
            {groupedStocks.Nigerian.map((symbol) => renderStockCard(symbol, data ? data[symbol] : undefined))}
          </div>
        </div>

        <div className="market-section">
          <div className="market-header">
            <h2>₿ Cryptocurrency ({groupedStocks.Crypto.length})</h2>
            <div className="market-stats">
              <span>Data Source: yfinance (Primary) → TwelveData → CryptoCompare (Fallbacks)</span>
              <span>Market: Global Crypto Markets</span>
              <span className="timeframe-note">Note: 4H data availability varies by source</span>
            </div>
          </div>
          <div className="stocks-container">
            {groupedStocks.Crypto.map((symbol) => renderStockCard(symbol, data ? data[symbol] : undefined))}
          </div>
        </div>
      </div>

      {renderAiModal()}
    </div>
  )
}

export default App
