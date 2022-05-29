const KEY = 'bullet_journal_redux_state'
export function loadState() {
  try {
    const serializedState = localStorage.getItem(KEY)
    if (!serializedState) return undefined
    return JSON.parse(serializedState)
  } catch (e) {
    return undefined
  }
}

export async function saveState(state: { [key: string]: unknown }) {
  try {
    const serializedState = JSON.stringify(state)
    localStorage.setItem(KEY, serializedState)
  } catch (e) {
    // Ignore
  }
}
