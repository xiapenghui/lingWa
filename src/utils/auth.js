import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

const MenuKey = 'Admin-Menu'

export function getMenu() {
  return Cookies.get(MenuKey)
}

export function setMenu(menu) {
  console.log('menu', menu)
  return Cookies.set(MenuKey, menu)
}

export function removeMenu() {
  return Cookies.remove(MenuKey)
}
