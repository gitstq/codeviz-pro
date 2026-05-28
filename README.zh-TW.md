# 🕸️ CodeViz Pro

[English](README.md) | [简体中文](README.zh-CN.md) | **繁體中文**

> 將任何程式碼庫轉換為可互動、可探索的知識圖譜

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/gitstq/codeviz-pro)](https://github.com/gitstq/codeviz-pro/stargazers)
[![GitHub forks](https://img.shields.io/github/forks/gitstq/codeviz-pro)](https://github.com/gitstq/codeviz-pro/network)

## 🎉 專案介紹

**CodeViz Pro** 是一款強大的瀏覽器端程式碼視覺化工具，可以將任何程式碼庫轉換為互動式知識圖譜。與傳統需要複雜設定的程式碼分析工具不同，CodeViz Pro 完全在瀏覽器中執行，零依賴。

### 🌟 核心亮點

- **純前端實現**：無需後端，完全在瀏覽器中執行
- **多種佈局演算法**：支援力導向、階層、圓形和網格佈局
- **互動式編輯**：拖曳節點、縮放、平移，探索程式碼結構
- **GitHub 整合**：透過 GitHub API 直接分析公開倉庫
- **匯出選項**：將圖譜儲存為 PNG、SVG 或 JSON
- **多語言支援**：完整支援簡體中文、繁體中文和英文

## ✨ 核心特性

### 🎨 視覺化探索
- **互動式圖譜**：點擊、拖曳、縮放和平移瀏覽程式碼庫
- **智慧佈局**：4 種不同的佈局演算法可選
- **節點高亮**：聚焦特定元件及其關係
- **搜尋與過濾**：快速查找檔案、函數或類別

### 📊 佈局演算法
| 佈局 | 描述 | 適用場景 |
|------|------|----------|
| **力導向** | 基於物理的力導向佈局 | 通用探索 |
| **樹形** | 階層樹狀結構 | 理解繼承關係 |
| **圓形** | 環形排列 | 元件概覽 |
| **網格** | 網格化組織 | 結構化對比 |

### 🔧 自訂設定
- **節點大小**：動態調整節點大小
- **連線距離**：控制節點間距
- **電荷強度**：修改排斥/吸引力
- **標籤開關**：顯示/隱藏節點標籤
- **類型過濾**：按檔案、函數、類別或匯入過濾

### 📥 匯入選項
- **JSON 匯入**：載入自訂圖譜資料
- **GitHub URL**：直接分析公開倉庫
- **範例資料**：試用內建範例

### 📤 匯出選項
- **PNG 圖片**：高解析度點陣匯出
- **SVG 向量**：可縮放向量圖形
- **JSON 資料**：儲存圖譜結構供後續使用

## 🚀 快速開始

### 方案一：線上展示
訪問 [https://gitstq.github.io/codeviz-pro](https://gitstq.github.io/codeviz-pro) 立即體驗。

### 方案二：本地安裝

```bash
# 複製倉庫
git clone https://github.com/gitstq/codeviz-pro.git

# 進入專案目錄
cd codeviz-pro

# 啟動本地伺服器
npx serve . -p 3000

# 或直接在瀏覽器中開啟 index.html
```

### 方案三：Docker

```bash
docker run -p 3000:80 gitstq/codeviz-pro
```

## 📖 使用指南

### 基礎用法

1. **匯入資料**
   - 點擊「匯入」按鈕
   - 選擇 JSON、GitHub URL 或範例資料

2. **探索圖譜**
   - 點擊節點查看詳情
   - 拖曳重新排列
   - 滾動縮放
   - 右鍵平移

3. **自訂視圖**
   - 使用側邊欄更改佈局
   - 調整節點大小和間距設定
   - 按節點類型過濾

4. **匯出結果**
   - 點擊「匯出」按鈕
   - 選擇 PNG、SVG 或 JSON 格式

### 鍵盤快速鍵

| 快速鍵 | 操作 |
|--------|------|
| `Ctrl/Cmd + O` | 開啟匯入對話方塊 |
| `Ctrl/Cmd + S` | 開啟匯出對話方塊 |
| `Ctrl/Cmd + F` | 聚焦搜尋框 |
| `Ctrl/Cmd + 0` | 重置視圖 |
| `Esc` | 關閉對話方塊 |

### GitHub 倉庫分析

1. 點擊「匯入」→「GitHub URL」
2. 輸入倉庫位址（例如：`https://github.com/facebook/react`）
3. 點擊「分析」
4. 探索生成的圖譜

⚠️ **注意**：GitHub API 有速率限制。私有倉庫需要身份驗證。

## 💡 設計理念

### 為什麼選擇 CodeViz Pro？

現有的程式碼視覺化工具通常需要：
- 複雜的安裝和設定
- 後端伺服器和資料庫
- 命令列專業知識
- IDE 外掛

CodeViz Pro 透過提供**零設定、瀏覽器優先**的解決方案消除了這些障礙，任何人都可以立即使用。

### 技術選型

- **D3.js**：資料視覺化行業標準
- **原生 JavaScript**：無框架依賴
- **純 CSS**：可自訂且輕量
- **Font Awesome**：一致的圖示設計

## 📦 部署

### GitHub Pages

1. Fork 本倉庫
2. 進入 Settings → Pages
3. 選擇 "Deploy from a branch"
4. 選擇 `main` 分支和 `/ (root)` 資料夾
5. 您的網站將在 `https://yourusername.github.io/codeviz-pro` 上線

### Netlify

```bash
# 安裝 Netlify CLI
npm install -g netlify-cli

# 部署
netlify deploy --prod --dir=.
```

### Vercel

```bash
# 安裝 Vercel CLI
npm install -g vercel

# 部署
vercel --prod
```

## 🤝 貢獻指南

我們歡迎貢獻！請按以下步驟操作：

1. Fork 本倉庫
2. 建立功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'feat: add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 發起 Pull Request

### 提交規範

我們遵循 [Angular 提交規範](https://github.com/angular/angular/blob/main/CONTRIBUTING.md#commit)：

- `feat:` 新功能
- `fix:` 錯誤修復
- `docs:` 文件更改
- `style:` 程式碼樣式更改（格式化）
- `refactor:` 程式碼重構
- `test:` 測試更改
- `chore:` 建置程序或輔助工具更改

## 🗺️ 路線圖

- [ ] **v1.1.0**：支援更多程式語言
- [ ] **v1.2.0**：即時協作功能
- [ ] **v1.3.0**：AI 驅動的程式碼分析
- [ ] **v1.4.0**：自訂主題和樣式
- [ ] **v2.0.0**：可擴展的外掛系統

## 📄 開源協議

本專案採用 MIT 協議 - 詳情請參閱 [LICENSE](LICENSE) 文件。

## 🙏 致謝

- 靈感來源於 [Understand-Anything](https://github.com/Lum1104/Understand-Anything)
- 基於 [D3.js](https://d3js.org/) 建置
- 圖示來自 [Font Awesome](https://fontawesome.com/)

## 📞 支援

- 🐛 [報告問題](https://github.com/gitstq/codeviz-pro/issues)
- 💡 [功能建議](https://github.com/gitstq/codeviz-pro/issues)
- 💬 [討論區](https://github.com/gitstq/codeviz-pro/discussions)

---

<p align="center">
  用 ❤️ 為開發者社群打造
</p>
