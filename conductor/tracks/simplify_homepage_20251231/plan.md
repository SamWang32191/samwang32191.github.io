# 實作計畫 - 簡化首頁介面

## 第一階段：內容清理與版面簡化
- [x] 任務：移除 Hero 用戶引導區塊 374a6b5
    - 修改 `src/app/page.tsx` 以移除 Hero 區塊（標題、描述、行動呼籲按鈕）。
- [x] 任務：移除精選專案標題 374a6b5
    - 修改 `src/app/page.tsx` 以移除 "Featured Projects" 標題與副標題文字。
- [x] 任務：簡化導覽列 463c70f
    - 修改 `src/app/layout.tsx`（或包含的 Navbar 組件）以移除導覽連結（Projects, About, Contact），僅保留品牌標誌/文字。
- [x] 任務：執行現有測試 463c70f
    - 執行 `npm test`（或專案等效指令）以確保 ProjectCard 或其他組件無回歸錯誤。
- [~] 任務：Conductor - 使用者手動驗證 '內容清理與版面簡化' (協議詳見 workflow.md)

## 第二階段：最終驗證
- [ ] 任務：驗證建置
    - 執行 `npm run build` 以確保生產環境建置乾淨無誤。
- [ ] 任務：Conductor - 使用者手動驗證 '最終驗證' (協議詳見 workflow.md)
