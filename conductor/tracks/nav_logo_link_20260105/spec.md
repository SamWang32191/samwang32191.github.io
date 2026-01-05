# Spec: Navigation Logo Link to GitHub Repository

## 概述
當使用者點擊導覽列左上角的 "SamWang Portfolio" 時，應能直接跳轉至該專案的 GitHub 儲存庫頁面。為了提升可維護性，網址將從設定檔中讀取。

## 功能需求
- **Logo 點擊跳轉：** 點擊 `src/app/layout.tsx` 中的 "SamWang Portfolio" 標題。
- **目標網址：** `https://github.com/SamWang32191/samwang32191.github.io`。
- **開啟方式：** 在同一個分頁開啟（目前為靜態 SPA 導向外部連結）。
- **外部配置：** 連結網址應配置於 `src/config/site.ts` 或類似的設定檔中，便於未來修改。

## 非功能需求
- **UX：** 滑鼠懸停在 Logo 上時應顯示指向手勢（Cursor Pointer）。
- **TDD：** 應包含單元測試驗證連結網址是否正確。

## 驗收標準
1. 導覽列左上角的文字變為可點擊連結。
2. 點擊後跳轉至預期的 GitHub 頁面。
3. 網址是從獨立的設定檔匯入的。
4. 測試通過。

## 排除範圍
- 目前不負責更換 Logo 圖片或其餘導覽選單功能。
