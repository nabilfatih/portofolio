import {
  ExternalLinkIcon,
  GithubIcon,
  InstagramIcon,
  LinkedinIcon,
  NewTwitterIcon,
} from "@hugeicons/core-free-icons";
import { HugeIcons } from "@repo/design-system/components/ui/huge-icons";
import { buttonVariants } from "@repo/design-system/lib/button";
import Image from "next/image";
import Link from "next/link";
import MainFooterArt from "@/components/main/footer-art";
import ThemeToggle from "@/components/theme/toggle";
import { siteConfig } from "@/lib/site";
import logo from "@/public/logo.webp";

const projects = [
  { href: "https://nakafa.com", name: "Nakafa" },
  { href: "https://github.com/nabilfatih/fibonacciku", name: "FibonacciKu" },
] as const;

const socialMedia = [
  { href: siteConfig.social.github, icon: GithubIcon, name: "GitHub" },
  { href: siteConfig.social.linkedin, icon: LinkedinIcon, name: "LinkedIn" },
  { href: siteConfig.social.twitter, icon: NewTwitterIcon, name: "X" },
  { href: siteConfig.social.instagram, icon: InstagramIcon, name: "Instagram" },
] as const;

export default function MainFooter() {
  return (
    <footer className="border-t bg-card backdrop-blur-xl">
      <div className="pt-24">
        <div className="mx-auto w-full max-w-2xl shrink-0 space-y-2 px-4 pb-12">
          <div className="relative space-y-6">
            <Link className="flex w-fit items-center" href="/">
              <Image
                alt="Nabil Fatih"
                className="rounded-full border object-cover shadow"
                height={28}
                loading="eager"
                sizes="28px"
                src={logo}
                width={28}
              />
              <span className="ml-1.5 font-semibold text-2xl tracking-tighter">
                Nabil Fatih
              </span>
            </Link>
            <div className="grid grid-cols-[1fr_auto_1fr] items-start">
              <div className="flex gap-2">
                <ThemeToggle side="right" />
              </div>
              <div className="flex flex-col">
                <h2 className="mb-1 font-medium tracking-tight">Projects</h2>
                {projects.map((project) => (
                  <a
                    className="inline-flex w-fit items-center tracking-tight underline-offset-4 hover:underline"
                    href={project.href}
                    key={project.href}
                    rel="noopener noreferrer"
                    target="_blank"
                  >
                    {project.name}
                    <HugeIcons
                      className="ml-1 size-4"
                      icon={ExternalLinkIcon}
                    />
                  </a>
                ))}
              </div>
              <div className="flex flex-col justify-self-end">
                <h2 className="mb-1 font-medium tracking-tight">Legal</h2>
                <Link
                  className="inline-flex w-fit items-center tracking-tight underline-offset-4 hover:underline"
                  href="/privacy"
                >
                  Privacy
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mx-auto w-full max-w-2xl shrink-0 space-y-2 border-t px-4 pt-2">
          <div className="grid grid-cols-3">
            <div className="col-span-2 grid h-fit pt-2">
              <p className="mb-1 font-medium tracking-tight">
                Nabil Fatih © {new Date().getFullYear()}
              </p>
              <p className="w-fit tracking-tight">
                Product engineer based in Germany, from Indonesia.
              </p>
            </div>
            <div className="col-span-1">
              <div className="flex flex-wrap items-center justify-end">
                {socialMedia.map((social) => (
                  <a
                    aria-label={social.name}
                    className={buttonVariants({
                      size: "icon",
                      variant: "ghost",
                    })}
                    href={social.href}
                    key={social.href}
                    rel="noopener noreferrer"
                    target="_blank"
                    title={social.name}
                  >
                    <HugeIcons icon={social.icon} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-2xl px-4 pt-12">
          <p className="text-balance tracking-tight">
            All rights reserved. Made with{" "}
            <span className="text-accent">❤️</span>
          </p>
        </div>
      </div>

      <MainFooterArt />
    </footer>
  );
}
