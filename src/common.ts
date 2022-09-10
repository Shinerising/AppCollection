import { RepoInfo, Repository, Release } from './app.interface'
import { Config } from './config'

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
    const list = await this.fetchData<RepoInfo[]>('list.json')

    DOM.card.addClass('visible')

    list.map(async item => {
      const wrapper = document.createElement('div');
      wrapper.addClass('repo-wrapper');
      DOM.collection.appendChild(wrapper);
      try {
        const repo = await this.fetchData<Repository>(`${Config.API}/${Config.Owner}/${item.name}`)
        const releases = await this.fetchData<Release[]>(`${Config.API}/${Config.Owner}/${item.name}/releases`)
        const node = this.generateNode(item, repo, releases)
        await this.applyNode(wrapper, node)
      } catch {
        wrapper.remove()
      }
    })
  }

  private static async applyNode(wrapper: HTMLElement, node: string) {
    wrapper.innerHTML += node
    await Util.nextFrame()
    wrapper.addClass('visible')
  }

  private static generateNode(info: RepoInfo, repo: Repository, releases: Release[]): string {
    const releaseNormal = releases.filter(item => !item.prerelease)[0]
    const releasePreview = releases.filter(item => item.prerelease)[0]
    return `
<section class="repo">
<div class="repo-cover">
<img src="${Config.Content}/${repo.full_name}/contents/preview.jpg"/>
</div>
<div class="repo-info">
<div class="repo-header">
<div class="repo-icon">
<img src="${Config.Content}/${repo.full_name}/contents/icon.png">
</div>
<h2 class="repo-title"><a href="${repo.html_url}">${info.full_name || repo.name}</a></h2>
</div>
<div class="repo-labelbox">
<span>${repo.language}</span>${repo.topics.map(item => `<span>${item}</span>`).join('')}
</div>
<p class="repo-description">${repo.description}</p>
<ul class="repo-property">
<li class="icon-monitor" title="Platform">${info.platform}</li>
<li class="icon-tag" title="Latest version">${releaseNormal?.tag_name.toUpperCase() || 'Preview'}</li>
<li class="icon-code" title="Code size">${this.getSize(repo.size)}</li>
<li class="icon-clock" title="Updated time">${this.timeDifference((new Date()).getTime(), new Date(repo.updated_at).getTime())}</li>
</ul>
</div>
<div class="repo-link">
<a class="link-github icon-book-open" href="${info.document}">Document</a>
<a class="link-github icon-download" href="${releasePreview?.assets[0] ? `${releasePreview.assets[0].url.replace('https://api.github.com/repos', Config.Download)}?file=${releasePreview.assets[0].name}` : ''}">Preview</a>
<a class="link-github icon-download" href="${releaseNormal?.assets[0] ? `${releaseNormal.assets[0].url.replace('https://api.github.com/repos', Config.Download)}?file=${releaseNormal.assets[0].name}` : ''}">Package ${releaseNormal?.tag_name.toUpperCase() || 'Release'}</a>
</div>
</section>
    `
  }

  private static async fetchData<T>(url: string): Promise<T> {
    return await fetch(url).then((res) => res.json()).then(res => <T>res)
  }

  private static getSize(size: number): string {
    if (size < 1024) {
      return size + 'KB'
    }
    return Math.round(size / 1024) + 'MB'
  }

  private static timeDifference(current: number, previous: number): string {
    const rtf = new Intl.RelativeTimeFormat(navigator.language || 'en')

    const msPerMinute = 60 * 1000
    const msPerHour = msPerMinute * 60
    const msPerDay = msPerHour * 24
    const msPerMonth = msPerDay * 30
    const msPerYear = msPerDay * 365

    const elapsed = current - previous

    if (elapsed < msPerMinute) {
      return rtf.format(Math.round(elapsed / 1000) * -1, 'second')
    } else if (elapsed < msPerHour) {
      return rtf.format(Math.round(elapsed / msPerMinute) * -1, 'minute')
    } else if (elapsed < msPerDay) {
      return rtf.format(Math.round(elapsed / msPerHour) * -1, 'hour')
    } else if (elapsed < msPerMonth) {
      return rtf.format(Math.round(elapsed / msPerDay) * -1, 'day')
    } else if (elapsed < msPerYear) {
      return rtf.format(Math.round(elapsed / msPerMonth) * -1, 'month')
    } else {
      return rtf.format(Math.round(elapsed / msPerYear) * -1, 'year')
    }
  }
}
/**
 * DOM API
 */
export class DOM {
  public static sitename: HTMLElement;
  public static titleBox: HTMLElement;
  public static coverGlass: HTMLElement;
  public static card: HTMLElement;
  public static collection: HTMLElement;

  /**
   * Load common nodes
   */
  public static load() {
    this.sitename = document.querySelector('#sitename') as HTMLElement
    this.titleBox = document.querySelector('#title') as HTMLElement
    this.coverGlass = document.querySelector('#cover>.cover-glass') as HTMLElement
    this.card = document.querySelector('.card') as HTMLElement
    this.collection = document.querySelector('.collection') as HTMLElement
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
