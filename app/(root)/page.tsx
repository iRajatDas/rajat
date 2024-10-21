import { Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/components/brand";
import Badge from "@/components/badge";
import BlogLink from "@/components/blog-link";
import ArrowIcon from "@/components/arrow-icon";
import LibraryCloud from "@/components/library-cloud";
import Welcome from "@/components/welcome";
import { Card } from "@/components/card";

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
          I have experience working with modern web technologies such as{" "}
          <strong>React</strong>, <strong>Next.js</strong>, and{" "}
          <strong>Tailwind CSS</strong>. I love learning new things and
          experimenting with the latest tools to improve my workflow.
        </p>
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
            name="Responsive React Application with the useMediaQuery Hook"
            slug="use-media-query-hook-reactjs"
          />
          <BlogLink
            name="Hexadecimal to RGB Conversion"
            slug="hex-to-rgb-converter-javascript"
          />
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
      <div className="space-y-4 mt-8 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <h3
          className="text-3xl font-bold tracking-tight text-neutral-900 dark:text-neutral-100 scroll-m-20"
          id="projects"
        >
          <span className="text-neutral-800 dark:text-neutral-100">
            Projects
          </span>
        </h3>
        <p className="transition-all hover:text-neutral-600 dark:hover:text-neutral-200 flex align-middle text-neutral-800 dark:text-neutral-400">
          Here are a few projects I&apos;ve been working on recently. Some of
          them are personal projects and some are from my professional journey.
        </p>

        <div className="grid grid-cols-1 gap-4 mx-auto lg:grid-cols-2">
          <div className="col-span-full">
            <Card>
              <Link href="https://instathreadsdown.com/" target="_blank">
                <article className="relative w-full h-full p-4">
                  <h2
                    id="featured-post"
                    className="mt-2 text-2xl font-bold dark:text-zinc-100 dark:group-hover:text-white text-zinc-700 group-hover:text-zinc-600"
                  >
                    Insta Threads Down
                  </h2>
                  <p className="mt-2 leading-8 duration-150 text-zinc-500 group-hover:text-zinc-400 dark:text-zinc-400 dark:group-hover:text-zinc-300 text-balance">
                    Insta Threads Down is a simple web app that allows you to
                    download <strong>Instagram Threads</strong> in a single
                    click. It&apos;s built with <strong>Next.js</strong> and{" "}
                    <strong>Cloudflare Workers</strong>.
                  </p>
                </article>
              </Link>
            </Card>
          </div>

          <Card>
            <Link href="https://youtu.be/VnwmsxH2jqU?t=321">
              <article className="relative w-full h-full p-4">
                <h2
                  id="featured-post"
                  className="mt-2 text-2xl font-bold dark:text-zinc-100 dark:group-hover:text-white text-zinc-700 group-hover:text-zinc-600"
                >
                  Samsung AI PhoneCase
                </h2>
                <p className="mt-2 leading-8 duration-150 text-zinc-500 group-hover:text-zinc-400 dark:text-zinc-400 dark:group-hover:text-zinc-300 text-balance">
                  Samsung AI PhoneCase is a project that I worked on during my
                  time at Macmerise. It takes a prompt and generates a unique AI
                  art and prints it on a phone case. <br />
                  <strong className="text-xs font-normal text-black dark:text-white">
                    (Only used in Samsung Exclusive Stores in India.)
                  </strong>
                </p>
              </article>
            </Link>
          </Card>
          <Card>
            <Link href="">
              <article className="relative w-full h-full p-4">
                <h2
                  id="featured-post"
                  className="mt-2 text-2xl font-bold dark:text-zinc-100 dark:group-hover:text-white text-zinc-700 group-hover:text-zinc-600"
                >
                  1OF1 AI-Commerice
                </h2>
                <p className="mt-2 leading-8 duration-150 text-zinc-500 group-hover:text-zinc-400 dark:text-zinc-400 dark:group-hover:text-zinc-300 text-balance">
                  1OF1 AI-Commerice is a project that I worked on during my time
                  at Macmerise. It takes kewords and generates a unique AI art
                  then user can get choose from various products (
                  <i>ie: t-shirts, sweatshirt</i>) to print it on.
                </p>
              </article>
            </Link>
          </Card>
        </div>
      </div>
      <ul className="flex flex-col md:flex-row mt-8 space-x-0 md:space-x-4 space-y-2 md:space-y-0 font-sm text-neutral-600 dark:text-neutral-300">
        <li>
          <Link
            className="flex items-center hover:text-neutral-800 dark:hover:text-neutral-100 transition-all"
            rel="noopener noreferrer"
            target="_blank"
            href="https://twitter.com/RajotDas_"
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
            href="https://github.com/iRajotDas"
          >
            <ArrowIcon />
            <p className="h-7 ml-2">github</p>
          </Link>
        </li>
      </ul>
    </section>
  );
}
