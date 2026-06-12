# Sam Wang 的作品集

一個使用 Next.js 15 打造的高質感作品集網站，自動展示 GitHub Pages 專案。

## 功能特色

- 🚀 **自動獲取 GitHub 專案** - 自動擷取並展示您的 GitHub Pages 專案庫
- 🎨 **高級 UI 設計** - 毛玻璃效果、流暢動畫和響應式佈局
- ⭐ **豐富的專案卡片** - 顯示標籤、星星數和最後更新時間
- 🔧 **備援機制** - 當 API 無法使用時，優雅地切換至示範資料
- 📱 **行動優先** - 完全響應式設計，適用於所有裝置

## 快速開始

### 前置需求

- Node.js 18+
- npm 或 pnpm

### 安裝

```bash
# 安裝相依套件
npm install

# 複製環境變數範例檔
cp .env.example .env.local
```

### 環境設定

公開 GitHub Pages 專案不需要 Personal Access Token；網站會在建置時直接抓取 `SamWang32191` 的公開 repo。若想提高 GitHub API rate limit，或之後要抓取受限制的 repo，可以設定 Token：

1. 前往 [GitHub Settings > Tokens](https://github.com/settings/tokens)
2. 點選「Generate new token (classic)」
3. 選擇權限範圍：`public_repo`（僅公開專案）或 `repo`（所有專案）
4. 複製 Token 並加入您的 `.env.local` 檔案：

```env
GITHUB_TOKEN=your_personal_access_token_here
```

**注意：** Mock Data 只會在 GitHub API 呼叫失敗時使用；未設定 Token 仍會嘗試抓取公開 repo。

### 開發

```bash
# 啟動開發伺服器
npm run dev

# 執行測試
npm test

# 建置正式版本
npm run build
```

在瀏覽器開啟 [http://localhost:3000](http://localhost:3000) 即可查看結果。

## 專案結構

```
src/
├── app/              # Next.js App Router 頁面
├── components/       # React 元件
├── data/            # 靜態資料（Mock 專案）
├── lib/             # 工具函式（GitHub API 客戶端）
├── services/        # 業務邏輯（專案服務）
├── test/            # 測試檔案
└── types/           # TypeScript 型別定義
```

## 技術棧

- **框架：** Next.js 15（App Router）
- **樣式：** Tailwind CSS v4
- **測試：** Vitest + Testing Library
- **API：** 透過 Octokit 呼叫 GitHub REST API

## 運作原理

1. 網站在建置時從 GitHub API 獲取專案庫（SSG）
2. 篩選已啟用 GitHub Pages 的專案（`has_pages: true`）
3. 排除帶有 `hidden-from-hub` 標籤的專案
4. 按專案名稱字母順序排序
5. 以豐富的專案卡片顯示標籤、星星數和最後更新時間

## 部署

### GitHub Pages

本專案已設定透過 GitHub Actions 自動部署至 GitHub Pages。

### CI/CD 環境變數

在您的 GitHub 專案庫設定中，新增以下 Secret：

- `GITHUB_TOKEN` - 選填，Personal Access Token，用於提高 GitHub API rate limit

## 貢獻

歡迎開立 Issue 或提交 Pull Request！

## 授權

MIT
