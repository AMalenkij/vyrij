import { PhotoWrapper } from "@/components/animation/PhotoWrapper";
import { ScrollFadeWrapper } from "@/components/animation/ScrollFadeWrapper";

export default function Hero({
  children,
  translations,
}: {
  children: React.ReactNode;
  translations: Record<string, string>;
}) {
  return (
    <div className="container relative mx-auto h-[160vh] md:h-[140vh]">
      <PhotoWrapper delay={1}>
        <ScrollFadeWrapper fadeOut={true}>{children}</ScrollFadeWrapper>
      </PhotoWrapper>
      <div className="sticky inset-1/2 z-10 mb-60 items-center justify-center font-extralight">
        <div className="text-center">
          <h1 className="font-extralight text-xl uppercase tracking-widest md:text-2xl lg:text-3xl xl:text-4xl">
            {translations.title}
          </h1>
          <ScrollFadeWrapper fadeOut={false} className="mt-4">
            <p className="font-extralight uppercase tracking-widest md:text-xl lg:text-2xl xl:text-3xl">
              {translations.subtitle}
            </p>
            <p className="mt-2 font-extralight text-sm uppercase tracking-widest lg:text-base xl:text-lg">
              {translations.author}
            </p>
          </ScrollFadeWrapper>
        </div>
      </div>

      <ScrollFadeWrapper
        fadeOut={true}
        className="-translate-x-1/2 absolute top-[80vh] left-1/2 font-extralight text-xs uppercase md:top-[85vh] md:tracking-widest lg:text-sm xl:text-base"
      >
        {"{ "}
        {translations.scrollText}
        {" }"}
      </ScrollFadeWrapper>
    </div>
  );
}
