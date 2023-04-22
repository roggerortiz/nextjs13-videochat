import { v4 as uuid } from 'uuid'

export const getUid = (withSeparator = false) => {
  if (withSeparator) {
    return uuid().toLowerCase()
  }

  return uuid().replace(/-/g, '').toLowerCase()
}

export const getRandomNumber = (length = 8) => {
  const numbers = '0123456789'
  const uid = Array.from(
    { length },
    () => numbers[Math.floor(Math.random() * numbers.length)]
  ).join('')
  return parseInt(uid)
}

export const capitalize = word => {
  if (!word || !word.trim()) {
    return word
  }

  if (word.length === 1) {
    return word.charAt(0).toUpperCase()
  }

  return (word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
}

export const getUrlSearchParams = () => {
  const searchParams = new URLSearchParams(window.location.search)

  const entries = []
  for (const [key, value] of searchParams.entries()) {
    entries.push([key.toLowerCase(), value])
  }

  const query = Object.fromEntries(entries)
  return query
}

export const getQueryParamsString = params => {
  const entries = Object.entries(params)
  const queryParams = entries.map(([key, value]) => `${key.charAt(0).toLowerCase()}${key.slice(1)}=${value.toString()}`)
  return queryParams.join('&')
}

export const openFullScreen = selector => {
  const element = document.querySelector(selector)

  if (element?.requestFullscreen) {
    element.requestFullscreen()
  } else if (element?.webkitRequestFullscreen) { /* Safari */
    element.webkitRequestFullscreen()
  } else if (element?.msRequestFullscreen) { /* IE11 */
    element.msRequestFullscreen()
  }
}

export const closeFullScreen = () => {
  if (document?.exitFullscreen) {
    document.exitFullscreen()
  } else if (document?.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen()
  } else if (document?.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen()
  }
}

export const toggleFullScreen = (selector) => {
  if (document?.fullscreenElement) {
    closeFullScreen()
  } else {
    openFullScreen(selector)
  }
}

export const scrollToBottom = selector => {
  const element = document.querySelector(selector)
  if (element) {
    element.scrollBy({ top: 400, behavior: 'smooth' })
  }
}
