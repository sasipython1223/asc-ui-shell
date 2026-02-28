import "./globals.css";
import type { ReactNode } from "react";

export const metadata = {
  title: "ASC UI Shell",
  description: "VS Code-like UI shell for AI-First Scheduler"
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
