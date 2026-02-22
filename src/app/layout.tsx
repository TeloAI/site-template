import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "My Site",
  description: "Powered by MunieOS",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white text-zinc-900 antialiased">
        <header className="border-b border-zinc-200 px-6 py-4">
          <nav className="mx-auto flex max-w-5xl items-center justify-between">
            <span className="text-lg font-bold">My Site</span>
            <div className="flex gap-6 text-sm text-zinc-600">
              <a href="/" className="hover:text-zinc-900">
                Home
              </a>
              <a href="/blog" className="hover:text-zinc-900">
                Blog
              </a>
            </div>
          </nav>
        </header>
        <main>{children}</main>
        <footer className="border-t border-zinc-200 px-6 py-8 text-center text-sm text-zinc-500">
          Powered by MunieOS
        </footer>
      </body>
    </html>
  );
}
