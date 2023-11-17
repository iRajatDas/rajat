"use client";

import React from "react";
import dynamic from "next/dynamic";
import "@mdxeditor/editor/style.css";

import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  DiffSourceToggleWrapper,
  diffSourcePlugin,
  tablePlugin,
  InsertTable,
  linkPlugin,
  linkDialogPlugin,
  imagePlugin,
  codeMirrorPlugin,
  codeBlockPlugin,
  InsertImage,
  InsertAdmonition,
  ListsToggle,
  BlockTypeSelect,
} from "@mdxeditor/editor";
import type { ForwardedRef } from "react";
import { type MDXEditorMethods, type MDXEditorProps } from "@mdxeditor/editor";

const MDXEditor = dynamic(
  () => import("@mdxeditor/editor").then((mod) => mod.MDXEditor),
  { ssr: false }
);

export default function Editor({
  editorRef,
  ...props
}: { editorRef: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  return (
    <MDXEditor
      className="relative"
      contentEditableClassName="prose dark:prose-invert dark:text-neutral-300 max-w-none w-full prose-lg"
      plugins={[
        listsPlugin(),
        quotePlugin(),
        headingsPlugin(),
        linkPlugin(),
        linkDialogPlugin(),
        imagePlugin(),
        tablePlugin(),
        thematicBreakPlugin(),
        // frontmatterPlugin(),<InsertFrontmatter />
        codeBlockPlugin({ defaultCodeBlockLanguage: "tsx" }),
        codeMirrorPlugin({
          codeBlockLanguages: {
            js: "JavaScript",
            css: "CSS",
            txt: "text",
            tsx: "TypeScript",
          },
        }),
        diffSourcePlugin({ viewMode: "rich-text", diffMarkdown: "boo" }),
        toolbarPlugin({
          toolbarContents: () => (
            <>
              <DiffSourceToggleWrapper>
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <InsertTable />
                <InsertImage />
                <BlockTypeSelect />
                <InsertAdmonition />
                <ListsToggle />
              </DiffSourceToggleWrapper>
            </>
          ),
        }),
      ]}
      {...props}
      ref={editorRef}
    />
  );
}
