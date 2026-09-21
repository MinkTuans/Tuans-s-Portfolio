# PROJECT KNOWLEDGE BASE — TUAN'S PORTFOLIO (THE WOLF'S JOURNEY: NATURE EDITION)

## 1. Project Overview
- **Tên dự án:** Tuấn's Portfolio — The Wolf's Journey: Nature Edition (`tuns.id.vn`).
- **Chủ sở hữu:** Phạm Minh Tuấn (MinkTuans).
- **Vị trí định hướng:** Frontend Intern (Mục tiêu: TypeScript & Modern UI/UX, Fullstack Laravel + Next.js).
- **Ý niệm chủ đạo:** "The Wolf's Journey" — Hành trình của một developer được kể bằng một chuyến đi xuyên thiên nhiên thuần khiết (Rừng xanh, Núi, Hồ nước, Bầu trời sớm mai, Ánh nắng và Chú Sói bền bỉ). Mọi thông tin hiển thị đối soát 100% với CV thực tế.

---

## 2. Tech Stack
- **Frontend Framework:** Next.js 14.2 (App Router), React 18, TypeScript.
- **Typography (Vietnamese-Ready):** Inter (`subsets: ["latin", "vietnamese"]`), Plus Jakarta Sans, Playfair Display, Be Vietnam Pro — hỗ trợ 100% tiếng Việt chuẩn hóa, không lỗi dấu.
- **Bảng Màu Thuần Thiên Nhiên (Nature Palette):**
  - Forest Green: `#1F4D32` (CTA chính, nút bấm, điểm nhấn thương hiệu)
  - Deep Green: `#163B28` (Nền Footer rậm rạp, tiêu đề tương phản cao)
  - Sage: `#A8C9AD` (Border viền kính mờ frosted glass, viền thẻ card, badge phụ)
  - Moss: `#6F9F72` (Icon tự nhiên, rêu rừng, điểm nhấn cỏ cây)
  - Cream: `#F7F6EC` (Nền thẻ frosted card, màu badge dịu ấm)
  - Sky Blue: `#CFE8F5` (Bầu trời sớm mai, gradient chuyển tiếp tầng cao)
  - Warm Sun: `#F3C77A` / `#d97706` (Ánh nắng bình minh, điểm nhấn sao/lửa trại, waypoint)
  - White: `#FFFFFF` (Bề mặt kính mờ mờ đục 85–92% `backdrop-blur-md`)
- **Styling & Effects:** Tailwind CSS (`nature`, `meadow`, `sun`, `sky`), `ScrollReveal.tsx` (IntersectionObserver GPU-accelerated), `.glass-nature`, `.card-nature`.
- **Icons & Visuals:** Lucide React, `InteractiveWolfAvatar.tsx` (real-time mouse gaze tracking & 3D head tilt), Canvas Particle System (`FloatingFoliage.tsx`), Dynamic Floating Rail Indicator (`#F3C77A` glow).
- **Asset Processing:** 100% Transparent PNGs cho organic silhouettes (Wolf Runner, Soaring Eagle), Canvas floating foliage motes & sun dust.
- **Hosting & Domain:** Vercel / GitHub Pages (`tuns.id.vn`).

---

## 3. Cấu Trúc Thư Mục Quan Trọng
```
Tuans-s-Portfolio/
├── public/
│   ├── images/
│   │   ├── avatar.jpg                           # Ảnh chân dung Phạm Minh Tuấn
│   │   └── forest/
│   │       ├── nature-hero-landscape.jpg         # Full-width cinematic landscape: núi, hồ, rừng thông & sói trên mỏm đá
│   │       ├── nature-meadow-trail.jpg           # Đồng cỏ thảo nguyên uốn lượn và dòng suối
│   │       ├── nature-campsite-contact.jpg       # Hoàng hôn hồ nước với cột biển gỗ & sói ngắm hoàng hôn
│   │       ├── project-mindnova-nature.jpg       # Bàn làm việc laptop UI trong cabin kính giữa rừng
│   │       ├── wolf-runner-transparent-dark.png  # Silhouette sói chạy trong suốt 100%
│   │       ├── wolf-runner-transparent-white.png # Silhouette sói trắng trong suốt
│   │       ├── eagle-transparent-dark.png        # Silhouette đại bàng trong suốt
│   │       └── eagle-transparent-white.png       # Silhouette đại bàng trắng trong suốt
│   └── models/
│       └── wolf.glb                              # Model sói 3D
├── src/
│   ├── app/
│   │   ├── layout.tsx                           # Root layout: Fonts (Inter, Cinzel, Merienda), Metadata chuẩn CV
│   │   ├── globals.css                          # Custom scrollbar, .glass-nature, .card-nature, animations
│   │   ├── page.tsx                             # Trang chủ tổng hợp toàn bộ các chặng hành trình
│   │   ├── admin/                               # Trang quản trị nội bộ
│   │   └── api/admin/                           # API routes quản trị và đồng bộ README
│   ├── components/
│   │   ├── navigation/
│   │   │   ├── Navbar.tsx                       # Floating glass nature bar: Brand, 7 menu links, CTAs
│   │   │   └── Footer.tsx                       # Deep Forest Green (#163B28) footer với silhouette rừng thông
│   │   ├── sections/
│   │   │   ├── Hero.tsx                         # Hero section: Cinematic nature landscape, Bio, Objectives, Wolf's Spirit
│   │   │   ├── InteractiveWolfAvatar.tsx        # Avatar sói tương tác dõi mắt theo con chuột & nghiêng đầu 3D
│   │   │   ├── TheWolfRun.tsx                   # Hoạt cảnh sói chạy cuộn trang & 3 mốc sự nghiệp xuyên thảo nguyên
│   │   │   ├── WhatIHaveBuilt.tsx               # Ma trận kỹ năng -> dự án -> đóng góp thực tế
│   │   │   ├── Projects.tsx                     # Case studies chi tiết với ảnh Technology Inside Nature & GitHub sync
│   │   │   ├── Experience.tsx                   # Forest trail vertical timeline & các trạm dừng chân (Camp)
│   │   │   ├── Skills.tsx                       # Natural Skill Map (Forest, Mountain, Lake, Sky, Camp, Meadow)
│   │   │   └── Contact.tsx                      # Sunset campsite với biển gỗ chỉ đường & copy to clipboard
│   │   ├── ui/
│   │   │   └── ScrollReveal.tsx                 # Scroll-driven reveal component tối ưu IntersectionObserver
│   │   ├── forest/
│   │   │   └── FloatingFoliage.tsx              # Canvas lá rơi và đốm nắng vàng trong suốt
│   │   └── project-modal/
│   │       └── ProjectCaseStudyModal.tsx        # Modal Case Study 01-06 chi tiết
│   ├── data/
│   │   └── portfolio-data.json                  # Single Source of Truth cho toàn bộ dữ liệu CV
│   ├── lib/
│   │   ├── data-service.ts                      # Đọc/ghi dữ liệu CV và kích hoạt đồng bộ
│   │   ├── github.ts                            # Tự động lấy danh sách repositories GitHub
│   │   └── readme-generator.ts                  # Tự động sinh README.md từ dữ liệu portfolio
│   └── types/
│       └── portfolio.ts                         # Type definitions: Profile, Education, Experience, Projects...
├── project_knowledge_base.md                    # File này (Trạng thái hiện tại của dự án)
└── CHANGELOG.md                                 # Lịch sử thay đổi qua các task
```

---

## 4. Dữ Liệu Hồ Sơ Thực Tế (Verified CV Data)
1. **Thông tin cá nhân:**
   - Họ tên: Phạm Minh Tuấn
   - Định hướng: Frontend Intern (TypeScript, Modern UI/UX, Fullstack Laravel + Next.js)
   - Ngày sinh: 21 / 06 / 2006
   - Địa chỉ: Quảng Ninh, Việt Nam
   - Điện thoại: `+84 795 222 148`
   - Email: `tuans2k6@gmail.com`
   - GitHub: `https://github.com/MinkTuans`
2. **Mục tiêu nghề nghiệp (Career Objectives):**
   - *Ngắn hạn:* Tích lũy kinh nghiệm thực tế qua các dự án trong môi trường chuyên nghiệp, hoàn thành xuất sắc kỳ thực tập và trở thành nhân viên chính thức.
   - *Dài hạn:* Nâng cao chuyên môn sâu về TypeScript và UI/UX hiện đại, phát triển lên vị trí Senior Frontend và gắn bó lâu dài cùng công ty.
3. **Học vấn (Education):**
   - Cao đẳng FPT Polytechnic (FPT Polytechnic College)
   - Chuyên ngành: Lập trình Web (Web Programming) • Niên khóa: 2024 - 2026
   - Điểm trung bình tích lũy: **GPA 7.7 / 10**
4. **Kinh nghiệm doanh nghiệp (Work Experience):**
   - **NGOC PHI THUY JADE A HANOI CO., LTD** (05/2026 - 07/2026) — Web Developer Intern
   - Công nghệ: Laravel (Blade Template), MySQL, Postman, Git/GitHub.
   - Trách nhiệm: Xây dựng giao diện responsive hệ thống quản lý kho, form nhập liệu động biến thể/danh mục sản phẩm, tích hợp backend API hiển thị tồn kho/lịch sử giao dịch realtime, UI cảnh báo đỏ khi chạm ngưỡng tối thiểu kèm icon chuông thông báo, cộng tác qua Git.
5. **Dự án thực tế:**
   - **MindNova AI** (05/2026 - NOW): Nền tảng E-Learning tích hợp AI Tutor & Hệ thống xuất bản bài giảng. Vai trò: Instructor Feature Developer (Laravel Service, Cloudflare R2 Signed URLs, Gemini API, Laravel Reverb, VNPay/MoMo).
   - **AI Cooking** (04/2026 - 07/2026): Nền tảng gợi ý món ăn theo nguyên liệu có sẵn. Vai trò: Backend Development & Database Design (Supabase PostgreSQL, Layered Architecture, Spoonacular APIs, Google Auth).
   - **TOUR MANAGEMENT WEBSITE** (11/2025 - 12/2025): Hệ thống quản trị tour nội bộ. Vai trò: Team Lead & Fullstack Development (PHP, MySQL, HTML/CSS/JS).

---

## 5. Quy Tắc Thẩm Mỹ & Kiến Trúc (Design & Architectural Rules)
- **Concept thuần thiên nhiên xuyên suốt:** Không dùng background trắng phẳng, không dùng phong cách cyberpunk/neon/futuristic. Sử dụng background phong cảnh liên tục, hữu cơ và thẻ kính mờ `glass-nature` có độ tương phản cao, dễ đọc.
- **Natural Skill Map:** Phân loại 6 nhóm kỹ năng thành 6 vùng sinh thái (Frontend → Forest, Backend → Mountain, Database → Lake, AI → Sky, Dev Tools → Camp, Soft Skills → Meadow).
- **Technology Inside Nature:** Hình ảnh minh họa dự án thể hiện giao diện công nghệ đặt trong không gian cabin kính/bàn làm việc tự nhiên hòa quyện.
- **Không bao giờ dùng ảnh silhouette có nền hộp cứng:** Mọi silhouette đại bàng, sói chạy đều dùng PNG trong suốt hoặc vector SVG.
- **Bảo toàn dữ liệu tuyệt đối:** Không hư cấu thông tin; luôn lấy dữ liệu từ `portfolio-data.json`.
