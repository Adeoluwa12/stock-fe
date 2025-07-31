// // // "use client"

// // // import type React from "react"
// // // import { useState, useEffect, useCallback } from "react"
// // // import "./App.css"

// // // // Update this to your actual Render URL
// // // const API_BASE_URL = "http://localhost:5000"
// // // // const API_BASE_URL = "https://stock-be-j9p2.onrender.com"

// // // interface StockData {
// // //   PRICE: number
// // //   ACCURACY: number
// // //   CONFIDENCE_SCORE: number
// // //   VERDICT: string
// // //   DETAILS: {
// // //     individual_verdicts: {
// // //       rsi_verdict: string
// // //       adx_verdict: string
// // //       momentum_verdict: string
// // //       pattern_verdict: string
// // //       fundamental_verdict: string
// // //       sentiment_verdict: string
// // //       cycle_verdict: string
// // //       hierarchy_override?: string
// // //     }
// // //     price_data: {
// // //       current_price: number
// // //       entry_price: number
// // //       target_prices: number[]
// // //       stop_loss: number
// // //       change_1d: number
// // //       change_1w: number
// // //     }
// // //     technical_indicators: {
// // //       rsi: number
// // //       adx: number
// // //       atr: number
// // //       cycle_phase: string
// // //       cycle_momentum: number
// // //     }
// // //     patterns: {
// // //       geometric: string[]
// // //       elliott_wave: string[]
// // //       confluence_factors: string[]
// // //     }
// // //     fundamentals: {
// // //       PE_Ratio?: number
// // //       eps?: number
// // //       revenue_growth?: number
// // //       net_income_growth?: number
// // //       Market_Cap_Rank?: number
// // //       Adoption_Score?: number
// // //       Technology_Score?: number
// // //     }
// // //     sentiment_analysis: {
// // //       score: number
// // //       interpretation: string
// // //       market_mood: string
// // //     }
// // //     cycle_analysis: {
// // //       current_phase: string
// // //       stage: string
// // //       duration_days: number
// // //       momentum: number
// // //       momentum_visual: string
// // //       bull_continuation_probability: number
// // //       bear_transition_probability: number
// // //       expected_continuation: string
// // //       risk_level: string
// // //     }
// // //     trading_parameters: {
// // //       position_size: string
// // //       timeframe: string
// // //       risk_level: string
// // //     }
// // //   }
// // // }

// // // interface ApiResponse {
// // //   timestamp: string
// // //   stocks_analyzed: number
// // //   status: string
// // //   data_source?: string
// // //   note?: string
// // //   processing_time_minutes?: number
// // //   data_sources?: {
// // //     twelve_data_count: number
// // //     alpha_vantage_count: number
// // //     coingecko_count: number
// // //   }
// // //   markets?: {
// // //     us_stocks: number
// // //     nigerian_stocks: number
// // //     crypto_assets: number
// // //   }
// // //   processing_info?: {
// // //     hierarchical_analysis: boolean
// // //     timeframes_analyzed: string[]
// // //     ai_analysis_available: boolean
// // //     background_processing: boolean
// // //     daily_auto_refresh: string
// // //   }
// // //   [key: string]: any
// // // }

// // // interface AIAnalysisResponse {
// // //   symbol: string
// // //   ai_analysis: {
// // //     analysis: string
// // //     timestamp: string
// // //     model: string
// // //     symbol: string
// // //     error?: string
// // //     message?: string
// // //   }
// // //   technical_analysis: any
// // //   timestamp: string
// // // }

// // // interface ProgressInfo {
// // //   current: number
// // //   total: number
// // //   percentage: number
// // //   currentSymbol: string
// // //   stage: string
// // //   estimatedTimeRemaining: number
// // // }

// // // const App: React.FC = () => {
// // //   const [data, setData] = useState<ApiResponse | null>(null)
// // //   const [loading, setLoading] = useState<boolean>(false)
// // //   const [error, setError] = useState<string | null>(null)
// // //   const [timeframe, setTimeframe] = useState<"MONTHLY" | "WEEKLY" | "DAILY" | "4HOUR">("DAILY")
// // //   const [expandedStocks, setExpandedStocks] = useState<Set<string>>(new Set())
// // //   const [aiAnalysis, setAiAnalysis] = useState<{ [key: string]: AIAnalysisResponse } | null>(null)
// // //   const [aiLoading, setAiLoading] = useState<{ [key: string]: boolean }>({})
// // //   const [showAiModal, setShowAiModal] = useState<string | null>(null)
// // //   const [hasInitialData, setHasInitialData] = useState<boolean>(false)
// // //   const [showAnalysisPage, setShowAnalysisPage] = useState<boolean>(false)
// // //   const [progress, setProgress] = useState<ProgressInfo>({
// // //     current: 0,
// // //     total: 35, // Updated from 85 to 35
// // //     percentage: 0,
// // //     currentSymbol: "",
// // //     stage: "Initializing...",
// // //     estimatedTimeRemaining: 0,
// // //   })
// // //   const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)

// // //   // Generate placeholder data for loading state
// // //   const generatePlaceholderData = useCallback((): ApiResponse => {
// // //     const placeholderStocks: { [key: string]: any } = {}

// // //     // US Stocks (10) - Top performers and blue chips
// // //     const usStocks = ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN", "NVDA", "META", "NFLX", "JPM", "V"]

// // //     // Nigerian Stocks (15) - Most popular and liquid
// // //     const nigerianStocks = [
// // //       "ACCESS.NG",
// // //       "GTCO.NG",
// // //       "UBA.NG",
// // //       "ZENITHBANK.NG",
// // //       "FBNH.NG",
// // //       "DANGCEM.NG",
// // //       "BUACEMENT.NG",
// // //       "WAPCO.NG",
// // //       "DANGSUGAR.NG",
// // //       "NESTLE.NG",
// // //       "UNILEVER.NG",
// // //       "SEPLAT.NG",
// // //       "TOTAL.NG",
// // //       "MTNN.NG",
// // //       "TRANSCORP.NG",
// // //     ]

// // //     // Crypto (10) - Top market cap cryptos
// // //     const cryptoStocks = [
// // //       "bitcoin",
// // //       "ethereum",
// // //       "binancecoin",
// // //       "solana",
// // //       "cardano",
// // //       "avalanche-2",
// // //       "polkadot",
// // //       "chainlink",
// // //       "polygon",
// // //       "litecoin",
// // //     ]

// // //     const allSymbols = [...usStocks, ...nigerianStocks, ...cryptoStocks]

// // //     allSymbols.forEach((symbol) => {
// // //       const market = symbol.endsWith(".NG") ? "Nigerian" : cryptoStocks.includes(symbol) ? "Crypto" : "US"
// // //       const dataSource = cryptoStocks.includes(symbol) ? "coingecko" : "twelve_data"

// // //       placeholderStocks[symbol] = {
// // //         data_source: dataSource,
// // //         market: market,
// // //         DAILY_TIMEFRAME: {
// // //           PRICE: 0,
// // //           ACCURACY: 0,
// // //           CONFIDENCE_SCORE: 0,
// // //           VERDICT: "Loading...",
// // //           DETAILS: {
// // //             individual_verdicts: {
// // //               rsi_verdict: "Loading...",
// // //               adx_verdict: "Loading...",
// // //               momentum_verdict: "Loading...",
// // //               pattern_verdict: "Loading...",
// // //               fundamental_verdict: "Loading...",
// // //               sentiment_verdict: "Loading...",
// // //               cycle_verdict: "Loading...",
// // //             },
// // //             price_data: {
// // //               current_price: 0,
// // //               entry_price: 0,
// // //               target_prices: [0, 0],
// // //               stop_loss: 0,
// // //               change_1d: 0,
// // //               change_1w: 0,
// // //             },
// // //             technical_indicators: {
// // //               rsi: 0,
// // //               adx: 0,
// // //               atr: 0,
// // //               cycle_phase: "Loading...",
// // //               cycle_momentum: 0,
// // //             },
// // //             patterns: {
// // //               geometric: ["Loading..."],
// // //               elliott_wave: ["Loading..."],
// // //               confluence_factors: ["Loading..."],
// // //             },
// // //             fundamentals:
// // //               market === "Crypto"
// // //                 ? {
// // //                     Market_Cap_Rank: 0,
// // //                     Adoption_Score: 0,
// // //                     Technology_Score: 0,
// // //                   }
// // //                 : {
// // //                     PE_Ratio: 0,
// // //                     eps: 0,
// // //                     revenue_growth: 0,
// // //                     net_income_growth: 0,
// // //                   },
// // //             sentiment_analysis: {
// // //               score: 0,
// // //               interpretation: "Loading...",
// // //               market_mood: "Loading...",
// // //             },
// // //             cycle_analysis: {
// // //               current_phase: "Loading...",
// // //               stage: "Loading...",
// // //               duration_days: 0,
// // //               momentum: 0,
// // //               momentum_visual: "Loading...",
// // //               bull_continuation_probability: 0,
// // //               bear_transition_probability: 0,
// // //               expected_continuation: "Loading...",
// // //               risk_level: "Loading...",
// // //             },
// // //             trading_parameters: {
// // //               position_size: "Loading...",
// // //               timeframe: "Loading...",
// // //               risk_level: "Loading...",
// // //             },
// // //           },
// // //         },
// // //         WEEKLY_TIMEFRAME: {
// // //           PRICE: 0,
// // //           ACCURACY: 0,
// // //           CONFIDENCE_SCORE: 0,
// // //           VERDICT: "Loading...",
// // //           DETAILS: {
// // //             individual_verdicts: {
// // //               rsi_verdict: "Loading...",
// // //               adx_verdict: "Loading...",
// // //               momentum_verdict: "Loading...",
// // //               pattern_verdict: "Loading...",
// // //               fundamental_verdict: "Loading...",
// // //               sentiment_verdict: "Loading...",
// // //               cycle_verdict: "Loading...",
// // //             },
// // //             price_data: {
// // //               current_price: 0,
// // //               entry_price: 0,
// // //               target_prices: [0, 0],
// // //               stop_loss: 0,
// // //               change_1d: 0,
// // //               change_1w: 0,
// // //             },
// // //             technical_indicators: {
// // //               rsi: 0,
// // //               adx: 0,
// // //               atr: 0,
// // //               cycle_phase: "Loading...",
// // //               cycle_momentum: 0,
// // //             },
// // //             patterns: {
// // //               geometric: ["Loading..."],
// // //               elliott_wave: ["Loading..."],
// // //               confluence_factors: ["Loading..."],
// // //             },
// // //             fundamentals:
// // //               market === "Crypto"
// // //                 ? {
// // //                     Market_Cap_Rank: 0,
// // //                     Adoption_Score: 0,
// // //                     Technology_Score: 0,
// // //                   }
// // //                 : {
// // //                     PE_Ratio: 0,
// // //                     eps: 0,
// // //                     revenue_growth: 0,
// // //                     net_income_growth: 0,
// // //                   },
// // //             sentiment_analysis: {
// // //               score: 0,
// // //               interpretation: "Loading...",
// // //               market_mood: "Loading...",
// // //             },
// // //             cycle_analysis: {
// // //               current_phase: "Loading...",
// // //               stage: "Loading...",
// // //               duration_days: 0,
// // //               momentum: 0,
// // //               momentum_visual: "Loading...",
// // //               bull_continuation_probability: 0,
// // //               bear_transition_probability: 0,
// // //               expected_continuation: "Loading...",
// // //               risk_level: "Loading...",
// // //             },
// // //             trading_parameters: {
// // //               position_size: "Loading...",
// // //               timeframe: "Loading...",
// // //               risk_level: "Loading...",
// // //             },
// // //           },
// // //         },
// // //         MONTHLY_TIMEFRAME: {
// // //           PRICE: 0,
// // //           ACCURACY: 0,
// // //           CONFIDENCE_SCORE: 0,
// // //           VERDICT: "Loading...",
// // //           DETAILS: {
// // //             individual_verdicts: {
// // //               rsi_verdict: "Loading...",
// // //               adx_verdict: "Loading...",
// // //               momentum_verdict: "Loading...",
// // //               pattern_verdict: "Loading...",
// // //               fundamental_verdict: "Loading...",
// // //               sentiment_verdict: "Loading...",
// // //               cycle_verdict: "Loading...",
// // //             },
// // //             price_data: {
// // //               current_price: 0,
// // //               entry_price: 0,
// // //               target_prices: [0, 0],
// // //               stop_loss: 0,
// // //               change_1d: 0,
// // //               change_1w: 0,
// // //             },
// // //             technical_indicators: {
// // //               rsi: 0,
// // //               adx: 0,
// // //               atr: 0,
// // //               cycle_phase: "Loading...",
// // //               cycle_momentum: 0,
// // //             },
// // //             patterns: {
// // //               geometric: ["Loading..."],
// // //               elliott_wave: ["Loading..."],
// // //               confluence_factors: ["Loading..."],
// // //             },
// // //             fundamentals:
// // //               market === "Crypto"
// // //                 ? {
// // //                     Market_Cap_Rank: 0,
// // //                     Adoption_Score: 0,
// // //                     Technology_Score: 0,
// // //                   }
// // //                 : {
// // //                     PE_Ratio: 0,
// // //                     eps: 0,
// // //                     revenue_growth: 0,
// // //                     net_income_growth: 0,
// // //                   },
// // //             sentiment_analysis: {
// // //               score: 0,
// // //               interpretation: "Loading...",
// // //               market_mood: "Loading...",
// // //             },
// // //             cycle_analysis: {
// // //               current_phase: "Loading...",
// // //               stage: "Loading...",
// // //               duration_days: 0,
// // //               momentum: 0,
// // //               momentum_visual: "Loading...",
// // //               bull_continuation_probability: 0,
// // //               bear_transition_probability: 0,
// // //               expected_continuation: "Loading...",
// // //               risk_level: "Loading...",
// // //             },
// // //             trading_parameters: {
// // //               position_size: "Loading...",
// // //               timeframe: "Loading...",
// // //               risk_level: "Loading...",
// // //             },
// // //           },
// // //         },
// // //         "4HOUR_TIMEFRAME": {
// // //           PRICE: 0,
// // //           ACCURACY: 0,
// // //           CONFIDENCE_SCORE: 0,
// // //           VERDICT: "Loading...",
// // //           DETAILS: {
// // //             individual_verdicts: {
// // //               rsi_verdict: "Loading...",
// // //               adx_verdict: "Loading...",
// // //               momentum_verdict: "Loading...",
// // //               pattern_verdict: "Loading...",
// // //               fundamental_verdict: "Loading...",
// // //               sentiment_verdict: "Loading...",
// // //               cycle_verdict: "Loading...",
// // //             },
// // //             price_data: {
// // //               current_price: 0,
// // //               entry_price: 0,
// // //               target_prices: [0, 0],
// // //               stop_loss: 0,
// // //               change_1d: 0,
// // //               change_1w: 0,
// // //             },
// // //             technical_indicators: {
// // //               rsi: 0,
// // //               adx: 0,
// // //               atr: 0,
// // //               cycle_phase: "Loading...",
// // //               cycle_momentum: 0,
// // //             },
// // //             patterns: {
// // //               geometric: ["Loading..."],
// // //               elliott_wave: ["Loading..."],
// // //               confluence_factors: ["Loading..."],
// // //             },
// // //             fundamentals:
// // //               market === "Crypto"
// // //                 ? {
// // //                     Market_Cap_Rank: 0,
// // //                     Adoption_Score: 0,
// // //                     Technology_Score: 0,
// // //                   }
// // //                 : {
// // //                     PE_Ratio: 0,
// // //                     eps: 0,
// // //                     revenue_growth: 0,
// // //                     net_income_growth: 0,
// // //                   },
// // //             sentiment_analysis: {
// // //               score: 0,
// // //               interpretation: "Loading...",
// // //               market_mood: "Loading...",
// // //             },
// // //             cycle_analysis: {
// // //               current_phase: "Loading...",
// // //               stage: "Loading...",
// // //               duration_days: 0,
// // //               momentum: 0,
// // //               momentum_visual: "Loading...",
// // //               bull_continuation_probability: 0,
// // //               bear_transition_probability: 0,
// // //               expected_continuation: "Loading...",
// // //               risk_level: "Loading...",
// // //             },
// // //             trading_parameters: {
// // //               position_size: "Loading...",
// // //               timeframe: "Loading...",
// // //               risk_level: "Loading...",
// // //             },
// // //           },
// // //         },
// // //       }
// // //     })

// // //     return {
// // //       timestamp: new Date().toISOString(),
// // //       stocks_analyzed: 0,
// // //       status: "loading",
// // //       data_source: "loading",
// // //       markets: {
// // //         us_stocks: usStocks.length,
// // //         nigerian_stocks: nigerianStocks.length,
// // //         crypto_assets: cryptoStocks.length,
// // //       },
// // //       data_sources: {
// // //         twelve_data_count: 0,
// // //         alpha_vantage_count: 0,
// // //         coingecko_count: 0,
// // //       },
// // //       processing_info: {
// // //         hierarchical_analysis: true,
// // //         timeframes_analyzed: ["monthly", "weekly", "daily", "4hour"],
// // //         ai_analysis_available: true,
// // //         background_processing: true,
// // //         daily_auto_refresh: "5:00 PM",
// // //       },
// // //       ...placeholderStocks,
// // //     }
// // //   }, [])

// // //   // Poll for progress updates
// // //   const pollProgress = useCallback(async () => {
// // //     try {
// // //       const response = await fetch(`${API_BASE_URL}/progress`)
// // //       if (response.ok) {
// // //         const progressData = await response.json()
// // //         setProgress(progressData)

// // //         // If analysis is complete, fetch the final data
// // //         if (progressData.percentage >= 100) {
// // //           setIsAnalyzing(false)
// // //           await fetchFinalData()
// // //         }
// // //       }
// // //     } catch (err) {
// // //       console.error("Error polling progress:", err)
// // //     }
// // //   }, [])

// // //   // Fetch final data after analysis completion
// // //   const fetchFinalData = async () => {
// // //     try {
// // //       const response = await fetch(`${API_BASE_URL}/analyze`, {
// // //         method: "GET",
// // //         headers: {
// // //           Accept: "application/json",
// // //         },
// // //       })

// // //       if (response.ok) {
// // //         const result = await response.json()
// // //         setData(result)
// // //         setLoading(false)
// // //       }
// // //     } catch (err) {
// // //       console.error("Error fetching final data:", err)
// // //       setError("Failed to fetch final analysis data")
// // //       setLoading(false)
// // //     }
// // //   }

// // //   // Start analysis and show loading page immediately
// // //   const startAnalysis = async (fresh = false) => {
// // //     setShowAnalysisPage(true)
// // //     setIsAnalyzing(true)
// // //     setLoading(true)
// // //     setError(null)

// // //     // Show placeholder data immediately
// // //     const placeholderData = generatePlaceholderData()
// // //     setData(placeholderData)
// // //     setHasInitialData(true)

// // //     // Reset progress
// // //     setProgress({
// // //       current: 0,
// // //       total: 35,
// // //       percentage: 0,
// // //       currentSymbol: "Initializing...",
// // //       stage: "Starting analysis...",
// // //       estimatedTimeRemaining: 600, // 10 minutes estimate
// // //     })

// // //     try {
// // //       const endpoint = fresh ? "/analyze/fresh" : "/analyze"
// // //       const apiUrl = `${API_BASE_URL}${endpoint}`

// // //       // Start the analysis (non-blocking)
// // //       fetch(apiUrl, {
// // //         method: "GET",
// // //         headers: {
// // //           Accept: "application/json",
// // //         },
// // //       })
// // //         .then(async (response) => {
// // //           if (response.ok) {
// // //             const result = await response.json()
// // //             setData(result)
// // //             setIsAnalyzing(false)
// // //             setLoading(false)
// // //           } else {
// // //             throw new Error(`HTTP ${response.status}`)
// // //           }
// // //         })
// // //         .catch((err) => {
// // //           console.error("Analysis error:", err)
// // //           setError(err.message || "Analysis failed")
// // //           setIsAnalyzing(false)
// // //           setLoading(false)
// // //         })

// // //       // Start polling for progress
// // //       const progressInterval = setInterval(() => {
// // //         if (!isAnalyzing) {
// // //           clearInterval(progressInterval)
// // //           return
// // //         }
// // //         pollProgress()
// // //       }, 2000) // Poll every 2 seconds
// // //     } catch (err) {
// // //       console.error("Error starting analysis:", err)
// // //       setError(err instanceof Error ? err.message : "An error occurred")
// // //       setIsAnalyzing(false)
// // //       setLoading(false)
// // //     }
// // //   }

// // //   const fetchData = async (fresh = false) => {
// // //     if (isAnalyzing) {
// // //       // If already analyzing, just show the analysis page
// // //       setShowAnalysisPage(true)
// // //       return
// // //     }

// // //     // Start new analysis
// // //     await startAnalysis(fresh)
// // //   }

// // //   const fetchAiAnalysis = async (symbol: string) => {
// // //     setAiLoading((prev) => ({ ...prev, [symbol]: true }))
// // //     try {
// // //       const apiUrl = `${API_BASE_URL}/ai-analysis`
// // //       const response = await fetch(apiUrl, {
// // //         method: "POST",
// // //         headers: {
// // //           "Content-Type": "application/json",
// // //           Accept: "application/json",
// // //         },
// // //         body: JSON.stringify({ symbol }),
// // //       })

// // //       if (!response.ok) {
// // //         const errorText = await response.text()
// // //         throw new Error(`HTTP ${response.status}: ${errorText}`)
// // //       }

// // //       const result: AIAnalysisResponse = await response.json()
// // //       setAiAnalysis((prev) => ({ ...prev, [symbol]: result }))
// // //       setShowAiModal(symbol)
// // //     } catch (err) {
// // //       console.error("AI Analysis error:", err)
// // //       setError(err instanceof Error ? err.message : "Failed to get AI analysis")
// // //     } finally {
// // //       setAiLoading((prev) => ({ ...prev, [symbol]: false }))
// // //     }
// // //   }

// // //   // Test API connection and load initial data
// // //   const testConnection = async () => {
// // //     try {
// // //       console.log("Testing API connection...")
// // //       const response = await fetch(`${API_BASE_URL}/health`)
// // //       const result = await response.json()
// // //       console.log("Health check result:", result)

// // //       // If healthy and has cached data, load it automatically
// // //       if (result.data_status?.has_cached_data) {
// // //         console.log("Found cached data, loading automatically...")
// // //         await fetchData(false) // Load cached data
// // //       }
// // //     } catch (err) {
// // //       console.error("Health check failed:", err)
// // //     }
// // //   }

// // //   useEffect(() => {
// // //     testConnection()
// // //   }, [])

// // //   const toggleStockDetails = (symbol: string) => {
// // //     const newExpanded = new Set(expandedStocks)
// // //     if (newExpanded.has(symbol)) {
// // //       newExpanded.delete(symbol)
// // //     } else {
// // //       newExpanded.add(symbol)
// // //     }
// // //     setExpandedStocks(newExpanded)
// // //   }

// // //   const getVerdictColor = (verdict: string) => {
// // //     if (verdict === "Loading...") return "verdict-loading"

// // //     switch (verdict.toLowerCase()) {
// // //       case "strong buy":
// // //         return "verdict-strong-buy"
// // //       case "buy":
// // //         return "verdict-buy"
// // //       case "strong sell":
// // //         return "verdict-strong-sell"
// // //       case "sell":
// // //         return "verdict-sell"
// // //       default:
// // //         return "verdict-neutral"
// // //     }
// // //   }

// // //   const getChangeColor = (change: number) => {
// // //     if (change > 0) return "change-positive"
// // //     if (change < 0) return "change-negative"
// // //     return "change-neutral"
// // //   }

// // //   const getAssetTypeIcon = (symbol: string, market: string) => {
// // //     if (market === "Crypto") return "₿"
// // //     if (symbol.endsWith(".NG")) return "🇳🇬"
// // //     return "🇺🇸"
// // //   }

// // //   const getDataSourceBadge = (dataSource: string) => {
// // //     switch (dataSource) {
// // //       case "twelve_data":
// // //         return { text: "12D", class: "twelve-data" }
// // //       case "alpha_vantage":
// // //         return { text: "AV", class: "alpha-vantage" }
// // //       case "coingecko":
// // //         return { text: "CG", class: "coingecko" }
// // //       case "database_cache":
// // //         return { text: "CACHE", class: "cache" }
// // //       case "loading":
// // //         return { text: "...", class: "loading" }
// // //       default:
// // //         return { text: "UNK", class: "unknown" }
// // //     }
// // //   }

// // //   const renderProgressBar = () => {
// // //     if (!isAnalyzing && !loading) return null

// // //     return (
// // //       <div className="progress-container">
// // //         <div className="progress-header">
// // //           <h3>Analysis in Progress</h3>
// // //           <div className="progress-stats">
// // //             <span>
// // //               {progress.current} / {progress.total} assets analyzed
// // //             </span>
// // //             <span className="progress-percentage">{progress.percentage.toFixed(1)}%</span>
// // //           </div>
// // //         </div>

// // //         <div className="progress-bar">
// // //           <div className="progress-fill" style={{ width: `${progress.percentage}%` }} />
// // //         </div>

// // //         <div className="progress-details">
// // //           <div className="current-stage">{progress.stage}</div>
// // //           {progress.currentSymbol && <div className="current-symbol">Analyzing: {progress.currentSymbol}</div>}
// // //           {progress.estimatedTimeRemaining > 0 && (
// // //             <div className="time-remaining">
// // //               Est. time remaining: {Math.ceil(progress.estimatedTimeRemaining / 60)} minutes
// // //             </div>
// // //           )}
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   const renderStockCard = (symbol: string, stockData: any) => {
// // //     const timeframeKey = `${timeframe}_TIMEFRAME`
// // //     const currentData: StockData = stockData[timeframeKey]
// // //     if (!currentData) return null

// // //     const isExpanded = expandedStocks.has(symbol)
// // //     const dataSource = stockData.data_source || "unknown"
// // //     const market = stockData.market || "Unknown"
// // //     const assetIcon = getAssetTypeIcon(symbol, market)
// // //     const sourceBadge = getDataSourceBadge(dataSource)
// // //     const isLoadingData = dataSource === "loading" || currentData.VERDICT === "Loading..."

// // //     return (
// // //       <div key={symbol} className={`stock-card ${isLoadingData ? "loading-card" : ""}`}>
// // //         <div className="stock-header" onClick={() => toggleStockDetails(symbol)}>
// // //           <div className="stock-symbol">
// // //             {assetIcon} {symbol}
// // //             <span className={`data-source ${sourceBadge.class}`}>{sourceBadge.text}</span>
// // //             <span className={`market-badge ${market.toLowerCase()}`}>{market}</span>
// // //           </div>
// // //           <div className="stock-price">
// // //             {isLoadingData ? (
// // //               <div className="loading-placeholder">--</div>
// // //             ) : (
// // //               <>
// // //                 {market === "Crypto" ? "$" : "$"}
// // //                 {currentData.PRICE}
// // //               </>
// // //             )}
// // //           </div>
// // //           <div className={`stock-verdict ${getVerdictColor(currentData.VERDICT)}`}>
// // //             {isLoadingData ? (
// // //               <div className="loading-dots">
// // //                 <span></span>
// // //                 <span></span>
// // //                 <span></span>
// // //               </div>
// // //             ) : (
// // //               currentData.VERDICT
// // //             )}
// // //           </div>
// // //           <div className="stock-accuracy">
// // //             {isLoadingData ? <div className="loading-placeholder">--</div> : `Accuracy: ${currentData.ACCURACY}%`}
// // //           </div>
// // //           <div className="expand-icon">{isExpanded ? "▼" : "▶"}</div>
// // //         </div>

// // //         {isExpanded && (
// // //           <div className="stock-details">
// // //             <div className="ai-analysis-section">
// // //               <button
// // //                 className="ai-analysis-button"
// // //                 onClick={(e) => {
// // //                   e.stopPropagation()
// // //                   fetchAiAnalysis(symbol)
// // //                 }}
// // //                 disabled={aiLoading[symbol] || isLoadingData}
// // //               >
// // //                 {aiLoading[symbol] ? "Generating AI Analysis..." : "🤖 Get AI Analysis"}
// // //               </button>
// // //             </div>

// // //             <div className="timeframe-indicators">
// // //               <h4>Hierarchical Analysis</h4>
// // //               <div className="timeframe-grid">
// // //                 {["MONTHLY", "WEEKLY", "DAILY", "4HOUR"].map((tf) => {
// // //                   const tfData = stockData[`${tf}_TIMEFRAME`]
// // //                   if (!tfData) return null
// // //                   const isLoadingTf = tfData.VERDICT === "Loading..."

// // //                   return (
// // //                     <div key={tf} className={`timeframe-indicator ${tf.toLowerCase()} ${isLoadingTf ? "loading" : ""}`}>
// // //                       <span className="tf-label">{tf}</span>
// // //                       <span className={`tf-verdict ${getVerdictColor(tfData.VERDICT)}`}>
// // //                         {isLoadingTf ? (
// // //                           <div className="loading-dots small">
// // //                             <span></span>
// // //                             <span></span>
// // //                             <span></span>
// // //                           </div>
// // //                         ) : (
// // //                           tfData.VERDICT
// // //                         )}
// // //                       </span>
// // //                       <span className="tf-confidence">{isLoadingTf ? "--" : tfData.CONFIDENCE_SCORE}</span>
// // //                     </div>
// // //                   )
// // //                 })}
// // //               </div>
// // //             </div>

// // //             <div className="details-grid">
// // //               <div className="detail-section">
// // //                 <h4>Price Data</h4>
// // //                 <div className="detail-item">
// // //                   <span>Current Price:</span>
// // //                   <span>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       `$${currentData.DETAILS.price_data.current_price}`
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>Entry Price:</span>
// // //                   <span>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       `$${currentData.DETAILS.price_data.entry_price}`
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>Stop Loss:</span>
// // //                   <span>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       `$${currentData.DETAILS.price_data.stop_loss}`
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>Targets:</span>
// // //                   <span>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.price_data.target_prices.map((t) => `$${t}`).join(", ")
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>1D Change:</span>
// // //                   <span className={isLoadingData ? "" : getChangeColor(currentData.DETAILS.price_data.change_1d)}>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       <>
// // //                         {currentData.DETAILS.price_data.change_1d > 0 ? "+" : ""}
// // //                         {currentData.DETAILS.price_data.change_1d}%
// // //                       </>
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>1W Change:</span>
// // //                   <span className={isLoadingData ? "" : getChangeColor(currentData.DETAILS.price_data.change_1w)}>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       <>
// // //                         {currentData.DETAILS.price_data.change_1w > 0 ? "+" : ""}
// // //                         {currentData.DETAILS.price_data.change_1w}%
// // //                       </>
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //               </div>

// // //               <div className="detail-section">
// // //                 <h4>Technical Indicators</h4>
// // //                 <div className="detail-item">
// // //                   <span>RSI:</span>
// // //                   <span
// // //                     className={
// // //                       isLoadingData
// // //                         ? ""
// // //                         : currentData.DETAILS.technical_indicators.rsi > 70
// // //                           ? "indicator-overbought"
// // //                           : currentData.DETAILS.technical_indicators.rsi < 30
// // //                             ? "indicator-oversold"
// // //                             : "indicator-neutral"
// // //                     }
// // //                   >
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.technical_indicators.rsi
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>ADX:</span>
// // //                   <span>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.technical_indicators.adx
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>ATR:</span>
// // //                   <span>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.technical_indicators.atr
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>Cycle Phase:</span>
// // //                   <span>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.technical_indicators.cycle_phase
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>Momentum:</span>
// // //                   <span
// // //                     className={
// // //                       isLoadingData ? "" : getChangeColor(currentData.DETAILS.technical_indicators.cycle_momentum * 100)
// // //                     }
// // //                   >
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       `${(currentData.DETAILS.technical_indicators.cycle_momentum * 100).toFixed(2)}%`
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //               </div>

// // //               <div className="detail-section">
// // //                 <h4>Individual Verdicts</h4>
// // //                 <div className="verdict-grid">
// // //                   {Object.entries(currentData.DETAILS.individual_verdicts).map(([key, value]) => (
// // //                     <div key={key} className="verdict-item">
// // //                       <span>{key.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}:</span>
// // //                       <span className={`verdict-badge ${String(value).toLowerCase().replace(" ", "-")}`}>
// // //                         {isLoadingData ? <div className="loading-placeholder small">--</div> : String(value)}
// // //                       </span>
// // //                     </div>
// // //                   ))}
// // //                 </div>
// // //               </div>

// // //               <div className="detail-section">
// // //                 <h4>Fundamentals</h4>
// // //                 {market === "Crypto" ? (
// // //                   <>
// // //                     <div className="detail-item">
// // //                       <span>Market Cap Rank:</span>
// // //                       <span>
// // //                         {isLoadingData ? (
// // //                           <div className="loading-placeholder">--</div>
// // //                         ) : (
// // //                           currentData.DETAILS.fundamentals.Market_Cap_Rank
// // //                         )}
// // //                       </span>
// // //                     </div>
// // //                     <div className="detail-item">
// // //                       <span>Adoption Score:</span>
// // //                       <span className={isLoadingData ? "" : "change-positive"}>
// // //                         {isLoadingData ? (
// // //                           <div className="loading-placeholder">--</div>
// // //                         ) : (
// // //                           `${(currentData.DETAILS.fundamentals.Adoption_Score! * 100).toFixed(1)}%`
// // //                         )}
// // //                       </span>
// // //                     </div>
// // //                     <div className="detail-item">
// // //                       <span>Technology Score:</span>
// // //                       <span className={isLoadingData ? "" : "change-positive"}>
// // //                         {isLoadingData ? (
// // //                           <div className="loading-placeholder">--</div>
// // //                         ) : (
// // //                           `${(currentData.DETAILS.fundamentals.Technology_Score! * 100).toFixed(1)}%`
// // //                         )}
// // //                       </span>
// // //                     </div>
// // //                   </>
// // //                 ) : (
// // //                   <>
// // //                     <div className="detail-item">
// // //                       <span>P/E Ratio:</span>
// // //                       <span>
// // //                         {isLoadingData ? (
// // //                           <div className="loading-placeholder">--</div>
// // //                         ) : (
// // //                           currentData.DETAILS.fundamentals.PE_Ratio
// // //                         )}
// // //                       </span>
// // //                     </div>
// // //                     <div className="detail-item">
// // //                       <span>EPS:</span>
// // //                       <span>
// // //                         {isLoadingData ? (
// // //                           <div className="loading-placeholder">--</div>
// // //                         ) : (
// // //                           `$${currentData.DETAILS.fundamentals.eps}`
// // //                         )}
// // //                       </span>
// // //                     </div>
// // //                     <div className="detail-item">
// // //                       <span>Revenue Growth:</span>
// // //                       <span className={isLoadingData ? "" : "change-positive"}>
// // //                         {isLoadingData ? (
// // //                           <div className="loading-placeholder">--</div>
// // //                         ) : (
// // //                           `${currentData.DETAILS.fundamentals.revenue_growth}%`
// // //                         )}
// // //                       </span>
// // //                     </div>
// // //                     <div className="detail-item">
// // //                       <span>Income Growth:</span>
// // //                       <span className={isLoadingData ? "" : "change-positive"}>
// // //                         {isLoadingData ? (
// // //                           <div className="loading-placeholder">--</div>
// // //                         ) : (
// // //                           `${currentData.DETAILS.fundamentals.net_income_growth}%`
// // //                         )}
// // //                       </span>
// // //                     </div>
// // //                   </>
// // //                 )}
// // //               </div>

// // //               <div className="detail-section">
// // //                 <h4>Sentiment Analysis</h4>
// // //                 <div className="detail-item">
// // //                   <span>Score:</span>
// // //                   <span>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.sentiment_analysis.score
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>Interpretation:</span>
// // //                   <span
// // //                     className={`verdict-badge ${currentData.DETAILS.sentiment_analysis.interpretation.toLowerCase()}`}
// // //                   >
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder small">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.sentiment_analysis.interpretation
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>Market Mood:</span>
// // //                   <span>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.sentiment_analysis.market_mood
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //               </div>

// // //               <div className="detail-section">
// // //                 <h4>Cycle Analysis</h4>
// // //                 <div className="detail-item">
// // //                   <span>Current Phase:</span>
// // //                   <span className={`verdict-badge ${currentData.DETAILS.cycle_analysis.current_phase.toLowerCase()}`}>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder small">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.cycle_analysis.current_phase
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>Stage:</span>
// // //                   <span>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.cycle_analysis.stage
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>Duration:</span>
// // //                   <span>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       `${currentData.DETAILS.cycle_analysis.duration_days} days`
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>Bull Probability:</span>
// // //                   <span className={isLoadingData ? "" : "change-positive"}>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       `${currentData.DETAILS.cycle_analysis.bull_continuation_probability}%`
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>Bear Probability:</span>
// // //                   <span className={isLoadingData ? "" : "change-negative"}>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       `${currentData.DETAILS.cycle_analysis.bear_transition_probability}%`
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>Risk Level:</span>
// // //                   <span>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.cycle_analysis.risk_level
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //               </div>

// // //               <div className="detail-section">
// // //                 <h4>Trading Parameters</h4>
// // //                 <div className="detail-item">
// // //                   <span>Position Size:</span>
// // //                   <span>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.trading_parameters.position_size
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>Timeframe:</span>
// // //                   <span>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.trading_parameters.timeframe
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //                 <div className="detail-item">
// // //                   <span>Risk Level:</span>
// // //                   <span>
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.trading_parameters.risk_level
// // //                     )}
// // //                   </span>
// // //                 </div>
// // //               </div>

// // //               <div className="detail-section">
// // //                 <h4>Patterns Detected</h4>
// // //                 <div className="pattern-list">
// // //                   <div>
// // //                     <strong>Geometric:</strong>{" "}
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder inline">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.patterns.geometric.join(", ")
// // //                     )}
// // //                   </div>
// // //                   <div>
// // //                     <strong>Elliott Wave:</strong>{" "}
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder inline">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.patterns.elliott_wave.join(", ")
// // //                     )}
// // //                   </div>
// // //                   <div>
// // //                     <strong>Confluence:</strong>{" "}
// // //                     {isLoadingData ? (
// // //                       <div className="loading-placeholder inline">--</div>
// // //                     ) : (
// // //                       currentData.DETAILS.patterns.confluence_factors.join(", ")
// // //                     )}
// // //                   </div>
// // //                 </div>
// // //               </div>
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>
// // //     )
// // //   }

// // //   // AI Analysis Modal
// // //   const renderAiModal = () => {
// // //     if (!showAiModal || !aiAnalysis || !aiAnalysis[showAiModal]) return null

// // //     const analysis = aiAnalysis[showAiModal]

// // //     return (
// // //       <div className="ai-modal-overlay" onClick={() => setShowAiModal(null)}>
// // //         <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
// // //           <div className="ai-modal-header">
// // //             <h2>🤖 AI Analysis for {analysis.symbol}</h2>
// // //             <button className="close-button" onClick={() => setShowAiModal(null)}>
// // //               ×
// // //             </button>
// // //           </div>
// // //           <div className="ai-modal-content">
// // //             {analysis.ai_analysis.error ? (
// // //               <div className="ai-error">
// // //                 <p>
// // //                   <strong>Error:</strong> {analysis.ai_analysis.error}
// // //                 </p>
// // //                 <p>{analysis.ai_analysis.message}</p>
// // //               </div>
// // //             ) : (
// // //               <div className="ai-analysis-text">
// // //                 <div className="ai-meta">
// // //                   <span>Model: {analysis.ai_analysis.model}</span>
// // //                   <span>Generated: {analysis.ai_analysis.timestamp}</span>
// // //                 </div>
// // //                 <div className="ai-content">
// // //                   {analysis.ai_analysis.analysis.split("\n").map((paragraph, index) => (
// // //                     <p key={index}>{paragraph}</p>
// // //                   ))}
// // //                 </div>
// // //               </div>
// // //             )}
// // //           </div>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   if (error && !showAnalysisPage) {
// // //     return (
// // //       <div className="app">
// // //         <div className="error-container">
// // //           <h2>Something went wrong!</h2>
// // //           <p>{error}</p>
// // //           <p>API URL: {API_BASE_URL}</p>
// // //           <button onClick={() => fetchData(false)} className="retry-button">
// // //             Try Loading Cached Data
// // //           </button>
// // //           <button onClick={() => fetchData(true)} className="retry-button">
// // //             Force Fresh Analysis
// // //           </button>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   if (!showAnalysisPage && !hasInitialData) {
// // //     return (
// // //       <div className="app">
// // //         <div className="no-data-container">
// // //           <h2>Multi-Asset Analysis Dashboard v4.0 - Reduced Dataset</h2>
// // //           <p>Analyze 35 popular assets from US, Nigerian, and Crypto markets</p>
// // //           <p>🚀 Features: Persistent Data + Background Processing + AI Integration</p>
// // //           <p>⚡ Optimized: 3-5 minutes processing time</p>
// // //           <p>📊 US Stocks: 10 | Nigerian Stocks: 15 | Crypto: 10</p>

// // //           <p>🤖 AI Analysis: Available with Claude integration</p>
// // //           <p>🕐 Auto-refresh: Daily at 5:00 PM</p>

// // //           <div className="action-buttons">
// // //             <button onClick={() => fetchData(false)} className="primary-button">
// // //               📊 Go to Analysis
// // //             </button>
// // //             <button onClick={() => fetchData(true)} className="secondary-button">
// // //               🔄 Start Fresh Analysis
// // //             </button>
// // //           </div>

// // //           <p className="note">
// // //             "Go to Analysis" loads cached data instantly.
// // //             <br />
// // //             "Start Fresh Analysis" runs new analysis (6-10 minutes).
// // //           </p>
// // //         </div>
// // //       </div>
// // //     )
// // //   }

// // //   // Group stocks by market type
// // //   const groupStocksByMarket = () => {
// // //     const stocks = Object.keys(data || {}).filter(
// // //       (key) =>
// // //         ![
// // //           "timestamp",
// // //           "stocks_analyzed",
// // //           "status",
// // //           "data_sources",
// // //           "markets",
// // //           "processing_info",
// // //           "data_source",
// // //           "note",
// // //           "processing_time_minutes",
// // //         ].includes(key),
// // //     )

// // //     const grouped = {
// // //       US: [] as string[],
// // //       Nigerian: [] as string[],
// // //       Crypto: [] as string[],
// // //     }

// // //     stocks.forEach((symbol) => {
// // //       const market = data![symbol]?.market || "Unknown"
// // //       if (market === "US") {
// // //         grouped.US.push(symbol)
// // //       } else if (market === "Nigerian") {
// // //         grouped.Nigerian.push(symbol)
// // //       } else if (market === "Crypto") {
// // //         grouped.Crypto.push(symbol)
// // //       }
// // //     })

// // //     // Sort each group alphabetically
// // //     grouped.US.sort()
// // //     grouped.Nigerian.sort()
// // //     grouped.Crypto.sort()

// // //     return grouped
// // //   }

// // //   const groupedStocks = groupStocksByMarket()

// // //   return (
// // //     <div className="app">
// // //       <header className="app-header">
// // //         <h1>Multi-Asset Analysis Dashboard v4.0</h1>
// // //         <div className="header-info">
// // //           <span>Last Updated: {data?.timestamp}</span>
// // //           <span>Assets Analyzed: {data?.stocks_analyzed || 0}</span>
// // //           {data?.processing_time_minutes && <span>Processing Time: {data.processing_time_minutes}min</span>}
// // //           {data?.markets && (
// // //             <>
// // //               <span>US: {data.markets.us_stocks}</span>
// // //               <span>Nigerian: {data.markets.nigerian_stocks}</span>
// // //               <span>Crypto: {data.markets.crypto_assets}</span>
// // //             </>
// // //           )}
// // //           {data?.data_sources && (
// // //             <>
// // //               <span>Twelve Data: {data.data_sources.twelve_data_count}</span>
// // //               <span>Alpha Vantage: {data.data_sources.alpha_vantage_count}</span>
// // //               <span>CoinGecko: {data.data_sources.coingecko_count}</span>
// // //             </>
// // //           )}
// // //           <span className={`status ${data?.status}`}>Status: {data?.status || "loading"}</span>
// // //           {data?.processing_info?.ai_analysis_available && (
// // //             <span className="ai-available">🤖 AI Analysis Available</span>
// // //           )}
// // //           {data?.data_source === "database_cache" && <span className="cache-indicator">📦 Cached Data</span>}
// // //           {isAnalyzing && <span className="analyzing-indicator">🔄 Analyzing...</span>}
// // //         </div>
// // //         {data?.note && (
// // //           <div className="data-note">
// // //             <p>{data.note}</p>
// // //           </div>
// // //         )}
// // //       </header>

// // //       {renderProgressBar()}

// // //       <div className="controls">
// // //         <div className="timeframe-toggle">
// // //           {(["MONTHLY", "WEEKLY", "DAILY", "4HOUR"] as const).map((tf) => (
// // //             <button key={tf} className={timeframe === tf ? "active" : ""} onClick={() => setTimeframe(tf)}>
// // //               {tf === "4HOUR" ? "4H" : tf.charAt(0) + tf.slice(1).toLowerCase()}
// // //             </button>
// // //           ))}
// // //         </div>

// // //         <div className="action-buttons">
// // //           <button onClick={() => fetchData(false)} className="cache-button" disabled={isAnalyzing}>
// // //             📦 Load Cached
// // //           </button>
// // //           <button onClick={() => fetchData(true)} className="refresh-button" disabled={isAnalyzing}>
// // //             🔄 Fresh Analysis
// // //           </button>
// // //         </div>
// // //       </div>

// // //       <div className="markets-container">
// // //         {/* US Stocks Section */}
// // //         {groupedStocks.US.length > 0 && (
// // //           <div className="market-section">
// // //             <div className="market-header">
// // //               <h2>🇺🇸 US Stocks ({groupedStocks.US.length})</h2>
// // //               <div className="market-stats">
// // //                 <span>Data Source: Twelve Data</span>
// // //                 <span>Market: NASDAQ, NYSE</span>
// // //               </div>
// // //             </div>
// // //             <div className="stocks-container">
// // //               {groupedStocks.US.map((symbol) => renderStockCard(symbol, data![symbol]))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Nigerian Stocks Section */}
// // //         {groupedStocks.Nigerian.length > 0 && (
// // //           <div className="market-section">
// // //             <div className="market-header">
// // //               <h2>🇳🇬 Nigerian Stocks ({groupedStocks.Nigerian.length})</h2>
// // //               <div className="market-stats">
// // //                 <span>Data Source: Twelve Data</span>
// // //                 <span>Market: Nigerian Stock Exchange</span>
// // //               </div>
// // //             </div>
// // //             <div className="stocks-container">
// // //               {groupedStocks.Nigerian.map((symbol) => renderStockCard(symbol, data![symbol]))}
// // //             </div>
// // //           </div>
// // //         )}

// // //         {/* Crypto Section */}
// // //         {groupedStocks.Crypto.length > 0 && (
// // //           <div className="market-section">
// // //             <div className="market-header">
// // //               <h2>₿ Cryptocurrency ({groupedStocks.Crypto.length})</h2>
// // //               <div className="market-stats">
// // //                 <span>Data Source: CoinGecko</span>
// // //                 <span>Market: Global Crypto Markets</span>
// // //               </div>
// // //             </div>
// // //             <div className="stocks-container">
// // //               {groupedStocks.Crypto.map((symbol) => renderStockCard(symbol, data![symbol]))}
// // //             </div>
// // //           </div>
// // //         )}
// // //       </div>

// // //       {renderAiModal()}
// // //     </div>
// // //   )
// // // }

// // // export default App

// "use client"

// import type React from "react"
// import { useState, useEffect, useCallback } from "react"
// import "./App.css"

// // Update to your actual Render URL
// // const API_BASE_URL = "https://my-stocks-s2at.onrender.com"
// const API_BASE_URL = "http://localhost:5000"

// interface StockData {
//  PRICE: number
//  ACCURACY: number
//  CONFIDENCE_SCORE: number
//  VERDICT: string
//  status?: string
//  message?: string
//  DETAILS: {
//  individual_verdicts: {
//  rsi_verdict: string
//  adx_verdict: string
//  momentum_verdict: string
//  pattern_verdict: string
//  fundamental_verdict: string
//  sentiment_verdict: string
//  cycle_verdict: string
//  hierarchy_override?: string
//  }
//  price_data: {
//  current_price: number
//  entry_price: number
//  target_prices: number[]
//  stop_loss: number
//  change_1d: number
//  change_1w: number
//  }
//  technical_indicators: {
//  rsi: number
//  adx: number
//  atr: number
//  cycle_phase: string
//  cycle_momentum: number
//  }
//  patterns: {
//  geometric: string[]
//  elliott_wave: string[]
//  confluence_factors: string[]
//  }
//  fundamentals: {
//  PE_Ratio?: number
//  EPS?: number
//  revenue_growth?: number
//  net_income_growth?: number
//  Market_Cap_Rank?: number
//  Adoption_Score?: number
//  Technology_Score?: number
//  }
//  sentiment_analysis: {
//  score: number
//  interpretation: string
//  market_mood: string
//  }
//  cycle_analysis: {
//  current_phase: string
//  stage: string
//  duration_days: number
//  momentum: number
//  momentum_visual: string
//  bull_continuation_probability: number
//  bear_transition_probability: number
//  expected_continuation: string
//  risk_level: string
//  }
//  trading_parameters: {
//  position_size: string
//  timeframe: string
//  risk_level: string
//  }
// }
// }

// interface ApiResponse {
//  timestamp: string;
//  stocks_analyzed: number
//  total_requested: number
//  success_rate: number
//  status: string
//  data_source?: string
//  note?: string
//  processing_time_minutes?: number
//  data_sources?: {
//  twelve_data_count: number
//  naijastocks_count: number
//  cryptcompare_count: number
//  }
//  markets?: {
//  us_stocks: number
//  nigerian_stocks: number
//  crypto_assets: number
//  }
//  processing_info?: {
//  hierarchical_analysis: boolean
//  timeframes_analyzed: string[]
//  ai_analysis_available: boolean
//  background_processing: boolean
//  daily_auto_refresh: string
//  }
//  [key: string]: any
// }


// interface AIAnalysisResponse {
//  symbol: string
//  ai_analysis: {
//  analysis: string
//  timestamp: string
//  model: string
//  symbol: string
//  error?: string
//  message?: string
//  }
//  technical_analysis: any
//  timestamp: string
// }

// interface ProgressInfo {
//  current: number
//  total: number
//  percentage: number
//  currentSymbol: string
//  stage: string
//  estimatedTimeRemaining: number
// }

// const App: React.FC = () => {
//  const [data, setData] = useState<ApiResponse | null>(null)
//  const [loading, setLoading] = useState<boolean>(false)
//  const [error, setError] = useState<string | null>(null)
//  const [timeframe, setTimeframe] = useState<"MONTHLY" | "WEEKLY" | "DAILY" | "4HOUR">("DAILY")
//  const [expandedStocks, setExpandedStocks] = useState<Set<string>>(new Set())
//  const [aiAnalysis, setAiAnalysis] = useState<{ [key: string]: AIAnalysisResponse } | null>(null)
//  const [aiLoading, setAiLoading] = useState<{ [key: string]: boolean }>({})
//  const [showAiModal, setShowAiModal] = useState<string | null>(null)
//  const [hasInitialData, setHasInitialData] = useState<boolean>(false)
//  const [showAnalysisPage, setShowAnalysisPage] = useState<boolean>(false)
//  const [progress, setProgress] = useState<ProgressInfo>({
//  current: 0,
//  total: 35,
//  percentage: 0,
//  currentSymbol: "",
//  stage: "Initializing...",
//  estimatedTimeRemaining: 0,
//  })
//  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)

//  // Generate placeholder data for loading state
//  const generatePlaceholderData = useCallback((): ApiResponse => {
//  const placeholderStocks: { [key: string]: any } = {}

//  // US Stocks (10)
//  const usStocks = ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN", "NVDA", "META", "NFLX", "JPM", "V"]

//  // Nigerian Stocks (15)
//  const nigerianStocks = [
//  "ACCESS", "GTCO", "UBA", "ZENITHBANK", "FBNH",
//  "DANGCEM", "BUACEMENT", "WAPCO", "DANGSUGAR", "NESTLE",
//  "UNILEVER", "SEPLAT", "TOTAL", "MTNN", "TRANSCORP"
//  ]

//  // Crypto (10)
//  const cryptoStocks = ["BTC", "ETH", "BNB", "SOL", "ADA", "AVAX", "DOT", "LINK", "MATIC", "LTC"]

//  const allSymbols = [...usStocks, ...nigerianStocks, ...cryptoStocks]

//  allSymbols.forEach((symbol) => {
//  const market = cryptoStocks.includes(symbol) ? "Crypto" : nigerianStocks.includes(symbol) ? "Nigerian" : "US"
//  const dataSource = cryptoStocks.includes(symbol) ? "cryptcompare" : nigerianStocks.includes(symbol) ? "naijastocks" : "twelve_data"

//  placeholderStocks[symbol] = {
//  data_source: dataSource,
//  market: market,
//  DAILY_TIMEFRAME: {
//  PRICE: 0,
//  ACCURACY: 0,
//  CONFIDENCE_SCORE: 0,
//  VERDICT: "Loading...",
//  DETAILS: {
//  individual_verdicts: {
//  rsi_verdict: "Loading...",
//  adx_verdict: "Loading...",
//  momentum_verdict: "Loading...",
//  pattern_verdict: "Loading...",
//  fundamental_verdict: "Loading...",
//  sentiment_verdict: "Loading...",
//  cycle_verdict: "Loading...",
//  },
//  price_data: {
//  current_price: 0,
//  entry_price: 0,
//  target_prices: [0, 0],
//  stop_loss: 0,
//  change_1d: 0,
//  change_1w: 0,
//  },
//  technical_indicators: {
//  rsi: 0,
//  adx: 0,
//  atr: 0,
//  cycle_phase: "Loading...",
//  cycle_momentum: 0,
//  },
//  patterns: {
//  geometric: ["Loading..."],
//  elliott_wave: ["Loading..."],
//  confluence_factors: ["Loading..."],
//  },
//  fundamentals:
//  market === "Crypto"
//  ? {
//  Market_Cap_Rank: 0,
//  Adoption_Score: 0,
//  Technology_Score: 0,
//  }
//  : {
//  PE_Ratio: 0,
//  EPS: 0,
//  revenue_growth: 0,
//  net_income_growth: 0,
//  },
//  sentiment_analysis: {
//  score: 0,
//  interpretation: "Loading...",
//  market_mood: "Loading...",
//  },
//  cycle_analysis: {
//  current_phase: "Loading...",
//  stage: "Loading...",
//  duration_days: 0,
//  momentum: 0,
//  momentum_visual: "Loading...",
//  bull_continuation_probability: 0,
//  bear_transition_probability: 0,
//  expected_continuation: "Loading...",
//  risk_level: "Loading...",
//  },
//  trading_parameters: {
//  position_size: "Loading...",
//  timeframe: "Loading...",
//  risk_level: "Loading...",
//  },
//  },
//  },
//  WEEKLY_TIMEFRAME: {
//  status: market === "Nigerian" ? "Not Available" : "Loading...",
//  message: market === "Nigerian" ? "Historical data not available for Nigerian stocks via NaijaStocksAPI" : undefined,
//  PRICE: 0,
//  ACCURACY: 0,
//  CONFIDENCE_SCORE: 0,
//  VERDICT: market === "Nigerian" ? "Not Available" : "Loading...",
//  DETAILS: {
//  individual_verdicts: {
//  rsi_verdict: "Loading...",
//  adx_verdict: "Loading...",
//  momentum_verdict: "Loading...",
//  pattern_verdict: "Loading...",
//  fundamental_verdict: "Loading...",
//  sentiment_verdict: "Loading...",
//  cycle_verdict: "Loading...",
//  },
//  price_data: {
//  current_price: 0,
//  entry_price: 0,
//  target_prices: [0, 0],
//  stop_loss: 0,
//  change_1d: 0,
//  change_1w: 0,
//  },
//  technical_indicators: {
//  rsi: 0,
//  adx: 0,
//  atr: 0,
//  cycle_phase: "Loading...",
//  cycle_momentum: 0,
//  },
//  patterns: {
//  geometric: ["Loading..."],
//  elliott_wave: ["Loading..."],
//  confluence_factors: ["Loading..."],
//  },
//  fundamentals:
//  market === "Crypto"
//  ? {
//  Market_Cap_Rank: 0,
//  Adoption_Score: 0,
//  Technology_Score: 0,
//  }
//  : {
//  PE_Ratio: 0,
//  EPS: 0,
//  revenue_growth: 0,
//  net_income_growth: 0,
//  },
//  sentiment_analysis: {
//  score: 0,
//  interpretation: "Loading...",
//  market_mood: "Loading...",
//  },
//  cycle_analysis: {
//  current_phase: "Loading...",
//  stage: "Loading...",
//  duration_days: 0,
//  momentum: 0,
//  momentum_visual: "Loading...",
//  bull_continuation_probability: 0,
//  bear_transition_probability: 0,
//  expected_continuation: "Loading...",
//  risk_level: "Loading...",
//  },
//  trading_parameters: {
//  position_size: "Loading...",
//  timeframe: "Loading...",
//  risk_level: "Loading...",
//  },
//  },
//  },
//  MONTHLY_TIMEFRAME: {
//  status: market === "Nigerian" ? "Not Available" : "Loading...",
//  message: market === "Nigerian" ? "Historical data not available for Nigerian stocks via NaijaStocksAPI" : undefined,
//  PRICE: 0,
//  ACCURACY: 0,
//  CONFIDENCE_SCORE: 0,
//  VERDICT: market === "Nigerian" ? "Not Available" : "Loading...",
//  DETAILS: {
//  individual_verdicts: {
//  rsi_verdict: "Loading...",
//  adx_verdict: "Loading...",
//  momentum_verdict: "Loading...",
//  pattern_verdict: "Loading...",
//  fundamental_verdict: "Loading...",
//  sentiment_verdict: "Loading...",
//  cycle_verdict: "Loading...",
//  },
//  price_data: {
//  current_price: 0,
//  entry_price: 0,
//  target_prices: [0, 0],
//  stop_loss: 0,
//  change_1d: 0,
//  change_1w: 0,
//  },
//  technical_indicators: {
//  rsi: 0,
//  adx: 0,
//  atr: 0,
//  cycle_phase: "Loading...",
//  cycle_momentum: 0,
//  },
//  patterns: {
//  geometric: ["Loading..."],
//  elliott_wave: ["Loading..."],
//  confluence_factors: ["Loading..."],
//  },
//  fundamentals:
//  market === "Crypto"
//  ? {
//  Market_Cap_Rank: 0,
//  Adoption_Score: 0,
//  Technology_Score: 0,
//  }
//  : {
//  PE_Ratio: 0,
//  EPS: 0,
//  revenue_growth: 0,
//  net_income_growth: 0,
//  },
//  sentiment_analysis: {
//  score: 0,
//  interpretation: "Loading...",
//  market_mood: "Loading...",
//  },
//  cycle_analysis: {
//  current_phase: "Loading...",
//  stage: "Loading...",
//  duration_days: 0,
//  momentum: 0,
//  momentum_visual: "Loading...",
//  bull_continuation_probability: 0,
//  bear_transition_probability: 0,
//  expected_continuation: "Loading...",
//  risk_level: "Loading...",
//  },
//  trading_parameters: {
//  position_size: "Loading...",
//  timeframe: "Loading...",
//  risk_level: "Loading...",
//  },
//  },
//  },
//  "4HOUR_TIMEFRAME": {
//  status: market === "Nigerian" || market === "Crypto" ? "Not Available" : "Loading...",
//  message: market === "Nigerian" ? "Historical data not available for Nigerian stocks via NaijaStocksAPI" : market === "Crypto" ? "4-hour data not available via CryptoCompare free tier" : undefined,
//  PRICE: 0,
//  ACCURACY: 0,
//  CONFIDENCE_SCORE: 0,
//  VERDICT: market === "Nigerian" || market === "Crypto" ? "Not Available" : "Loading...",
//  DETAILS: {
//  individual_verdicts: {
//  rsi_verdict: "Loading...",
//  adx_verdict: "Loading...",
//  momentum_verdict: "Loading...",
//  pattern_verdict: "Loading...",
//  fundamental_verdict: "Loading...",
//  sentiment_verdict: "Loading...",
//  cycle_verdict: "Loading...",
//  },
//  price_data: {
//  current_price: 0,
//  entry_price: 0,
//  target_prices: [0, 0],
//  stop_loss: 0,
//  change_1d: 0,
//  change_1w: 0,
//  },
//  technical_indicators: {
//  rsi: 0,
//  adx: 0,
//  atr: 0,
//  cycle_phase: "Loading...",
//  cycle_momentum: 0,
//  },
//  patterns: {
//  geometric: ["Loading..."],
//  elliott_wave: ["Loading..."],
//  confluence_factors: ["Loading..."],
//  },
//  fundamentals:
//  market === "Crypto"
//  ? {
//  Market_Cap_Rank: 0,
//  Adoption_Score: 0,
//  Technology_Score: 0,
//  }
//  : {
//  PE_Ratio: 0,
//  EPS: 0,
//  revenue_growth: 0,
//  net_income_growth: 0,
//  },
//  sentiment_analysis: {
//  score: 0,
//  interpretation: "Loading...",
//  market_mood: "Loading...",
//  },
//  cycle_analysis: {
//  current_phase: "Loading...",
//  stage: "Loading...",
//  duration_days: 0,
//  momentum: 0,
//  momentum_visual: "Loading...",
//  bull_continuation_probability: 0,
//  bear_transition_probability: 0,
//  expected_continuation: "Loading...",
//  risk_level: "Loading...",
//  },
//  trading_parameters: {
//  position_size: "Loading...",
//  timeframe: "Loading...",
//  risk_level: "Loading...",
//  },
//  },
//  },
//  }
//  })

//  return {
//  timestamp: new Date().toISOString(),
//  stocks_analyzed: 0,
//  total_requested: 35,
//  success_rate: 0,
//  status: "loading",
//  data_source: "loading",
//  markets: {
//  us_stocks: usStocks.length,
//  nigerian_stocks: nigerianStocks.length,
//  crypto_assets: cryptoStocks.length,
//  },
//  data_sources: {
//  twelve_data_count: 0,
//  naijastocks_count: 0,
//  cryptcompare_count: 0,
//  },
//  processing_info: {
//  hierarchical_analysis: true,
//  timeframes_analyzed: ["monthly", "weekly", "daily", "4hour"],
//  ai_analysis_available: true,
//  background_processing: true,
//  daily_auto_refresh: "5:00 PM",
// },
// ...placeholderStocks,
// }
// }, [])

// // Poll for progress updates
// const pollProgress = useCallback(async () => {
// try {
// const response = await fetch(`${API_BASE_URL}/progress`, {
//  headers: { Accept: "application/json" },
// })
// if (response.ok) {
//  const progressData: ProgressInfo = await response.json()
//  setProgress(progressData)

//  // If analysis is complete, fetch the final data
//  if (progressData.percentage >= 100) {
//    setIsAnalyzing(false)
//    await fetchFinalData()
//  }
// } else {
//  throw new Error(`Progress fetch failed: HTTP ${response.status}`)
// }
// } catch (err) {
// console.error("Error polling progress:", err)
// }
// }, [])

// // Fetch final data after analysis completion
// const fetchFinalData = async () => {
// try {
// const response = await fetch(`${API_BASE_URL}/analyze`, {
//  method: "GET",
//  headers: {
//    Accept: "application/json",
//  },
// })

// if (response.ok) {
//  const result: ApiResponse = await response.json()
//  setData(result)
//  setLoading(false)
//  setHasInitialData(true)
// } else {
//  throw new Error(`HTTP ${response.status}`)
// }
// } catch (err) {
// console.error("Error fetching final data:", err)
// setError("Failed to fetch final analysis data")
// setLoading(false)
// }
// }

// // Start analysis and show loading page immediately
// const startAnalysis = async (fresh = false) => {
// setShowAnalysisPage(true)
// setIsAnalyzing(true)
// setLoading(true)
// setError(null)

// // Show placeholder data immediately
// const placeholderData = generatePlaceholderData()
// setData(placeholderData)
// setHasInitialData(true)

// // Reset progress
// setProgress({
// current: 0,
// total: 35,
// percentage: 0,
// currentSymbol: "Initializing...",
// stage: "Starting analysis...",
// estimatedTimeRemaining: 300, // 5 minutes estimate
// })

// try {
// const endpoint = fresh ? "/analyze/fresh" : "/analyze"
// const apiUrl = `${API_BASE_URL}${endpoint}`

// // Start the analysis (non-blocking)
// fetch(apiUrl, {
//  method: "GET",
//  headers: {
//    Accept: "application/json",
//  },
// })
//  .then(async (response) => {
//    if (response.ok) {
//      const result = await response.json()
//      setData(result)
//      setIsAnalyzing(result.status === "analysis_triggered")
//      setLoading(false)
//    } else {
//      throw new Error(`HTTP ${response.status}`)
//    }
//  })
//  .catch((err) => {
//    console.error("Analysis error:", err)
//    setError(err.message || "Analysis failed")
//    setIsAnalyzing(false)
//    setLoading(false)
//  })

// // Start polling for progress
// const progressInterval = setInterval(() => {
//  if (!isAnalyzing) {
//    clearInterval(progressInterval)
//    return
//  }
//  pollProgress()
// }, 2000) // Poll every 2 seconds
// } catch (err) {
// console.error("Error starting analysis:", err)
// setError(err instanceof Error ? err.message : "An error occurred")
// setIsAnalyzing(false)
// setLoading(false)
// }
// }

// const fetchData = async (fresh = false) => {
// if (isAnalyzing) {
// // If already analyzing, just show the analysis page
// setShowAnalysisPage(true)
// return
// }

// // Start new analysis
// await startAnalysis(fresh)
// }

// const fetchAiAnalysis = async (symbol: string) => {
// setAiLoading((prev) => ({ ...prev, [symbol]: true }))
// try {
// const apiUrl = `${API_BASE_URL}/ai-analysis`
// const response = await fetch(apiUrl, {
//  method: "POST",
//  headers: {
//    "Content-Type": "application/json",
//    Accept: "application/json",
//  },
//  body: JSON.stringify({ symbol }),
// })

// if (!response.ok) {
//  const errorText = await response.text()
//  throw new Error(`HTTP ${response.status}: ${errorText}`)
// }

// const result: AIAnalysisResponse = await response.json()
// setAiAnalysis((prev) => ({ ...prev, [symbol]: result }))
// setShowAiModal(symbol)
// } catch (err) {
// console.error("AI Analysis error:", err)
// setError(err instanceof Error ? err.message : "Failed to get AI analysis")
// } finally {
// setAiLoading((prev) => ({ ...prev, [symbol]: false }))
// }
// }

// // Test API connection and load initial data
// const testConnection = async () => {
// try {
// console.log("Testing API connection...")
// const response = await fetch(`${API_BASE_URL}/health`)
// const result = await response.json()
// console.log("Health check result:", result)

// // If healthy and has cached data, load it automatically
// if (result.data_status?.has_cached_data) {
//  console.log("Found cached data, loading automatically...")
//  await fetchData(false) // Load cached data
// }
// } catch (err) {
// console.error("Health check failed:", err)
// setError("Failed to connect to API")
// }
// }

// useEffect(() => {
// testConnection()
// }, [])

// const toggleStockDetails = (symbol: string) => {
// const newExpanded = new Set(expandedStocks)
// if (newExpanded.has(symbol)) {
// newExpanded.delete(symbol)
// } else {
// newExpanded.add(symbol)
// }
// setExpandedStocks(newExpanded)
// }

// const getVerdictColor = (verdict: string) => {
// if (verdict === "Loading..." || verdict === "Not Available") return "verdict-loading"

// switch (verdict.toLowerCase()) {
// case "strong buy":
//  return "verdict-strong-buy"
// case "buy":
//  return "verdict-buy"
// case "strong sell":
//  return "verdict-strong-sell"
// case "sell":
//  return "verdict-sell"
// default:
//  return "verdict-neutral"
// }
// }

// const getChangeColor = (change: number) => {
// if (change > 0) return "change-positive"
// if (change < 0) return "change-negative"
// return "change-neutral"
// }

// const getAssetTypeIcon = (symbol: string, market: string) => {
// if (market === "Crypto") return "₿"
// if (market === "Nigerian") return "🇳🇬"
// return "🇺🇸"
// }

// const getDataSourceBadge = (dataSource: string) => {
// switch (dataSource) {
// case "twelve_data":
//  return { text: "12D", class: "twelve-data" }
// case "naijastocks":
//  return { text: "NS", class: "naijastocks" }
// case "cryptcompare":
//  return { text: "CC", class: "cryptcompare" }
// case "database_cache":
//  return { text: "CACHE", class: "cache" }
// case "loading":
//  return { text: "...", class: "loading" }
// default:
//  return { text: "UNK", class: "unknown" }
// }
// }

// const renderProgressBar = () => {
// if (!isAnalyzing && !loading) return null

// return (
// <div className="progress-container">
//  <div className="progress-header">
//    <h3>Analysis in Progress</h3>
//    <div className="progress-stats">
//      <span>
//        {progress.current} / {progress.total} assets analyzed
//      </span>
//      <span className="progress-percentage">{progress.percentage.toFixed(1)}%</span>
//    </div>
//  </div>

//  <div className="progress-bar">
//    <div className="progress-fill" style={{ width: `${progress.percentage}%` }} />
//  </div>

//  <div className="progress-details">
//    <div className="current-stage">{progress.stage}</div>
//    {progress.currentSymbol && <div className="current-symbol">Analyzing: {progress.currentSymbol}</div>}
//    {progress.estimatedTimeRemaining > 0 && (
//      <div className="time-remaining">
//        Est. time remaining: {Math.ceil(progress.estimatedTimeRemaining / 60)} minutes
//      </div>
//    )}
//  </div>
// </div>
// )
// }

// const renderStockCard = (symbol: string, stockData: any) => {
// const timeframeKey = `${timeframe}_TIMEFRAME`
// const currentData: StockData = stockData[timeframeKey]
// if (!currentData) return null

// const isExpanded = expandedStocks.has(symbol)
// const dataSource = stockData.data_source || "unknown"
// const market = stockData.market || "Unknown"
// const assetIcon = getAssetTypeIcon(symbol, market)
// const sourceBadge = getDataSourceBadge(dataSource)
// const isLoadingData = dataSource === "loading" || currentData.VERDICT === "Loading..."
// const isNotAvailable = currentData.status === "Not Available"

// if (isNotAvailable && (timeframe !== "DAILY" && market === "Nigerian" || timeframe === "4HOUR" && market === "Crypto")) {
// return (
//  <div key={symbol} className="stock-card not-available">
//    <div className="stock-header" onClick={() => toggleStockDetails(symbol)}>
//      <div className="stock-symbol">
//        {assetIcon} {symbol}
//        <span className={`data-source ${sourceBadge.class}`}>{sourceBadge.text}</span>
//        <span className={`market-badge ${market.toLowerCase()}`}>{market}</span>
//      </div>
//      <div className="stock-price">N/A</div>
//      <div className={`stock-verdict ${getVerdictColor(currentData.VERDICT)}`}>
//        {currentData.VERDICT}
//      </div>
//      <div className="stock-accuracy">N/A</div>
//      <div className="expand-icon">{isExpanded ? "▼" : "▶"}</div>
//    </div>
//    {isExpanded && (
//      <div className="stock-details">
//        <div className="not-available-message">
//          <p>{currentData.message}</p>
//          <p>Please select DAILY timeframe for {market === "Nigerian" ? "Nigerian stocks" : "Crypto assets"}.</p>
//        </div>
//      </div>
//    )}
//  </div>
// )
// }

// return (
// <div key={symbol} className={`stock-card ${isLoadingData ? "loading-card" : ""}`}>
//  <div className="stock-header" onClick={() => toggleStockDetails(symbol)}>
//    <div className="stock-symbol">
//      {assetIcon} {symbol}
//      <span className={`data-source ${sourceBadge.class}`}>{sourceBadge.text}</span>
//      <span className={`market-badge ${market.toLowerCase()}`}>{market}</span>
//    </div>
//    <div className="stock-price">
//      {isLoadingData ? (
//        <div className="loading-placeholder">--</div>
//      ) : (
//        <>
//          {market === "Crypto" ? "$" : market === "Nigerian" ? "₦" : "$"}
//          {currentData.PRICE.toFixed(2)}
//        </>
//      )}
//    </div>
//    <div className={`stock-verdict ${getVerdictColor(currentData.VERDICT)}`}>
//      {isLoadingData ? (
//        <div className="loading-dots">
//          <span></span>
//          <span></span>
//          <span></span>
//        </div>
//      ) : (
//        currentData.VERDICT
//      )}
//    </div>
//    <div className="stock-accuracy">
//      {isLoadingData ? <div className="loading-placeholder">--</div> : `Accuracy: ${currentData.ACCURACY}%`}
//    </div>
//    <div className="expand-icon">{isExpanded ? "▼" : "▶"}</div>
//  </div>

//  {isExpanded && (
//    <div className="stock-details">
//      <div className="ai-analysis-section">
//        <button
//          className="ai-analysis-button"
//          onClick={(e) => {
//            e.stopPropagation()
//            fetchAiAnalysis(symbol)
//          }}
//          disabled={aiLoading[symbol] || isLoadingData || isNotAvailable}
//        >
//          {aiLoading[symbol] ? "Generating AI Analysis..." : "🤖 Get AI Analysis"}
//        </button>
//      </div>

//      <div className="timeframe-indicators">
//        <h4>Hierarchical Analysis</h4>
//        <div className="timeframe-grid">
//          {(["MONTHLY", "WEEKLY", "DAILY", "4HOUR"] as const).map((tf) => {
//            const tfData = stockData[`${tf}_TIMEFRAME`]
//            if (!tfData) return null
//            const isLoadingTf = tfData.VERDICT === "Loading..."
//            const isTfNotAvailable = tfData.status === "Not Available"

//            return (
//              <div key={tf} className={`timeframe-indicator ${tf.toLowerCase()} ${isLoadingTf || isTfNotAvailable ? "loading" : ""}`}>
//                <span className="tf-label">{tf === "4HOUR" ? "4H" : tf.charAt(0) + tf.slice(1).toLowerCase()}</span>
//                <span className={`tf-verdict ${getVerdictColor(tfData.VERDICT)}`}>
//                  {isLoadingTf ? (
//                    <div className="loading-dots small">
//                      <span></span>
//                      <span></span>
//                      <span></span>
//                    </div>
//                  ) : (
//                    tfData.VERDICT
//                  )}
//                </span>
//                <span className="tf-confidence">{isLoadingTf || isTfNotAvailable ? "--" : tfData.CONFIDENCE_SCORE}</span>
//              </div>
//            )
//          })}
//        </div>
//      </div>

//      <div className="details-grid">
//        <div className="detail-section">
//          <h4>Price Data</h4>
//          <div className="detail-item">
//            <span>Current Price:</span>
//            <span>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                `${market === "Crypto" ? "$" : market === "Nigerian" ? "₦" : "$"}${currentData.DETAILS.price_data.current_price.toFixed(2)}`
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>Entry Price:</span>
//            <span>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                `${market === "Crypto" ? "$" : market === "Nigerian" ? "₦" : "$"}${currentData.DETAILS.price_data.entry_price.toFixed(2)}`
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>Stop Loss:</span>
//            <span>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                `${market === "Crypto" ? "$" : market === "Nigerian" ? "₦" : "$"}${currentData.DETAILS.price_data.stop_loss.toFixed(2)}`
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>Targets:</span>
//            <span>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                currentData.DETAILS.price_data.target_prices
//                  .map((t) => `${market === "Crypto" ? "$" : market === "Nigerian" ? "₦" : "$"}${t.toFixed(2)}`)
//                  .join(", ")
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>1D Change:</span>
//            <span className={isLoadingData ? "" : getChangeColor(currentData.DETAILS.price_data.change_1d)}>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                <>
//                  {currentData.DETAILS.price_data.change_1d > 0 ? "+" : ""}
//                  {currentData.DETAILS.price_data.change_1d.toFixed(2)}%
//                </>
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>1W Change:</span>
//            <span className={isLoadingData ? "" : getChangeColor(currentData.DETAILS.price_data.change_1w)}>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                <>
//                  {currentData.DETAILS.price_data.change_1w > 0 ? "+" : ""}
//                  {currentData.DETAILS.price_data.change_1w.toFixed(2)}%
//                </>
//              )}
//            </span>
//          </div>
//        </div>

//        <div className="detail-section">
//          <h4>Technical Indicators</h4>
//          <div className="detail-item">
//            <span>RSI:</span>
//            <span
//              className={
//                isLoadingData
//                  ? ""
//                  : currentData.DETAILS.technical_indicators.rsi > 70
//                    ? "indicator-overbought"
//                    : currentData.DETAILS.technical_indicators.rsi < 30
//                      ? "indicator-oversold"
//                      : "indicator-neutral"
//              }
//            >
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                currentData.DETAILS.technical_indicators.rsi.toFixed(1)
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>ADX:</span>
//            <span>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                currentData.DETAILS.technical_indicators.adx.toFixed(1)
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>ATR:</span>
//            <span>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                currentData.DETAILS.technical_indicators.atr.toFixed(2)
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>Cycle Phase:</span>
//            <span>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                currentData.DETAILS.technical_indicators.cycle_phase
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>Momentum:</span>
//            <span
//              className={
//                isLoadingData ? "" : getChangeColor(currentData.DETAILS.technical_indicators.cycle_momentum * 100)
//              }
//            >
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                `${(currentData.DETAILS.technical_indicators.cycle_momentum * 100).toFixed(2)}%`
//              )}
//            </span>
//          </div>
//        </div>

//        <div className="detail-section">
//          <h4>Individual Verdicts</h4>
//          <div className="verdict-grid">
//            {Object.entries(currentData.DETAILS.individual_verdicts).map(([key, value]) => (
//              <div key={key} className="verdict-item">
//                <span>{key.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}:</span>
//                <span className={`verdict-badge ${String(value).toLowerCase().replace(" ", "-")}`}>
//                  {isLoadingData ? <div className="loading-placeholder small">--</div> : String(value)}
//                </span>
//              </div>
//            ))}
//          </div>
//        </div>

//        <div className="detail-section">
//          <h4>Fundamentals</h4>
//          {market === "Crypto" ? (
//            <>
//              <div className="detail-item">
//                <span>Market Cap Rank:</span>
//                <span>
//                  {isLoadingData ? (
//                    <div className="loading-placeholder">--</div>
//                  ) : (
//                    currentData.DETAILS.fundamentals.Market_Cap_Rank
//                  )}
//                </span>
//              </div>
//              <div className="detail-item">
//                <span>Adoption Score:</span>
//                <span className={isLoadingData ? "" : "change-positive"}>
//                  {isLoadingData ? (
//                    <div className="loading-placeholder">--</div>
//                  ) : (
//                    `${(currentData.DETAILS.fundamentals.Adoption_Score! * 100).toFixed(1)}%`
//                  )}
//                </span>
//              </div>
//              <div className="detail-item">
//                <span>Technology Score:</span>
//                <span className={isLoadingData ? "" : "change-positive"}>
//                  {isLoadingData ? (
//                    <div className="loading-placeholder">--</div>
//                  ) : (
//                    `${(currentData.DETAILS.fundamentals.Technology_Score! * 100).toFixed(1)}%`
//                  )}
//                </span>
//              </div>
//            </>
//          ) : (
//            <>
//              <div className="detail-item">
//                <span>P/E Ratio:</span>
//                <span>
//                  {isLoadingData ? (
//                    <div className="loading-placeholder">--</div>
//                  ) : (
//                    currentData.DETAILS.fundamentals.PE_Ratio?.toFixed(2) || "N/A"
//                  )}
//                </span>
//              </div>
//              <div className="detail-item">
//                <span>EPS:</span>
//                <span>
//                  {isLoadingData ? (
//                    <div className="loading-placeholder">--</div>
//                  ) : (
//                    `${market === "Nigerian" ? "₦" : "$"}${currentData.DETAILS.fundamentals.EPS?.toFixed(2) || "N/A"}`
//                  )}
//                </span>
//              </div>
//              <div className="detail-item">
//                <span>Revenue Growth:</span>
//                <span className={isLoadingData ? "" : "change-positive"}>
//                  {isLoadingData ? (
//                    <div className="loading-placeholder">--</div>
//                  ) : (
//                    `${currentData.DETAILS.fundamentals.revenue_growth?.toFixed(2) || 0}%`
//                  )}
//                </span>
//              </div>
//              <div className="detail-item">
//                <span>Income Growth:</span>
//                <span className={isLoadingData ? "" : "change-positive"}>
//                  {isLoadingData ? (
//                    <div className="loading-placeholder">--</div>
//                  ) : (
//                    `${currentData.DETAILS.fundamentals.net_income_growth?.toFixed(2) || 0}%`
//                  )}
//                </span>
//              </div>
//            </>
//          )}
//        </div>

//        <div className="detail-section">
//          <h4>Sentiment Analysis</h4>
//          <div className="detail-item">
//            <span>Score:</span>
//            <span>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                currentData.DETAILS.sentiment_analysis.score.toFixed(2)
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>Interpretation:</span>
//            <span
//              className={`verdict-badge ${currentData.DETAILS.sentiment_analysis.interpretation.toLowerCase()}`}
//            >
//              {isLoadingData ? (
//                <div className="loading-placeholder small">--</div>
//              ) : (
//                currentData.DETAILS.sentiment_analysis.interpretation
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>Market Mood:</span>
//            <span>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                currentData.DETAILS.sentiment_analysis.market_mood
//              )}
//            </span>
//          </div>
//        </div>

//        <div className="detail-section">
//          <h4>Cycle Analysis</h4>
//          <div className="detail-item">
//            <span>Current Phase:</span>
//            <span className={`verdict-badge ${currentData.DETAILS.cycle_analysis.current_phase.toLowerCase()}`}>
//              {isLoadingData ? (
//                <div className="loading-placeholder small">--</div>
//              ) : (
//                currentData.DETAILS.cycle_analysis.current_phase
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>Stage:</span>
//            <span>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                currentData.DETAILS.cycle_analysis.stage
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>Duration:</span>
//            <span>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                `${currentData.DETAILS.cycle_analysis.duration_days} days`
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>Bull Probability:</span>
//            <span className={isLoadingData ? "" : "change-positive"}>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                `${currentData.DETAILS.cycle_analysis.bull_continuation_probability}%`
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>Bear Probability:</span>
//            <span className={isLoadingData ? "" : "change-negative"}>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                `${currentData.DETAILS.cycle_analysis.bear_transition_probability}%`
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>Risk Level:</span>
//            <span>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                currentData.DETAILS.cycle_analysis.risk_level
//              )}
//            </span>
//          </div>
//        </div>

//        <div className="detail-section">
//          <h4>Trading Parameters</h4>
//          <div className="detail-item">
//            <span>Position Size:</span>
//            <span>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                currentData.DETAILS.trading_parameters.position_size
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>Timeframe:</span>
//            <span>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                currentData.DETAILS.trading_parameters.timeframe
//              )}
//            </span>
//          </div>
//          <div className="detail-item">
//            <span>Risk Level:</span>
//            <span>
//              {isLoadingData ? (
//                <div className="loading-placeholder">--</div>
//              ) : (
//                currentData.DETAILS.trading_parameters.risk_level
//              )}
//            </span>
//          </div>
//        </div>

//        <div className="detail-section">
//          <h4>Patterns Detected</h4>
//          <div className="pattern-list">
//            <div>
//              <strong>Geometric:</strong>{" "}
//              {isLoadingData ? (
//                <div className="loading-placeholder inline">--</div>
//              ) : (
//                currentData.DETAILS.patterns.geometric.join(", ") || "None"
//              )}
//            </div>
//            <div>
//              <strong>Elliott Wave:</strong>{" "}
//              {isLoadingData ? (
//                <div className="loading-placeholder inline">--</div>
//              ) : (
//                currentData.DETAILS.patterns.elliott_wave.join(", ") || "None"
//              )}
//            </div>
//            <div>
//              <strong>Confluence:</strong>{" "}
//              {isLoadingData ? (
//                <div className="loading-placeholder inline">--</div>
//              ) : (
//                currentData.DETAILS.patterns.confluence_factors.join(", ") || "None"
//              )}
//            </div>
//          </div>
//        </div>
//      </div>
//    </div>
//  )}
// </div>
// )
// }

// // AI Analysis Modal
// const renderAiModal = () => {
// if (!showAiModal || !aiAnalysis || !aiAnalysis[showAiModal]) return null

// const analysis = aiAnalysis[showAiModal]

// return (
// <div className="ai-modal-overlay" onClick={() => setShowAiModal(null)}>
//  <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
//    <div className="ai-modal-header">
//      <h2>🤖 AI Analysis for {analysis.symbol}</h2>
//      <button className="close-button" onClick={() => setShowAiModal(null)}>
//        ×
//      </button>
//    </div>
//    <div className="ai-modal-content">
//      {analysis.ai_analysis.error ? (
//        <div className="ai-error">
//          <p>
//            <strong>Error:</strong> {analysis.ai_analysis.error}
//          </p>
//          <p>{analysis.ai_analysis.message}</p>
//        </div>
//      ) : (
//        <div className="ai-analysis-text">
//          <div className="ai-meta">
//            <span>Model: {analysis.ai_analysis.model}</span>
//            <span>Generated: {analysis.ai_analysis.timestamp}</span>
//          </div>
//          <div className="ai-content">
//            {analysis.ai_analysis.analysis.split("\n").map((paragraph, index) => (
//              <p key={index}>{paragraph}</p>
//            ))}
//          </div>
//        </div>
//      )}
//    </div>
//  </div>
// </div>
// )
// }

// if (error && !showAnalysisPage) {
// return (
// <div className="app">
//  <div className="error-container">
//    <h2>Something went wrong!</h2>
//    <p>{error}</p>
//    <p>API URL: {API_BASE_URL}</p>
//    <button onClick={() => fetchData(false)} className="retry-button">
//      Try Loading Cached Data
//    </button>
//    <button onClick={() => fetchData(true)} className="retry-button">
//      Force Fresh Analysis
//    </button>
//  </div>
// </div>
// )
// }

// if (!showAnalysisPage && !hasInitialData) {
// return (
// <div className="app">
//  <div className="no-data-container">
//    <h2>Multi-Asset Analysis Dashboard v4.0 - US, Nigerian & Crypto</h2>
//    <p>Analyze 35 popular assets from US, Nigerian, and Crypto markets</p>
//    <p>🚀 Features: Persistent Data (24hr Cache) + Background Processing + AI Integration</p>
//    <p>⚡ Optimized: ~5 minutes processing time</p>
//    <p>📊 US Stocks: 10 | Nigerian Stocks: 15 | Crypto: 10</p>
//    <p>🤖 AI Analysis: Available with Claude integration</p>
//    <p>🕐 Auto-refresh: Daily at 5:00 PM</p>
//    <p>📡 Data Sources: Twelve Data, NaijaStocksAPI, CryptoCompare</p>

//    <div className="action-buttons">
//      <button onClick={() => fetchData(false)} className="primary-button">
//        📊 Go to Analysis
//      </button>
//      <button onClick={() => fetchData(true)} className="secondary-button">
//        🔄 Start Fresh Analysis
//      </button>
//    </div>

//    <p className="note">
//      "Go to Analysis" loads cached data instantly.
//      <br />
//      "Start Fresh Analysis" runs new analysis (~5 minutes).
//      <br />
//      Note: Nigerian stocks and Crypto assets only available in DAILY timeframe.
//    </p>
//  </div>
// </div>
// )
// }

// // Group stocks by market type
// const groupStocksByMarket = () => {
// const stocks = Object.keys(data || {}).filter(
// (key) =>
//  ![
//    "timestamp",
//    "stocks_analyzed",
//    "total_requested",
//    "success_rate",
//    "status",
//    "data_sources",
//    "markets",
//    "processing_info",
//    "data_source",
//    "note",
//    "processing_time_minutes",
//  ].includes(key),
// )

// const grouped = {
// US: [] as string[],
// Nigerian: [] as string[],
// Crypto: [] as string[],
// }

// stocks.forEach((symbol) => {
// const market = data![symbol]?.market || "Unknown"
// if (market === "US") {
//  grouped.US.push(symbol)
// } else if (market === "Nigerian") {
//  grouped.Nigerian.push(symbol)
// } else if (market === "Crypto") {
//  grouped.Crypto.push(symbol)
// }
// })

// // Sort each group alphabetically
// grouped.US.sort()
// grouped.Nigerian.sort()
// grouped.Crypto.sort()

// return grouped
// }

// const groupedStocks = groupStocksByMarket()

// return (
// <div className="app">
// <header className="app-header">
//  <h1>Multi-Asset Analysis Dashboard v4.0</h1>
//  <div className="header-info">
//    <span>Last Updated: {data?.timestamp || "N/A"}</span>
//    <span>Assets Analyzed: {data?.stocks_analyzed || 0}/{data?.total_requested || 35}</span>
//    {data?.processing_time_minutes && <span>Processing Time: {data.processing_time_minutes.toFixed(2)}min</span>}
//    {data?.markets && (
//      <>
//        <span>US: {data.markets.us_stocks}</span>
//        <span>Nigerian: {data.markets.nigerian_stocks}</span>
//        <span>Crypto: {data.markets.crypto_assets}</span>
//      </>
//    )}
//    {data?.data_sources && (
//      <>
//        <span>Twelve Data: {data.data_sources.twelve_data_count}</span>
//        <span>NaijaStocks: {data.data_sources.naijastocks_count}</span>
//        <span>CryptoCompare: {data.data_sources.cryptcompare_count}</span>
//      </>
//    )}
//    <span className={`status ${data?.status}`}>Status: {data?.status || "loading"}</span>
//    {data?.processing_info?.ai_analysis_available && (
//      <span className="ai-available">🤖 AI Analysis Available</span>
//    )}
//    {data?.data_source === "database_cache" && <span className="cache-indicator">📦 Cached Data (24hr)</span>}
//    {isAnalyzing && <span className="analyzing-indicator">🔄 Analyzing...</span>}
//  </div>
//  {data?.note && (
//    <div className="data-note">
//      <p>{data.note}</p>
//    </div>
//  )}
// </header>

// {renderProgressBar()}

// <div className="controls">
//  <div className="timeframe-toggle">
//    {(["MONTHLY", "WEEKLY", "DAILY", "4HOUR"] as const).map((tf) => (
//      <button
//        key={tf}
//        className={timeframe === tf ? "active" : ""}
//        onClick={() => setTimeframe(tf)}
//        disabled={
//          groupedStocks.Nigerian.length > 0 &&
//          tf !== "DAILY" &&
//          expandedStocks.size > 0 &&
//          Array.from(expandedStocks).every((s) => data![s].market === "Nigerian" || data![s].market === "Crypto")
//        }
//        title={
//          groupedStocks.Nigerian.length > 0 &&
//          tf !== "DAILY" &&
//          expandedStocks.size > 0 &&
//          Array.from(expandedStocks).every((s) => data![s].market === "Nigerian" || data![s].market === "Crypto")
//            ? "Only DAILY timeframe available for Nigerian stocks and Crypto assets"
//            : undefined
//        }
//      >
//        {tf === "4HOUR" ? "4H" : tf.charAt(0) + tf.slice(1).toLowerCase()}
//      </button>
//    ))}
//  </div>

//  <div className="action-buttons">
//    <button onClick={() => fetchData(false)} className="cache-button" disabled={isAnalyzing}>
//      📦 Load Cached
//    </button>
//    <button onClick={() => fetchData(true)} className="refresh-button" disabled={isAnalyzing}>
//      🔄 Fresh Analysis
//    </button>
//  </div>
// </div>

// <div className="markets-container">
//  {/* US Stocks Section */}
//  {groupedStocks.US.length > 0 && (
//    <div className="market-section">
//      <div className="market-header">
//        <h2>🇺🇸 US Stocks ({groupedStocks.US.length})</h2>
//        <div className="market-stats">
//          <span>Data Source: Twelve Data</span>
//          <span>Market: NASDAQ, NYSE</span>
//        </div>
//      </div>
//      <div className="stocks-container">
//        {groupedStocks.US.map((symbol) => renderStockCard(symbol, data![symbol]))}
//      </div>
//    </div>
//  )}

//  {/* Nigerian Stocks Section */}
//  {groupedStocks.Nigerian.length > 0 && (
//    <div className="market-section">
//      <div className="market-header">
//        <h2>🇳🇬 Nigerian Stocks ({groupedStocks.Nigerian.length})</h2>
//        <div className="market-stats">
//          <span>Data Source: NaijaStocksAPI</span>
//          <span>Market: Nigerian Stock Exchange</span>
//          <span className="timeframe-note">Note: Only DAILY timeframe available</span>
//        </div>
//      </div>
//      <div className="stocks-container">
//        {groupedStocks.Nigerian.map((symbol) => renderStockCard(symbol, data![symbol]))}
//      </div>
//    </div>
//  )}

//  {/* Crypto Section */}
//  {groupedStocks.Crypto.length > 0 && (
//    <div className="market-section">
//      <div className="market-header">
//        <h2>₿ Cryptocurrency ({groupedStocks.Crypto.length})</h2>
//        <div className="market-stats">
//          <span>Data Source: CryptoCompare</span>
//          <span>Market: Global Crypto Markets</span>
//          <span className="timeframe-note">Note: Only DAILY timeframe available</span>
//        </div>
//      </div>
//      <div className="stocks-container">
//        {groupedStocks.Crypto.map((symbol) => renderStockCard(symbol, data![symbol]))}
//      </div>
//    </div>
//  )}
// </div>

// {renderAiModal()}
// </div>
// )
// }

// export default App



// "use client"

// import type React from "react"
// import { useState, useEffect, useCallback, useRef } from "react"
// import "./App.css"

// // Update to your actual API URL
// // const API_BASE_URL = "https://stock-be-j9p2.onrender.com"
// const API_BASE_URL = "http://localhost:5000"

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
//     total: 35,
//     percentage: 0,
//     currentSymbol: "",
//     stage: "Initializing...",
//     estimatedTimeRemaining: 0,
//   })
//   const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
//   const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "error">("connecting")

//   // Refs for cleanup
//   const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
//   const dataPollingRef = useRef<NodeJS.Timeout | null>(null)
//   const isRequestingRef = useRef<boolean>(false)
//   const lastRequestTimeRef = useRef<number>(0)

//   // Generate placeholder data for loading state
//   const generatePlaceholderData = useCallback((): ApiResponse => {
//     const placeholderStocks: { [key: string]: any } = {}

//     // US Stocks (10)
//     const usStocks = ["AAPL", "MSFT", "GOOGL", "TSLA", "AMZN", "NVDA", "META", "NFLX", "JPM", "V"]

//     // Nigerian Stocks (15) - FIXED: Use correct symbols without .NG suffix
//     const nigerianStocks = [
//       "ACCESS",
//       "GTCO",
//       "UBA",
//       "ZENITHBANK",
//       "FBNH",
//       "DANGCEM",
//       "BUACEMENT",
//       "WAPCO",
//       "DANGSUGAR",
//       "NESTLE",
//       "UNILEVER",
//       "SEPLAT",
//       "TOTAL",
//       "MTNN",
//       "TRANSCORP",
//     ]

//     // Crypto (10)
//     const cryptoStocks = ["BTC", "ETH", "BNB", "SOL", "ADA", "AVAX", "DOT", "LINK", "MATIC", "LTC"]

//     const allSymbols = [...usStocks, ...nigerianStocks, ...cryptoStocks]

//     allSymbols.forEach((symbol) => {
//       const market = cryptoStocks.includes(symbol) ? "Crypto" : nigerianStocks.includes(symbol) ? "Nigerian" : "US"
//       const dataSource = cryptoStocks.includes(symbol)
//         ? "cryptcompare"
//         : nigerianStocks.includes(symbol)
//           ? "naijastocks"
//           : "twelve_data"

//       const createTimeframeData = (isAvailable = true) => ({
//         PRICE: isAvailable ? 0 : 0,
//         ACCURACY: isAvailable ? 0 : 0,
//         CONFIDENCE_SCORE: isAvailable ? 0 : 0,
//         VERDICT: isAvailable ? "Loading..." : "Not Available",
//         status: isAvailable ? undefined : "Not Available",
//         message: isAvailable ? undefined : getNotAvailableMessage(market, symbol),
//         DETAILS: {
//           individual_verdicts: {
//             rsi_verdict: "Loading...",
//             adx_verdict: "Loading...",
//             momentum_verdict: "Loading...",
//             pattern_verdict: "Loading...",
//             fundamental_verdict: "Loading...",
//             sentiment_verdict: "Loading...",
//             cycle_verdict: "Loading...",
//           },
//           price_data: {
//             current_price: 0,
//             entry_price: 0,
//             target_prices: [0, 0],
//             stop_loss: 0,
//             change_1d: 0,
//             change_1w: 0,
//           },
//           technical_indicators: {
//             rsi: 0,
//             adx: 0,
//             atr: 0,
//             cycle_phase: "Loading...",
//             cycle_momentum: 0,
//           },
//           patterns: {
//             geometric: ["Loading..."],
//             elliott_wave: ["Loading..."],
//             confluence_factors: ["Loading..."],
//           },
//           fundamentals:
//             market === "Crypto"
//               ? {
//                   Market_Cap_Rank: 0,
//                   Adoption_Score: 0,
//                   Technology_Score: 0,
//                 }
//               : {
//                   PE_Ratio: 0,
//                   EPS: 0,
//                   revenue_growth: 0,
//                   net_income_growth: 0,
//                 },
//           sentiment_analysis: {
//             score: 0,
//             interpretation: "Loading...",
//             market_mood: "Loading...",
//           },
//           cycle_analysis: {
//             current_phase: "Loading...",
//             stage: "Loading...",
//             duration_days: 0,
//             momentum: 0,
//             momentum_visual: "Loading...",
//             bull_continuation_probability: 0,
//             bear_transition_probability: 0,
//             expected_continuation: "Loading...",
//             risk_level: "Loading...",
//           },
//           trading_parameters: {
//             position_size: "Loading...",
//             timeframe: "Loading...",
//             risk_level: "Loading...",
//           },
//         },
//       })

//       placeholderStocks[symbol] = {
//         data_source: dataSource,
//         market: market,
//         DAILY_TIMEFRAME: createTimeframeData(true),
//         WEEKLY_TIMEFRAME: createTimeframeData(market !== "Nigerian"),
//         MONTHLY_TIMEFRAME: createTimeframeData(market !== "Nigerian"),
//         "4HOUR_TIMEFRAME": createTimeframeData(market === "US"),
//       }
//     })

//     return {
//       timestamp: new Date().toISOString(),
//       stocks_analyzed: 0,
//       total_requested: 35,
//       success_rate: 0,
//       status: "loading",
//       data_source: "loading",
//       markets: {
//         us_stocks: usStocks.length,
//         nigerian_stocks: nigerianStocks.length,
//         crypto_assets: cryptoStocks.length,
//       },
//       data_sources: {
//         twelve_data_count: 0,
//         naijastocks_count: 0,
//         cryptcompare_count: 0,
//       },
//       processing_info: {
//         hierarchical_analysis: true,
//         timeframes_analyzed: ["monthly", "weekly", "daily", "4hour"],
//         ai_analysis_available: true,
//         background_processing: true,
//         daily_auto_refresh: "5:00 PM",
//       },
//       ...placeholderStocks,
//     }
//   }, [])

//   const getNotAvailableMessage = (market: string, _symbol: string, timeframe?: string) => {
//     if (market === "Nigerian") {
//       if (timeframe && timeframe !== "DAILY_TIMEFRAME") {
//         return "Historical data not available for Nigerian stocks via NaijaStocksAPI"
//       }
//       return "Data not available for this timeframe"
//     }
//     if (market === "Crypto") {
//       if (timeframe === "4HOUR_TIMEFRAME" || timeframe === "4hour" || timeframe === "4-hour") {
//         return "4-hour data not available via CryptoCompare free tier"
//       }
//       return "Data not available for this timeframe"
//     }
//     if (market === "US") {
//       if (timeframe && (timeframe === "WEEKLY_TIMEFRAME" || timeframe === "MONTHLY_TIMEFRAME")) {
//         return "Insufficient historical data for this timeframe"
//       }
//     }
//     return "Data not available for this timeframe"
//   }

//   // Cleanup function
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

//   // Poll for progress updates
//   const pollProgress = useCallback(async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/progress`, {
//         headers: { Accept: "application/json" },
//       })
//       if (response.ok) {
//         const progressData: ProgressInfo = await response.json()
//         setProgress(progressData)

//         // Check if analysis is complete - either 100% OR stage indicates completion
//         const isComplete =
//           progressData.percentage >= 100 ||
//           progressData.stage.toLowerCase().includes("complete") ||
//           progressData.stage.toLowerCase().includes("finished") ||
//           progressData.stage.toLowerCase().includes("ready")

//         if (isComplete) {
//           console.log("Analysis marked as complete, stopping polling and fetching results...")
//           setIsAnalyzing(false)
//           cleanup()
//           // Wait a moment then fetch final data
//           dataPollingRef.current = setTimeout(() => {
//             fetchFinalData()
//           }, 1000)
//         }
//       } else {
//         throw new Error(`Progress fetch failed: HTTP ${response.status}`)
//       }
//     } catch (err) {
//       console.error("Error polling progress:", err)
//     }
//   }, [cleanup])

//   // Fetch final data after analysis completion
//   const fetchFinalData = useCallback(async () => {
//     try {
//       console.log("Fetching final analysis data...")
//       const response = await fetch(`${API_BASE_URL}/analyze`, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//         },
//       })

//       if (response.ok) {
//         const result: ApiResponse = await response.json()
//         console.log("Final data received:", result)

//         // Accept any successful result, even if not all stocks were analyzed
//         if (result.status === "success" || result.data_source === "database_cache" || result.stocks_analyzed > 0) {
//           setData(result)
//           setLoading(false)
//           setHasInitialData(true)
//           setError(null)
//           console.log(`Analysis complete! Successfully loaded ${result.stocks_analyzed} assets.`)
//         } else if (result.status === "analysis_triggered") {
//           // Analysis was just triggered, continue polling
//           console.log("Analysis triggered, continuing to poll...")
//           if (!progressIntervalRef.current) {
//             progressIntervalRef.current = setInterval(pollProgress, 2000)
//           }
//         }
//       } else {
//         throw new Error(`HTTP ${response.status}`)
//       }
//     } catch (err) {
//       console.error("Error fetching final data:", err)
//       setError("Failed to fetch final analysis data")
//       setLoading(false)
//     }
//   }, [pollProgress])

//   // Start analysis and show loading page immediately
//   const startAnalysis = useCallback(
//     async (fresh = false) => {
//       console.log(`Starting ${fresh ? "fresh" : "cached"} analysis...`)

//       setShowAnalysisPage(true)
//       setIsAnalyzing(true)
//       setLoading(true)
//       setError(null)
//       cleanup()

//       // Show placeholder data immediately
//       const placeholderData = generatePlaceholderData()
//       setData(placeholderData)
//       setHasInitialData(true)

//       // Reset progress
//       setProgress({
//         current: 0,
//         total: 35,
//         percentage: 0,
//         currentSymbol: "Initializing...",
//         stage: "Starting analysis...",
//         estimatedTimeRemaining: 300,
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
//           console.log("Analysis response:", result)

//           if (result.status === "success" || result.data_source === "database_cache") {
//             // We got immediate data (cached)
//             setData(result)
//             setIsAnalyzing(false)
//             setLoading(false)
//           } else if (result.status === "analysis_triggered" || result.status === "analysis_in_progress") {
//             // Analysis was triggered, start polling for progress
//             console.log("Analysis triggered, starting progress polling...")
//             progressIntervalRef.current = setInterval(pollProgress, 2000)
//           }
//         } else {
//           throw new Error(`HTTP ${response.status}`)
//         }
//       } catch (err) {
//         console.error("Analysis error:", err)
//         setError(err instanceof Error ? err.message : "Analysis failed")
//         setIsAnalyzing(false)
//         setLoading(false)
//         cleanup()
//       }
//     },
//     [generatePlaceholderData, pollProgress, cleanup],
//   )

//   const fetchData = useCallback(
//     async (fresh = false) => {
//       if (isRequestingRef.current) {
//         console.log("Fetch already in progress, skipping...")
//         return
//       }

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
//       console.error("AI Analysis error:", err)
//       setError(err instanceof Error ? err.message : "Failed to get AI analysis")
//     } finally {
//       setAiLoading((prev) => ({ ...prev, [symbol]: false }))
//     }
//   }

//   // Test API connection and load initial data
//   const testConnection = useCallback(async () => {
//     if (isRequestingRef.current) {
//       console.log("Connection test already in progress, skipping...")
//       return
//     }

//     const now = Date.now()
//     if (now - lastRequestTimeRef.current < 2000) {
//       console.log("Connection test debounced, too soon since last request")
//       return
//     }

//     try {
//       console.log("Testing API connection...")
//       isRequestingRef.current = true
//       lastRequestTimeRef.current = now
//       setConnectionStatus("connecting")

//       const response = await fetch(`${API_BASE_URL}/health`, {
//         headers: { Accept: "application/json" },
//       })

//       if (!response.ok) {
//         throw new Error(`Health check failed: HTTP ${response.status}`)
//       }

//       const result = await response.json()
//       console.log("Health check result:", result)
//       setConnectionStatus("connected")

//       if (result.data_status?.has_cached_data && !hasInitialData) {
//         console.log("Found cached data, loading automatically...")
//         await fetchData(false)
//       }
//     } catch (err) {
//       console.error("Health check failed:", err)
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
//   }, [])

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
//     if (verdict === "Loading..." || verdict === "Not Available") return "verdict-loading"

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

//   // FIXED: Enhanced stock card rendering with better error handling
//   const renderStockCard = (symbol: string, stockData: any) => {
//     if (!stockData) {
//       console.warn(`No stock data for ${symbol}`)
//       return null
//     }

//     const timeframeKey = `${timeframe}_TIMEFRAME`
//     const currentData: StockData = stockData[timeframeKey]

//     // FIXED: Better handling of missing timeframe data
//     if (!currentData) {
//       console.warn(`No ${timeframe} data for ${symbol}`)
//       // Create a fallback data structure
//       const fallbackData = {
//         PRICE: 0,
//         ACCURACY: 0,
//         CONFIDENCE_SCORE: 0,
//         VERDICT: "No Data",
//         status: "Not Available",
//         message: `${timeframe} timeframe data not available for ${symbol}`,
//         DETAILS: {
//           individual_verdicts: {
//             rsi_verdict: "N/A",
//             adx_verdict: "N/A",
//             momentum_verdict: "N/A",
//             pattern_verdict: "N/A",
//             fundamental_verdict: "N/A",
//             sentiment_verdict: "N/A",
//             cycle_verdict: "N/A",
//           },
//           price_data: {
//             current_price: 0,
//             entry_price: 0,
//             target_prices: [0, 0],
//             stop_loss: 0,
//             change_1d: 0,
//             change_1w: 0,
//           },
//           technical_indicators: { rsi: 0, adx: 0, atr: 0, cycle_phase: "N/A", cycle_momentum: 0 },
//           patterns: { geometric: ["N/A"], elliott_wave: ["N/A"], confluence_factors: ["N/A"] },
//           fundamentals: { PE_Ratio: 0, EPS: 0, revenue_growth: 0, net_income_growth: 0 },
//           sentiment_analysis: { score: 0, interpretation: "N/A", market_mood: "N/A" },
//           cycle_analysis: {
//             current_phase: "N/A",
//             stage: "N/A",
//             duration_days: 0,
//             momentum: 0,
//             momentum_visual: "N/A",
//             bull_continuation_probability: 0,
//             bear_transition_probability: 0,
//             expected_continuation: "N/A",
//             risk_level: "N/A",
//           },
//           trading_parameters: { position_size: "N/A", timeframe: "N/A", risk_level: "N/A" },
//         },
//       }
//       // Use fallback data but still render the card
//       return renderStockCardContent(symbol, stockData, fallbackData)
//     }

//     return renderStockCardContent(symbol, stockData, currentData)
//   }

//   // FIXED: Separate function for rendering stock card content
//   const renderStockCardContent = (symbol: string, stockData: any, currentData: StockData) => {
//     const isExpanded = expandedStocks.has(symbol)
//     const dataSource = stockData.data_source || "unknown"
//     const market = stockData.market || "Unknown"
//     const assetIcon = getAssetTypeIcon(symbol, market)
//     const sourceBadge = getDataSourceBadge(dataSource)
//     const isLoadingData = dataSource === "loading" || currentData.VERDICT === "Loading..."
//     const isNotAvailable = currentData.status === "Not Available" || currentData.VERDICT === "No Data"

//     // FIXED: Better handling of not available data
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
//                   <p>4-hour data not available for crypto assets on free tier.</p>
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
//                 {aiLoading[symbol] ? "Generating AI Analysis..." : "🤖 Get AI Analysis"}
//               </button>
//             </div>

//             <div className="timeframe-indicators">
//               <h4>Hierarchical Analysis</h4>
//               <div className="timeframe-grid">
//                 {(["MONTHLY", "WEEKLY", "DAILY", "4HOUR"] as const).map((tf) => {
//                   const tfData = stockData[`${tf}_TIMEFRAME`]
//                   if (!tfData) {
//                     return (
//                       <div key={tf} className="timeframe-indicator loading">
//                         <span className="tf-label">
//                           {tf === "4HOUR" ? "4H" : tf.charAt(0) + tf.slice(1).toLowerCase()}
//                         </span>
//                         <span className="tf-verdict verdict-loading">N/A</span>
//                         <span className="tf-confidence">--</span>
//                       </div>
//                     )
//                   }

//                   const isLoadingTf = tfData.VERDICT === "Loading..."
//                   const isTfNotAvailable = tfData.status === "Not Available"

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

//             {/* Rest of the details sections with better null checking */}
//             <div className="details-grid">
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

//               {/* Technical Indicators Section */}
//               <div className="detail-section">
//                 <h4>Technical Indicators</h4>
//                 <div className="detail-item">
//                   <span>RSI:</span>
//                   <span
//                     className={
//                       isLoadingData
//                         ? ""
//                         : (currentData.DETAILS?.technical_indicators?.rsi || 0) > 70
//                           ? "indicator-overbought"
//                           : (currentData.DETAILS?.technical_indicators?.rsi || 0) < 30
//                             ? "indicator-oversold"
//                             : "indicator-neutral"
//                     }
//                   >
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       (currentData.DETAILS?.technical_indicators?.rsi || 0).toFixed(1)
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>ADX:</span>
//                   <span>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       (currentData.DETAILS?.technical_indicators?.adx || 0).toFixed(1)
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>ATR:</span>
//                   <span>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       (currentData.DETAILS?.technical_indicators?.atr || 0).toFixed(2)
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Cycle Phase:</span>
//                   <span>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       currentData.DETAILS?.technical_indicators?.cycle_phase || "N/A"
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Momentum:</span>
//                   <span
//                     className={
//                       isLoadingData
//                         ? ""
//                         : getChangeColor((currentData.DETAILS?.technical_indicators?.cycle_momentum || 0) * 100)
//                     }
//                   >
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       `${((currentData.DETAILS?.technical_indicators?.cycle_momentum || 0) * 100).toFixed(2)}%`
//                     )}
//                   </span>
//                 </div>
//               </div>

//               {/* Individual Verdicts Section */}
//               <div className="detail-section">
//                 <h4>Individual Verdicts</h4>
//                 <div className="verdict-grid">
//                   {currentData.DETAILS?.individual_verdicts ? (
//                     Object.entries(currentData.DETAILS.individual_verdicts).map(([key, value]) => (
//                       <div key={key} className="verdict-item">
//                         <span>{key.replace("_", " ").replace(/\b\w/g, (l) => l.toUpperCase())}:</span>
//                         <span className={`verdict-badge ${String(value).toLowerCase().replace(" ", "-")}`}>
//                           {isLoadingData ? <div className="loading-placeholder small">--</div> : String(value)}
//                         </span>
//                       </div>
//                     ))
//                   ) : (
//                     <div>No verdict data available</div>
//                   )}
//                 </div>
//               </div>

//               {/* Fundamentals Section */}
//               <div className="detail-section">
//                 <h4>Fundamentals</h4>
//                 {market === "Crypto" ? (
//                   <>
//                     <div className="detail-item">
//                       <span>Market Cap Rank:</span>
//                       <span>
//                         {isLoadingData ? (
//                           <div className="loading-placeholder">--</div>
//                         ) : (
//                           currentData.DETAILS?.fundamentals?.Market_Cap_Rank || "N/A"
//                         )}
//                       </span>
//                     </div>
//                     <div className="detail-item">
//                       <span>Adoption Score:</span>
//                       <span className={isLoadingData ? "" : "change-positive"}>
//                         {isLoadingData ? (
//                           <div className="loading-placeholder">--</div>
//                         ) : (
//                           `${((currentData.DETAILS?.fundamentals?.Adoption_Score || 0) * 100).toFixed(1)}%`
//                         )}
//                       </span>
//                     </div>
//                     <div className="detail-item">
//                       <span>Technology Score:</span>
//                       <span className={isLoadingData ? "" : "change-positive"}>
//                         {isLoadingData ? (
//                           <div className="loading-placeholder">--</div>
//                         ) : (
//                           `${((currentData.DETAILS?.fundamentals?.Technology_Score || 0) * 100).toFixed(1)}%`
//                         )}
//                       </span>
//                     </div>
//                   </>
//                 ) : (
//                   <>
//                     <div className="detail-item">
//                       <span>P/E Ratio:</span>
//                       <span>
//                         {isLoadingData ? (
//                           <div className="loading-placeholder">--</div>
//                         ) : (
//                           (currentData.DETAILS?.fundamentals?.PE_Ratio || 0).toFixed(2)
//                         )}
//                       </span>
//                     </div>
//                     <div className="detail-item">
//                       <span>EPS:</span>
//                       <span>
//                         {isLoadingData ? (
//                           <div className="loading-placeholder">--</div>
//                         ) : (
//                           `${market === "Nigerian" ? "₦" : "$"}${(currentData.DETAILS?.fundamentals?.EPS || 0).toFixed(2)}`
//                         )}
//                       </span>
//                     </div>
//                     <div className="detail-item">
//                       <span>Revenue Growth:</span>
//                       <span className={isLoadingData ? "" : "change-positive"}>
//                         {isLoadingData ? (
//                           <div className="loading-placeholder">--</div>
//                         ) : (
//                           `${((currentData.DETAILS?.fundamentals?.revenue_growth || 0) * 100).toFixed(2)}%`
//                         )}
//                       </span>
//                     </div>
//                     <div className="detail-item">
//                       <span>Income Growth:</span>
//                       <span className={isLoadingData ? "" : "change-positive"}>
//                         {isLoadingData ? (
//                           <div className="loading-placeholder">--</div>
//                         ) : (
//                           `${((currentData.DETAILS?.fundamentals?.net_income_growth || 0) * 100).toFixed(2)}%`
//                         )}
//                       </span>
//                     </div>
//                   </>
//                 )}
//               </div>

//               {/* Sentiment Analysis Section */}
//               <div className="detail-section">
//                 <h4>Sentiment Analysis</h4>
//                 <div className="detail-item">
//                   <span>Score:</span>
//                   <span>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       (currentData.DETAILS?.sentiment_analysis?.score || 0).toFixed(2)
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Interpretation:</span>
//                   <span
//                     className={`verdict-badge ${(currentData.DETAILS?.sentiment_analysis?.interpretation || "neutral").toLowerCase()}`}
//                   >
//                     {isLoadingData ? (
//                       <div className="loading-placeholder small">--</div>
//                     ) : (
//                       currentData.DETAILS?.sentiment_analysis?.interpretation || "N/A"
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Market Mood:</span>
//                   <span>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       currentData.DETAILS?.sentiment_analysis?.market_mood || "N/A"
//                     )}
//                   </span>
//                 </div>
//               </div>

//               {/* Cycle Analysis Section */}
//               <div className="detail-section">
//                 <h4>Cycle Analysis</h4>
//                 <div className="detail-item">
//                   <span>Current Phase:</span>
//                   <span
//                     className={`verdict-badge ${(currentData.DETAILS?.cycle_analysis?.current_phase || "neutral").toLowerCase()}`}
//                   >
//                     {isLoadingData ? (
//                       <div className="loading-placeholder small">--</div>
//                     ) : (
//                       currentData.DETAILS?.cycle_analysis?.current_phase || "N/A"
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Stage:</span>
//                   <span>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       currentData.DETAILS?.cycle_analysis?.stage || "N/A"
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Duration:</span>
//                   <span>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       `${currentData.DETAILS?.cycle_analysis?.duration_days || 0} days`
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Bull Probability:</span>
//                   <span className={isLoadingData ? "" : "change-positive"}>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       `${currentData.DETAILS?.cycle_analysis?.bull_continuation_probability || 0}%`
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Bear Probability:</span>
//                   <span className={isLoadingData ? "" : "change-negative"}>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       `${currentData.DETAILS?.cycle_analysis?.bear_transition_probability || 0}%`
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Risk Level:</span>
//                   <span>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       currentData.DETAILS?.cycle_analysis?.risk_level || "N/A"
//                     )}
//                   </span>
//                 </div>
//               </div>

//               {/* Trading Parameters Section */}
//               <div className="detail-section">
//                 <h4>Trading Parameters</h4>
//                 <div className="detail-item">
//                   <span>Position Size:</span>
//                   <span>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       currentData.DETAILS?.trading_parameters?.position_size || "N/A"
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Timeframe:</span>
//                   <span>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       currentData.DETAILS?.trading_parameters?.timeframe || "N/A"
//                     )}
//                   </span>
//                 </div>
//                 <div className="detail-item">
//                   <span>Risk Level:</span>
//                   <span>
//                     {isLoadingData ? (
//                       <div className="loading-placeholder">--</div>
//                     ) : (
//                       currentData.DETAILS?.trading_parameters?.risk_level || "N/A"
//                     )}
//                   </span>
//                 </div>
//               </div>

//               {/* Patterns Section */}
//               <div className="detail-section">
//                 <h4>Patterns Detected</h4>
//                 <div className="pattern-list">
//                   <div>
//                     <strong>Geometric:</strong>{" "}
//                     {isLoadingData ? (
//                       <div className="loading-placeholder inline">--</div>
//                     ) : (
//                       (currentData.DETAILS?.patterns?.geometric || ["None"]).join(", ")
//                     )}
//                   </div>
//                   <div>
//                     <strong>Elliott Wave:</strong>{" "}
//                     {isLoadingData ? (
//                       <div className="loading-placeholder inline">--</div>
//                     ) : (
//                       (currentData.DETAILS?.patterns?.elliott_wave || ["None"]).join(", ")
//                     )}
//                   </div>
//                   <div>
//                     <strong>Confluence:</strong>{" "}
//                     {isLoadingData ? (
//                       <div className="loading-placeholder inline">--</div>
//                     ) : (
//                       (currentData.DETAILS?.patterns?.confluence_factors || ["None"]).join(", ")
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   }

//   // AI Analysis Modal
//   const renderAiModal = () => {
//     if (!showAiModal || !aiAnalysis || !aiAnalysis[showAiModal]) return null

//     const analysis = aiAnalysis[showAiModal]

//     return (
//       <div className="ai-modal-overlay" onClick={() => setShowAiModal(null)}>
//         <div className="ai-modal" onClick={(e) => e.stopPropagation()}>
//           <div className="ai-modal-header">
//             <h2>🤖 AI Analysis for {analysis.symbol}</h2>
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

//   // Connection error state
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

//   // Loading connection state
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

//   // Welcome screen
//   if (!showAnalysisPage && !hasInitialData) {
//     return (
//       <div className="app">
//         <div className="no-data-container">
//           <h2>Multi-Asset Analysis Dashboard v4.0</h2>
//           <p>Analyze 35 popular assets from US, Nigerian, and Crypto markets</p>

//           <div className="connection-status">
//             Status:{" "}
//             <span className={`status-${connectionStatus}`}>
//               {connectionStatus === "connected" ? "✅ Connected" : "🔄 Connecting..."}
//             </span>
//           </div>

//           <div className="features-list">
//             <p>🚀 Features: Persistent Data (24hr Cache) + Background Processing + AI Integration</p>
//             <p>⚡ Optimized: ~5 minutes processing time</p>
//             <p>📊 US Stocks: 10 | Nigerian Stocks: 15 | Crypto: 10</p>
//             <p>🤖 AI Analysis: Available with Claude integration</p>
//             <p>🕐 Auto-refresh: Daily at 5:00 PM</p>
//             <p>📡 Data Sources: Twelve Data, NaijaStocksAPI, CryptoCompare</p>
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
//             "Start Fresh Analysis" runs new analysis (~5 minutes).
//             <br />
//             Note: Nigerian stocks and Crypto assets only available in DAILY timeframe.
//           </p>
//         </div>
//       </div>
//     )
//   }

//   // Group stocks by market type
//   const groupStocksByMarket = () => {
//     if (!data) return { US: [], Nigerian: [], Crypto: [] }

//     const stocks = Object.keys(data).filter(
//       (key) =>
//         ![
//           "timestamp",
//           "stocks_analyzed",
//           "total_requested",
//           "success_rate",
//           "status",
//           "data_sources",
//           "markets",
//           "processing_info",
//           "data_source",
//           "note",
//           "processing_time_minutes",
//         ].includes(key),
//     )

//     const grouped = {
//       US: [] as string[],
//       Nigerian: [] as string[],
//       Crypto: [] as string[],
//     }

//     stocks.forEach((symbol) => {
//       const stockData = data[symbol]
//       if (!stockData) return

//       const market = stockData.market || "Unknown"
//       if (market === "US") {
//         grouped.US.push(symbol)
//       } else if (market === "Nigerian") {
//         grouped.Nigerian.push(symbol)
//       } else if (market === "Crypto") {
//         grouped.Crypto.push(symbol)
//       }
//     })

//     // Sort each group alphabetically
//     grouped.US.sort()
//     grouped.Nigerian.sort()
//     grouped.Crypto.sort()

//     return grouped
//   }

//   const groupedStocks = groupStocksByMarket()

//   return (
//     <div className="app">
//       <header className="app-header">
//         <h1>Multi-Asset Analysis Dashboard v4.0</h1>
//         <div className="header-info">
//           <span>Last Updated: {data?.timestamp || "N/A"}</span>
//           <span>
//             Assets Analyzed: {data?.stocks_analyzed || 0}/{data?.total_requested || 35}
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
//               <span>Twelve Data: {data.data_sources.twelve_data_count}</span>
//               <span>NaijaStocks: {data.data_sources.naijastocks_count}</span>
//               <span>CryptoCompare: {data.data_sources.cryptcompare_count}</span>
//             </>
//           )}
//           <span className={`status ${data?.status}`}>Status: {data?.status || "loading"}</span>
//           {data?.processing_info?.ai_analysis_available && (
//             <span className="ai-available">🤖 AI Analysis Available</span>
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
//                 tf !== "DAILY" && (groupedStocks.Nigerian.length > 0 || groupedStocks.Crypto.length > 0)
//                   ? "Some assets only available in DAILY timeframe"
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
//         {/* US Stocks Section */}
//         {groupedStocks.US.length > 0 && (
//           <div className="market-section">
//             <div className="market-header">
//               <h2>🇺🇸 US Stocks ({groupedStocks.US.length})</h2>
//               <div className="market-stats">
//                 <span>Data Source: Twelve Data</span>
//                 <span>Market: NASDAQ, NYSE</span>
//                 <span>All timeframes available</span>
//               </div>
//             </div>
//             <div className="stocks-container">
//               {groupedStocks.US.map((symbol) => (data && data[symbol] ? renderStockCard(symbol, data[symbol]) : null))}
//             </div>
//           </div>
//         )}

//         {/* Nigerian Stocks Section */}
//         {groupedStocks.Nigerian.length > 0 && (
//           <div className="market-section">
//             <div className="market-header">
//               <h2>🇳🇬 Nigerian Stocks ({groupedStocks.Nigerian.length})</h2>
//               <div className="market-stats">
//                 <span>Data Source: NaijaStocksAPI</span>
//                 <span>Market: Nigerian Stock Exchange</span>
//                 <span className="timeframe-note">Note: Only DAILY timeframe available</span>
//               </div>
//             </div>
//             <div className="stocks-container">
//               {groupedStocks.Nigerian.map((symbol) =>
//                 data && data[symbol] ? renderStockCard(symbol, data[symbol]) : null,
//               )}
//             </div>
//           </div>
//         )}

//         {/* Crypto Section */}
//         {groupedStocks.Crypto.length > 0 && (
//           <div className="market-section">
//             <div className="market-header">
//               <h2>₿ Cryptocurrency ({groupedStocks.Crypto.length})</h2>
//               <div className="market-stats">
//                 <span>Data Source: CryptoCompare</span>
//                 <span>Market: Global Crypto Markets</span>
//                 <span className="timeframe-note">Note: Limited timeframes on free tier</span>
//               </div>
//             </div>
//             <div className="stocks-container">
//               {groupedStocks.Crypto.map((symbol) =>
//                 data && data[symbol] ? renderStockCard(symbol, data[symbol]) : null,
//               )}
//             </div>
//           </div>
//         )}
//       </div>

//       {renderAiModal()}
//     </div>
//   )
// }

// export default App


// "use client"

// import type React from "react"
// import { useState, useEffect, useCallback, useRef } from "react"
// import "./App.css"

// // Update to your actual API URL
// // const API_BASE_URL = "https://stock-be-j9p2.onrender.com"
// const API_BASE_URL = "http://localhost:5000"

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
//     total: 65, // UPDATED: New total count (30 US + 15 Nigerian + 20 Crypto)
//     percentage: 0,
//     currentSymbol: "",
//     stage: "Initializing...",
//     estimatedTimeRemaining: 0,
//   })
//   const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false)
//   const [connectionStatus, setConnectionStatus] = useState<"connecting" | "connected" | "error">("connecting")

//   // Refs for cleanup
//   const progressIntervalRef = useRef<NodeJS.Timeout | null>(null)
//   const dataPollingRef = useRef<NodeJS.Timeout | null>(null)
//   const isRequestingRef = useRef<boolean>(false)
//   const lastRequestTimeRef = useRef<number>(0)

//   // UPDATED: Generate placeholder data for loading state with expanded counts
//   const generatePlaceholderData = useCallback((): ApiResponse => {
//     const placeholderStocks: { [key: string]: any } = {}

//     // UPDATED: US Stocks expanded to 30
//     const usStocks = [
//       "AAPL",
//       "MSFT",
//       "GOOGL",
//       "TSLA",
//       "AMZN",
//       "NVDA",
//       "META",
//       "NFLX",
//       "JPM",
//       "V",
//       "JNJ",
//       "WMT",
//       "PG",
//       "UNH",
//       "HD",
//       "MA",
//       "DIS",
//       "PYPL",
//       "ADBE",
//       "CRM",
//       "NFLX",
//       "INTC",
//       "VZ",
//       "T",
//       "PFE",
//       "KO",
//       "PEP",
//       "MRK",
//       "ABT",
//       "TMO",
//     ]

//     // Nigerian Stocks (unchanged - 15)
//     const nigerianStocks = [
//       "ACCESS",
//       "GTCO",
//       "UBA",
//       "ZENITHBANK",
//       "FBNH",
//       "DANGCEM",
//       "BUACEMENT",
//       "WAPCO",
//       "DANGSUGAR",
//       "NESTLE",
//       "UNILEVER",
//       "SEPLAT",
//       "TOTAL",
//       "MTNN",
//       "TRANSCORP",
//     ]

//     // UPDATED: Crypto expanded to 20
//     const cryptoStocks = [
//       "BTC",
//       "ETH",
//       "BNB",
//       "SOL",
//       "ADA",
//       "AVAX",
//       "DOT",
//       "LINK",
//       "MATIC",
//       "LTC",
//       "XRP",
//       "DOGE",
//       "SHIB",
//       "TRX",
//       "ATOM",
//       "FTM",
//       "ALGO",
//       "VET",
//       "ICP",
//       "NEAR",
//     ]

//     const allSymbols = [...usStocks, ...nigerianStocks, ...cryptoStocks]

//     allSymbols.forEach((symbol) => {
//       const market = cryptoStocks.includes(symbol) ? "Crypto" : nigerianStocks.includes(symbol) ? "Nigerian" : "US"
//       const dataSource = cryptoStocks.includes(symbol)
//         ? "twelve_data_crypto" // UPDATED: New data source for crypto
//         : nigerianStocks.includes(symbol)
//           ? "naijastocks"
//           : "twelve_data"

//       const createTimeframeData = (isAvailable = true) => ({
//         PRICE: isAvailable ? 0 : 0,
//         ACCURACY: isAvailable ? 0 : 0,
//         CONFIDENCE_SCORE: isAvailable ? 0 : 0,
//         VERDICT: isAvailable ? "Loading..." : "Not Available",
//         status: isAvailable ? undefined : "Not Available",
//         message: isAvailable ? undefined : getNotAvailableMessage(market, symbol),
//         DETAILS: {
//           individual_verdicts: {
//             rsi_verdict: "Loading...",
//             adx_verdict: "Loading...",
//             momentum_verdict: "Loading...",
//             pattern_verdict: "Loading...",
//             fundamental_verdict: "Loading...",
//             sentiment_verdict: "Loading...",
//             cycle_verdict: "Loading...",
//           },
//           price_data: {
//             current_price: 0,
//             entry_price: 0,
//             target_prices: [0, 0],
//             stop_loss: 0,
//             change_1d: 0,
//             change_1w: 0,
//           },
//           technical_indicators: {
//             rsi: 0,
//             adx: 0,
//             atr: 0,
//             cycle_phase: "Loading...",
//             cycle_momentum: 0,
//           },
//           patterns: {
//             geometric: ["Loading..."],
//             elliott_wave: ["Loading..."],
//             confluence_factors: ["Loading..."],
//           },
//           fundamentals:
//             market === "Crypto"
//               ? {
//                   Market_Cap_Rank: 0,
//                   Adoption_Score: 0,
//                   Technology_Score: 0,
//                 }
//               : {
//                   PE_Ratio: 0,
//                   EPS: 0,
//                   revenue_growth: 0,
//                   net_income_growth: 0,
//                 },
//           sentiment_analysis: {
//             score: 0,
//             interpretation: "Loading...",
//             market_mood: "Loading...",
//           },
//           cycle_analysis: {
//             current_phase: "Loading...",
//             stage: "Loading...",
//             duration_days: 0,
//             momentum: 0,
//             momentum_visual: "Loading...",
//             bull_continuation_probability: 0,
//             bear_transition_probability: 0,
//             expected_continuation: "Loading...",
//             risk_level: "Loading...",
//           },
//           trading_parameters: {
//             position_size: "Loading...",
//             timeframe: "Loading...",
//             risk_level: "Loading...",
//           },
//         },
//       })

//       placeholderStocks[symbol] = {
//         data_source: dataSource,
//         market: market,
//         DAILY_TIMEFRAME: createTimeframeData(true),
//         WEEKLY_TIMEFRAME: createTimeframeData(market !== "Nigerian"),
//         MONTHLY_TIMEFRAME: createTimeframeData(market !== "Nigerian"),
//         "4HOUR_TIMEFRAME": createTimeframeData(market === "US" || market === "Crypto"), // UPDATED: Crypto might have 4H data via TwelveData
//       }
//     })

//     return {
//       timestamp: new Date().toISOString(),
//       stocks_analyzed: 0,
//       total_requested: 65, // UPDATED: New total
//       success_rate: 0,
//       status: "loading",
//       data_source: "loading",
//       markets: {
//         us_stocks: usStocks.length,
//         nigerian_stocks: nigerianStocks.length,
//         crypto_assets: cryptoStocks.length,
//       },
//       data_sources: {
//         twelve_data_count: 0,
//         naijastocks_count: 0,
//         twelve_data_crypto_count: 0, // UPDATED: New field
//         cryptcompare_count: 0,
//       },
//       processing_info: {
//         hierarchical_analysis: true,
//         timeframes_analyzed: ["monthly", "weekly", "daily", "4hour"],
//         ai_analysis_available: true,
//         background_processing: true,
//         daily_auto_refresh: "5:00 PM",
//         crypto_data_source: "TwelveData with CryptoCompare fallback", // UPDATED: New field
//       },
//       ...placeholderStocks,
//     }
//   }, [])

//   // UPDATED: Better error message handling for different timeframes
//   const getNotAvailableMessage = (market: string, _symbol: string, timeframe?: string) => {
//     if (market === "Nigerian") {
//       if (timeframe && timeframe !== "DAILY_TIMEFRAME") {
//         return "Historical data not available for Nigerian stocks via NaijaStocksAPI"
//       }
//       return "Data not available for this timeframe"
//     }
//     if (market === "Crypto") {
//       if (timeframe === "4HOUR_TIMEFRAME" || timeframe === "4hour" || timeframe === "4-hour") {
//         return "4-hour data availability depends on data source (TwelveData vs CryptoCompare)"
//       }
//       return "Data not available for this timeframe"
//     }
//     if (market === "US") {
//       if (timeframe && (timeframe === "WEEKLY_TIMEFRAME" || timeframe === "MONTHLY_TIMEFRAME")) {
//         return "Insufficient historical data for this timeframe"
//       }
//     }
//     return "Data not available for this timeframe"
//   }

//   // Cleanup function
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

//   // Poll for progress updates
//   const pollProgress = useCallback(async () => {
//     try {
//       const response = await fetch(`${API_BASE_URL}/progress`, {
//         headers: { Accept: "application/json" },
//       })
//       if (response.ok) {
//         const progressData: ProgressInfo = await response.json()
//         setProgress(progressData)
//         // Check if analysis is complete - either 100% OR stage indicates completion
//         const isComplete =
//           progressData.percentage >= 100 ||
//           progressData.stage.toLowerCase().includes("complete") ||
//           progressData.stage.toLowerCase().includes("finished") ||
//           progressData.stage.toLowerCase().includes("ready")

//         if (isComplete) {
//           console.log("Analysis marked as complete, stopping polling and fetching results...")
//           setIsAnalyzing(false)
//           cleanup()
//           // Wait a moment then fetch final data
//           dataPollingRef.current = setTimeout(() => {
//             fetchFinalData()
//           }, 1000)
//         }
//       } else {
//         throw new Error(`Progress fetch failed: HTTP ${response.status}`)
//       }
//     } catch (err) {
//       console.error("Error polling progress:", err)
//     }
//   }, [cleanup])

//   // UPDATED: Better handling of timeframe data issues
//   const fetchFinalData = useCallback(async () => {
//     try {
//       console.log("Fetching final analysis data...")
//       const response = await fetch(`${API_BASE_URL}/analyze`, {
//         method: "GET",
//         headers: {
//           Accept: "application/json",
//         },
//       })
//       if (response.ok) {
//         const result: ApiResponse = await response.json()
//         console.log("Final data received:", result)

//         // UPDATED: Better validation of received data
//         if (result.status === "success" || result.data_source === "database_cache" || result.stocks_analyzed > 0) {
//           // Validate that timeframe data is properly structured
//           const stockSymbols = Object.keys(result).filter(
//             (key) =>
//               ![
//                 "timestamp",
//                 "stocks_analyzed",
//                 "total_requested",
//                 "success_rate",
//                 "status",
//                 "data_sources",
//                 "markets",
//                 "processing_info",
//                 "data_source",
//                 "note",
//                 "processing_time_minutes",
//               ].includes(key),
//           )

//           // UPDATED: Fix any malformed timeframe data
//           stockSymbols.forEach((symbol) => {
//             const stockData = result[symbol]
//             if (stockData) {
//               // Ensure all timeframes have proper structure
//               const timeframes = ["DAILY_TIMEFRAME", "WEEKLY_TIMEFRAME", "MONTHLY_TIMEFRAME", "4HOUR_TIMEFRAME"]

//               timeframes.forEach((tf) => {
//                 if (!stockData[tf]) {
//                   // Create fallback structure for missing timeframes
//                   stockData[tf] = {
//                     status: "Not Available",
//                     message: `No data available for ${tf.replace("_TIMEFRAME", "").toLowerCase()} timeframe`,
//                     PRICE: 0,
//                     ACCURACY: 0,
//                     CONFIDENCE_SCORE: 0,
//                     VERDICT: "No Data",
//                     DETAILS: {
//                       individual_verdicts: {
//                         rsi_verdict: "N/A",
//                         adx_verdict: "N/A",
//                         momentum_verdict: "N/A",
//                         pattern_verdict: "N/A",
//                         fundamental_verdict: "N/A",
//                         sentiment_verdict: "N/A",
//                         cycle_verdict: "N/A",
//                       },
//                       price_data: {
//                         current_price: 0,
//                         entry_price: 0,
//                         target_prices: [0, 0],
//                         stop_loss: 0,
//                         change_1d: 0,
//                         change_1w: 0,
//                       },
//                       technical_indicators: {
//                         rsi: 0,
//                         adx: 0,
//                         atr: 0,
//                         cycle_phase: "N/A",
//                         cycle_momentum: 0,
//                       },
//                       patterns: {
//                         geometric: ["N/A"],
//                         elliott_wave: ["N/A"],
//                         confluence_factors: ["N/A"],
//                       },
//                       fundamentals:
//                         stockData.market === "Crypto"
//                           ? {
//                               Market_Cap_Rank: 0,
//                               Adoption_Score: 0,
//                               Technology_Score: 0,
//                             }
//                           : {
//                               PE_Ratio: 0,
//                               EPS: 0,
//                               revenue_growth: 0,
//                               net_income_growth: 0,
//                             },
//                       sentiment_analysis: {
//                         score: 0,
//                         interpretation: "N/A",
//                         market_mood: "N/A",
//                       },
//                       cycle_analysis: {
//                         current_phase: "N/A",
//                         stage: "N/A",
//                         duration_days: 0,
//                         momentum: 0,
//                         momentum_visual: "N/A",
//                         bull_continuation_probability: 0,
//                         bear_transition_probability: 0,
//                         expected_continuation: "N/A",
//                         risk_level: "N/A",
//                       },
//                       trading_parameters: {
//                         position_size: "N/A",
//                         timeframe: "N/A",
//                         risk_level: "N/A",
//                       },
//                     },
//                   }
//                 }
//               })
//             }
//           })

//           setData(result)
//           setLoading(false)
//           setHasInitialData(true)
//           setError(null)
//           console.log(`Analysis complete! Successfully loaded ${result.stocks_analyzed} assets.`)
//         } else if (result.status === "analysis_triggered") {
//           // Analysis was just triggered, continue polling
//           console.log("Analysis triggered, continuing to poll...")
//           if (!progressIntervalRef.current) {
//             progressIntervalRef.current = setInterval(pollProgress, 2000)
//           }
//         }
//       } else {
//         throw new Error(`HTTP ${response.status}`)
//       }
//     } catch (err) {
//       console.error("Error fetching final data:", err)
//       setError("Failed to fetch final analysis data")
//       setLoading(false)
//     }
//   }, [pollProgress])

//   // Start analysis and show loading page immediately
//   const startAnalysis = useCallback(
//     async (fresh = false) => {
//       console.log(`Starting ${fresh ? "fresh" : "cached"} analysis...`)
//       setShowAnalysisPage(true)
//       setIsAnalyzing(true)
//       setLoading(true)
//       setError(null)
//       cleanup()

//       // Show placeholder data immediately
//       const placeholderData = generatePlaceholderData()
//       setData(placeholderData)
//       setHasInitialData(true)

//       // Reset progress
//       setProgress({
//         current: 0,
//         total: 65, // UPDATED: New total
//         percentage: 0,
//         currentSymbol: "Initializing...",
//         stage: "Starting analysis...",
//         estimatedTimeRemaining: 600, // UPDATED: Longer estimate for more assets
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
//           console.log("Analysis response:", result)
//           if (result.status === "success" || result.data_source === "database_cache") {
//             // We got immediate data (cached)
//             setData(result)
//             setIsAnalyzing(false)
//             setLoading(false)
//           } else if (result.status === "analysis_triggered" || result.status === "analysis_in_progress") {
//             // Analysis was triggered, start polling for progress
//             console.log("Analysis triggered, starting progress polling...")
//             progressIntervalRef.current = setInterval(pollProgress, 2000)
//           }
//         } else {
//           throw new Error(`HTTP ${response.status}`)
//         }
//       } catch (err) {
//         console.error("Analysis error:", err)
//         setError(err instanceof Error ? err.message : "Analysis failed")
//         setIsAnalyzing(false)
//         setLoading(false)
//         cleanup()
//       }
//     },
//     [generatePlaceholderData, pollProgress, cleanup],
//   )

//   const fetchData = useCallback(
//     async (fresh = false) => {
//       if (isRequestingRef.current) {
//         console.log("Fetch already in progress, skipping...")
//         return
//       }
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
//       console.error("AI Analysis error:", err)
//       setError(err instanceof Error ? err.message : "Failed to get AI analysis")
//     } finally {
//       setAiLoading((prev) => ({ ...prev, [symbol]: false }))
//     }
//   }

//   // Test API connection and load initial data
//   const testConnection = useCallback(async () => {
//     if (isRequestingRef.current) {
//       console.log("Connection test already in progress, skipping...")
//       return
//     }
//     const now = Date.now()
//     if (now - lastRequestTimeRef.current < 2000) {
//       console.log("Connection test debounced, too soon since last request")
//       return
//     }

//     try {
//       console.log("Testing API connection...")
//       isRequestingRef.current = true
//       lastRequestTimeRef.current = now
//       setConnectionStatus("connecting")

//       const response = await fetch(`${API_BASE_URL}/health`, {
//         headers: { Accept: "application/json" },
//       })

//       if (!response.ok) {
//         throw new Error(`Health check failed: HTTP ${response.status}`)
//       }

//       const result = await response.json()
//       console.log("Health check result:", result)
//       setConnectionStatus("connected")

//       if (result.data_status?.has_cached_data && !hasInitialData) {
//         console.log("Found cached data, loading automatically...")
//         await fetchData(false)
//       }
//     } catch (err) {
//       console.error("Health check failed:", err)
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
//   }, [])

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
//     if (verdict === "Loading..." || verdict === "Not Available") return "verdict-loading"
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

//   // UPDATED: Better data source badge handling
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

//   // UPDATED: Enhanced stock card rendering with better timeframe handling
//   const renderStockCard = (symbol: string, stockData: any) => {
//     if (!stockData) {
//       console.warn(`No stock data for ${symbol}`)
//       return null
//     }

//     const timeframeKey = `${timeframe}_TIMEFRAME`
//     const currentData: StockData = stockData[timeframeKey]

//     // UPDATED: Better handling of missing timeframe data
//     if (!currentData) {
//       console.warn(`No ${timeframe} data for ${symbol}`)
//       // Create a fallback data structure
//       const fallbackData = {
//         PRICE: 0,
//         ACCURACY: 0,
//         CONFIDENCE_SCORE: 0,
//         VERDICT: "No Data",
//         status: "Not Available",
//         message: `${timeframe} timeframe data not available for ${symbol}`,
//         DETAILS: {
//           individual_verdicts: {
//             rsi_verdict: "N/A",
//             adx_verdict: "N/A",
//             momentum_verdict: "N/A",
//             pattern_verdict: "N/A",
//             fundamental_verdict: "N/A",
//             sentiment_verdict: "N/A",
//             cycle_verdict: "N/A",
//           },
//           price_data: {
//             current_price: 0,
//             entry_price: 0,
//             target_prices: [0, 0],
//             stop_loss: 0,
//             change_1d: 0,
//             change_1w: 0,
//           },
//           technical_indicators: { rsi: 0, adx: 0, atr: 0, cycle_phase: "N/A", cycle_momentum: 0 },
//           patterns: { geometric: ["N/A"], elliott_wave: ["N/A"], confluence_factors: ["N/A"] },
//           fundamentals: { PE_Ratio: 0, EPS: 0, revenue_growth: 0, net_income_growth: 0 },
//           sentiment_analysis: { score: 0, interpretation: "N/A", market_mood: "N/A" },
//           cycle_analysis: {
//             current_phase: "N/A",
//             stage: "N/A",
//             duration_days: 0,
//             momentum: 0,
//             momentum_visual: "N/A",
//             bull_continuation_probability: 0,
//             bear_transition_probability: 0,
//             expected_continuation: "N/A",
//             risk_level: "N/A",
//           },
//           trading_parameters: { position_size: "N/A", timeframe: "N/A", risk_level: "N/A" },
//         },
//       }

//       // Use fallback data but still render the card
//       return renderStockCardContent(symbol, stockData, fallbackData)
//     }

//     return renderStockCardContent(symbol, stockData, currentData)
//   }

//   // Enhanced stock card content rendering (keeping existing implementation)
//   const renderStockCardContent = (symbol: string, stockData: any, currentData: StockData) => {
//     const isExpanded = expandedStocks.has(symbol)
//     const dataSource = stockData.data_source || "unknown"
//     const market = stockData.market || "Unknown"
//     const assetIcon = getAssetTypeIcon(symbol, market)
//     const sourceBadge = getDataSourceBadge(dataSource)
//     const isLoadingData = dataSource === "loading" || currentData.VERDICT === "Loading..."
//     const isNotAvailable = currentData.status === "Not Available" || currentData.VERDICT === "No Data"

//     // Handle not available data
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
//                   const tfData = stockData[`${tf}_TIMEFRAME`]
//                   if (!tfData) {
//                     return (
//                       <div key={tf} className="timeframe-indicator loading">
//                         <span className="tf-label">
//                           {tf === "4HOUR" ? "4H" : tf.charAt(0) + tf.slice(1).toLowerCase()}
//                         </span>
//                         <span className="tf-verdict verdict-loading">N/A</span>
//                         <span className="tf-confidence">--</span>
//                       </div>
//                     )
//                   }

//                   const isLoadingTf = tfData.VERDICT === "Loading..."
//                   const isTfNotAvailable = tfData.status === "Not Available"

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

//             {/* Keep all existing detail sections unchanged */}
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

//               {/* Keep all other detail sections unchanged for brevity */}
//               {/* Technical Indicators, Individual Verdicts, Fundamentals, Sentiment Analysis, Cycle Analysis, Trading Parameters, Patterns sections... */}
//             </div>
//           </div>
//         )}
//       </div>
//     )
//   }

//   // AI Analysis Modal (unchanged)
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

//   // Connection error state
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

//   // Loading connection state
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

//   // UPDATED: Welcome screen with new counts
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
//             <p>🤖 AI Analysis: Available with OpenRouter (Claude 3.5 Sonnet)</p>
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

//   // Group stocks by market type
//   const groupStocksByMarket = () => {
//     if (!data) return { US: [], Nigerian: [], Crypto: [] }

//     const stocks = Object.keys(data).filter(
//       (key) =>
//         ![
//           "timestamp",
//           "stocks_analyzed",
//           "total_requested",
//           "success_rate",
//           "status",
//           "data_sources",
//           "markets",
//           "processing_info",
//           "data_source",
//           "note",
//           "processing_time_minutes",
//         ].includes(key),
//     )

//     const grouped = {
//       US: [] as string[],
//       Nigerian: [] as string[],
//       Crypto: [] as string[],
//     }

//     stocks.forEach((symbol) => {
//       const stockData = data[symbol]
//       if (!stockData) return

//       const market = stockData.market || "Unknown"
//       if (market === "US") {
//         grouped.US.push(symbol)
//       } else if (market === "Nigerian") {
//         grouped.Nigerian.push(symbol)
//       } else if (market === "Crypto") {
//         grouped.Crypto.push(symbol)
//       }
//     })

//     // Sort each group alphabetically
//     grouped.US.sort()
//     grouped.Nigerian.sort()
//     grouped.Crypto.sort()

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
//                 tf !== "DAILY" && (groupedStocks.Nigerian.length > 0 || groupedStocks.Crypto.length > 0)
//                   ? "Some assets may have limited timeframe availability"
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
//         {/* UPDATED: US Stocks Section - now shows 30 stocks */}
//         {groupedStocks.US.length > 0 && (
//           <div className="market-section">
//             <div className="market-header">
//               <h2>🇺🇸 US Stocks ({groupedStocks.US.length})</h2>
//               <div className="market-stats">
//                 <span>Data Source: TwelveData</span>
//                 <span>Market: NASDAQ, NYSE</span>
//                 <span>All timeframes available</span>
//               </div>
//             </div>
//             <div className="stocks-container">
//               {groupedStocks.US.map((symbol) => (data && data[symbol] ? renderStockCard(symbol, data[symbol]) : null))}
//             </div>
//           </div>
//         )}

//         {/* Nigerian Stocks Section - unchanged */}
//         {groupedStocks.Nigerian.length > 0 && (
//           <div className="market-section">
//             <div className="market-header">
//               <h2>🇳🇬 Nigerian Stocks ({groupedStocks.Nigerian.length})</h2>
//               <div className="market-stats">
//                 <span>Data Source: NaijaStocksAPI</span>
//                 <span>Market: Nigerian Stock Exchange</span>
//                 <span className="timeframe-note">Note: Only DAILY timeframe available</span>
//               </div>
//             </div>
//             <div className="stocks-container">
//               {groupedStocks.Nigerian.map((symbol) =>
//                 data && data[symbol] ? renderStockCard(symbol, data[symbol]) : null,
//               )}
//             </div>
//           </div>
//         )}

//         {/* UPDATED: Crypto Section - now shows 20 cryptos with TwelveData primary */}
//         {groupedStocks.Crypto.length > 0 && (
//           <div className="market-section">
//             <div className="market-header">
//               <h2>₿ Cryptocurrency ({groupedStocks.Crypto.length})</h2>
//               <div className="market-stats">
//                 <span>Data Source: TwelveData (Primary), CryptoCompare (Fallback)</span>
//                 <span>Market: Global Crypto Markets</span>
//                 <span className="timeframe-note">Note: 4H data availability varies by source</span>
//               </div>
//             </div>
//             <div className="stocks-container">
//               {groupedStocks.Crypto.map((symbol) =>
//                 data && data[symbol] ? renderStockCard(symbol, data[symbol]) : null,
//               )}
//             </div>
//           </div>
//         )}
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
  data_sources?: {
    twelve_data_count: number
    naijastocks_count: number
    twelve_data_crypto_count?: number
    cryptcompare_count: number
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
    crypto_data_source?: string
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

interface ProgressInfo {
  current: number
  total: number
  percentage: number
  currentSymbol: string
  stage: string
  estimatedTimeRemaining: number
  startTime?: number
}

const US_STOCKS = [
  "AAPL", "MSFT", "GOOGL", "TSLA", "AMZN", "NVDA", "META", "NFLX", "JPM", "V",
  "JNJ", "WMT", "PG", "UNH", "HD", "MA", "DIS", "PYPL", "ADBE", "CRM",
  "INTC", "VZ", "T", "PFE", "KO", "PEP", "MRK", "ABT", "TMO", "NKE"
]
const NIGERIAN_STOCKS = [
  "ACCESS", "GTCO", "UBA", "ZENITHBANK", "FBNH", "DANGCEM", "BUACEMENT", "WAPCO",
  "DANGSUGAR", "NESTLE", "UNILEVER", "SEPLAT", "TOTAL", "MTNN", "TRANSCORP"
]
const CRYPTO_STOCKS = [
  "BTC", "ETH", "BNB", "SOL", "ADA", "AVAX", "DOT", "LINK", "MATIC", "LTC",
  "XRP", "DOGE", "SHIB", "TRX", "ATOM", "FTM", "ALGO", "VET", "ICP", "NEAR"
]
const ALL_SYMBOLS = [...US_STOCKS, ...NIGERIAN_STOCKS, ...CRYPTO_STOCKS]

const getMarketForSymbol = (symbol: string) => {
  if (CRYPTO_STOCKS.includes(symbol)) return "Crypto"
  if (NIGERIAN_STOCKS.includes(symbol)) return "Nigerian"
  if (US_STOCKS.includes(symbol)) return "US"
  return "Unknown"
}

const getDataSourceForSymbol = (symbol: string) => {
  if (CRYPTO_STOCKS.includes(symbol)) return "twelve_data_crypto"
  if (NIGERIAN_STOCKS.includes(symbol)) return "naijastocks"
  if (US_STOCKS.includes(symbol)) return "twelve_data"
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
    total: 65,
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

  // Generate placeholder data for loading state
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
      total_requested: 65,
      success_rate: 0,
      status: "loading",
      data_source: "loading",
      markets: {
        us_stocks: US_STOCKS.length,
        nigerian_stocks: NIGERIAN_STOCKS.length,
        crypto_assets: CRYPTO_STOCKS.length,
      },
      data_sources: {
        twelve_data_count: 0,
        naijastocks_count: 0,
        twelve_data_crypto_count: 0,
        cryptcompare_count: 0,
      },
      processing_info: {
        hierarchical_analysis: true,
        timeframes_analyzed: ["monthly", "weekly", "daily", "4hour"],
        ai_analysis_available: true,
        background_processing: true,
        daily_auto_refresh: "5:00 PM",
        crypto_data_source: "TwelveData with CryptoCompare fallback",
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
  }, [])

  const pollProgress = useCallback(async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/progress`, {
        headers: { Accept: "application/json" },
      })
      if (response.ok) {
        const progressData: ProgressInfo = await response.json()
        setProgress(progressData)
        const isComplete =
          progressData.percentage >= 100 ||
          progressData.stage.toLowerCase().includes("complete") ||
          progressData.stage.toLowerCase().includes("finished") ||
          progressData.stage.toLowerCase().includes("ready")

        if (isComplete) {
          setIsAnalyzing(false)
          cleanup()
          dataPollingRef.current = setTimeout(() => {
            fetchFinalData()
          }, 1000)
        }
      } else {
        throw new Error(`Progress fetch failed: HTTP ${response.status}`)
      }
    } catch (err) {
      setError("Failed to poll progress")
    }
  }, [cleanup])

  // Updated fetchFinalData to handle all timeframes robustly
  const fetchFinalData = useCallback(async () => {
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
          // Patch: Ensure all stocks and all timeframes are present, fill with "No Data" if missing
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
              ["DAILY_TIMEFRAME", "WEEKLY_TIMEFRAME", "MONTHLY_TIMEFRAME", "4HOUR_TIMEFRAME"].forEach((tf) => {
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
        } else if (result.status === "analysis_triggered") {
          if (!progressIntervalRef.current) {
            progressIntervalRef.current = setInterval(pollProgress, 2000)
          }
        }
      } else {
        throw new Error(`HTTP ${response.status}`)
      }
    } catch (err) {
      setError("Failed to fetch final analysis data")
      setLoading(false)
    }
  }, [pollProgress])

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
        total: 65,
        percentage: 0,
        currentSymbol: "Initializing...",
        stage: "Starting analysis...",
        estimatedTimeRemaining: 600,
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
            // Patch: Ensure all stocks and all timeframes are present, fill with "No Data" if missing
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
                ["DAILY_TIMEFRAME", "WEEKLY_TIMEFRAME", "MONTHLY_TIMEFRAME", "4HOUR_TIMEFRAME"].forEach((tf) => {
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
            progressIntervalRef.current = setInterval(pollProgress, 2000)
          }
        } else {
          throw new Error(`HTTP ${response.status}`)
        }
      } catch (err) {
        setError("Analysis failed")
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

  const getDataSourceBadge = (dataSource: string) => {
    switch (dataSource) {
      case "twelve_data":
        return { text: "12D", class: "twelve-data" }
      case "twelve_data_crypto":
        return { text: "12D-C", class: "twelve-data-crypto" }
      case "naijastocks":
        return { text: "NS", class: "naijastocks" }
      case "cryptcompare":
        return { text: "CC", class: "cryptcompare" }
      case "database_cache":
        return { text: "CACHE", class: "cache" }
      case "loading":
        return { text: "...", class: "loading" }
      default:
        return { text: "UNK", class: "unknown" }
    }
  }

  const renderProgressBar = () => {
    if (!isAnalyzing && !loading) return null
    const isComplete =
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
          {isComplete && <div className="completion-message">Results are being loaded. This may take a moment...</div>}
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
    if (!stockData || !stockData[timeframeKey] || currentData.status === "Not Available" || currentData.VERDICT === "No Data") {
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
                  <p>Please select DAILY timeframe for Nigerian stocks.</p>
                )}
                {market === "Crypto" && timeframe === "4HOUR" && (
                  <p>4-hour data availability depends on data source (TwelveData vs CryptoCompare).</p>
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
                {aiLoading[symbol] ? "Generating AI Analysis..." : "🤖 Get AI Analysis (OpenRouter)"}
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
                  <span>{isLoadingData ? <div className="loading-placeholder">--</div> : currentData.DETAILS?.technical_indicators?.rsi ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>ADX:</span>
                  <span>{isLoadingData ? <div className="loading-placeholder">--</div> : currentData.DETAILS?.technical_indicators?.adx ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>ATR:</span>
                  <span>{isLoadingData ? <div className="loading-placeholder">--</div> : currentData.DETAILS?.technical_indicators?.atr ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Cycle Phase:</span>
                  <span>{isLoadingData ? <div className="loading-placeholder">--</div> : currentData.DETAILS?.technical_indicators?.cycle_phase ?? "--"}</span>
                </div>
                <div className="detail-item">
                  <span>Cycle Momentum:</span>
                  <span>{isLoadingData ? <div className="loading-placeholder">--</div> : currentData.DETAILS?.technical_indicators?.cycle_momentum ?? "--"}</span>
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
            <h2>🤖 AI Analysis for {analysis.symbol} (OpenRouter)</h2>
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
          <h2>Multi-Asset Analysis Dashboard v5.0</h2>
          <p>Analyze 65 popular assets from US, Nigerian, and Crypto markets</p>
          <div className="connection-status">
            Status:{" "}
            <span className={`status-${connectionStatus}`}>
              {connectionStatus === "connected" ? "✅ Connected" : "🔄 Connecting..."}
            </span>
          </div>
          <div className="features-list">
            <p>🚀 Features: Expanded Dataset + TwelveData Crypto + OpenRouter AI + Persistent Data</p>
            <p>⚡ Optimized: ~8 minutes processing time (more assets)</p>
            <p>📊 US Stocks: 30 | Nigerian Stocks: 15 | Crypto: 20</p>
            <p>🤖 AI Analysis: Available with OpenRouter</p>
            <p>🕐 Auto-refresh: Daily at 5:00 PM</p>
            <p>📡 Data Sources: TwelveData (US + Crypto), NaijaStocksAPI, CryptoCompare (fallback)</p>
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
            "Start Fresh Analysis" runs new analysis (~8 minutes for 65 assets).
            <br />
            Note: Nigerian stocks only available in DAILY timeframe. Crypto 4H data depends on source.
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
        <h1>Multi-Asset Analysis Dashboard v5.0</h1>
        <div className="header-info">
          <span>Last Updated: {data?.timestamp || "N/A"}</span>
          <span>
            Assets Analyzed: {data?.stocks_analyzed || 0}/{data?.total_requested || 65}
          </span>
          {data?.processing_time_minutes && <span>Processing Time: {data.processing_time_minutes.toFixed(2)}min</span>}
          {data?.markets && (
            <>
              <span>US: {data.markets.us_stocks}</span>
              <span>Nigerian: {data.markets.nigerian_stocks}</span>
              <span>Crypto: {data.markets.crypto_assets}</span>
            </>
          )}
          {data?.data_sources && (
            <>
              <span>TwelveData: {data.data_sources.twelve_data_count}</span>
              <span>NaijaStocks: {data.data_sources.naijastocks_count}</span>
              <span>TwelveData-Crypto: {data.data_sources.twelve_data_crypto_count || 0}</span>
              <span>CryptoCompare: {data.data_sources.cryptcompare_count}</span>
            </>
          )}
          <span className={`status ${data?.status}`}>Status: {data?.status || "loading"}</span>
          {data?.processing_info?.ai_analysis_available && (
            <span className="ai-available">🤖 AI Analysis Available (OpenRouter)</span>
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
        {data?.processing_info?.crypto_data_source && (
          <div className="crypto-source-note">
            <p>Crypto Data: {data.processing_info.crypto_data_source}</p>
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
              title={
                tf !== "DAILY"
                  ? "Some assets may have limited or no data for this timeframe"
                  : undefined
              }
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
              <span>Data Source: TwelveData</span>
              <span>Market: NASDAQ, NYSE</span>
              <span>All timeframes available</span>
            </div>
          </div>
          <div className="stocks-container">
            {groupedStocks.US.map((symbol) =>
              renderStockCard(symbol, data ? data[symbol] : undefined)
            )}
          </div>
        </div>
        <div className="market-section">
          <div className="market-header">
            <h2>🇳🇬 Nigerian Stocks ({groupedStocks.Nigerian.length})</h2>
            <div className="market-stats">
              <span>Data Source: NaijaStocksAPI</span>
              <span>Market: Nigerian Stock Exchange</span>
              <span className="timeframe-note">Note: Only DAILY timeframe available</span>
            </div>
          </div>
          <div className="stocks-container">
            {groupedStocks.Nigerian.map((symbol) =>
              renderStockCard(symbol, data ? data[symbol] : undefined)
            )}
          </div>
        </div>
        <div className="market-section">
          <div className="market-header">
            <h2>₿ Cryptocurrency ({groupedStocks.Crypto.length})</h2>
            <div className="market-stats">
              <span>Data Source: TwelveData (Primary), CryptoCompare (Fallback)</span>
              <span>Market: Global Crypto Markets</span>
              <span className="timeframe-note">Note: 4H data availability varies by source</span>
            </div>
          </div>
          <div className="stocks-container">
            {groupedStocks.Crypto.map((symbol) =>
              renderStockCard(symbol, data ? data[symbol] : undefined)
            )}
          </div>
        </div>
      </div>

      {renderAiModal()}
    </div>
  )
}

export default App