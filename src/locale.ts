const locale = {
  en: {
    "SITE_TITLE": "Application Collection",
    "PAGE_TITLE": "Application Collection",
    "BRIEF_NULL": "No brief.",
    "BUTTON_DOCUMENT": "Document",
    "BUTTON_PREVIEW": "Preview",
    "BUTTON_PACKAGE": "Package",
    "BUTTON_GITHUB": "Source code",
    "BUTTON_DEMO": "Demo",
    "LABEL_PREVIEW": "Preview",
    "LABEL_PLATFORM_ALL": "Cross-platform"
  },
  zh: {
    "SITE_TITLE": "软件集合",
    "PAGE_TITLE": "科研成果及应用软件合集",
    "BRIEF_NULL": "暂无简介。",
    "BUTTON_DOCUMENT": "查看说明文档",
    "BUTTON_PREVIEW": "下载预览版本",
    "BUTTON_PACKAGE": "下载",
    "BUTTON_GITHUB": "查看源代码",
    "BUTTON_DEMO": "查看示例",
    "LABEL_PREVIEW": "预览版本",
    "LABEL_PLATFORM_ALL": "全平台"
  }
}

export const culture = navigator.language.startsWith("zh") ? "zh" : "en"
const dict = locale[culture]
export const _ = (key:keyof typeof dict) => dict[key]