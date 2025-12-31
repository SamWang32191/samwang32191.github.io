# Tech Stack

## 前端開發
- **框架：** [Next.js (React)](https://nextjs.org/) - 利用其靜態網站生成 (SSG) 功能，確保在 GitHub Pages 上的高效載入與 SEO 表現。
- **語言：** TypeScript - 提供強型別支援，提升程式碼品質與可維護性。

## 樣式與 UI
- **樣式工具：** [Tailwind CSS](https://tailwindcss.com/) - 用於快速建構自定義設計與深色模式。
- **UI 元件庫：** [Headless UI](https://headlessui.dev/) / [Radix UI](https://www.radix-ui.com/) - 提供無樣式的無障礙元件，便於結合 Tailwind 打造精緻的互動效果。
- **動畫庫：** [Framer Motion](https://www.framer.com/motion/) - 實現平滑的過場動畫與懸停效果。

## 資料獲取與整合
- **API 客戶端：** [Octokit](https://github.com/octokit/octokit.js) - GitHub 官方 SDK，用於呼叫 GitHub REST/GraphQL API 獲取儲存庫與 Pages 資訊。
- **資料處理：** 結合自動化 API 抓取與本地 JSON/YAML 設定檔，實現半自動化的專案清單管理。

## 基礎建設與部署
- **託管平台：** GitHub Pages
- **部署流程：** GitHub Actions - 自動化構建 Next.js 專案並部署至 `gh-pages` 分支。
