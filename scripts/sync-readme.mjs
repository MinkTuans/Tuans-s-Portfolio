import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.resolve(__dirname, "../src/data/portfolio-data.json");
const readmeFilePath = path.resolve(__dirname, "../README.md");

const EXCLUDED_REPOS = ["tuans-s-portfolio", "minktuans", "minktuns"];

const FALLBACK_REPOS = [
  {
    name: "TFGhub",
    language: "TypeScript",
    description: "Nền tảng phát triển và đăng tải game miễn phí!",
    html_url: "https://github.com/MinkTuans/TFGhub",
  },
  {
    name: "AutoTransAI",
    language: "Python",
    description: "Công cụ tự động hoá dịch thuật thông minh ứng dụng AI và Python.",
    html_url: "https://github.com/MinkTuans/AutoTransAI",
  },
];

async function fetchGitHubRepos(username = "MinkTuans") {
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`, {
      headers: {
        Accept: "application/vnd.github.v3+json",
        "User-Agent": "Tuans-Portfolio-SyncScript",
      },
    });

    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status}, using fallback.`);
      return FALLBACK_REPOS;
    }

    const repos = await res.json();
    if (!Array.isArray(repos)) return FALLBACK_REPOS;

    const filtered = repos
      .filter((repo) => {
        if (!repo || !repo.name) return false;
        if (repo.fork) return false;
        const lower = repo.name.toLowerCase();
        return !EXCLUDED_REPOS.includes(lower);
      })
      .map((repo) => ({
        name: repo.name,
        language: repo.language || "Code",
        description: repo.description || "Dự án phát triển mã nguồn mở trên GitHub.",
        html_url: repo.html_url,
      }));

    return filtered.length > 0 ? filtered : FALLBACK_REPOS;
  } catch (err) {
    console.warn("Could not fetch GitHub repos:", err.message);
    return FALLBACK_REPOS;
  }
}

async function run() {
  try {
    const rawData = fs.readFileSync(dataFilePath, "utf-8");
    const data = JSON.parse(rawData);
    const { profile, projects, experience, lastUpdated } = data;

    const gitHubRepos = await fetchGitHubRepos(profile.contact?.githubUsername || "MinkTuans");

    const repoTable = gitHubRepos.length > 0
      ? `\n### 📦 Các Repository Trên GitHub (Tự Động Đồng Bộ)
*(Tự động đồng bộ từ tài khoản GitHub [@${profile.contact.githubUsername}](https://github.com/${profile.contact.githubUsername}), loại trừ portfolio và profile repo)*

| Repository | Ngôn ngữ | Mô tả | Liên kết |
| :--- | :--- | :--- | :--- |
${gitHubRepos.map((r) => `| **${r.name}** | \`${r.language || "General"}\` | ${r.description || "Dự án trên GitHub"} | [Xem mã nguồn](${r.html_url}) |`).join("\n")}\n`
      : "";

    const content = `# 🐺 The Wolf's Journey — ${profile.fullName}

> **"Bước đi nhạy bén và bền bỉ trên thảo nguyên công nghệ. Kiến tạo sản phẩm bằng năng lực thực tế."**

<div align="center">

[![Portfolio](https://img.shields.io/badge/Live%20Portfolio-The%20Wolf's%20Journey-10b981?style=for-the-badge&logo=safari&logoColor=white)](https://tuans.vercel.app)
[![GitHub](https://img.shields.io/badge/GitHub-${profile.contact.githubUsername}-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/${profile.contact.githubUsername})
[![Email](https://img.shields.io/badge/Email-${profile.contact.email.replace("@", "%40")}-ea4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${profile.contact.email})
[![Phone](https://img.shields.io/badge/Phone-%2B84%20795%20222%20148-34a853?style=for-the-badge&logo=whatsapp&logoColor=white)](tel:${profile.contact.phone.replace(/\s+/g, "")})

</div>

---

## 📌 Giới Thiệu Khái Quát (Overview)

- **Họ và tên:** **${profile.fullName}** (${profile.contact.location})
- **Định vị kỹ thuật:** Lập trình viên Web chuyên sâu kiến trúc **Laravel (Service Architecture)**, **Next.js / React** và **Supabase / PostgreSQL**.
- **Thế mạnh nổi bật:** Thiết kế REST API chuẩn mực, tích hợp lưu trữ media an toàn với Cloudflare R2 (Signed URLs), ứng dụng LLM (Gemini API) và hạ tầng thời gian thực (Laravel Reverb / Echo).

---

## 🛠️ Kỹ Năng Cốt Lõi (Core Tech Stack)

- **Frontend:** React, Next.js, TypeScript, Tailwind CSS, Responsive Design.
- **Backend:** PHP (Laravel Service Architecture), Node.js, REST API, Layered Architecture.
- **Database & Cloud:** MySQL, PostgreSQL, Supabase, Cloudflare R2 (Signed URLs).
- **Realtime & AI:** Laravel Reverb / Echo, Gemini API, AI-Assisted Engineering.
- **Tools & Quy chuẩn:** Git / GitHub, Postman, Clean Code & Debugging.

---

## 🚀 Dự Án Tiêu Biểu & Kho Mã Nguồn GitHub (Projects)

### 🌟 Dự Án Trọng Điểm (Featured Projects)
${projects.map((proj) => `- **[${proj.name}](${proj.githubUrl || `https://github.com/${profile.contact.githubUsername}`})** (${proj.projectType} • \`${proj.technologies.slice(0, 4).join(", ")}\`): ${proj.tagline}`).join("\n")}
${repoTable}
---

## 💼 Kinh Nghiệm Làm Việc (Work Experience)

${experience.map((exp) => `- **${exp.company}** — *${exp.position} (${exp.timeframe})*  
  ${exp.accomplishments[0]} và tích hợp API real-time qua Laravel & MySQL.`).join("\n\n")}

---

## 📬 Liên Hệ Trực Tiếp (Contact)

- 📧 **Email:** [${profile.contact.email}](mailto:${profile.contact.email})
- 📱 **Điện thoại:** [${profile.contact.phone}](tel:${profile.contact.phone.replace(/\s+/g, "")})
- 🌐 **Portfolio:** [tuans.vercel.app](https://tuans.vercel.app)
- 🐙 **GitHub:** [github.com/${profile.contact.githubUsername}](https://github.com/${profile.contact.githubUsername})

---

<div align="center">
  <sub>Cập nhật tự động từ hệ thống Portfolio Content Management của <strong>${profile.fullName}</strong> • ${lastUpdated}</sub>
</div>
`;

    fs.writeFileSync(readmeFilePath, content, "utf-8");
    console.log("README.md has been successfully generated and synced with concise summary & GitHub repos!");
  } catch (err) {
    console.error("Error syncing README.md:", err);
    process.exit(1);
  }
}

run();
