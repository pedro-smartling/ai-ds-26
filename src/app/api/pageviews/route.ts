import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

const DATA_FILE = path.join(process.cwd(), 'data/pageviews.json');

function readViews(): Record<string, number> {
  try {
    return JSON.parse(fs.readFileSync(DATA_FILE, 'utf-8'));
  } catch {
    return {};
  }
}

function writeViews(views: Record<string, number>) {
  fs.writeFileSync(DATA_FILE, JSON.stringify(views, null, 2));
}

/** POST /api/pageviews — increment a page's view count */
export async function POST(req: NextRequest) {
  try {
    const { path: pagePath } = await req.json();
    if (!pagePath || typeof pagePath !== 'string') {
      return NextResponse.json({ error: 'Missing path' }, { status: 400 });
    }

    const views = readViews();
    views[pagePath] = (views[pagePath] || 0) + 1;
    writeViews(views);

    return NextResponse.json({ views: views[pagePath] });
  } catch {
    return NextResponse.json({ error: 'Failed' }, { status: 500 });
  }
}

/** GET /api/pageviews — return all view counts, sorted descending */
export async function GET() {
  const views = readViews();
  const sorted = Object.entries(views)
    .sort(([, a], [, b]) => b - a)
    .map(([pagePath, count]) => ({ path: pagePath, count }));

  return NextResponse.json(sorted);
}
