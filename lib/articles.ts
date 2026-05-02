import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { cache } from "react";

const articlesDirectory = path.join(process.cwd(), "content", "articles");

export type MarkdownInline =
  | {
      type: "text";
      value: string;
    }
  | {
      type: "strong";
      value: string;
    }
  | {
      type: "link";
      value: string;
      href: string;
    };

export type MarkdownBlock =
  | {
      type: "heading";
      level: 2 | 3;
      text: string;
    }
  | {
      type: "paragraph";
      children: MarkdownInline[];
    }
  | {
      type: "list";
      ordered: boolean;
      items: MarkdownInline[][];
    }
  | {
      type: "quote";
      children: MarkdownInline[];
    };

export type Article = {
  slug: string;
  title: string;
  description: string;
  date: string;
  author: string;
  category: string;
  excerpt: string;
  readingTime: string;
  content: string;
  blocks: MarkdownBlock[];
};

type ArticleFrontmatter = Omit<Article, "slug" | "readingTime" | "content" | "blocks">;

function parseFrontmatter(source: string): { data: Partial<ArticleFrontmatter>; content: string } {
  const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?/);

  if (!match) {
    return { data: {}, content: source.trim() };
  }

  const data = match[1].split(/\r?\n/).reduce<Partial<ArticleFrontmatter>>((frontmatter, line) => {
    const separator = line.indexOf(":");

    if (separator === -1) {
      return frontmatter;
    }

    const key = line.slice(0, separator).trim() as keyof ArticleFrontmatter;
    const value = line
      .slice(separator + 1)
      .trim()
      .replace(/^['"]|['"]$/g, "");

    return {
      ...frontmatter,
      [key]: value,
    };
  }, {});

  return {
    data,
    content: source.slice(match[0].length).trim(),
  };
}

function getRequiredFrontmatter(data: Partial<ArticleFrontmatter>, fileName: string): ArticleFrontmatter {
  const required: (keyof ArticleFrontmatter)[] = ["title", "description", "date", "author", "category", "excerpt"];

  for (const field of required) {
    if (!data[field]) {
      throw new Error(`Missing "${field}" frontmatter in ${fileName}`);
    }
  }

  return data as ArticleFrontmatter;
}

function estimateReadingTime(content: string) {
  const words = content.split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));

  return `${minutes} min read`;
}

function parseInline(text: string): MarkdownInline[] {
  const tokens: MarkdownInline[] = [];
  const pattern = /(\*\*[^*]+\*\*|\[[^\]]+\]\([^)]+\))/g;
  let cursor = 0;
  let match: RegExpExecArray | null;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > cursor) {
      tokens.push({ type: "text", value: text.slice(cursor, match.index) });
    }

    const value = match[0];

    if (value.startsWith("**")) {
      tokens.push({ type: "strong", value: value.slice(2, -2) });
    } else {
      const link = value.match(/^\[([^\]]+)\]\(([^)]+)\)$/);

      if (link) {
        tokens.push({ type: "link", value: link[1], href: link[2] });
      }
    }

    cursor = match.index + value.length;
  }

  if (cursor < text.length) {
    tokens.push({ type: "text", value: text.slice(cursor) });
  }

  return tokens;
}

function flushParagraph(lines: string[], blocks: MarkdownBlock[]) {
  if (lines.length === 0) {
    return;
  }

  blocks.push({
    type: "paragraph",
    children: parseInline(lines.join(" ")),
  });
  lines.length = 0;
}

export function parseMarkdown(content: string): MarkdownBlock[] {
  const blocks: MarkdownBlock[] = [];
  const paragraphLines: string[] = [];
  const lines = content.split(/\r?\n/);
  let index = 0;

  while (index < lines.length) {
    const line = lines[index].trim();

    if (!line) {
      flushParagraph(paragraphLines, blocks);
      index += 1;
      continue;
    }

    const heading = line.match(/^(#{2,3})\s+(.+)$/);

    if (heading) {
      flushParagraph(paragraphLines, blocks);
      blocks.push({
        type: "heading",
        level: heading[1].length as 2 | 3,
        text: heading[2],
      });
      index += 1;
      continue;
    }

    if (line.startsWith("> ")) {
      flushParagraph(paragraphLines, blocks);
      blocks.push({
        type: "quote",
        children: parseInline(line.slice(2)),
      });
      index += 1;
      continue;
    }

    const list = line.match(/^(\d+\.\s+|[-*]\s+)(.+)$/);

    if (list) {
      flushParagraph(paragraphLines, blocks);

      const ordered = /^\d+\./.test(list[1]);
      const items: MarkdownInline[][] = [];

      while (index < lines.length) {
        const itemLine = lines[index].trim();
        const item = itemLine.match(/^(\d+\.\s+|[-*]\s+)(.+)$/);

        if (!item || /^\d+\./.test(item[1]) !== ordered) {
          break;
        }

        items.push(parseInline(item[2]));
        index += 1;
      }

      blocks.push({ type: "list", ordered, items });
      continue;
    }

    paragraphLines.push(line);
    index += 1;
  }

  flushParagraph(paragraphLines, blocks);

  return blocks;
}

export const getAllArticles = cache((): Article[] => {
  return readdirSync(articlesDirectory)
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const source = readFileSync(path.join(articlesDirectory, fileName), "utf8");
      const { data, content } = parseFrontmatter(source);
      const frontmatter = getRequiredFrontmatter(data, fileName);

      return {
        slug,
        ...frontmatter,
        readingTime: estimateReadingTime(content),
        content,
        blocks: parseMarkdown(content),
      };
    })
    .sort((a, b) => Date.parse(b.date) - Date.parse(a.date));
});

export const getArticleBySlug = cache((slug: string): Article | null => {
  if (!/^[a-z0-9-]+$/.test(slug)) {
    return null;
  }

  return getAllArticles().find((article) => article.slug === slug) ?? null;
});

export function formatArticleDate(date: string) {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
}
