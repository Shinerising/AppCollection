import { Data, DOM } from "./common"

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
  if (value === "") {
    (<HTMLInputElement>this).value = ""
  } else if (value) {
    (<HTMLInputElement>this).value = value
  }
  return (<HTMLInputElement>this).value
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
  public async start() {
    await this.waitDocumentReady()

    DOM.load()

    Data.startFetching()

    this.enableSearching()
  }

  private enableSearching() {
    let searchText: string | undefined = ""
    setInterval(() => {
      const keyword = DOM.searchBox.val()?.trim().toLowerCase()
      if (searchText === keyword) {
        return
      }
      searchText = keyword
      const repos = document.querySelectorAll(".repo")
      repos.forEach(repo => {
        if (!keyword) {
          repo.classList.remove("filtered")
          return
        }
        const text = repo.textContent?.toLowerCase()
        const links = [...repo.querySelectorAll("a")].map(a => a.href).join(" ").toLowerCase()
        if (text?.includes(keyword) || links.includes(keyword)) {
          repo.classList.remove("filtered")
        } else {
          repo.classList.add("filtered")
        }
      })
    }, 500)
  }

  /**
   * Wait for DOM ready
   * @returns {Promise<void>}
   */
  private waitDocumentReady(): Promise<boolean> {
    return new Promise<boolean>((resolve) => {
      if (document.readyState === "complete" || document.readyState === "interactive") {
        resolve(true)
      } else {
        const callback = () => {
          document.removeEventListener("DOMContentLoaded", callback)
          resolve(true)
        }
        document.addEventListener("DOMContentLoaded", callback)
      }
    })
  }
}
