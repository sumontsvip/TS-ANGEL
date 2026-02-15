function calculateRSI(prices, period = 14) {
  let gains = 0;
  let losses = 0;

  for (let i = prices.length - period; i < prices.length - 1; i++) {
    let diff = prices[i + 1] - prices[i];
    if (diff > 0) gains += diff;
    else losses -= diff;
  }

  let avgGain = gains / period;
  let avgLoss = losses / period;

  if (avgLoss === 0) return 100;

  let rs = avgGain / avgLoss;
  return 100 - (100 / (1 + rs));
}

function calculateEMA(prices, period = 9) {
  let k = 2 / (period + 1);
  let ema = prices[0];

  for (let i = 1; i < prices.length; i++) {
    ema = prices[i] * k + ema * (1 - k);
  }

  return ema;
}

export default function handler(req, res) {
  // Simulated live market prices
  let prices = [];
  let base = 100;

  for (let i = 0; i < 50; i++) {
    base += (Math.random() - 0.5) * 2;
    prices.push(base);
  }

  let rsi = calculateRSI(prices);
  let emaFast = calculateEMA(prices, 9);
  let emaSlow = calculateEMA(prices, 21);

  let signal = "NO TRADE";

  if (rsi < 30 && emaFast > emaSlow) {
    signal = "BUY 🟢";
  } else if (rsi > 70 && emaFast < emaSlow) {
    signal = "SELL 🔴";
  }

  res.status(200).json({
    signal,
    rsi: rsi.toFixed(2),
    emaFast: emaFast.toFixed(2),
    emaSlow: emaSlow.toFixed(2),
    strategy: "RSI + EMA Crossover"
  });
}
