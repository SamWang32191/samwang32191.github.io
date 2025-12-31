# Implementation Plan - Fetch GitHub Pages

本計畫旨在實作 GitHub API 整合，將首頁的 Mock Data 替換為真實的 GitHub Pages 專案列表。

## Phase 1: 環境設定與基礎建設 (Infrastructure) [checkpoint: e71ce2c]
目的：確保開發環境具備呼叫 GitHub API 的能力，並定義好資料型別。

- [x] Task: 設定環境變數 `3440b49`
    - 建立或更新 `.env.local`，加入 `GITHUB_TOKEN` 範例與說明。
    - 更新 `.gitignore` 確保 `.env.local` 不被提交 (應已存在)。
- [x] Task: 定義資料型別 (TypeScript) (TDD) `e94304c`
    - 建立 `src/types/github.ts` (或更新現有型別檔案)。
    - 定義 `GitHubRepo` (API 回傳格式) 與 `Project` (內部使用格式) 的介面。
    - 子任務：
        - 定義 `GitHubRepo` interface (包含 id, name, description, topics, stargazers_count, updated_at, has_pages, homepage 等)。
- [x] Task: Conductor - 使用者手動驗證 '環境設定與基礎建設' (協議詳見 workflow.md) `e71ce2c`

## Phase 2: 資料獲取與轉換邏輯 (Data Logic) [checkpoint: 02b26f5]
目的：實作與 GitHub API 溝通的核心邏輯，並包含完整的單元測試。

- [x] Task: 實作 GitHub API Client (TDD) `e94304c`
    - 建立 `src/lib/github.ts`。
    - 實作 `fetchGitHubRepos()` 函式。
    - **測試案例**：
        - 應成功呼叫 Octokit 並回傳資料。
        - 應處理 API 錯誤 (如 401, 403, 404)。
- [x] Task: 實作資料轉換與篩選 Service (TDD) `dd88284`
    - 建立 `src/services/projectService.ts`。
    - 實作 `getProjects()` 函式，整合 fetch 與 transform 邏輯。
    - **測試案例**：
        - 驗證 `has_pages: true` 的篩選邏輯。
        - 驗證排除清單 (Topic: `hidden-from-hub`) 的篩選邏輯。
        - 驗證欄位對映正確性 (Name, Desc, Stars, Date)。
        - 驗證排序邏輯 (字母順序)。
- [x] Task: Conductor - 使用者手動驗證 '資料獲取與轉換邏輯' (協議詳見 workflow.md) `02b26f5`

## Phase 3: UI 整合 (UI Integration) [checkpoint: 6a30325]
目的：將真實資料串接到 Next.js 頁面。

- [x] Task: 更新首頁資料獲取 (Server Component) `dd88284`
    - 修改 `src/app/page.tsx`。
    - 將原本的 Mock Data 替換為呼叫 `getProjects()`。
    - 處理 Loading 與 Error 狀態 (雖然 SSG 主要在 build time 處理，但需考慮開發時體驗)。
- [x] Task: 更新 ProjectCard 組件 (如有必要) `57f25db`
    - 確認 `ProjectCard` 能正確顯示新增的資訊 (Stars, Last Updated, Topics)。
    - 若現有 UI 未支援這些欄位，進行微調。
- [x] Task: Conductor - 使用者手動驗證 'UI 整合' (協議詳見 workflow.md) `6a30325`

## Phase 4: 文件與清理 (Documentation & Cleanup)
目的：確保專案文件完整並移除不再需要的 Mock 檔案。

- [x] Task: 移除 Mock Data `4ecde20`
    - 刪除或封存不再使用的 Mock Data 檔案。
    - 搜尋全專案，確保無殘留引用。
- [x] Task: 更新 README 或相關文件 `2ade631`
    - 記錄如何設定 `GITHUB_TOKEN` 以進行開發。
- [~] Task: Conductor - 使用者手動驗證 '文件與清理' (協議詳見 workflow.md)
