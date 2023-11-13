import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/brand";
import Badge from "@/components/badge";
import BlogLink from "@/components/blog-link";
import ArrowIcon from "@/components/arrow-icon";
import LibraryCloud from "@/components/library-cloud";
import Welcome from "@/components/welcome";

export default function Page() {
  return (
    <section>
      <Welcome />
      <p className="prose prose-neutral dark:prose-invert">
        {`I'm a frontend developer and a tech enthusiast. I currently
        work as a Software Engineer Experience at `}
        <span className="not-prose">
          <Badge href="https://www.macmerise.com">
            <Logo.Macmerise className="inline-flex mr-1 h-3 w-3" />
            Macmerise
          </Badge>
        </span>
        {`, where I play a pivotal role in shaping the frontend UI/UX for our projects. I focus on creating seamless and user-friendly interfaces with `}
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
          My expertise lies in developing responsive web applications and
          optimizing them for better user experience. I am dedicated to
          delivering client-centric solutions tailored to meet specific project
          requirements.
        </p>
      </div>
      <div className="my-8 flex flex-col space-y-4 w-full">
        <Suspense>
          <BlogLink
            name="Promises, Async/Await, and Callbacks in JavaScript"
            slug="asynchronous-operations-promises-async-await-callbacks-javascript"
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
        <p>
          I have a passion for building products that people love. I try to keep
          my skils sharp by learning new things and keeping up with the latest
          trends in the industry.
        </p>
        <p>Here are a few technologies I&apos;ve been working with recently:</p>
      </div>

      <LibraryCloud />
      <div className="prose prose-neutral dark:prose-invert">
        <p>
          I&apos;m always looking for new opportunities to learn and grow. IIf
          you are seeking a dedicated frontend UI/UX developer with expertise in
          React and Next.js, I am here to bring your digital projects to life.
          Let&apos;s collaborate and create innovative, visually stunning, and
          user-friendly web experiences together.
        </p>
        <p>
          Please feel free to{" "}
          <Link className="underline" href="mailto:rajatdas5000@gmail.com">
            Drop me an e-mail
          </Link>
          .
        </p>
      </div>
      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
        <li>
          <Link
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/RajatDas_"
          >
            <ArrowIcon />
            <p className="h-7 ml-2">follow me</p>
          </Link>
        </li>
        <li>
          <Link
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://github.com/iRajatDas"
          >
            <ArrowIcon />
            <p className="h-7 ml-2">github</p>
          </Link>
        </li>
      </ul>
    </section>
  );
}
