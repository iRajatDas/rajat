import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/brand";
import Badge from "@/components/badge";
import BlogLink from "@/components/blog-link";
import ArrowIcon from "@/components/arrow-icon";
import LibraryCloud from "@/components/library-cloud";

export default function Page() {
  return (
    <section>
      <h1
        className="font-semibold text-2xl mb-8 tracking-tighter w-fit"
        title="Rajot Kumar Das"
      >
        hey, I&apos;m Rajat 👋
      </h1>
      <p className="prose prose-neutral dark:prose-invert">
        {`I'm a frontend developer and a tech enthusiast. I currently
        work as a Software Engineer Experience at `}
        <span className="not-prose">
          <Badge href="https://www.macmerise.com">
            <Logo.Macmerise className="inline-flex mr-1 h-3 w-3" />
            Macmerise
          </Badge>
        </span>
        {`, where I create and handle the frontend UI/UX for seamless user experiences with `}
        <Badge href="https://nextjs.org">
          <Image
            alt="Next.js logomark"
            src="/next-logo.svg"
            className="!mr-1"
            width="14"
            height="14"
          />
          Next.js
        </Badge>
        {`, an open-source web framework built with `}
        <Badge href="https://react.dev">
          <Image
            alt="React logomark"
            src="/react-logo.svg"
            className="!mr-1"
            width="14"
            height="10"
          />
          React
        </Badge>
        .
      </p>
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I have a passion for building products that people love. I try to keep
          my skils sharp by learning new things and keeping up with the latest
          trends in the industry.
        </p>
        <p>
          I&apos;m currently working on a few side projects, including a few
          open source projects.
        </p>
      </div>
      <div className="my-8 flex flex-col space-y-4 w-full">
        <Suspense>
          <BlogLink
            name="What Makes A Great Developer Experience?"
            slug="developer-experience-examples"
          />
          <BlogLink
            name="2023 State of Databases for Serverless & Edge"
            slug="backend"
          />
          <BlogLink name="The Story of Heroku" slug="heroku" />
        </Suspense>
      </div>
      <div className="prose prose-neutral dark:prose-invert">
        {/* Tech Stack */}
        <p>Here are a few technologies I&apos;ve been working with recently:</p>
      </div>

      <LibraryCloud />
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I&apos;m always looking for new opportunities to learn and grow. If
          you&apos;re looking for a developer, feel free to{" "}
          <Link className="underline" href="mailto:rajatdas5000@gmail.com">
            Drop me an e-mail
          </Link>
          .
        </p>
      </div>
      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
        <li>
          <a
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/iRajatDas"
          >
            <ArrowIcon />
            <p className="h-7 ml-2">follow me</p>
          </a>
        </li>
      </ul>
    </section>
  );
}
