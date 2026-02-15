export default function handler(req, res) {
  const signals = ["BUY 🟢", "SELL 🔴"];
  const random = signals[Math.floor(Math.random() * signals.length)];

  res.status(200).json({
    signal: random,
    time: new Date().toLocaleTimeString()
  });
}
