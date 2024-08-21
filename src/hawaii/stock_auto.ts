import { NS } from '@ns';

interface Stock {
  symbol: string
  price: number
  askPrice: number
  bidPrice: number
  forecast: number
  volatility: number
}

export async function main(ns: NS) {
  let tix = ns.stock;
  // We could add automation here to automatically purchase
  // requirements such as a WSE account and/or TIX API
  // access, but we might accidentally do so when we critically
  // need money to be going elsewhere. Instead we'll just raise an
  // error and then quit.
  if (!tix.hasTIXAPIAccess()) {
    ns.tprint("FATAL: You haven't bought TIX API access yet!")
    ns.exit()
  }
  
  let allStocks = Object()
  let allStockSymbols = tix.getSymbols()
  for (let sym of allStockSymbols) {
    allStocks[sym] = {
      "price": tix.getPrice(sym),
      "askPrice": tix.getAskPrice(sym),
      "bidPrice": tix.getBidPrice(sym),
      "forecast": tix.getForecast(sym),
      "volatility": tix.getVolatility(sym),
      "maxShares": tix.getMaxShares(sym),
    }
  }
  let positiveForecastStocks: string[] = []
  for (let sym of allStockSymbols) {
    if (tix.getForecast(sym) >= 0.6) {
      positiveForecastStocks.push(sym)
    }
  }
  let goodStocks = positiveForecastStocks.sort(
    (sym1, sym2) => tix.getVolatility(sym2) - tix.getVolatility(sym1))
  let output = "Symbol\t=>\tForecast,\tVolatility (desc)\n"
  output += "******************************************************\n"
  for (let sym of goodStocks) {
    output += `${sym}\t=>\t${ns.formatNumber(tix.getForecast(sym)*100, 2)}%\t${tix.getVolatility(sym)}\n`
  }
  ns.tprint("\n" + output)
}
