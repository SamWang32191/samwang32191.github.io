# Plan: Navigation Logo Link to GitHub Repository

## Phase 1: 設定檔配置 [checkpoint: 57afb16]
- [x] 任務：建立 `src/config/site.ts` 並匯出 `siteConfig` 包含 `repoUrl` [0cfdd23]
- [x] 任務：Conductor - 使用者手動驗證 '設定檔配置' (協議詳見 workflow.md)

## Phase 2: 導覽列組件化與連結實作 (TDD)
- [ ] 任務：建立 `src/components/Navbar.tsx` 與其測試檔案 `src/components/Navbar.test.tsx`
- [ ] 任務：撰寫測試驗證 `Navbar` 中的 Logo 連結是否正確指向 `siteConfig.repoUrl`
- [ ] 任務：實作 `Navbar` 組件並從 `siteConfig` 讀取資料
- [ ] 任務：在 `src/app/layout.tsx` 中使用 `Navbar` 替換原有的 header 結構
- [ ] 任務：Conductor - 使用者手動驗證 '導覽列組件化與連結實作' (協議詳見 workflow.md)
