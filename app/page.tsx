import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import MainTransition from "@/components/main/transition"

import nabilCat from "/public/nabil-cat.webp"
import nabilLake from "/public/nabil-lake.webp"
import nabilMountain from "/public/nabil-mountain.webp"
import nabilSwiss from "/public/nabil-swiss.webp"
import nabilUlm from "/public/nabil-ulm.webp"
import sunset from "/public/sunset.webp"

export default function Home() {
  return (
    <MainTransition className="relative">
      <section className="py-24">
        <div className="mx-auto max-w-2xl px-4">
          <h1 className="mb-8 text-2xl font-medium tracking-tighter">
            hey, I&#39;m Nabil 👋
          </h1>

          <p className="prose max-w-none break-words prose-p:leading-relaxed prose-pre:p-0">
            I&#39;m a full-stack developer, optimist, and learner. I currently{" "}
            <Button asChild variant="link" className="h-auto p-0 text-base">
              <Link href="/work">work</Link>
            </Button>
            , in my free time, on my startup project{" "}
            <Button asChild variant="link" className="h-auto p-0 text-base">
              <Link href="/https://fibonacciku.com" target="_blank">
                FibonacciKu
              </Link>
            </Button>
            , where I build AI personalized assistant designed specifically for
            students and teachers. I love maine coon and travel.
          </p>

          <div className="my-8 columns-2 gap-4 sm:columns-3">
            <div className="relative mb-4 h-60">
              <Image
                alt="Me at Eibsee in bayern, germany"
                src={nabilMountain}
                fill
                sizes="(max-width: 768px) 213px, 33vw"
                priority
                className="rounded-xl border bg-muted/90 object-cover shadow"
              />
            </div>
            <div className="relative mb-4 h-80 sm:mb-0">
              <Image
                alt="Me at Ulm, germany"
                src={nabilUlm}
                fill
                sizes="(max-width: 768px) 213px, 33vw"
                priority
                className="rounded-xl border bg-muted/90 object-cover shadow"
              />
            </div>
            <div className="relative h-60 sm:mb-4 sm:h-80">
              <Image
                alt="Me with my cat floki at Eibsee, germany"
                src={nabilCat}
                fill
                sizes="(max-width: 768px) 213px, 33vw"
                priority
                className="rounded-xl border bg-muted/90 object-cover object-top shadow sm:object-center"
              />
            </div>
            <div className="relative mb-4 h-60 sm:mb-0">
              <Image
                alt="Me sitting in the middle of the road in grindelwald, swiss"
                src={nabilSwiss}
                fill
                sizes="(max-width: 768px) 213px, 33vw"
                priority
                className="rounded-xl border bg-muted/90 object-cover shadow"
              />
            </div>
            <div className="relative mb-4 h-60">
              <Image
                alt="Me at lake in interlaken, swiss"
                src={nabilLake}
                fill
                sizes="(max-width: 768px) 213px, 33vw"
                priority
                className="rounded-xl border bg-muted/90 object-cover shadow"
              />
            </div>
            <div className="relative h-80">
              <Image
                alt="Beautiful sunset in Eibsee, germany"
                src={sunset}
                fill
                sizes="(min-width: 768px) 213px, 33vw"
                priority
                className="rounded-xl border bg-muted/90 object-cover shadow"
              />
            </div>
          </div>
        </div>
      </section>
    </MainTransition>
  )
}
