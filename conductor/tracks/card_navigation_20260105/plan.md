# Implementation Plan: Card-based Navigation & UI Cleanup

## Phase 1: Preparation & Component Analysis [x] [checkpoint: 83f6741]
在此階段，我們將分析現有的 `ProjectCard` 組件結構，並確保測試環境已就緒，以便進行 TDD 開發。

- [x] Task: 分析 `src/components/ProjectCard.tsx` 的 DOM 結構，確定「主要區域」與「GitHub 圖示區域」的拆分點
- [x] Task: 驗證現有的 `src/components/ProjectCard.test.tsx` 是否能正常執行
- [x] Task: Conductor - User Manual Verification 'Phase 1: Preparation & Component Analysis' (Protocol in workflow.md)

## Phase 2: Navigation Logic & UI Refactoring (TDD) [x]
此階段是核心任務，我們將透過 TDD 模式移除冗餘連結，並實作分區點擊邏輯。

- [x] Task: 撰寫測試，驗證點擊卡片主要區域（圖片/標題）會觸發前往 Live Site 的導覽
- [x] Task: 撰寫測試，驗證點擊 GitHub 圖示會觸發前往 Repository 的導覽，且不會觸發 Live Site 導覽
- [x] Task: 撰寫測試，驗證 "Visit Site" 連結不再出現在組件中
- [x] Task: 修改 `ProjectCard.tsx` 實作分區點擊邏輯並移除 "Visit Site"
- [x] Task: 執行測試並修正實作，確保所有測試通過
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Navigation Logic & UI Refactoring (TDD)' (Protocol in workflow.md)

## Phase 3: Visual Feedback & Accessibility [ ]
在此階段，我們將加入桌面端的 Hover Tooltips 並優化無障礙支援。

- [ ] Task: 撰寫測試，驗證桌面端 Hover 時會顯示正確的 Tooltip 文字 ("Visit Website", "View Code")
- [ ] Task: 為主要點擊區域與 GitHub 圖示添加 `aria-label` 以提升無障礙體驗
- [ ] Task: 實作 Hover Tooltips（確保在行動端不顯示）
- [ ] Task: 進行最後的 linting 與型別檢查 (npm run lint / tsc)
- [ ] Task: Conductor - User Manual Verification 'Phase 3: Visual Feedback & Accessibility' (Protocol in workflow.md)
