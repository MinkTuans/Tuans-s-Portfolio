# CHANGELOG

Lịch sử thay đổi và cập nhật tính năng của dự án **Tuấn's Portfolio — The Wolf's Journey**.

---

## 2026-09-21 — Khôi Phục Hồ Sơ CV Thực Tế & Loại Bỏ Nền Hộp Lá Cây, Chim, Sói

### Changed
- **Khôi phục trang chính `page.tsx`:** Thay thế trang mẫu động vật hoang dã (`AnimalsInTheForestPage`) bằng cấu trúc Portfolio chuẩn của **Phạm Minh Tuấn — The Wolf's Journey**, hiển thị đầy đủ các phần: Hero, The Wolf Run, What I Have Built, Projects, Experience & Education, Skills, Contact, Footer.
- **Loại bỏ triệt để nền hộp chữ nhật:**
  - *Lá cây:* Loại bỏ hoàn toàn khối banner lá cây JPG có viền cắt ngang thô kệch; sử dụng hệ thống hạt lá rơi và đốm nắng vàng bay lơ lửng bằng canvas trong suốt (`FloatingFoliage.tsx`).
  - *Con chim (Đại bàng):* Chuyển đổi sang định dạng PNG 32-bit trong suốt 100% (`eagle-transparent-dark.png`), loại bỏ hoàn toàn khung viền vuông khi bay lượn trên bầu trời.
  - *Con sói chạy:* Chuyển đổi sang silhouette trong suốt 100% (`wolf-runner-transparent-dark.png`), loại bỏ hoàn toàn khối hộp màu đen bao quanh khi sói sải bước chạy trên đồng cỏ.
- **Cập nhật nội dung Hero (`Hero.tsx`):**
  - Hiển thị rõ danh xưng: **Phạm Minh Tuấn — Frontend Intern**.
  - Tích hợp thẻ **Mục Tiêu Nghề Nghiệp (Career Objectives)** với mục tiêu ngắn hạn và dài hạn chuẩn hóa từ CV.
  - Hiển thị chi tiết liên hệ (Ngày sinh 21/06/2006, SĐT +84 795 222 148, Email tuans2k6@gmail.com, Quảng Ninh, GitHub).
- **Nâng cấp Hoạt cảnh Sói Chạy (`TheWolfRun.tsx`):**
  - Sói sải bước chạy sống động theo thao tác cuộn trang (scroll-driven running wolf) với nhịp nhún tự nhiên và vệt bụi mờ.
  - Cột mốc 3 chặng đường sự nghiệp được đồng bộ chuẩn hóa theo CV: Chặng 01 (FPT Polytechnic GPA 7.7), Chặng 02 (Doanh nghiệp Ngọc Phi Thúy & Dự án thực tế), Chặng 03 (MindNova AI & Công nghệ đám mây/AI).
- **Bổ sung thẻ Học vấn (`Experience.tsx`):**
  - Hiển thị thông tin chính quy: Cao đẳng FPT Polytechnic, Ngành Lập trình Web (2024 - 2026), **GPA 7.7 / 10**.
- **Chuẩn hóa cấu hình Theme & Metadata:**
  - Cập nhật `tailwind.config.ts`, `globals.css`, `layout.tsx` đảm bảo hỗ trợ đầy đủ bảng màu Morning Meadow (`meadow`, `sun`, `sky`, `earth`), font chữ và metadata SEO chuẩn cá nhân.

### Files / Modules
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `src/components/sections/Hero.tsx`
- `src/components/sections/TheWolfRun.tsx`
- `src/components/sections/Experience.tsx`
- `src/data/portfolio-data.json`
- `src/types/portfolio.ts`
- `tailwind.config.ts`
- `public/images/forest/wolf-runner-transparent-dark.png`
- `public/images/forest/wolf-runner-transparent-white.png`
- `public/images/forest/eagle-transparent-dark.png`
- `public/images/forest/eagle-transparent-white.png`
- `scripts/make-transparent.ps1`
- `project_knowledge_base.md`
- `CHANGELOG.md`

### Reason
- Khắc phục việc trang chính bị ghi đè bởi trang mẫu tự nhiên động vật rừng, làm mất thông tin CV thực tế của Phạm Minh Tuấn.
- Khắc phục tình trạng các chi tiết đồ họa (lá cây, chim, sói chạy) bị bao quanh bởi các khối hình chữ nhật màu đen/trắng làm mất thẩm mỹ theo yêu cầu trực tiếp của người dùng.

### Verification
- Chạy lệnh `npm run build` trong môi trường Next.js 14 thành công không phát sinh lỗi:
  - `✓ Compiled successfully`
  - `✓ Generating static pages (10/10)`
  - Đạt kích thước tối ưu (Route `/` 30.3 kB, First Load JS 118 kB).
- Kiểm tra các file ảnh silhouette đã được bóc tách nền trong suốt 100% bằng PowerShell .NET System.Drawing.

### Notes
- Tuyệt đối không dùng ảnh định dạng JPG có nền đặc cho các phần tử animation chuyển động trên nền giao diện.
