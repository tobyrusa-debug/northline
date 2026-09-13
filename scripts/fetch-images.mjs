#!/usr/bin/env node
import { mkdir, access, writeFile } from "node:fs/promises";
import { join, dirname } from "node:path";

const FILES = [
  ["public/images/coach-toby.jpg", "public/images/coach-toby.jpg"],
  ["public/images/coach-georgie.jpg", "public/images/coach-georgie.jpg"],
  ["public/images/hero.jpg", "public/images/hero.jpg"],
  ["public/images/hero-mobile.jpg", "public/images/hero-mobile.jpg"],
  ["public/images/method.jpg", "public/images/method.jpg"],
  ["public/images/studio.jpg", "public/images/studio.jpg"],
  ["public/images/program-rebuild.jpg", "public/images/program-rebuild.jpg"],
  ["public/images/program-compose.jpg", "public/images/program-compose.jpg"],
  ["public/images/program-compete.jpg", "public/images/program-compete.jpg"],
  ["public/images/program-latitude.jpg", "public/images/program-latitude.jpg"],
  ["public/og.jpg", "public/og.jpg"],
];

const BASE = "https://raw.githubusercontent.com/tobyrusa-debug/northline/main/";

for (const [repoPath, destRel] of FILES) {
  const dest = join(process.cwd(), destRel);
  await mkdir(dirname(dest), { recursive: true });
  try {
    await access(dest);
    continue;
  } catch {
    // missing — fetch
  }
  const res = await fetch(BASE + repoPath);
  if (!res.ok) {
    console.warn(`[fetch-images] skip ${repoPath}: ${res.status}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(dest, buf);
  console.log(`[fetch-images] ${destRel} (${buf.length} bytes)`);
}
