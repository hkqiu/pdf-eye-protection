# PDF Eye Protection | PDF 护眼模式

A Chrome extension that applies eye-protection color filters over PDF pages to reduce reading fatigue.

一款 Chrome 扩展，为 PDF 页面添加护眼色彩滤镜，减轻长时间阅读带来的眼部疲劳。

---

## Features | 功能特性

- **Four color modes | 四种护眼模式**:
  - Warm Tone | 暖色调 — soft sepia tint
  - Kraft Paper | 牛皮纸 — paper-like background
  - Dark Mode | 深色模式 — dark background for low-light reading
  - Bean Green | 豆沙绿 — gentle green tint
- **Auto-start | 自动启用** — applies filter automatically when opening any PDF
- **Live preview | 实时预览** — preview mode colors before applying
- **Zero dependencies | 零依赖** — pure vanilla JS, no build step required
- **Privacy-first | 隐私优先** — no network requests, no data collection, all settings stored locally

## Installation | 安装

### Developer mode | 开发者模式

1. Open Chrome and go to `chrome://extensions/`
2. Enable **Developer mode** (toggle in the top-right corner)
3. Click **Load unpacked**
4. Select this project folder
5. The green eye icon will appear in the toolbar

### Pre-built archive | 预构建包

A ready-to-use `pdf-eye-protection.zip` is included in the repo — upload it directly to the Chrome Web Store or share it.

## Usage | 使用方法

1. Click the extension icon in the toolbar
2. Toggle the master switch to enable
3. Enable "Auto Start" to apply filters automatically on PDF pages
4. Choose a color mode from the dropdown
5. Open any PDF in Chrome — the filter applies automatically

## How It Works | 工作原理

The extension detects PDF pages by looking for `<embed>`, `<object>`, Chrome's built-in `#viewer` element, or `<pdf-viewer>` tags. It then injects CSS filters (`sepia`, `brightness`, `invert`, `hue-rotate`, etc.) and a matching background color onto the page. A `MutationObserver` handles late-loading PDF elements, and `chrome.storage.local` persists user preferences.

## Tech Stack | 技术栈

- Chrome Extension Manifest V3
- Vanilla JavaScript (ES5)
- CSS3 Filters
- `chrome.storage.local` API
- `MutationObserver` for DOM detection

## Project Structure | 项目结构

```
manifest.json        # Extension manifest
content.js           # Content script — PDF detection & filter injection
background.js        # Service worker (placeholder)
popup.html/css/js    # Popup UI for settings
icons/               # Extension icons (16/48/128px)
privacy_policy.html  # Privacy policy
generate-icons.js    # Node.js script to generate icon PNGs
```

## Privacy | 隐私声明

This extension makes **zero network requests** and collects **no user data**. All settings are stored locally via `chrome.storage.local`. See `privacy_policy.html` for the full policy.

本扩展**不发起任何网络请求**，**不收集任何用户数据**。所有设置通过 `chrome.storage.local` 本地存储。完整隐私政策见 `privacy_policy.html`。

## License | 许可

MIT
