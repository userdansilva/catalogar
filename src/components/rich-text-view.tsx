import { richTextClasses } from "./inputs/rich-text-editor";
import sanitizeHtml from "sanitize-html";

type RichTextViewProps = {
  html: string;
};

export function RichTextView({ html }: RichTextViewProps) {
  const clean = sanitizeHtml(html, {
    allowedTags: [
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
    allowedAttributes: {},
  });

  return (
    <div
      className={richTextClasses}
      dangerouslySetInnerHTML={{ __html: clean }}
    />
  );
}
