import Link from "next/link";
import { cn } from "@/lib/utils";

export default function Footer({ className }: { className?: string }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={cn("w-full border-t border-gray-200 bg-white/90 backdrop-blur-xl shadow-lg py-12 relative", className)}>
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        {/* Three Column Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Column 1: Brief About */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              About OMeD
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Open Medical Datasets (OMeD) is a comprehensive platform for discovering and sharing 
              links to real-world, open, and free medical datasets from around the globe. 
              Empowering researchers, clinicians, and data scientists with accessible healthcare data.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link 
                  href="/datasets" 
                  className="text-gray-600 hover:text-blue-600 transition-colors hover:underline"
                >
                  Browse Datasets
                </Link>
              </li>
              <li>
                <Link 
                  href="/submit" 
                  className="text-gray-600 hover:text-blue-600 transition-colors hover:underline"
                >
                  Submit Dataset
                </Link>
              </li>
              <li>
                <Link 
                  href="/profile" 
                  className="text-gray-600 hover:text-blue-600 transition-colors hover:underline"
                >
                  My Profile
                </Link>
              </li>
              <li>
                <Link 
                  href="/auth/login" 
                  className="text-gray-600 hover:text-blue-600 transition-colors hover:underline"
                >
                  Sign In
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Sponsor */}
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Sponsor
            </h3>
            <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 border border-blue-100">
              <div className="text-center">
                <div className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  OMeD
                </div>
                <p className="text-sm text-gray-600 mb-4">
                  Open Medical Datasets
                </p>
                <p className="text-xs text-gray-500">
                  Supporting open science and healthcare research worldwide
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Row: Name, Website, Copyright */}
        <div className="border-t border-gray-200 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-600 text-sm">
              Developed by{" "}
              <a
                href="https://AlJasem.eu.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline font-medium hover:text-blue-700 transition-colors"
              >
                Mohamad AlJasem
              </a>
              {" "}•{" "}
              <a
                href="https://AlJasem.eu.org"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline hover:text-blue-700 transition-colors"
              >
                AlJasem.eu.org
              </a>
            </div>
            <div className="text-gray-500 text-sm">
              © {currentYear} OMeD. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

