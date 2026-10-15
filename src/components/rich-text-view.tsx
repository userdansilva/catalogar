import DOMPurify from "dompurify";
import { richTextClasses } from "./inputs/rich-text-editor";
import { JSDOM } from "jsdom";

type RichTextViewProps = {
  html: string;
};

const window = new JSDOM("<!DOCTYPE html>").window;
const purify = DOMPurify(window);

export function RichTextView({ html }: RichTextViewProps) {
  const clean = purify.sanitize(html, {
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
