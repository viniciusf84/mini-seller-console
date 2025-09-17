// Simulate latency + occasional failure
export async function delay(ms = 600) {
  await new Promise((r) => setTimeout(r, ms))
}

export async function simulateSave<T>(data: T, failRate = 0.15): Promise<T> {
  await delay(500 + Math.random() * 800)
  if (Math.random() < failRate) {
    throw new Error('Simulated network error')
  }
  return data
}
