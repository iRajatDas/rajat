import Logo from "@/components/brand";
import type { Metadata } from "next";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { relativeTimeFromDates } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Timeline",
  description: "A complrehensive data of my professional journey",
};

const timelineData = [
  {
    company: "Macmerise",
    logo: Logo.Macmerise,
    description:
      "Macmerise is India's best online shopping website for accessories like mobile phone cases, mobile cover, macbook skins & designer headphones with easy shipping options anywhere in India.",
    start: new Date("2022-01-16"),
    end: Date.now(),
    role: "Software Engineer",
    responsibility: "Frontend Development",
    projects: [
      {
        name: "Macmerise",
        "short-description": "Storefront for Macmerise",
        description:
          "Developed the website from scratch using Next.js and Tailwind CSS. Implemented SEO and performance optimization. Integrated with Google Analytics and Google Tag Manager for tracking and analytics.",
        start: new Date("2022-01-16"),
        end: new Date("2022-03-31"),
      },
      {
        name: "Macmerise Admin",
        "short-description": "Admin Dashboard for Macmerise",
        description:
          "Developed the admin dashboard using Next.js 14 and TailwindCSS. Implemented user authentication and role-based access control. Integrated with Prisma with robust data validation and security.",
        start: new Date("2022-04-01"),
        end: new Date("2022-06-30"),
      },
      {
        name: "Macmerise.ai",
        "short-description": "AI-powered Product Generation for Macmerise",
        description:
          "Developed the AI-powered product generation tool using React, Next.js 14 and Pixi.js. Implemented image processing via Pixi.js on frontent to generate unique designs for mobile cases and skins and more.",
        start: new Date("2022-07-01"),
        end: new Date("2022-09-30"),
      },
      {
        name: "Macmerise.ai Admin",
        "short-description": "Admin Dashboard for Macmerise.ai",
        description:
          "Developed the admin dashboard using Next.js 14 and TailwindCSS. Implemented user authentication and role-based access control. Integrated with Prisma with robust data validation and security.",
        start: new Date("2022-10-01"),
        end: new Date("2022-12-31"),
      },
    ],
  },
];

export default function TimelinePage() {
  return (
    <section>
      <h1 className="font-semibold text-2xl mb-4 tracking-tighter">Timeline</h1>
      <p className="transition-all hover:text-neutral-600 dark:hover:text-neutral-200 flex align-middle text-neutral-800 dark:text-neutral-400 mb-8">
        I have been in the industry for over 2+ years now. I have worked with
        various companies and have been part of some amazing projects.
      </p>
      <div className="space-y-6 lg:space-y-8">
        {timelineData.map((timeline) => (
          <div
            className="rounded-lg overflow-hidden border shadow-sm dark:border-neutral-700 bg-neutral-900/70"
            key={timeline.company}
          >
            <div className="flex items-start p-4 gap-4">
              <timeline.logo className="size-8 shrink-0 text-primary-500 dark:text-primary-400 rounded" />
              <div className="grid gap-1">
                <h1 className="text-lg font-semibold tracking-tight">
                  {timeline.company}
                </h1>
                <p className="text-sm text-neutral-500 dark:text-neutral-400">
                  {timeline.description}
                </p>
              </div>
            </div>
            <div className="border-t border-neutral-200 dark:border-neutral-700" />
            <div className="flex flex-col gap-4 px-4 pb-1">
              <Accordion
                type="single"
                collapsible
                className="w-full divide-y divide-neutral-200 dark:divide-neutral-700"
              >
                {timeline.projects.map((project) => (
                  <AccordionItem value={project.name} key={project.name}>
                    <AccordionTrigger>
                      <div className="grid gap-1 no-underline">
                        <h3 className="font-semibold w-fit">{project.name}</h3>
                        <p className="text-sm leading-4 transition-all hover:text-neutral-600 dark:hover:text-neutral-200 text-left text-neutral-800 dark:text-neutral-400">
                          {project["short-description"]}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="prose max-w-none prose-sm">
                      <p className="text-neutral-600 dark:text-neutral-400">
                        {project.description}
                      </p>

                      {/* Calculate duration between two time stamps */}

                      <p className="text-neutral-600 dark:text-neutral-400">
                        <span>
                          <span className="text-neutral-800 dark:text-neutral-200">
                            Duration
                          </span>
                          :{" "}
                        </span>
                        {relativeTimeFromDates(
                          project.start,
                          project.end
                        )?.replace(" ago", "")}
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
