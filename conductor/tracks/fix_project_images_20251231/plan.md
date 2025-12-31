# Plan: 修復專案圖片顯示問題

## 階段 1：資料層邏輯更新 (TDD)
- [x] 撰寫 `src/lib/github.test.ts` 測試 `transformToProject` 函數。 (33f03e2)
  - 驗證生成的 `imageUrl` 應符合 `https://opengraph.githubassets.com/1/{owner}/{repo}` 格式。
- [x] 修改 `src/lib/github.ts` 中的 `transformToProject` 實作。 (33f03e2)
- [x] 執行測試並確認通過。 (33f03e2)

## 階段 2：UI 層 Fallback 與錯誤處理 (TDD) [checkpoint: 566c474]
- [x] 在 `src/components/ProjectCard.test.tsx` 增加測試案例： (4ced0b9)
  - 模擬圖片載入失敗 (onError)。
  - 驗證是否顯示了預設的 Fallback 圖片路徑。
- [x] 修改 `src/components/ProjectCard.tsx`： (4ced0b9)
  - 使用 `useState` 監控圖片載入狀態。
  - 實作 `onError` 處理函式，切換至預設圖片 URL。
- [x] 執行測試並確認通過。 (4ced0b9)

## 階段 3：驗證與檢查點
- [x] 執行全域自動化測試：`npm test`。 (72f338d)
- [x] 任務：Conductor - 使用者手動驗證 '修復圖片顯示問題' (協議詳見 workflow.md)。 (72f338d)
