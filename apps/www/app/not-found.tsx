import { buttonVariants } from "@repo/design-system/lib/button";
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[calc(100dvh-4rem)] flex-col items-center justify-center gap-4 px-4 text-center">
      <h1 className="font-bold text-4xl">404: Not found</h1>
      <p>The page you requested does not exist.</p>
      <Link className={buttonVariants()} href="/">
        Return home
      </Link>
    </div>
  );
}
