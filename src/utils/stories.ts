import fs from "fs";
import path from "path";

export interface Story {
  id: string;
  title: string;
  author: string;
  text: string;
}

export function parseStoryFile(filePath: string): Story {
  const content = fs.readFileSync(filePath, "utf-8");
  const [header, ...textParts] = content.split("---\n");
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
