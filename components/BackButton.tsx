import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function BackButton({
  path,
  title,
}: {
  path: string;
  title: string;
}) {
  return (
    <Button variant="ghost" asChild className="mb-4">
      <Link href={path}>
        <ArrowLeft className="mr-2 h-4 w-4" />
        {title}
      </Link>
    </Button>
  );
}
