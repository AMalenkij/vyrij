type YearTitleProps = {
  year: string | number;
  title: string;
};

export function YearTitle({ year, title }: YearTitleProps) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center text-secondary-foreground">
      <div className="mb-12 font-bold text-base tlg:text-xl 2xl:text-3xl">
        {year}
      </div>
      <div className="px-10 text-center font-accent text-7xl lg:px-28 lg:text-8xl xl:text-9xl 2xl:text-10xl">
        {title}
      </div>
    </div>
  );
}
