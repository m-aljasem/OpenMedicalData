import Link from "next/link";
import Footer from "@/components/Footer";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold mb-4 text-gray-900 dark:text-white">404</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Profile not found</p>
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all font-medium"
          >
            Go Home
          </Link>
        </div>
      </main>
      <Footer />
    </div>
  );
}

