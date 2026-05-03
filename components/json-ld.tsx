type JsonLdProps = {
  data: unknown;
};

/** Inlined JSON-LD for crawlers; escapes `<` in serialized JSON for safe embedding in a script tag. */
export function JsonLd({ data }: JsonLdProps) {
  const html = JSON.stringify(data).replace(/</g, "\\u003c");
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD must use raw script body; `<` is escaped.
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
