import Image from "next/image";
import Link from "next/link";
import { AppImage } from "@/adapters/toAppImage";

interface GalleryThumbnailProps {
    item: AppImage;
    href: string;
}

export default function GalleryThumbnail({ item, href }: GalleryThumbnailProps) {
    return (
        <Link
            href={href}
            scroll={false}
            className="group relative cursor-pointer overflow-hidden rounded-md border border-card-foreground/60 bg-muted"
        >
            <div className="absolute inset-0 z-10 bg-black/0 transition-colors group-hover:bg-black/20" />

            <Image
                src={item.image.url}
                alt={item.image.alt}
                width={item.image.dimensions.width}
                height={item.image.dimensions.height}
                placeholder="blur"
                blurDataURL={item.image.lqip}
                className="aspect-square object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />
        </Link>
    );
}
