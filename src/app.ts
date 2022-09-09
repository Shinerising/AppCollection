import { Util, Data, DOM } from './common'

HTMLElement.prototype.addClass = function (className: string) {
  if (!this.classList.contains(className)) {
    this.classList.add(className)
  }
}

HTMLElement.prototype.removeClass = function (className: string) {
  if (this.classList.contains(className)) {
    this.classList.remove(className)
  }
}
HTMLElement.prototype.toggleClass = function (className: string) {
  if (!this.classList.contains(className)) {
    this.classList.add(className)
  } else {
    this.classList.remove(className)
  }
}
HTMLElement.prototype.val = function (value?: string) {
  if (value === '') {
    (<HTMLInputElement> this).value = ''
  } else if (value) {
    (<HTMLInputElement> this).value = value
  }
  return (<HTMLInputElement> this).value
}

/**
 * @class App
 * @description The main class of the application.
 * @author Apollo Wayne
 * @version 1.0.0
 */
export class App {
  /**
   * Start the app
   */
  public async start () {
    await this.waitDocumentReady()

    DOM.load()

    this.startTypingTitle('Sic Parvis Magna.')

    this.addScrollHandler()

    Data.startFetching()

    try {
      await this.registerServiceWorker()
    } catch (e) {
      console.error(e)
    }
  }

  /**
   * Register Service Worker
   */
  private async registerServiceWorker () {
    if ('serviceWorker' in navigator) {
      await navigator.serviceWorker.register('service-worker.js')
    }
  }

  private async startTypingTitle (title: string) {
    await Util.timeout(500)
    DOM.query('#titleBox').style.opacity = '1'
    DOM.query('#titleBack').textContent = title
    await Util.timeout(1000)
    for (const char of title.split('')) {
      await Util.timeout(50 + Math.round(Math.random() * 200))
      DOM.titleBox.innerHTML += char === ' ' ? '&nbsp;' : char
    }
  }

  private addScrollHandler () {
    let position = window.scrollY
    let ticking = false

    this.setScrollValue(position)

    document.addEventListener('scroll', () => {
      position = window.scrollY

      if (!ticking) {
        window.requestAnimationFrame(() => {
          this.setScrollValue(position)
          ticking = false
        })

        ticking = true
      }
    })
  }

  private setScrollValue (offset: number) {
    const blur = Math.min(3, Math.min(offset / 100, 20))
    const blurImage = Math.min(5, Math.min(offset / 100, 20))
    const blurText = Math.min(2, Math.min(offset / 100, 10) - 2)
    const opacity = Math.max(0, 2 - Math.max(offset / 200, 1))
    const filter = `saturate(180%) blur(${blurImage}rem)`
    DOM.coverGlass.setAttribute('style', `-webkit-backdrop-filter:${filter};backdrop-filter:${filter}`)
    DOM.titleBox.setAttribute('style', `filter:blur(${blurText}rem);opacity:${opacity}`)
    DOM.sitename.setAttribute('style', `filter:blur(${blur}rem);opacity:${opacity}`)
  }

  /**
   * Wait for DOM ready
   * @returns {Promise<void>}
   */
  private waitDocumentReady (): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (document.readyState === 'complete' || document.readyState === 'interactive') {
        resolve(true)
      } else {
        const callback = () => {
          document.removeEventListener('DOMContentLoaded', callback)
          resolve(true)
        }
        document.addEventListener('DOMContentLoaded', callback)
      }
    })
  }
}
