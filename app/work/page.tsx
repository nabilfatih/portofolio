import type { Metadata } from "next"

import Particles from "@/components/ui/particles"
import { Separator } from "@/components/ui/separator"
import MainTransition from "@/components/main/transition"

export const metadata: Metadata = {
  title: "Work",
  description: "A summary of my work and contributions."
}

export default function WorkPage() {
  return (
    <MainTransition className="relative">
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
              Schneider Electric GmbH
            </h2>
            <p className="text-sm text-muted-foreground">
              Software Engineer, Jan 2024 - Jun 2024
            </p>
            <p></p>

            <Separator className="my-8" />

            <h2 className="mb-1 mt-0 text-xl font-medium tracking-tighter">
              Wemakefuture AG
            </h2>
            <p className="text-sm text-muted-foreground">
              Full Stack Developer, May 2022 - Dec 2023
            </p>
            <p></p>

            <Separator className="my-8" />

            <h2 className="mb-1 mt-0 text-xl font-medium tracking-tighter">
              FibonacciKu
            </h2>
            <p className="text-sm text-muted-foreground">
              Founder & Full Stack Developer, Feb 2021 - Present
            </p>
            <p></p>

            <Separator className="my-8" />

            <h2 className="mb-1 mt-0 text-xl font-medium tracking-tighter">
              Institute for Sustainability
            </h2>
            <p className="text-sm text-muted-foreground">
              Working Student in Artificial Intelligence, Aug 2021 - Sep 2022
            </p>
            <p></p>

            <Separator className="my-8" />

            <h2 className="mb-1 mt-0 text-xl font-medium tracking-tighter">
              Appen
            </h2>
            <p className="text-sm text-muted-foreground">
              Data Collector, Apr 2021 - Feb 2022
            </p>
            <p></p>
          </div>
        </div>
      </section>
    </MainTransition>
  )
}
