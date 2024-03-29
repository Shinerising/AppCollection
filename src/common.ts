import { RepoInfo, Repository, Release, Package } from "./app.interface"
import { Config } from "./config"
import { _, culture } from "./locale"

export class Util {
  public static async timeout(delay: number): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        resolve(true)
      }, delay)
    })
  }

  public static async nextFrame(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      requestAnimationFrame(() => {
        resolve(true)
      })
    })
  }
}

export class Data {
  public static async startFetching() {
    const list = await this.fetchData<RepoInfo[]>("list.json")

    DOM.card.addClass("visible")

    const packages = await this.fetchData<Package[]>(`${Config.User}/${Config.Owner}/packages?package_type=container`)

    list.map(async item => {
      const wrapper = document.createElement("section")
      wrapper.addClass("repo")
      DOM.collection.appendChild(wrapper)
      try {
        const repo = await this.fetchData<Repository>(`${Config.API}/${Config.Owner}/${item.name}`)
        const releases = await this.fetchData<Release[]>(`${Config.API}/${Config.Owner}/${item.name}/releases`)
        const node = this.generateNode(item, repo, releases, packages.filter(pkg => pkg.repository.full_name === repo.full_name))
        await this.applyNode(wrapper, node)
      } catch {
        wrapper.remove()
      }
    })
  }

  private static async applyNode(wrapper: HTMLElement, node: string) {
    wrapper.innerHTML += node
    await Util.nextFrame()
    wrapper.addClass("visible")
  }

  private static generateNode(info: RepoInfo, repo: Repository, releases: Release[], packages: Package[] = []): string {
    const releaseNormal = releases.filter(item => !item.prerelease)[0]
    const releasePreview = releases.filter(item => item.prerelease)[0]
    const packageContent = packages.map(pkg => `<a class="link-github icon-docker" href="${pkg.html_url}">${pkg.name}</a>`)
    const coverUrl = `${Config.ImageProxy}?url=${Config.Content}/${repo.full_name}/contents/preview.jpg`
    const iconUrl = `${Config.ImageProxy}?url=${Config.Content}/${repo.full_name}/contents/icon.png`
    return `
<div class="repo-cover">
<img src="${coverUrl}" srcset="${coverUrl}&w=480&h=320h 480w, ${coverUrl}&w=960&h=640 960w, ${coverUrl}&w=1440&h=960 1440w" sizes="(max-width: 800px) 90vw, (max-width: 1440px) 45vw, 480px" loading="lazy" alt="${repo.description}"/>
</div>
<div class="repo-info">
<div class="repo-header">
<div class="repo-icon">
<img src="${iconUrl}" srcset="${iconUrl}&w=64&h=64 1x, ${iconUrl}&w=128&h=128 2x" alt="${repo.name}">
</div>
<div class="repo-labelbox">
<span>${repo.language}</span>${repo.topics.map(item => `<span>${item}</span>`).join("")}
</div>
<h2 class="repo-title"><a href="${repo.html_url}">${info.locale ? (info.locale[culture]?.full_name || info.full_name) : info.full_name || repo.name}</a></h2>
</div>
<ul class="repo-property">
<li class="icon-desktop" title="Platform">${info.platform === "All" ? _("LABEL_PLATFORM_ALL") : info.platform}</li>
<li class="icon-tag" title="Latest version">${releaseNormal?.tag_name.toUpperCase() || _("LABEL_PREVIEW")}</li>
<li class="icon-file-code-o" title="Code size">${this.getSize(repo.size)}</li>
<li class="icon-calendar" title="Updated time">${this.timeDifference((new Date()).getTime(), new Date(repo.pushed_at).getTime())}</li>
</ul>
<p class="repo-description">${info.locale ? (info.locale[culture]?.description || repo.description) : repo.description ?? _("BRIEF_NULL")}</p>
<div class="repo-document">
<a class="link icon-github" href="${repo.html_url}">${_("BUTTON_GITHUB")}</a>
<a class="link icon-book" href="${info.document}">${_("BUTTON_DOCUMENT")}</a>
<a class="link icon-globe" href="${info.demo ?? "" }">${_("BUTTON_DEMO")}</a>
</div>
<div class="empty"></div>
</div>
<div class="repo-link">
<a class="link-github icon-download" href="${releasePreview?.assets[0] ? `${releasePreview.assets[0].url.replace("https://api.github.com/repos", Config.Download)}?file=${releasePreview.assets[0].name}` : ""}">${_("BUTTON_PREVIEW")}</a>
<a class="link-github icon-download" href="${releaseNormal?.assets[0] ? `${releaseNormal.assets[0].url.replace("https://api.github.com/repos", Config.Download)}?file=${releaseNormal.assets[0].name}` : ""}">${_("BUTTON_PACKAGE")} ${releaseNormal?.tag_name.toUpperCase() || "Release"}</a>
${packageContent}
</div>
    `
  }

  private static async fetchData<T>(url: string): Promise<T> {
    return await fetch(url).then((res) => res.json()).then(res => <T>res)
  }

  private static getSize(size: number): string {
    if (size < 1024) {
      return size + "KB"
    }
    return Math.round(size / 1024) + "MB"
  }

  private static timeDifference(current: number, previous: number): string {
    const rtf = new Intl.RelativeTimeFormat(navigator.language || "en")

    const msPerMinute = 60 * 1000
    const msPerHour = msPerMinute * 60
    const msPerDay = msPerHour * 24
    const msPerMonth = msPerDay * 30
    const msPerYear = msPerDay * 365

    const elapsed = current - previous

    if (elapsed < msPerMinute) {
      return rtf.format(Math.round(elapsed / 1000) * -1, "second")
    } else if (elapsed < msPerHour) {
      return rtf.format(Math.round(elapsed / msPerMinute) * -1, "minute")
    } else if (elapsed < msPerDay) {
      return rtf.format(Math.round(elapsed / msPerHour) * -1, "hour")
    } else if (elapsed < msPerMonth) {
      return rtf.format(Math.round(elapsed / msPerDay) * -1, "day")
    } else if (elapsed < msPerYear) {
      return rtf.format(Math.round(elapsed / msPerMonth) * -1, "month")
    } else {
      return rtf.format(Math.round(elapsed / msPerYear) * -1, "year")
    }
  }
}
/**
 * DOM API
 */
export class DOM {
  public static card: HTMLElement
  public static collection: HTMLElement
  public static searchBox: HTMLInputElement

  /**
   * Load common nodes
   */
  public static load() {
    this.card = document.querySelector(".card") as HTMLElement
    this.collection = document.querySelector(".collection") as HTMLElement
    this.searchBox = document.querySelector("#textInput") as HTMLInputElement

    this.searchBox.placeholder = _("SEARCH_PLACEHOLDER")
    DOM.query("title").textContent = _("SITE_TITLE")
    DOM.query("#sitename").textContent = _("PAGE_TITLE")
  }

  /**
   * Select one node
   * @param  {string} selector Selector
   * @return {HTMLElement} DOM element
   */
  public static query(selector: string): HTMLElement {
    return document.querySelector(selector) as HTMLElement
  }

  /**
   * Select multiple nodes
   * @param  {string} selector Selector
   * @return {NodeListOf<HTMLElement>} DOM Elements
   */
  public static queryAll(selector: string): NodeListOf<HTMLElement> {
    return document.querySelectorAll(selector)
  }
}
