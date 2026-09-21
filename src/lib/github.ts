import { GitHubRepo } from "@/types/portfolio";

const EXCLUDED_REPOS = ["tuans-s-portfolio", "minktuans", "minktuns"];

const FALLBACK_REPOS: GitHubRepo[] = [
  {
    id: 1,
    name: "TFGhub",
    description: "Nền tảng phát triển và đăng tải game miễn phí!",
    html_url: "https://github.com/MinkTuans/TFGhub",
    language: "TypeScript",
    stargazers_count: 1,
    forks_count: 0,
    updated_at: "2026-09-18T01:33:24Z",
    topics: ["game", "typescript", "fullstack"],
    homepage: null,
  },
  {
    id: 2,
    name: "AutoTransAI",
    description: "Công cụ tự động hoá dịch thuật thông minh ứng dụng AI và Python.",
    html_url: "https://github.com/MinkTuans/AutoTransAI",
    language: "Python",
    stargazers_count: 0,
    forks_count: 0,
    updated_at: "2026-09-20T20:56:56Z",
    topics: ["ai", "python", "automation"],
    homepage: null,
  },
];

export async function getGitHubRepos(username = "MinkTuans"): Promise<GitHubRepo[]> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
          "User-Agent": "Tuans-Portfolio-NextJS",
        },
        next: { revalidate: 3600 }, // Cache and revalidate every hour
      }
    );

    if (!res.ok) {
      console.warn(`GitHub API returned status ${res.status}, falling back to static cache.`);
      return FALLBACK_REPOS;
    }

    const repos = await res.json();
    if (!Array.isArray(repos)) {
      return FALLBACK_REPOS;
    }

    const filtered: GitHubRepo[] = repos
      .filter((repo: any) => {
        if (!repo || !repo.name) return false;
        if (repo.fork) return false;
        const lowerName = repo.name.toLowerCase();
        return !EXCLUDED_REPOS.includes(lowerName);
      })
      .map((repo: any) => ({
        id: repo.id,
        name: repo.name,
        description: repo.description || "Dự án phát triển mã nguồn mở trên GitHub.",
        html_url: repo.html_url,
        language: repo.language || "Code",
        stargazers_count: repo.stargazers_count || 0,
        forks_count: repo.forks_count || 0,
        updated_at: repo.updated_at,
        topics: repo.topics || [],
        homepage: repo.homepage || null,
      }));

    return filtered.length > 0 ? filtered : FALLBACK_REPOS;
  } catch (error) {
    console.error("Error fetching GitHub repos:", error);
    return FALLBACK_REPOS;
  }
}
