import type { Metadata } from "next"

import Particles from "@/components/ui/particles"
import { Separator } from "@/components/ui/separator"

export const metadata: Metadata = {
  title: "Work",
  description: "A summary of my work and contributions."
}

export default function WorkPage() {
  return (
    <div className="relative">
      <Particles
        className="pointer-events-none absolute inset-0 -z-10 animate-fade-in"
        quantity={100}
      />
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="mb-8 text-2xl font-medium tracking-tighter">
            my work ✨
          </h1>

          <div className="prose max-w-none break-words prose-p:leading-relaxed prose-pre:p-0">
            <p>
              My mission is to build something that can have big benefits for
              the people. Here are some of my work that I&#39;ve done.
            </p>

            <Separator className="my-8" />

            <h2 className="mb-1 mt-0 text-xl font-medium tracking-tighter">
              StrategyBridgeAI GmbH
            </h2>
            <p className="text-sm text-muted-foreground">
              Full-Stack Developer, Jul 2024 - Present
            </p>
            <p></p>
            <ul>
              <li>
                Architected the frontend application, leveraging NextJS, React,
                and Tailwind CSS to create a seamless user experience. Designed
                the UI/UX for the application, ensuring a user-friendly and
                intuitive interface.
              </li>
              <li>
                Developed a REST API to connect the frontend and backend,
                enabling users to access financial analysis and insights.
              </li>
              <li>
                Implemented authentication and authorization mechanisms,
                allowing users to securely access their financial data.
              </li>
            </ul>

            <Separator className="my-8" />

            <h2 className="mb-1 mt-0 text-xl font-medium tracking-tighter">
              Schneider Electric GmbH
            </h2>
            <p className="text-sm text-muted-foreground">
              Application Developer, Jan 2024 - Jun 2024
            </p>
            <p></p>
            <ul>
              <li>
                Led the development of an internal app for non-tech staff to
                manage databases efficiently. Used Microsoft PowerApps, Power
                Automate, and Dataverse to streamline operations and reduce IT
                support reliance.
              </li>
              <li>
                Created a user-friendly interface for seamless onboarding and
                improved user experience. Conducted user testing and feedback
                sessions to boost user adoption and satisfaction.
              </li>
            </ul>

            <Separator className="my-8" />

            <h2 className="mb-1 mt-0 text-xl font-medium tracking-tighter">
              Wemakefuture AG
            </h2>
            <p className="text-sm text-muted-foreground">
              Full-Stack Developer, May 2022 - Dec 2023
            </p>
            <p></p>
            <ul>
              <li>
                Built a product from scratch that enables users to synchronize
                their data across various applications. This involved designing
                the database, automating backend processes using Zappier and
                Azure functions, designing a payment gateway with NextJS and
                Stripe, and creating a website with Tailwind CSS and NextJS.
                Also developed serverless functions in NextJS API.
              </li>
              <li>
                Significantly increased the revenue of the company’s product,
                0codekit, by developing new features. This included creating an
                AI endpoint in Microsoft Azure function that uses the latest
                OpenAI API.
              </li>
              <li>
                Conducted a successful migration of the repository from
                JavaScript into TypeScript, leading to more robust and error-
                free code. Additionally, fixed database errors in Supabase
                (PostgreSQL), while ensuring the security of the database
                through implementation of row level security.
              </li>
            </ul>

            <Separator className="my-8" />

            <h2 className="mb-1 mt-0 text-xl font-medium tracking-tighter">
              FibonacciKu
            </h2>
            <p className="text-sm text-muted-foreground">
              Founder & Full-Stack Developer, Feb 2021 - Present
            </p>
            <p></p>
            <ul>
              <li>
                Led a successful rebranding of FibonacciKu, pivoting to an AI
                focus and launching a personal assistant product for students
                and teachers. This strategic shift significantly boosted user
                acquisition, adding nearly 5000 new users and several customers
                within just a month.
              </li>
              <li>
                Drove technical enhancements across the platform, including the
                development of a REST API using serverless functions in Vercel
                and edge runtime for improved latency. Implemented OpenAI’s
                streaming API for a superior user experience. Redesigned the
                frontend using NextJS and Tailwind CSS, and integrated a secure
                payment gateway with Stripe and NextJS.
              </li>
              <li>
                Masterminded the design of a new Supabase database from scratch,
                ensuring row-level security across tables. Enabled real-time
                data usage for the chat discussion feature, fostering
                interactive and dynamic user engagement.
              </li>
            </ul>

            <Separator className="my-8" />

            <h2 className="mb-1 mt-0 text-xl font-medium tracking-tighter">
              Institute for Sustainability
            </h2>
            <p className="text-sm text-muted-foreground">
              Working Student in Artificial Intelligence, Aug 2021 - Sep 2022
            </p>
            <p></p>
            <ul>
              <li>
                Spearheaded research in artificial intelligence, data science,
                and sustainability, guided by rigorous analysis and evaluation
                of key data.
              </li>
              <li>
                Boosted engagement on the Institute’s social media platforms by
                166%, through the creation of accessible and engaging articles
                based on our research findings.
              </li>
              <li>
                Contributed to the Institute’s sustainability mission through
                impactful research and effective communication of sustain-
                ability issues.
              </li>
            </ul>

            <Separator className="my-8" />

            <h2 className="mb-1 mt-0 text-xl font-medium tracking-tighter">
              Appen
            </h2>
            <p className="text-sm text-muted-foreground">
              Data Collector, Apr 2021 - Feb 2022
            </p>
            <p></p>
            <ul>
              <li>
                Collected videos to help drive advances in computer vision
                applications for a major technology company.
              </li>
              <li>Reviewed Ads and News on social media Facebook.</li>
              <li>
                Improved the relevancy of the newsfeed for the leading global
                social media platform.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  )
}
