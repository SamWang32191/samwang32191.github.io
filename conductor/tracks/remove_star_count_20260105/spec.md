# Track Specification: Remove Star Count from Project Card

## Overview
本 Track 旨在移除 `ProjectCard` 元件左下角的 Star 數量顯示。這是一個單純的 UI 簡化任務，目標是讓卡片視覺更乾淨。

## Functional Requirements
1. **移除 Star 顯示**：在 `ProjectCard` 元件中，移除渲染 Star 圖示與數量的相關程式碼。
2. **佈局維持**：確保移除該元素後，卡片其餘部分（如標題、描述、標籤等）的佈局不受負面影響，不需要填補該空位。

## Non-Functional Requirements
- **視覺完整性**：卡片在移除元素後應保持視覺平衡。

## Acceptance Criteria
- [ ] `ProjectCard` UI 中不再顯示 Star 圖示和數量。
- [ ] 執行專案測試，相關的快照測試 (Snapshot Tests) 已更新並通過。
- [ ] 手動驗證卡片佈局在各種螢幕尺寸下依然正常。

## Out of Scope
- 新增其他資訊來替換 Star 數量。
- 重構 `ProjectCard` 的其他部分。
