import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.resolve(__dirname, "../src/data/portfolio-data.json");
const readmeFilePath = path.resolve(__dirname, "../README.md");

try {
  const rawData = fs.readFileSync(dataFilePath, "utf-8");
  const data = JSON.parse(rawData);
  const { profile, projects, experience, skillCategories, skillContributions, lastUpdated } = data;

  const content = `# 🐺 The Wolf's Journey — Phạm Minh Tuấn (MinkTuans)

> **"Bước đi nhạy bén và bền bỉ trên thảo nguyên công nghệ. Kiến tạo sản phẩm bằng năng lực thực tế."**

<div align="center">

[![Portfolio](https://img.shields.io/badge/Live%20Portfolio-The%20Wolf's%20Journey-10b981?style=for-the-badge&logo=safari&logoColor=white)](https://github.com/MinkTuans)
[![GitHub](https://img.shields.io/badge/GitHub-MinkTuans-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/MinkTuans)
[![Email](https://img.shields.io/badge/Email-tuans2k6%40gmail.com-ea4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:${profile.contact.email})
[![Phone](https://img.shields.io/badge/Phone-%2B84%20795%20222%20148-34a853?style=for-the-badge&logo=whatsapp&logoColor=white)](tel:${profile.contact.phone.replace(/\s+/g, "")})

</div>

---

## 📌 Tổng Quan (Engineering Profile)

- **Họ và tên:** **${profile.fullName}**
- **Định vị kỹ thuật:** Lập trình viên Web chuyên sâu kiến trúc **Laravel Service Architecture**, **Next.js / React** và **Supabase / PostgreSQL**.
- **Khu vực:** ${profile.contact.location}
- **Năng lực cốt lõi:** Trực tiếp thiết kế hệ thống REST API, tích hợp giải pháp lưu trữ video bảo mật với Cloudflare R2 (Signed URLs), ứng dụng mô hình ngôn ngữ lớn (Gemini API) vào bài giảng, và triển khai hạ tầng thời gian thực (Laravel Reverb / Echo).

\`\`\`
                    [ THE WOLF'S JOURNEY ]
  Learned & Built        Specialized Backend        Full Product Experience
  HTML / CSS / JS   ───► Laravel + Supabase   ───► Realtime AI Applications
\`\`\`

---

## 🛠️ Kỹ Năng Kỹ Thuật (Technical Skills)

${skillCategories.map((cat) => `### 🔹 ${cat.title}
> *${cat.description}*

${cat.skills.map((s) => `- **${s.name}**${s.roleOrContext ? `: ${s.roleOrContext}` : ""}`).join("\n")}
`).join("\n")}

---

## 🚀 Dự Án Thực Tế (Featured Projects)

${projects.map((proj, idx) => `### 0${idx + 1}. [${proj.name}](${proj.githubUrl || "https://github.com/MinkTuans"})
*${proj.projectType} • ${proj.timeframe}*

> **Vai trò:** \`${proj.role}\`  
> **Tổng quan:** ${proj.tagline}

**Công nghệ sử dụng:**
\`${proj.technologies.join(" • ")}\`

#### 🎯 Những gì tôi trực tiếp xây dựng (WHAT I ACTUALLY BUILT):
${proj.myContribution.map((c) => `- ✅ ${c}`).join("\n")}

#### 💡 Tính năng chính:
${proj.keyFeatures.map((f) => `- • ${f}`).join("\n")}

---
`).join("\n")}

## 💼 Kinh Nghiệm Làm Việc (Work Experience)

${experience.map((exp) => `### 🏛️ ${exp.company}
**${exp.position}** | \`${exp.timeframe}\`  
*Công nghệ: ${exp.technologies.join(", ")}*

${exp.accomplishments.map((a) => `- 🔹 ${a}`).join("\n")}
`).join("\n")}

---

## 🔗 Ma Trận Ứng Dụng: Kỹ Năng ➔ Dự Án ➔ Đóng Góp Thực Tế

| Công Nghệ / Kỹ Năng | Dự Án Ứng Dụng | Đóng Góp Cụ Thể (Proof of Work) |
| :--- | :--- | :--- |
${skillContributions.map((sc) => `| **${sc.skill}** | ${sc.project} | ${sc.contribution} |`).join("\n")}

---

## 📬 Liên Hệ Trực Tiếp (Contact)

- 📧 **Email:** [${profile.contact.email}](mailto:${profile.contact.email})
- 📱 **Điện thoại:** [${profile.contact.phone}](tel:${profile.contact.phone.replace(/\s+/g, "")})
- 📍 **Địa điểm:** ${profile.contact.location}
- 🐙 **GitHub:** [github.com/${profile.contact.githubUsername}](https://github.com/${profile.contact.githubUsername})

---

<div align="center">
  <sub>Được tạo tự động từ hệ thống Portfolio Content Management của <strong>Phạm Minh Tuấn</strong> • Cập nhật ngày ${lastUpdated}</sub>
</div>
`;

  fs.writeFileSync(readmeFilePath, content, "utf-8");
  console.log("README.md has been successfully generated and synced with Single Source of Truth!");
} catch (err) {
  console.error("Error syncing README.md:", err);
  process.exit(1);
}
