# Track Specification: Card-based Navigation & UI Cleanup

## 1. Overview
目前專案卡片依賴明確的 "Visit Site" 連結來進行導航。本任務旨在優化使用者體驗，將專案卡片本身轉換為導覽主體，並移除冗餘的文字連結，使 UI 更簡潔、直觀。

## 2. Functional Requirements
- **導航邏輯重構 (Separate Zones):**
    - **主要區域 (Site Link):** 點擊卡片的圖片或專案資訊區域（標題、描述）時，應導覽至專案的實際網址 (Live Site)。
    - **特定區域 (Repo Link):** 點擊 GitHub 圖示時，導覽至 GitHub 儲存庫 (Repository)。
- **移除冗餘元素:** 刪除現有的 "Visit Site" 文字連結。
- **視覺回饋 (Desktop Only):**
    - 實作「懸停工具提示 (Hover Tooltips)」。當滑鼠移過主要區域時顯示 "Visit Website"，移過 GitHub 圖示時顯示 "View Code"。
- **行動端互動:** 在行動裝置上，點擊對應區域即執行跳轉，不需顯示工具提示。

## 3. Non-Functional Requirements
- **無縫整合:** 導航變更不得破壞現有的 Glassmorphism 設計風格。
- **輔助功能 (Accessibility):** 確保卡片的主要區域與 GitHub 圖示具備適當的 `aria-label` 或替代文字，以便螢幕閱讀器識別。
- **效能:** 工具提示應輕量化，不影響卡片列表的捲動效能。

## 4. Acceptance Criteria
- [ ] 卡片上不再出現 "Visit Site" 字樣。
- [ ] 點擊卡片非圖示區域能正確開啟專案網址。
- [ ] 點擊 GitHub 圖示能正確開啟程式碼儲存庫網址。
- [ ] 桌面端懸停時有正確的工具提示文字。
- [ ] 點擊 GitHub 圖示時，不會同時觸發專案網址的跳轉。

## 5. Out of Scope
- 修改 GitHub API 資料抓取邏輯。
- 變更卡片的整體佈局結構（僅調整點擊邏輯與細部 UI）。
