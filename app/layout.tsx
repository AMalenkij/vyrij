import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Vyrij",
  description: "choir Vyrij",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // biome-ignore lint/a11y/useHtmlLang: <explanation>
    <html suppressHydrationWarning>
      <body suppressHydrationWarning>{children}</body>
    </html>
  );
}
