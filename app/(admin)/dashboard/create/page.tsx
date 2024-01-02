"use client";
import { createArticleWithMetadata } from "@/actions";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import { toast } from "sonner";
import Editor from "@/components/editor";
import type { MDXEditorMethods } from "@mdxeditor/editor";
import { useRef } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { slugify } from "@/lib/utils";

const formSchema = z.object({
  content: z
    .string({
      required_error: "Content is required",
    })
    .min(1, {
      message: "Content is required",
    }),
  title: z.string().min(1, {
    message: "Title is required",
  }),
  summary: z.string().min(1, {
    message: "Summary is required",
  }),
  slug: z
    .string()
    .min(1, {
      message: "Slug is required",
    })
    .max(255, {
      message: "Slug is too long",
    }),

  // add type of article, blog/ snippet
  type: z.enum(["blog", "snippet"], {
    required_error: "Type is required",
  }),
});

type FormValues = z.infer<typeof formSchema>;

export default function NewPost() {
  const editor = useRef<MDXEditorMethods>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      content: "",
      title: "",
      summary: "",
      slug: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    const frontmatter = `---
title: "${data.title}"
publishedAt: "${format(new Date(), "yyyy-MM-dd")}"
summary: "${data.summary}"
---
`.trim();

    const content = `${frontmatter}\n${data.content}`;

    try {
      const publishPost = async () => {
        await createArticleWithMetadata(
          "iRajatDas",
          "rajat",
          "main",
          content,
          data.slug,
          data.type,
          data.title,
          data.summary
        );
      };

      const toastOptions = {
        loading: "Loading...",
        success: () => "Post published successfully",
        error: "Error while publishing",
      };

      await toast.promise(publishPost, toastOptions);
    } catch (error) {
      console.error("Error while publishing", error);
    }
  };

  return (
    <Form {...form}>
      <form
        className="space-y-6"
        onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
      >
        <h1 className="scroll-m-20 text-3xl font-extrabold tracking-tight lg:text-4xl">
          Create a New Post
        </h1>

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="My First Post" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Slug</FormLabel>
              <FormControl>
                <Input
                  placeholder="my-first-post"
                  {...field}
                  onChange={(e) => {
                    // transform to slug as user types
                    field.onChange(slugify(e.target.value));
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Summary</FormLabel>
              <FormControl>
                <Input placeholder="My First Post" {...field} />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  value={field.value}
                  onValueChange={(value) => {
                    field.onChange(value);
                  }}
                >
                  <SelectTrigger>
                    <SelectValue
                      placeholder="Select Post Type"
                      defaultValue={field.value ?? undefined}
                    />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="blog">Blog</SelectItem>
                    <SelectItem value="snippet">Snippet</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Editor
                  editorRef={editor}
                  markdown={field.value}
                  onChange={(editor) => {
                    field.onChange(editor);
                  }}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button className="w-full py-3 text-lg px-2 text-center bg-primary text-muted rounded-xl disabled:opacity-50 disabled:cursor-not-allowed">
          Publish
        </Button>
      </form>
    </Form>
  );
}
