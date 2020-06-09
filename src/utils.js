export function setDebug(config) {
  let u = navigator.userAgent
  let isMobile = !!u.match(/AppleWebKit.*Mobile.*/)
  config.debug = !isMobile

  if (process.env.NODE_ENV === 'development') {
    window.onresize = () => {
      window.location.reload()
    }
  } else {
    config.debug = false
  }

  return config
}
