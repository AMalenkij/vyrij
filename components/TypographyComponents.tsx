import { PortableTextComponents } from "@portabletext/react";

export const TypographyComponents: PortableTextComponents = {
  block: {
    h1: ({ children }) => (
      <h1 className="scroll-m-20 font-extrabold text-4xl tracking-tight lg:text-5xl">
        {children}
      </h1>
    ),
    h2: ({ children }) => (
      <h2 className="scroll-m-20 border-b pb-2 font-semibold text-3xl tracking-tight first:mt-0">
        {children}
      </h2>
    ),
    h3: ({ children }) => (
      <h3 className="scroll-m-20 font-semibold text-2xl tracking-tight">
        {children}
      </h3>
    ),
    h4: ({ children }) => (
      <h4 className="scroll-m-20 font-semibold text-xl tracking-tight">
        {children}
      </h4>
    ),
    normal: ({ children }) => (
      <p className="leading-7 [&:not(:first-child)]:mt-6">{children}</p>
    ),
    blockquote: ({ children }) => (
      <blockquote className="mt-6 border-l-2 pl-6 italic">
        {children}
      </blockquote>
    ),
  },
  marks: {
    code: ({ children }) => (
      <code className="relative rounded bg-muted px-[0.3rem] py-[0.2rem] font-mono font-semibold text-sm">
        {children}
      </code>
    ),
  },
  list: {
    bullet: ({ children }) => (
      <ul className="my-6 ml-6 list-disc [&>li]:mt-2">{children}</ul>
    ),
    number: ({ children }) => (
      <ol className="my-6 ml-6 list-decimal [&>li]:mt-2">{children}</ol>
    ),
  },
};
