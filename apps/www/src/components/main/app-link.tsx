import { Link } from "@tanstack/react-router";
import type { ComponentProps } from "react";

type AppLinkProps = Omit<ComponentProps<"a">, "href"> & {
  readonly href: string;
};

const FILE_PATH_PATTERN = /\.[a-z]+$/;

/** Links a page through the router and a static file such as /llms.txt directly. */
export default function AppLink({ children, href, ...props }: AppLinkProps) {
  if (FILE_PATH_PATTERN.test(href)) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  }

  return (
    <Link to={href as "/"} {...props}>
      {children}
    </Link>
  );
}
