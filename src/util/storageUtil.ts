
export function saveItem (key: string, value: any) {
  if (typeof value === 'object') {
    window.sessionStorage.setItem(key, JSON.stringify(value))
  }else {
    window.sessionStorage.setItem(key, value)
  }
}

export function getItem (key: string): string|null {
  return window.sessionStorage.getItem(key)
}

export function clearAll() {
  window.sessionStorage.clear()
}