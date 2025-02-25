import fs from "fs";
import path from "path";

export interface Story {
  id: string;
  title: string;
  author: string;
  text: string;
}

export function parseStoryFile(filePath: string): Story {
  // Read file content and remove BOM if present
  let content = fs.readFileSync(filePath, "utf-8");
  // Remove BOM character if present
  if (content.charCodeAt(0) === 0xfeff) {
    content = content.slice(1);
  }

  // Handle different line endings (CRLF, LF)
  // First normalize to LF
  content = content.replace(/\r\n/g, "\n");

  // Split by the separator, which could be "---" followed by a newline
  const parts = content.split(/---\n/);

  // If there's only one part, try splitting by "---" without a newline
  if (parts.length === 1) {
    parts.push(...content.split(/---/).slice(1));
  }

  const [header, ...textParts] = parts;
  // Join the text parts back together in case there are multiple "---" in the text
  const text = textParts.join("---\n").trim();

  const titleMatch = header.match(/title: (.*)/);
  const authorMatch = header.match(/author: (.*)/);

  if (!titleMatch || !authorMatch) {
    throw new Error(`Invalid story file format: ${filePath}`);
  }

  return {
    id: path.basename(filePath, ".txt"),
    title: titleMatch[1],
    author: authorMatch[1],
    text,
  };
}

export function getAllStories(): Story[] {
  const storiesDir = path.join(process.cwd(), "src/content/stories");
  const files = fs.readdirSync(storiesDir);

  return files
    .filter((file: string) => file.endsWith(".txt"))
    .map((file: string) => parseStoryFile(path.join(storiesDir, file)))
    .sort((a: Story, b: Story) => a.id.localeCompare(b.id));
}
