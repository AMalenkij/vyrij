import type { FC } from "react";

type SubHeaderProps = {
  sectionName?: string;
  title: string;
  counter?: string | number | Promise<string | number>;
  icon?: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const SubHeader: FC<SubHeaderProps> = ({ sectionName, title, counter }) => {
  return (
    <section
      aria-labelledby={title}
      className="flex w-full justify-between py-12 text-white"
    >
      <div className="w-full space-y-1 ">
        <p className="text-muted-foreground text-xs sm:text-sm md:ml-3.5 lg:ml-3.5">
          / {sectionName}
        </p>
        <div className="flex w-full items-center justify-between">
          <div className="flex">
            <h1 className="font-normal text-6xl uppercase tracking-tight sm:text-7xl md:text-9xl">
              {title}
            </h1>
            <div className="invisible flex flex-col items-center gap-y-1 sm:visible md:gap-y-3.5">
              <p className="p-0.5 font-light text-lg sm:p-1 md:p-3.5">
                [ {counter} ]
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SubHeader;
