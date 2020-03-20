const KEY = 'heimamm'

export function setToken(tokenVal) {
  window.sessionStorage.setItem(KEY,tokenVal)
}
export function getToken() {
  return window.sessionStorage.getItem(KEY)
}
export function removeToken() {
  window.sessionStorage.removeItem(KEY)
}
