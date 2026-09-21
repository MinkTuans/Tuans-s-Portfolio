# PROJECT KNOWLEDGE BASE — TUAN'S PORTFOLIO (THE WOLF'S JOURNEY)

## 1. Project Overview
- **Tên dự án:** Tuấn's Portfolio — The Wolf's Journey (`tuns.id.vn`).
- **Chủ sở hữu:** Phạm Minh Tuấn (MinkTuans).
- **Vị trí định hướng:** Frontend Intern (Mục tiêu: TypeScript & modern UI/UX, Fullstack Laravel + Next.js).
- **Ý niệm chủ đạo:** "The Wolf's Journey" — Tinh thần chú sói sải bước bền bỉ, độc lập và nhạy bén trên thảo nguyên công nghệ. Mọi thông tin hiển thị đều được đối soát 100% với CV thực tế.

---

## 2. Tech Stack
- **Frontend Framework:** Next.js 14.2 (App Router), React 18, TypeScript.
- **Typography (Vietnamese-Ready):** Inter (`subsets: ["latin", "vietnamese"]`), Plus Jakarta Sans, Playfair Display, Be Vietnam Pro — hỗ trợ 100% tiếng Việt chuẩn hóa, không lỗi dấu.
- **Styling & Effects:** Tailwind CSS (Morning Meadow: `meadow`, `sun`, `sky`, `earth`), `ScrollReveal.tsx` (IntersectionObserver GPU-accelerated), Reading-Line Scroll Tracking Navbar (`Navbar.tsx`).
- **Icons & Visuals:** Lucide React, `InteractiveWolfAvatar.tsx` (real-time mouse gaze tracking & 3D head tilt), Canvas Particle System (`FloatingFoliage.tsx`), Three.js WebGL (`Wolf3DScene.tsx`), Dynamic Floating Rail Indicator (`#sun-amber` glow).
- **Asset Processing:** 100% Transparent PNGs cho organic silhouettes (Wolf Runner, Soaring Eagle), Canvas floating foliage motes.
- **Hosting & Domain:** Vercel / GitHub Pages (`tuns.id.vn`).

---

## 3. Cấu Trúc Thư Mục Quan Trọng
```
Tuans-s-Portfolio/
├── public/
│   ├── images/
│   │   ├── avatar.jpg                           # Ảnh chân dung Phạm Minh Tuấn
│   │   └── forest/
│   │       ├── wolf-runner-transparent-dark.png  # Silhouette sói chạy trong suốt 100%
│   │       ├── wolf-runner-transparent-white.png # Silhouette sói trắng trong suốt
│   │       ├── eagle-transparent-dark.png        # Silhouette đại bàng trong suốt
│   │       └── eagle-transparent-white.png       # Silhouette đại bàng trắng trong suốt
│   └── models/
│       └── wolf.glb                              # Model sói 3D cho đấu trường Dino Runner
├── src/
│   ├── app/
│   │   ├── layout.tsx                           # Root layout: Fonts (Inter, Cinzel, Merienda), Metadata chuẩn CV
│   │   ├── globals.css                          # Custom scrollbar, morning meadow gradients, animations
│   │   ├── page.tsx                             # Trang chủ tổng hợp toàn bộ các chặng hành trình
│   │   ├── admin/                               # Trang quản trị nội bộ
│   │   └── api/admin/                           # API routes quản trị và đồng bộ README
│   ├── components/
│   │   ├── navigation/                          # Navbar (Sticky & Reading-Line Section Tracker), Footer
│   │   ├── sections/
│   │   │   ├── Hero.tsx                         # Hero section: Avatar, Bio, Career Objectives, Soaring Eagle
│   │   │   ├── InteractiveWolfAvatar.tsx        # Avatar sói tương tác dõi mắt theo con chuột & nghiêng đầu 3D
│   │   │   ├── TheWolfRun.tsx                   # Hoạt cảnh sói chạy cuộn trang & 3 mốc sự nghiệp
│   │   │   ├── WhatIHaveBuilt.tsx               # Ma trận kỹ năng -> dự án -> đóng góp thực tế
│   │   │   ├── Projects.tsx                     # Case studies chi tiết: MindNova AI, Cook, Tour
│   │   │   ├── Experience.tsx                   # Kinh nghiệm doanh nghiệp & Học vấn FPT Poly GPA 7.7
│   │   │   ├── Skills.tsx                       # Hệ sinh thái kỹ năng phân loại
│   │   │   └── Contact.tsx                      # Kênh liên hệ xác thực
│   │   ├── ui/
│   │   │   └── ScrollReveal.tsx                 # Scroll-driven reveal component tối ưu IntersectionObserver
│   │   ├── forest/
│   │   │   └── FloatingFoliage.tsx              # Canvas lá rơi và đốm nắng vàng trong suốt
│   │   └── 3d/
│   │       └── Wolf3DScene.tsx                  # Three.js Dino Runner Game
│   ├── data/
│   │   └── portfolio-data.json                  # Single Source of Truth cho toàn bộ dữ liệu CV
│   ├── lib/
│   │   ├── data-service.ts                      # Đọc/ghi dữ liệu CV và kích hoạt đồng bộ
│   │   ├── github.ts                            # Tự động lấy danh sách repositories GitHub
│   │   └── readme-generator.ts                  # Tự động sinh README.md từ dữ liệu portfolio
│   └── types/
│       └── portfolio.ts                         # Type definitions: Profile, Education, Experience, Projects...
├── scripts/
│   ├── make-transparent.ps1                     # Script trích xuất silhouette trong suốt từ ảnh gốc
│   └── sync-readme.mjs                          # Script đồng bộ GitHub README
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

## 5. Quy Tắc Thẩm Mỹ & Đồ Họa (Design & Aesthetic Rules)
- **Không bao giờ dùng ảnh silhouette có nền hộp cứng (JPG/solid boxes):** Mọi chi tiết đồ họa tự nhiên như lá cây, đại bàng, sói chạy phải hoàn toàn trong suốt (Transparent PNG 32-bit hoặc Canvas/SVG), hòa nhập liền mạch vào không gian thảo nguyên/rừng cây.
- **Tone màu chủ đạo:** Morning Meadow (`#fbfcf9` kết hợp sắc xanh `meadow`, ánh nắng hổ phách `sun-amber` và xanh trời dịu nhẹ `sky-soft`).
- **Tính xác thực:** Tuyệt đối không đưa thông tin hư cấu hoặc mẫu giả vào trang chính; luôn bám sát dữ liệu trong `portfolio-data.json`.
