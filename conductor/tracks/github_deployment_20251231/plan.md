# Plan: GitHub Pages Deployment via GitHub Actions

## Phase 1: 專案配置與本地驗證 (Project Configuration & Local Validation) [checkpoint: 4353441]
- [x] 任務：更新 `next.config.ts` 以支援靜態匯出 [76b92be]
    - [x] 將 `output` 設定為 `'export'`
    - [x] (如果有使用 Image) 設定 `images.unoptimized` 為 `true` (GitHub Pages 不支援預設的 Next.js Image Optimization)
- [x] 任務：本地建置測試 [1ab1906]
    - [x] 執行 `npm run build` (或對應的 pnpm/yarn 指令)
    - [x] 確認 `out` 資料夾已生成且內容正確
- [x] 任務：Conductor - 使用者手動驗證 'Phase 1' (協議詳見 workflow.md) [4353441]

## Phase 2: GitHub Actions 工作流實作 (GitHub Actions Implementation)
- [ ] 任務：建立 GitHub Actions 工作流檔案
    - [ ] 建立 `.github/workflows/deploy.yml`
- [ ] 任務：配置建置步驟
    - [ ] 設定 `on: push: branches: [main]`
    - [ ] 使用 `actions/setup-node` 並指定版本為 `24`
    - [ ] 安裝相依套件並執行建置
- [ ] 任務：配置部署步驟
    - [ ] 使用 `JamesIves/github-pages-deploy-action@v4`
    - [ ] 設定 `folder: out` 及 `branch: gh-pages`
- [ ] 任務：測試部署流程
    - [ ] 推送變更至 GitHub `main` 分支
    - [ ] 觀察 GitHub Actions 執行結果
- [ ] 任務：Conductor - 使用者手動驗證 'Phase 2' (協議詳見 workflow.md)
