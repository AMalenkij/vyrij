import { ArrowUpRight } from "lucide-react";
import { LINKS_STYLES } from "@/constants/app-content";

type ExternalLinkButtonProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
};

export default function ExternalLink({
  href,
  children,
  className,
}: ExternalLinkButtonProps) {
  return (
    <span>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`${LINKS_STYLES} ${className}`}
      >
        {children}
        <ArrowUpRight className="group-hover:-translate-y-0.5 mb-3 ml-1 inline-block h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </a>
    </span>
  );
}
