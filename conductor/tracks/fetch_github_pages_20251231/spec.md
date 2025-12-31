# Track Specification: Fetch GitHub Pages

## 1. 概述
**目標**：將首頁的 Mock Data 替換為真實的 GitHub 專案資料。
**描述**：實作自動化機制，從 GitHub API 獲取使用者所有已啟用 GitHub Pages 的 Repository，並將其整合至首頁顯示。這將確保網站內容與實際專案動態同步。

## 2. 功能需求

### 2.1 資料獲取 (Data Fetching)
- **來源**：GitHub REST API (透過 Octokit)。
- **範圍**：
    - 取得目前使用者 (User) 擁有的所有公開 Repository。
    - 篩選條件：
        - 僅包含已啟用 GitHub Pages 的 Repository (`has_pages: true`)。
        - 排除帶有特定 Topic (例如 `hidden-from-hub`) 的 Repository (排除清單機制)。
- **時機**：
    - **SSG (Static Site Generation)**：在建置時期 (`next build`) 執行資料獲取。
    - 本地開發時，這意味著重整或重建時會呼叫 API。

### 2.2 資料轉換 (Data Transformation)
- 將 API 回傳的原始資料轉換為內部的 `Project` 型別。
- **必要欄位對映**：
    - `name`: Repository Name
    - `description`: Repository Description (若無則留空或顯示預設文字)
    - `url`: GitHub Pages URL (需解析 API 回傳的 pages 資訊或依規則組建)
    - `repoUrl`: GitHub Repository URL (html_url)
    - `topics`: Repository Topics
    - `stars`: Stargazers Count
    - `lastUpdated`: Updated At (ISO Date string)

### 2.3 UI 呈現更新 (UI Integration)
- 更新首頁 (`src/app/page.tsx`) 使用真實資料。
- 專案列表排序：依 **專案名稱字母順序 (A-Z)** 排列。
- 若 API 呼叫失敗或無資料 (例如 Token 問題)，應有優雅的降級處理 (如顯示錯誤訊息或保留目前的 Mock Data 作為 Fallback，視實作細節而定，本計畫優先目標為成功串接)。

## 3. 非功能需求
- **認證管理**：
    - 本地開發：讀取 `.env.local` 中的 `GITHUB_TOKEN`。
    - CI/CD (GitHub Actions)：使用 `secrets.GITHUB_TOKEN`。
- **型別安全**：確保 API 回傳資料與內部介面有完善的 TypeScript 定義。
- **效能**：由於採用 SSG，API 延遲不會影響終端使用者讀取速度，但需注意 API Rate Limit (使用 Token 可獲得較高額度)。

## 4. 驗收標準 (Acceptance Criteria)
- [ ] 執行 `npm run dev` 或 `npm run build` 時，能從 GitHub 成功抓取資料。
- [ ] 首頁顯示的專案列表準確反映使用者的 GitHub Pages 專案狀態。
- [ ] 帶有排除標籤 (`hidden-from-hub`) 的專案**不**出現在列表中。
- [ ] 專案卡片正確顯示名稱、描述、Topic、Star 數及最後更新時間。
- [ ] 專案列表依字母順序排列。
- [ ] 程式碼包含針對資料轉換邏輯的單元測試。

## 5. 超出範圍 (Out of Scope)
- 實作全新的 UI 卡片設計 (沿用現有 ProjectCard 組件)。
- 即時動態搜尋 (Client-side search) 的複雜實作 (下一階段)。
- Social Preview Image 的自動抓取 (本次先不實作完整的 OG Image 解析，若 API 有提供簡單欄位則用，否則暫緩或用預設圖)。*註：使用者稍早有選 Social Preview，但考量純 API 抓取可能無法直接取得每頁的 OG Image，通常需額外爬蟲。本次先以 Repository 的 `social_preview_url` (若有設定) 或預設圖為主。*
