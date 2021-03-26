export function elementResizeWatcher(element, callback) {
  const resolve = function (element) {
    return typeof element === "string"
      ? document[[".", "#"].indexOf(element.charAt(0)) < 0 ? "getElementById" : "querySelector"](element)
      : element
  }
  let observer
  let watched = []
  const checkForElementChanges = function (data) {
    const w = data.el.offsetWidth,
      h = data.el.offsetHeight
    if (data.offsetWidth !== w || data.offsetHeight !== h) {
      data.offsetWidth = w
      data.offsetHeight = h
      data.cb({
        target: data.el,
        width: w,
        height: h,
      })
    }
  }
  const checkForChanges = function () {
    watched.forEach(checkForElementChanges)
  }
  let started = false
  const self = {
    start: function () {
      if (!started) {
        // Listen to the window resize event
        window.addEventListener("resize", checkForChanges)

        // Listen to the element being checked for width and height changes
        observer = new MutationObserver(checkForChanges)
        observer.observe(document.body, {
          attributes: true,
          childList: true,
          characterData: true,
          subtree: true,
        })

        started = true
      }
    },
    stop: function () {
      if (started) {
        window.removeEventListener("resize", checkForChanges)
        observer.disconnect()
        started = false
      }
    },
    addListener: function (element, callback) {
      if (typeof callback !== "function") return

      const el = resolve(element)
      if (typeof el === "object") {
        watched.push({
          el: el,
          offsetWidth: el.offsetWidth,
          offsetHeight: el.offsetHeight,
          cb: callback,
        })
      }
    },

    removeListener: function (element, callback) {
      const el = resolve(element)
      watched = watched.filter(function (data) {
        return !(data.el === el && data.cb === callback)
      })
    },
  }

  self.addListener(element, callback)

  self.start()

  return self
}
