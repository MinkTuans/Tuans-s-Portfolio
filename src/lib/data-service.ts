import fs from "fs";
import path from "path";
import { PortfolioData } from "@/types/portfolio";
import { generateReadmeContent } from "./readme-generator";
import { getGitHubRepos } from "./github";
import fallbackData from "@/data/portfolio-data.json";

const DATA_FILE_PATH = path.join(process.cwd(), "src", "data", "portfolio-data.json");
const README_FILE_PATH = path.join(process.cwd(), "README.md");

export async function getPortfolioData(): Promise<PortfolioData> {
  try {
    if (fs.existsSync(DATA_FILE_PATH)) {
      const content = fs.readFileSync(DATA_FILE_PATH, "utf-8");
      return JSON.parse(content) as PortfolioData;
    }
  } catch (error) {
    console.error("Error reading portfolio-data.json, using fallback data:", error);
  }
  return fallbackData as PortfolioData;
}

export async function savePortfolioData(data: PortfolioData): Promise<{ success: boolean; error?: string }> {
  try {
    const updatedData: PortfolioData = {
      ...data,
      lastUpdated: new Date().toISOString().split("T")[0],
    };

    // 1. Write to Single Source of Truth
    fs.writeFileSync(DATA_FILE_PATH, JSON.stringify(updatedData, null, 2), "utf-8");

    // 2. Fetch live GitHub repos and sync to GitHub README.md
    const repos = await getGitHubRepos(updatedData.profile.contact?.githubUsername || "MinkTuans");
    const readmeContent = generateReadmeContent(updatedData, repos);
    fs.writeFileSync(README_FILE_PATH, readmeContent, "utf-8");

    return { success: true };
  } catch (error) {
    console.error("Error saving portfolio data:", error);
    return { success: false, error: (error as Error).message };
  }
}

export async function syncReadmeNow(): Promise<{ success: boolean; error?: string }> {
  try {
    const currentData = await getPortfolioData();
    const repos = await getGitHubRepos(currentData.profile.contact?.githubUsername || "MinkTuans");
    const readmeContent = generateReadmeContent(currentData, repos);
    fs.writeFileSync(README_FILE_PATH, readmeContent, "utf-8");
    return { success: true };
  } catch (error) {
    return { success: false, error: (error as Error).message };
  }
}

