import { SOCIAL_MEDIA } from "@/constants/app-content";
import Link from "next/link";
import { Button } from "@/components/ui/button";

interface SocialMediaSectionProps {
  title?: string;
  className?: string;
}

export default function SocialMediaSection({
  title = "Social Media",
  className = "",
}: SocialMediaSectionProps) {
  return (
    <div className={`space-y-3 md:space-y-4 ${className}`}>
      <h3 className="font-medium text-sm uppercase tracking-wide opacity-80">
        {title}
      </h3>
      <nav className="flex flex-col space-y-2" aria-label="Social media links">
        {SOCIAL_MEDIA.map(({ url, label, text }) => (
          <Link
            key={text}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
          >
            <Button variant="link" size="sm" className="px-0">
              {text}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}
