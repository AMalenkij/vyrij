import { ArrowUpRight } from "lucide-react";

interface ExternalLinkButtonProps {
  href: string;
  children: React.ReactNode;
  className?: string;
}

export default function ExternalLink({
  href,
  children,
  className = "",
}: ExternalLinkButtonProps) {
  const linkStyles =
    "relative  uppercase flex flex-col  inline-block gap-2 text-white leading-8 no-underline transition-colors duration-300 before:content-[''] before:absolute before:bottom-[-0.5rem] before:left-0 before:w-full before:h-0.5 before:bg-white before:rounded-sm before:opacity-0 before:transition-all before:duration-400 hover:before:opacity-100 hover:before:transform hover:before:-translate-y-1";

  return (
    <span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${linkStyles} ${className}`}
      >
        {children}
        <ArrowUpRight className="group-hover:-translate-y-0.5 mb-3 ml-1 inline-block h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    </span>
  );
}
