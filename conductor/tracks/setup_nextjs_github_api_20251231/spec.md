# Spec: 建立基礎架構與 GitHub API 整合

## 概述
本軌道的目標是奠定專案的技術基礎。我們將初始化一個基於 Next.js 的 TypeScript 專案，配置 Tailwind CSS 以實現深色模式，並整合 Octokit 以連接 GitHub API，實現自動獲取使用者擁有 GitHub Pages 的儲存庫列表。

## 驗收標準
1. **開發環境初始化：**
   - 成功建立 Next.js (App Router) 專案。
   - 整合 TypeScript 並通過型別檢查。
   - 配置 Tailwind CSS，並預設開啟深色模式。
2. **GitHub API 整合：**
   - 成功安裝並配置 Octokit。
   - 實作一個工具函式，能根據使用者的 GitHub Token (或公開存取) 獲取其所有開啟 GitHub Pages 的儲存庫。
   - 資料結構應包含：儲存庫名稱、描述、GitHub Pages URL、以及 Social Preview 圖片 URL。
3. **基礎 UI 展示 (PoC)：**
   - 在首頁顯示獲取到的專案清單（初步以卡片或列表形式）。
   - 確保基礎的響應式設計與深色模式視覺效果。

## 技術細節
- **前端：** Next.js 14+ (App Router), TypeScript
- **樣式：** Tailwind CSS, Lucide React (圖示)
- **API：** Octokit
- **部署：** 預留 GitHub Actions 構建與部署至 GitHub Pages 的配置
