// Deliberate violations for the end-to-end fixture test.

// anti-slop/no-chained-type-assertions
export const chained = JSON.parse('{}') as unknown as { id: string }

// typescript/no-explicit-any
export function loose(value: any): void {
  // no-console (console.log is not in the allow list)
  console.log(value)
}

// eqeqeq
export function sloppyEquals(a: string, b: string): boolean {
  return a == b
}

// no-var + prefer-const candidates
export function oldSchool(): number {
  var total = 0
  return total
}
