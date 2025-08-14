import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Smart Tourism AI",
  description: "Explore Syrian cities, landmarks, and culture with AI assistance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-gray-50 text-gray-800">
        {/* ✅ Navigation Bar */}
        <nav className="bg-white shadow p-4 flex gap-6">
          <Link href="/" className="hover:text-blue-600 font-medium">
            Home
          </Link>
          <Link href="/chat" className="hover:text-blue-600 font-medium">
            Chat
          </Link>
          <Link href="/cities" className="hover:text-blue-600 font-medium">
            Cities
          </Link>
          <Link href="/admin" className="hover:text-blue-600 font-medium">
            Admin
          </Link>
        </nav>

        {/* ✅ Page content */}
        <main className="p-6">{children}</main>
      </body>
    </html>
  );
}
