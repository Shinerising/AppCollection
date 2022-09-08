import { RepoInfo, Repository, Release } from './app.interface';
import { Config } from './config';

type debounceFunction = (...args: string[]) => void;
export class Util {
  public static async timeout(delay: number): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      setTimeout(() => {
        resolve(true);
      }, delay);
    });
  }
  public static async nextFrame(): Promise<boolean> {
    return new Promise<boolean>(resolve => {
      requestAnimationFrame(() => {
        resolve(true);
      });
    });
  }
  public static debounce(fn: debounceFunction, wait: number) {
    let timeout: NodeJS.Timeout;

    return (...args: string[]) => {
      const later = () => {
        clearTimeout;
        fn(...args);
      };

      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
  public static isURL(query: string) {
    // eslint-disable-next-line
    const urlRegex = /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[a-z0-9]+([\-\.]{1}[a-z0-9]+)*\.[a-z]{2,6}(:[0-9]{1,5})?(\/.*)?$/ig;
    return query.length < 2083 && urlRegex.test(query);
  }
}

export class Data {

  public static async startFetching() {
    const list = await this.fetchData<RepoInfo[]>('list.json');

    DOM.card.addClass('visible');

    for (const item of list) {
      const repo = await this.fetchData<Repository>(`${Config.API}/${Config.Owner}/${item.name}`);
      const releases = await this.fetchData<Release[]>(`${Config.API}/${Config.Owner}/${item.name}/releases`);
      const node = this.generateNode(item, repo, releases);
      this.applyNode(node);
    }
  }

  private static async applyNode(node: string) {
    DOM.collection.innerHTML += node;
    await Util.nextFrame();
    DOM.queryAll('section.repo').forEach(item => item.addClass('visible'));
  }

  private static generateNode(info:RepoInfo, repo: Repository, releases: Release[]): string {
    const releaseNormal = releases.filter(item => !item.prerelease)[0];
    const releasePreview = releases.filter(item => item.prerelease)[0];
    return `
<section class="repo">
<div class="repo-cover">
<img src="${Config.Content}/${repo.full_name}/contents/preview.jpg"/>
</div>
<div class="repo-info">
<div class="repo-icon">
<img src="${Config.Content}/${repo.full_name}/contents/icon.png">
</div>
<h2 class="repo-title">${info.full_name || repo.name}</h2>
<div class="repo-labelbox">
<span>${repo.language}</span>${repo.topics.map(item => `<span>${item}</span>`).join('')}
</div>
<p class="repo-description">${repo.description}</p>
</div>
<div class="repo-link">
<a class="link-github icon-tag" href="${releasePreview?.html_url || ''}">Release</a>
<a class="link-github icon-download" href="${releasePreview?.assets[0] ? `${releasePreview.assets[0].url.replace('https://api.github.com/repos', Config.Download)}?file=${releasePreview.assets[0].name}` : ''}">Preview</a>
<a class="link-github icon-download" href="${releaseNormal?.assets[0]? `${releaseNormal.assets[0].url.replace('https://api.github.com/repos', Config.Download)}?file=${releaseNormal.assets[0].name}` : ''}">Package ${releaseNormal?.tag_name.toUpperCase() || 'Release'}</a>
</div>
</section>
    `;
  }

  private static async fetchData<T>(url: string): Promise<T> {
    return await fetch(url).then((res) => res.json()).then(res => <T>res);
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
    this.sitename = document.querySelector('#sitename') as HTMLElement;
    this.titleBox = document.querySelector('#title') as HTMLElement;
    this.coverGlass = document.querySelector('#cover>.cover-glass') as HTMLElement;
    this.card = document.querySelector('.card') as HTMLElement;
    this.collection = document.querySelector('.collection') as HTMLElement;
  }

  /**
   * Select one node
   * @param  {string} selector Selector
   * @return {HTMLElement} DOM element
   */
  public static query(selector: string): HTMLElement {
    return document.querySelector(selector) as HTMLElement;
  }

  /**
   * Select multiple nodes
   * @param  {string} selector Selector
   * @return {NodeListOf<HTMLElement>} DOM Elements
   */
  public static queryAll(selector: string): NodeListOf<HTMLElement> {
    return document.querySelectorAll(selector);
  }
}

