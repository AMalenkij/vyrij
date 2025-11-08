import { PortableText } from "@portabletext/react";
import { type PortableTextBlock } from "@portabletext/types";
import { TypographyComponents } from "@/components/TypographyComponents";
import { type ReactNode } from "react";

export default function MinorCard({
  description,
  date,
  children,
}: {
  description: unknown;
  date: string;
  children: ReactNode;
}) {
  return (
    <article className="container mx-auto my-16 px-1 md:px-12 ">
      <header>
        <h2 className="mb-4 font-semibold text-2xl lg:text-3xl">{date}</h2>
      </header>
      <div className="whitespace-pre-line text-lg lg:text-xl">
        {description ? (
          <PortableText
            value={description as PortableTextBlock[]}
            components={TypographyComponents}
          />
        ) : null}
      </div>
      {children}
    </article>
  );
}
