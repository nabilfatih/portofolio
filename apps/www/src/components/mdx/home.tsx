import { GitHubContributions } from "@/components/home/github-contributions";
import contributions from "@/content/contributions.json";
import type { GitHubContributionSummary } from "@/lib/github";

const profileImages = [
  {
    alt: "Nabil at Eibsee in Bavaria, Germany",
    className: "mb-4 h-64",
    height: 1280,
    imageClassName: "object-cover",
    src: "/nabil-mountain.webp",
    width: 960,
  },
  {
    alt: "Nabil in Ulm, Germany",
    className: "mb-4 h-80 sm:mb-0",
    height: 1200,
    imageClassName: "object-cover",
    src: "/nabil-ulm.webp",
    width: 857,
  },
  {
    alt: "Nabil with his cat Floki at Eibsee, Germany",
    className: "h-64 sm:mb-4 sm:h-80",
    height: 1280,
    imageClassName: "object-cover object-top sm:object-center",
    src: "/nabil-cat.webp",
    width: 705,
  },
  {
    alt: "Nabil sitting on a quiet road in Grindelwald, Switzerland",
    className: "mb-4 h-64 sm:mb-0",
    height: 1280,
    imageClassName: "object-cover",
    src: "/nabil-swiss.webp",
    width: 960,
  },
  {
    alt: "Nabil by a lake in Interlaken, Switzerland",
    className: "mb-4 h-64",
    height: 1200,
    imageClassName: "object-cover",
    src: "/nabil-lake.webp",
    width: 985,
  },
  {
    alt: "Sunset at Eibsee, Germany",
    className: "h-80",
    height: 1280,
    imageClassName: "object-cover",
    src: "/sunset.webp",
    width: 836,
  },
] as const;

/** Written at build time, so the block is part of the static page. */
export function GitHubActivity() {
  const summary = contributions as GitHubContributionSummary | null;

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
          <img
            alt={image.alt}
            className={`h-full w-full rounded-xl border bg-muted/90 shadow ${image.imageClassName}`}
            decoding="async"
            height={image.height}
            loading="lazy"
            src={image.src}
            width={image.width}
          />
        </div>
      ))}
    </div>
  );
}
