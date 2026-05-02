import Link from "next/link";
import { Fragment } from "react";

import type { MarkdownBlock, MarkdownInline } from "@/lib/articles";

function MarkdownInlineContent({ nodes }: { nodes: MarkdownInline[] }) {
  return nodes.map((node, index) => {
    if (node.type === "strong") {
      return <strong key={`${node.value}-${index}`}>{node.value}</strong>;
    }

    if (node.type === "link") {
      const isInternal = node.href.startsWith("/");

      if (isInternal) {
        return (
          <Link
            key={`${node.href}-${index}`}
            href={node.href}
          >
            {node.value}
          </Link>
        );
      }

      return (
        <a
          key={`${node.href}-${index}`}
          href={node.href}
          rel="noreferrer"
          target="_blank"
        >
          {node.value}
        </a>
      );
    }

    return <Fragment key={`${node.value}-${index}`}>{node.value}</Fragment>;
  });
}

export function MarkdownContent({ blocks }: { blocks: MarkdownBlock[] }) {
  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        if (block.type === "heading") {
          const className =
            block.level === 2
              ? "mt-10 font-heading text-3xl font-semibold text-[color:var(--color-primary)]"
              : "mt-8 font-heading text-2xl font-semibold text-[color:var(--color-primary)]";

          if (block.level === 2) {
            return (
              <h2
                key={`${block.text}-${index}`}
                className={className}
              >
                {block.text}
              </h2>
            );
          }

          return (
            <h3
              key={`${block.text}-${index}`}
              className={className}
            >
              {block.text}
            </h3>
          );
        }

        if (block.type === "list") {
          const ListTag = block.ordered ? "ol" : "ul";

          return (
            <ListTag
              key={`list-${index}`}
              className={`mt-5 space-y-3 pl-5 text-[color:var(--foreground)] ${
                block.ordered ? "list-decimal" : "list-disc"
              }`}
            >
              {block.items.map((item, itemIndex) => (
                <li
                  key={`item-${itemIndex}`}
                  className="pl-1 leading-7"
                >
                  <MarkdownInlineContent nodes={item} />
                </li>
              ))}
            </ListTag>
          );
        }

        if (block.type === "quote") {
          return (
            <blockquote
              key={`quote-${index}`}
              className="mt-8 border-l-4 border-[color:var(--color-accent)] bg-[color:var(--surface-muted)] px-6 py-5 font-heading text-2xl leading-9 text-[color:var(--color-primary)]"
            >
              <MarkdownInlineContent nodes={block.children} />
            </blockquote>
          );
        }

        return (
          <p
            key={`paragraph-${index}`}
            className="mt-5 text-lg leading-8 text-[color:var(--fg-muted)]"
          >
            <MarkdownInlineContent nodes={block.children} />
          </p>
        );
      })}
    </div>
  );
}
