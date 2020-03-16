const KEY = 'heimamm'

export function setToken(tokenVal) {
  window.localStorage.setItem(KEY,tokenVal)
}
export function getToken() {
  window.localStorage.getItem(KEY)
}
export function removeToken() {
  window.localStorage.removeItem(KEY)
}
