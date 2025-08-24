import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Mail, MapPin } from "lucide-react";

export function ContactsCard({
  title,
  intro,
  email,
  address,
}: Record<string, string>) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <p className="text-foreground">{intro}</p>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <code className="rounded bg-muted px-2 py-1 font-mono text-sm">
                {email}
              </code>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">{address}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
