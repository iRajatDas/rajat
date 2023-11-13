"use client";
import { Editor as NovelEditor } from "novel";
import { pushContent } from "@/actions";
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
});

type FormValues = z.infer<typeof formSchema>;

export default function NewPost() {
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
    const frontmatter = `---
title: ${data.title}
publishedAt: ${format(new Date(), "yyyy-MM-dd")}
summary: ${data.summary}
---
`.trim();

    const content = `${frontmatter}\n${data.content}`;

    try {
      const publishPost = async () => {
        await pushContent({
          content,
          slug: data.slug,
          type: "blog",
        });
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
                <Input placeholder="my-first-post" {...field} />
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
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <NovelEditor
                  defaultValue={field.value}
                  onUpdate={(editor) => {
                    field.onChange(editor?.storage.markdown.getMarkdown());
                  }}
                  disableLocalStorage={true}
                  onDebouncedUpdate={(editor) => {
                    field.onChange(editor?.storage.markdown.getMarkdown());
                  }}
                  className="dark w-full !p-0"
                  editorProps={{
                    attributes: {
                      class:
                        "!px-0 novel-prose-lg novel-prose-stone dark:novel-prose-invert prose-headings:novel-font-title novel-font-default focus:novel-outline-none novel-max-w-full",
                    },
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
