"use client";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { ComponentProps } from "react";
import { markInputRule } from "@tiptap/core";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import Strike from "@tiptap/extension-strike";
import { cn } from "cn";

const WhatsAppBold = Bold.extend({
  addInputRules() {
    return [
      markInputRule({ find: /(?:^|\s)(\*([^*\s][^*]*)\*)$/, type: this.type }),
    ];
  },
  addPasteRules() {
    return [];
  },
});

const WhatsAppItalic = Italic.extend({
  addInputRules() {
    return [
      markInputRule({ find: /(?:^|\s)(_([^_\s][^_]*)_)$/, type: this.type }),
    ];
  },
  addPasteRules() {
    return [];
  },
});

const WhatsAppStrike = Strike.extend({
  addInputRules() {
    return [
      markInputRule({ find: /(?:^|\s)(~([^~\s][^~]*)~)$/, type: this.type }),
    ];
  },
  addPasteRules() {
    return [];
  },
});

export const richTextClasses = [
  "[&_p]:min-h-[1.5em]",
  "[&_ul]:list-disc [&_ul]:pl-6",
  "[&_ol]:list-decimal [&_ol]:pl-6",
  "[&_blockquote]:border-l-4 [&_blockquote]:pl-3 [&_blockquote]:text-gray-500",
  "[&_code]:rounded [&_code]:bg-gray-100 [&_code]:px-1 [&_code]:font-mono",
  "[&_pre]:rounded [&_pre]:bg-gray-100 [&_pre]:p-2 [&_pre]:font-mono",
  "[&_s]:line-through",
].join(" ");

type RichTextEditorProps = Omit<
  ComponentProps<typeof EditorContent>,
  "editor" | "className"
> & {
  value: string;
  onChange: (v: string) => void;
  onBlur: () => void;
};

export function RichTextEditor({
  value,
  onChange,
  onBlur,
  ...props
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: false,
        horizontalRule: false,
        underline: false,
        link: false,

        // replaced by the WhatsApp versions above
        bold: false,
        italic: false,
        strike: false,
      }),
      WhatsAppBold,
      WhatsAppItalic,
      WhatsAppStrike,
    ],
    content: value,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: cn(richTextClasses, "focus:outline-none"),
      },
    },
    onUpdate: ({ editor }) => {
      onChange(editor.isEmpty ? "" : editor.getHTML());
    },
    onBlur,
  });

  return (
    <div
      onClick={() => editor?.commands.focus()}
      className="border-input bg-input/30 placeholder:text-muted-foreground has-focus:border-ring has-focus:ring-ring/50 has-aria-invalid:border-destructive has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40 flex field-sizing-content min-h-16 w-full cursor-text rounded-xl border text-base transition-colors outline-none has-focus:ring-[3px] has-disabled:cursor-not-allowed has-disabled:opacity-50 has-aria-invalid:ring-[3px] md:text-sm"
    >
      <EditorContent editor={editor} className="w-full px-3 py-3" {...props} />
    </div>
  );
}
