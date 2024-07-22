import React, { CSSProperties, useEffect } from "react";
import { z } from "zod";
import { RichTextPropsSchema } from "./prop-schema";
import { BubbleMenu, EditorContent, useEditor, Editor } from "@tiptap/react";
import { StarterKit } from "@tiptap/starter-kit";
import debounce from "lodash.debounce";

import { useCurrentBlockId } from "../../editor/EditorBlock";
import { setDocument, useDocument } from "../../editor/EditorContext";
import { getFontFamily, getPadding } from "./get-config";

export type RichTextProps = z.infer<typeof RichTextPropsSchema>;

export const RichTextPropsDefaults = {
  text: "",
};

export function RichText(data: RichTextProps) {
  const document = useDocument();
  const currentBlockId = useCurrentBlockId();
  const currentBlock = document[currentBlockId];

  const editor = useEditor({
    extensions: [StarterKit],
    content: data?.props?.text ?? RichTextPropsDefaults.text,
    onUpdate() {
      updateDataDebounce();
    },
  });

  const updateDataDebounce = debounce(() => {
    setDocument({
      ...document,
      [currentBlockId]: {
        type: currentBlock.type,
        data: {
          ...data,
          props: { text: editor.getHTML() },
        },
      },
    });
  }, 200);

  useEffect(() => {
    if (editor.getHTML() != data.props?.text) {
      editor.commands.setContent(data.props?.text ?? "");
    }
  }, [data.props?.text]);

  const wStyle: CSSProperties = {
    color: data.style?.color ?? undefined,
    backgroundColor: data.style?.backgroundColor ?? undefined,
    fontSize: data.style?.fontSize ?? undefined,
    fontFamily: getFontFamily(data.style?.fontFamily),
    fontWeight: data.style?.fontWeight ?? undefined,
    textAlign: data.style?.textAlign ?? undefined,
    padding: getPadding(data.style?.padding),
  };

  return (
    <div
      style={wStyle}
      onClick={() => {
        editor.commands.focus();
      }}
    >
      {editor && (
        <BubbleMenu
          className="bubble-menu"
          tippyOptions={{ duration: 100 }}
          editor={editor}
        >
          <button
            onClick={() => editor.chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            Bold
          </button>
          <button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            Italic
          </button>
          <button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            Strike
          </button>
        </BubbleMenu>
      )}
      <EditorContent editor={editor} />
    </div>
  );
}

export function RichTextReader(data: RichTextProps) {
  const wStyle: CSSProperties = {
    color: data.style?.color ?? undefined,
    backgroundColor: data.style?.backgroundColor ?? undefined,
    fontSize: data.style?.fontSize ?? undefined,
    fontFamily: getFontFamily(data.style?.fontFamily),
    fontWeight: data.style?.fontWeight ?? undefined,
    textAlign: data.style?.textAlign ?? undefined,
    padding: getPadding(data.style?.padding),
  };

  return (
    <div
      style={wStyle}
      dangerouslySetInnerHTML={{ __html: data.props?.text ?? "" }}
    />
  );
}
