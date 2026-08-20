import remarkGfm from "remark-gfm";

export const mdxOptions = {
  remarkPlugins: [remarkGfm],
};

export const nextMdxOptions = {
  remarkPlugins: ["remark-gfm"],
};
