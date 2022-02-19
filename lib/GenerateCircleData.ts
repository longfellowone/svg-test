export default function generateCircles() {
  return [...Array(10000)].map((_, i) => ({
    id: i,
    x: Math.floor(Math.random() * 1840) + 1,
    y: Math.floor(Math.random() * 1176) + 1,
  }))
}
