# CHANGELOG

Lịch sử thay đổi và cập nhật tính năng của dự án **Tuấn's Portfolio — The Wolf's Journey**.

---

## 2026-09-21 — Tái Thiết Kế Toàn Bộ Website Portfolio Theo Concept Thuần Thiên Nhiên

### Changed
- **Tái thiết kế giao diện toàn diện theo concept THUẦN THIÊN NHIÊN (Nature Edition):**
  - Chuyển đổi toàn bộ website sang bảng màu thiên nhiên hữu cơ: Forest Green (`#1F4D32`), Deep Green (`#163B28`), Sage (`#A8C9AD`), Moss (`#6F9F72`), Cream (`#F7F6EC`), Sky Blue (`#CFE8F5`), Warm Sun (`#F3C77A`).
  - Loại bỏ hoàn toàn nền phẳng trắng đơn điệu, thay bằng hệ thống cảnh quan thiên nhiên đa tầng (núi non, rừng thông, hồ nước, đồng cỏ thảo nguyên uốn lượn và bầu trời sớm mai).
  - Áp dụng phong cách kính mờ hữu cơ `.glass-nature` và `.card-nature` (`backdrop-blur-md`, viền Sage mềm mại, bóng đổ hữu cơ) mang lại cảm giác điện ảnh (cinematic) sang trọng nhưng vẫn đảm bảo độ tương phản cao và dễ đọc tuyệt đối.
- **Tái cấu trúc các phân hệ UI/UX:**
  - **Navbar:** Thanh floating glass bo cong mềm mại với background kính mờ `rgba(255,255,255,0.78)`, border Sage nhẹ, nhận diện "Phạm Minh Tuấn / THE WOLF'S JOURNEY", menu 7 chặng, active pill màu Forest Green và các nút CTA nổi bật.
  - **Hero:** Full-width background núi xa, hồ nước, rặng thông, ánh bình minh và chú sói uy nghi trên mỏm đá nhìn xuống thung lũng (khớp với mockup tham chiếu). Giữ nguyên thông tin CV, bio cô đọng, mục tiêu nghề nghiệp ngắn/dài hạn, thẻ "The Wolf's Spirit" với Interactive Wolf Avatar dõi mắt theo chuột.
  - **The Wolf Run:** Thiết kế dạng con đường mòn xuyên qua thiên nhiên nối 3 cột mốc: FPT Polytechnic → Ngọc Phi Thúy Jade → MindNova AI với thẻ kính mờ và hoạt cảnh chú sói sải bước bền bỉ theo mức cuộn trang.
  - **What I Have Built:** Ma trận chứng minh năng lực từ kỹ năng → sản phẩm → đóng góp mã nguồn thực tế với thẻ kính mờ cao cấp.
  - **Natural Skill Map (Skills):** Phân chia năng lực thành 6 vùng sinh thái tự nhiên: Forest (Frontend), Mountain (Backend), Lake (Database & Cloud), Sky (AI), Camp (Dev Tools & Workflow), Meadow (Soft Skills & Practices).
  - **Projects:** Thẻ dự án khổ lớn tích hợp visual banner "Technology Inside Nature" (bàn làm việc laptop UI trong cabin kính giữa rừng/bên hồ), đầy đủ vai trò, công nghệ, highlights trực tiếp viết mã, nút mở Case Study Modal (01-06) và khu vực auto-synced GitHub repositories.
  - **Experience & Education:** Timeline dọc mô phỏng con đường mòn / thân cây với các trạm dừng chân (Camp) rõ ràng.
  - **Contact:** Khu cắm trại cuối hành trình với background hồ nước hoàng hôn, biển chỉ đường gỗ mộc mạc, hình bóng chú sói nghỉ ngơi trên đồi xa, tính năng 1-click copy Email/SĐT và nút CTA "Let's Build Something".
  - **Footer:** Chuyển sang dark forest Deep Green (`#163B28`) với silhouette rặng thông nhiều lớp và chú sói nhỏ trên nền trời sao mờ.
- **Bảo toàn dữ liệu:** Giữ nguyên 100% dữ liệu CV thực tế, học vấn, kinh nghiệm, dự án từ `portfolio-data.json`.

### Files / Modules
- `tailwind.config.ts` (Bổ sung bảng màu nature)
- `src/app/globals.css` (Bổ sung utility classes `.glass-nature`, `.card-nature`, `.nature-glow`)
- `src/components/navigation/Navbar.tsx` (Floating glass navbar)
- `src/components/sections/Hero.tsx` (Cinematic mountain valley landscape poster)
- `src/components/sections/TheWolfRun.tsx` (Con đường mòn xuyên thiên nhiên & hoạt cảnh sói)
- `src/components/sections/WhatIHaveBuilt.tsx` (Ma trận kỹ năng -> dự án -> đóng góp thực tế)
- `src/components/sections/Skills.tsx` (Natural Skill Map 6 vùng sinh thái)
- `src/components/sections/Projects.tsx` (Thẻ dự án khổ lớn, Technology Inside Nature banner)
- `src/components/sections/Experience.tsx` (Forest trail vertical timeline & Camps)
- `src/components/sections/Contact.tsx` (Khu cắm trại hoàng hôn, biển gỗ & nút CTA)
- `src/components/navigation/Footer.tsx` (Dark forest Deep Green footer)
- `src/components/forest/FloatingFoliage.tsx` (Lá thông và đốm nắng nhẹ)
- `src/app/page.tsx` (Bố cục tích hợp trang chủ)
- `public/images/forest/nature-*.jpg` (Các assets phong cảnh thiên nhiên chuẩn điện ảnh)
- `project_knowledge_base.md`
- `CHANGELOG.md`

### Reason
- Đáp ứng yêu cầu của người dùng: Thiết kế lại TOÀN BỘ website portfolio hiện tại theo concept THUẦN THIÊN NHIÊN dựa trên ảnh mockup tham chiếu (`media_1789964805491.jpg`), loại bỏ nền trắng phẳng, không dùng cyberpunk/neon, giữ nguyên 100% dữ liệu CV và tính năng hiện có.

### Verification
- Chạy lệnh `npm run build` thành công xuất sắc:
  - 100% Type-safe & Lint checks passed.
  - Sinh thành công toàn bộ 10 static & dynamic routes.
  - Kích thước tải trang chủ tối ưu (chỉ 34.4 kB first load JS).
- Đối soát thẩm mỹ và bố cục bám sát từng phân hệ trong ảnh mockup tham chiếu.

### Notes
- Sử dụng các lớp ảnh landscape tối ưu cùng gradient vignette để duy trì khả năng đọc chữ đạt chuẩn tương phản cao trên nền thiên nhiên.

### Remaining
- Không có. Toàn bộ các yêu cầu của người dùng đã được thực hiện và kiểm thử thành công.

---

## 2026-09-21 — Khắc Phục Chấm Chỉ Báo Kỹ Năng & Thanh Điều Hướng (Active Section Detection)

### Changed
- **Khắc phục lỗi chấm chỉ báo không đổi màu ở phần Kỹ Năng (`#skills`):**
  - Thay thế cơ chế `IntersectionObserver` với tỷ lệ diện tích cố định (vốn thất bại với các section có chiều cao lớn hơn nhiều so với viewport như `#skills` ~1500px) bằng thuật toán **Reading-Line Scroll Tracking**.
  - Kiểm tra vị trí đọc thực tế từ dưới lên trên (`rect.top <= 160px`) kết hợp với kiểm tra chạm đáy trang (`window.innerHeight + window.scrollY >= scrollHeight - 70px`), đảm bảo nhận diện chính xác 100% mục đang đọc dù section dài hay ngắn.
  - Tích hợp sự kiện `hashchange` giúp cập nhật ngay lập tức trạng thái active khi click liên kết neo `#skills`, `#projects`, v.v.
  - Bổ sung sự kiện `onClick={() => setActiveSection(link.id)}` cho cả danh mục trên top Navbar và các chấm tròn trên thanh điều hướng bên phải (right floating rail).
  - Tăng cường hiệu ứng trực quan cho chấm tròn đang active: kích thước lớn hơn (`w-3.5 h-3.5`), ánh sáng hổ phách ấm áp (`bg-sun-amber ring-4 ring-sun-warm/35 shadow-md scale-110`) giúp nổi bật rõ ràng trên mọi độ phân giải.

### Files / Modules
- `src/components/navigation/Navbar.tsx`
- `CHANGELOG.md`
- `project_knowledge_base.md`

### Reason
- Đáp ứng phản hồi của người dùng: "Trang kĩ năng chưa đổi màu chấm bên phải". Khi người dùng cuộn đến phần "Bản Đồ Năng Lực Kỹ Thuật" (`#skills`), chấm thứ 6 trên thanh rail bên phải không sáng lên màu vàng hổ phách và thanh menu trên cùng vẫn bị kẹt ở "Kinh Nghiệm".

### Verification
- Chạy lệnh `npm run build` thành công (0 lỗi, 10/10 static pages generated).
- Kiểm tra giải thuật tính toán tọa độ viewport với các section dài (>1500px) và khi cuộn nhanh giữa các section.

### Notes
- Đối với thanh điều hướng trang đơn (single-page portfolio) có các section chiều dài không đồng đều, thuật toán offset đường đọc (reading-line scan) đáng tin cậy hơn nhiều so với `intersectionRatio` của IntersectionObserver.

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
