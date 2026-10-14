"use client";

import DOMPurify from "isomorphic-dompurify";
import { richTextClasses } from "./inputs/rich-text-editor";

type RichTextViewProps = {
  html: string;
};

export function RichTextView({ html }: RichTextViewProps) {
  const clean = DOMPurify.sanitize(html, {
    ALLOWED_TAGS: [
      "p",
      "br",
      "ul",
      "ol",
      "li",
      "strong",
      "em",
      "s",
      "code",
      "pre",
      "blockquote",
    ],
  });

  return (
    <div
      className={richTextClasses}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
