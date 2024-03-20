import Image from "next/image"
import Link from "next/link"
import {
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandLinkedin,
  IconBrandTiktok,
  IconBrandTwitter,
  IconBrandYoutube,
  IconExternalLink
} from "@tabler/icons-react"

import ThemeToggle from "../theme/toggle"
import { Button } from "../ui/button"
import MainFooterArt from "./footer-art"
import logo from "/public/logo.webp"

export default function MainFooter() {
  return (
    <footer className="border-t bg-card backdrop-blur-xl">
      <div className="pt-24">
        <div className="mx-auto w-full max-w-2xl shrink-0 space-y-2 px-4 pb-12">
          <div className="relative space-y-6">
            <Link href="/" className="flex w-fit items-center">
              <Image
                src={logo}
                alt="Nabil Fatih"
                width={28}
                height={28}
                priority
                sizes="28px"
                className="rounded-full border object-cover shadow"
              />
              <h1 className="ml-1.5 flex items-center text-2xl font-semibold tracking-tighter">
                Nabil Fatih
              </h1>
            </Link>
            <div className="grid grid-cols-2 sm:grid-cols-4">
              <div className="flex gap-2">
                <ThemeToggle />
              </div>
              <div className="flex flex-col">
                <h1 className="mb-1 font-medium tracking-tight">Projects</h1>
                <Link
                  href="https://fibonacciku.com"
                  target="_blank"
                  className="inline-flex w-fit items-center tracking-tight underline-offset-4 hover:underline"
                >
                  FibonacciKu
                  <IconExternalLink className="ml-1 h-4 w-4" />
                </Link>
                <Link
                  href="https://nakafa.com"
                  target="_blank"
                  className="inline-flex w-fit items-center tracking-tight underline-offset-4 hover:underline"
                >
                  Nakafa
                  <IconExternalLink className="ml-1 h-4 w-4" />
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
                Developer based in Germany, from Indonesia.
              </p>
            </div>
            <div className="col-span-1">
              <div className="flex flex-wrap items-center">
                {socialMedia.map(social => {
                  return (
                    <Button
                      title={`FibonacciKu ${social.name}`}
                      key={social.link}
                      variant="ghost"
                      size="icon"
                      asChild
                    >
                      <Link
                        href={social.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <social.icon className="h-5 w-5" />
                        <span className="sr-only">{social.name}</span>
                      </Link>
                    </Button>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto w-full max-w-2xl px-4 pt-12">
          <p className="text-balance tracking-tight">
            All right reserved. Made with{" "}
            <span className="text-accent">❤️</span>
          </p>
        </div>
      </div>

      <MainFooterArt />
    </footer>
  )
}

const socialMedia = [
  {
    link: "https://www.github.com/nabilfatih",
    name: "GitHub",
    icon: IconBrandGithub
  },
  {
    link: "https://www.linkedin.com/in/nabilfatih",
    name: "LinkedIn",
    icon: IconBrandLinkedin
  },
  {
    link: "https://twitter.com/nabilfatih_",
    name: "Twitter",
    icon: IconBrandTwitter
  },
  {
    link: "https://www.instagram.com/nabilfatih_",
    name: "Instagram",
    icon: IconBrandInstagram
  },
  {
    link: "https://www.youtube.com/@fibonacciku",
    name: "YouTube",
    icon: IconBrandYoutube
  },
  {
    link: "https://www.tiktok.com/@fibonacciku",
    name: "TikTok",
    icon: IconBrandTiktok
  }
]
