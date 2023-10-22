const locale = {
  en: {
    "PAGE_TITLE": "Application Collection",
    "BRIEF_NULL": "No brief.",
    "BUTTON_DOCUMENT": "Document",
    "BUTTON_PREVIEW": "Preview",
    "BUTTON_PACKAGE": "Package"
  },
  zh: {
    "PAGE_TITLE": "应用软件集合",
    "BRIEF_NULL": "暂无简介。",
    "BUTTON_DOCUMENT": "查看文档",
    "BUTTON_PREVIEW": "预览版本",
    "BUTTON_PACKAGE": "下载"
  }
}

export const culture = navigator.language.startsWith("zh") ? "zh" : "en"
const dict = locale[culture]
export const _ = (key:keyof typeof dict) => dict[key]