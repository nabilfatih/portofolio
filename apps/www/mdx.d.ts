/// <reference types="mdx" />

declare module "*.mdx" {
  import type { Element, MDXProps } from "mdx/types";
  import type { CaseStudyMetadata } from "@/lib/cases";

  export const caseStudy: CaseStudyMetadata;
  export default function MDXContent(props: MDXProps): Element;
}
