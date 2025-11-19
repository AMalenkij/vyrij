import type { PortableTextBlock } from "next-sanity";

export default function toPortableText(text: string): PortableTextBlock[] {
  return [
    {
      _type: "block",
      _key: crypto.randomUUID(),
      style: "normal",
      markDefs: [],
      children: [
        {
          _type: "span",
          _key: crypto.randomUUID(),
          marks: [],
          text: text,
        },
      ],
    },
  ];
}
