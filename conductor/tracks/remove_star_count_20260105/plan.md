# 實作計畫 - 移除專案卡片 Star 數量顯示

## 第一階段：實作與驗證 [checkpoint: 1d09fdb]
- [x] 任務：從 `ProjectCard.tsx` 移除 Star 數量顯示與邏輯
    - [x] 移除 Star 的 SVG/圖示。
    - [x] 移除顯示 Star 數量的文字。
    - [x] 如果 `ProjectCard` 不再需要 `stargazers_count`，清除相關的 props 或資料轉換程式碼（檢查是否從父層傳入）。
- [x] 任務：更新測試
    - [x] 執行測試以識別損壞的快照或邏輯：`npm test src/components/ProjectCard.test.tsx`
    - [x] 移除 `src/components/ProjectCard.test.tsx` 中檢查 Star 數量存在的斷言。
    - [x] 更新快照：`npm test -- -u src/components/ProjectCard.test.tsx`
- [x] 任務：Conductor - 使用者手動驗證 '第一階段' (協議詳見 workflow.md)
