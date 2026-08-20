import { io } from "next/cache";
import Image from "next/image";
import { Suspense } from "react";
import { GitHubContributions } from "@/components/home/github-contributions";
import { loadGitHubContributionSummary } from "@/lib/github";
import nabilCat from "@/public/nabil-cat.webp";
import nabilLake from "@/public/nabil-lake.webp";
import nabilMountain from "@/public/nabil-mountain.webp";
import nabilSwiss from "@/public/nabil-swiss.webp";
import nabilUlm from "@/public/nabil-ulm.webp";
import sunset from "@/public/sunset.webp";

const profileImages = [
  {
    alt: "Nabil at Eibsee in Bavaria, Germany",
    className: "mb-4 h-64",
    imageClassName: "object-cover",
    src: nabilMountain,
  },
  {
    alt: "Nabil in Ulm, Germany",
    className: "mb-4 h-80 sm:mb-0",
    imageClassName: "object-cover",
    src: nabilUlm,
  },
  {
    alt: "Nabil with his cat Floki at Eibsee, Germany",
    className: "h-64 sm:mb-4 sm:h-80",
    imageClassName: "object-cover object-top sm:object-center",
    src: nabilCat,
  },
  {
    alt: "Nabil sitting on a quiet road in Grindelwald, Switzerland",
    className: "mb-4 h-64 sm:mb-0",
    imageClassName: "object-cover",
    src: nabilSwiss,
  },
  {
    alt: "Nabil by a lake in Interlaken, Switzerland",
    className: "mb-4 h-64",
    imageClassName: "object-cover",
    src: nabilLake,
  },
  {
    alt: "Sunset at Eibsee, Germany",
    className: "h-80",
    imageClassName: "object-cover",
    src: sunset,
  },
] as const;

export function GitHubActivity() {
  return (
    <Suspense fallback={null}>
      <GitHubActivityContent />
    </Suspense>
  );
}

async function GitHubActivityContent() {
  await io();

  const summary = await loadGitHubContributionSummary();

  if (!summary) {
    return null;
  }

  return <GitHubContributions summary={summary} />;
}

export function ProfileGallery() {
  return (
    <div className="my-8 columns-2 gap-4 sm:columns-3">
      {profileImages.map((image) => (
        <div className={`relative ${image.className}`} key={image.alt}>
          <Image
            alt={image.alt}
            className={`h-full w-full rounded-xl border bg-muted/90 shadow ${image.imageClassName}`}
            sizes="(max-width: 639px) calc((100vw - 3rem) / 2), 213px"
            src={image.src}
          />
        </div>
      ))}
    </div>
  );
}
