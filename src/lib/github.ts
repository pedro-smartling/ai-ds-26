import { execSync } from 'child_process';

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;
const GITHUB_REPO = process.env.GITHUB_REPO || 'pedro-smartling/ai-ds-26';

export interface GitHubCommit {
  sha: string;
  message: string;
  author: string;
  date: string;
  url: string;
}

export interface GitHubPR {
  number: number;
  title: string;
  author: string;
  mergedAt: string;
  url: string;
}

/* ── GitHub API fetch ─────────────────────────────────────────────────── */

async function githubFetch(endpoint: string) {
  if (!GITHUB_TOKEN) return null;

  const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}${endpoint}`, {
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) return null;
  return res.json();
}

/* ── Local git log fallback ───────────────────────────────────────────── */

function getLocalCommits(count = 5): GitHubCommit[] {
  try {
    const log = execSync(
      `git log -${count} --format="%H|||%s|||%an|||%aI" HEAD`,
      { encoding: 'utf-8', cwd: process.cwd() }
    ).trim();

    if (!log) return [];

    return log.split('\n').map((line) => {
      const [sha, message, author, date] = line.split('|||');
      return {
        sha: sha.slice(0, 7),
        message,
        author,
        date,
        url: `https://github.com/${GITHUB_REPO}/commit/${sha}`,
      };
    });
  } catch {
    return [];
  }
}

/* ── Public API ───────────────────────────────────────────────────────── */

export async function getRecentCommits(count = 5): Promise<GitHubCommit[]> {
  // Try GitHub API first
  const data = await githubFetch(`/commits?per_page=${count}&sha=main`);
  if (data && Array.isArray(data) && data.length > 0) {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return data.map((c: any) => ({
      sha: c.sha?.slice(0, 7) ?? '',
      message: c.commit?.message?.split('\n')[0] ?? '',
      author: c.commit?.author?.name ?? c.author?.login ?? 'unknown',
      date: c.commit?.author?.date ?? '',
      url: c.html_url ?? '',
    }));
  }

  // Fallback: local git log
  return getLocalCommits(count);
}

export async function getRecentPRs(count = 5): Promise<GitHubPR[]> {
  const data = await githubFetch(`/pulls?state=closed&sort=updated&direction=desc&per_page=${count * 2}`);
  if (!data || !Array.isArray(data)) return [];

  return data
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .filter((pr: any) => pr.merged_at)
    .slice(0, count)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .map((pr: any) => ({
      number: pr.number,
      title: pr.title,
      author: pr.user?.login ?? 'unknown',
      mergedAt: pr.merged_at,
      url: pr.html_url,
    }));
}

export function isGitHubConfigured(): boolean {
  return true; // Always show activity — falls back to local git log
}
