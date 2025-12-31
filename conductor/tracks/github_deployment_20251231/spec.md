# Spec: GitHub Pages Deployment via GitHub Actions

## 概述
設定自動化部署流程，當程式碼推送至 `main` 分支時，透過 GitHub Actions 自動建置 Next.js 專案並將靜態檔案部署至 `gh-pages` 分支。

## 功能需求
- **自動化建置 (GitHub Actions):**
    - 觸發條件：每次 `push` 到 `main` 分支。
    - 建置環境：使用 Node.js 環境 (**版本 24**)。
    - 步驟：
        1. 安裝相依套件 (pnpm/npm/yarn)。
        2. 執行 Next.js 靜態建置 (`next build`)。
        3. 確保 `next.config.ts` 已設定 `output: 'export'`。
- **自動化部署:**
    - 使用 `JamesIves/github-pages-deploy-action` 或類似的工具。
    - 目標分支：`gh-pages`。
    - 部署內容：`out` 資料夾（Next.js 預設匯出目錄）。
    - 權限：使用預設的 `GITHUB_TOKEN`。

## 非功能需求
- **穩定性：** 部署流程應具備錯誤重試或明確的失敗通知。
- **安全性：** 不得在 Actions 中洩露秘密。

## 驗收標準
- [ ] 推送程式碼到 `main` 後，GitHub Actions 成功啟動並完成。
- [ ] `gh-pages` 分支已根據最新內容更新。
- [ ] 網站可透過 `https://<username>.github.io/` 正常訪問。
- [ ] Next.js 的靜態路由 (routing) 運作正常。

## 超出範圍
- 設定自定義網域 (Custom Domain)。
- 設定環境部署（Staging/Production 分離）。
