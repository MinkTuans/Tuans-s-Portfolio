# CHANGELOG

Lịch sử thay đổi và cập nhật tính năng của dự án **Tuấn's Portfolio — The Wolf's Journey**.

---

## 2026-09-21 — Sửa Font Tiếng Việt, Avatar Sói Nhìn Theo Chuột & Hiệu Ứng Scroll Reveal

### Changed
- **Sửa font chữ tiếng Việt toàn diện:**
  - Thay thế font `Cinzel` (vốn không hỗ trợ dấu tiếng Việt dẫn đến lỗi chữ "Ậ" trong "PHẠM MINH TUẤN" và các chữ có dấu trong "HÀNH TRÌNH BỀN BỈ") bằng font stack chuẩn hỗ trợ 100% tiếng Việt: `Plus Jakarta Sans`, `Playfair Display`, `Be Vietnam Pro`, `Inter`.
  - Cập nhật `tailwind.config.ts`, `globals.css` và `layout.tsx` với font stack tiếng Việt tối ưu, không phát sinh lỗi tải font mạng ngoại tuyến (`ENOTFOUND`).
- **Avatar sói nhìn theo con chuột (`InteractiveWolfAvatar.tsx`):**
  - Thay thế biểu tượng ngôi sao tĩnh bên trên tiêu đề "HÀNH TRÌNH BỀN BỈ" bằng một linh vật avatar sói tương tác thông minh.
  - Con ngươi và tròng mắt của sói tính toán góc và khoảng cách để **liếc nhìn theo con trỏ chuột** của người dùng khắp màn hình theo thời gian thực.
  - Đầu sói nghiêng 3D nhẹ (`perspective` + `rotateX`/`rotateY`) theo hướng chuột; có hoạt ảnh chớp mắt tự nhiên mỗi 4.5 giây và vểnh tai khi hover.
- **Các thành phần xuất hiện từ từ theo scroll (`ScrollReveal.tsx`):**
  - Tạo component `ScrollReveal` sử dụng `IntersectionObserver` tối ưu GPU.
  - Áp dụng hiệu ứng cuộn mượt mà (fade in + trượt lên `translate3d`) cho toàn bộ các section trên `page.tsx` và các thẻ card trong `Hero.tsx`.

### Files / Modules
- `src/components/sections/InteractiveWolfAvatar.tsx` [NEW]
- `src/components/ui/ScrollReveal.tsx` [NEW]
- `src/components/sections/Hero.tsx`
- `src/app/page.tsx`
- `src/app/layout.tsx`
- `src/app/globals.css`
- `tailwind.config.ts`
- `CHANGELOG.md`
- `project_knowledge_base.md`

### Reason
- Đáp ứng trực tiếp yêu cầu của người dùng: sửa lỗi font tiếng Việt hiển thị thiếu dấu, biến ô trên "Hành Trình Bền BỈ" thành avatar sói nhìn theo con chuột, và cho các thành phần xuất hiện từ từ theo scroll.

### Verification
- Chạy `npm run build`:
  - `✓ Compiled successfully`
  - `✓ Generating static pages (10/10)`
  - 0 lỗi lint, 0 lỗi TypeScript, kích thước route `/` chỉ 31.8 kB.
- Kiểm tra tính toán tọa độ mắt sói và head tilt 3D mượt mà không gây giật lag.

### Notes
- Tất cả font trong `display` và `sans` đều phải có glyphs tiếng Việt chính quy để tránh tình trạng chữ có dấu bị rớt về font fallback hệ thống.

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
