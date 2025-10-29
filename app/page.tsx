import Link from "next/link";
import { Search, Heart, Brain, Activity, Eye, Stethoscope, Pill, Dna, Microscope, Bone } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";

const specialties = [
  { id: "cardiology", name: "Cardiology", icon: Heart, color: "text-red-500" },
  { id: "neurology", name: "Neurology", icon: Brain, color: "text-purple-500" },
  { id: "oncology", name: "Oncology", icon: Activity, color: "text-blue-500" },
  { id: "ophthalmology", name: "Ophthalmology", icon: Eye, color: "text-cyan-500" },
  { id: "general", name: "General Medicine", icon: Stethoscope, color: "text-green-500" },
  { id: "pharmacology", name: "Pharmacology", icon: Pill, color: "text-pink-500" },
  { id: "genetics", name: "Genetics", icon: Dna, color: "text-indigo-500" },
  { id: "pathology", name: "Pathology", icon: Microscope, color: "text-orange-500" },
  { id: "orthopedics", name: "Orthopedics", icon: Bone, color: "text-yellow-600" },
];

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-24">
        <div className="w-full max-w-4xl space-y-12">
          {/* Title */}
          <div className="text-center space-y-4">
            <h1 className="text-6xl md:text-7xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              OMeD
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300">
              Open Medical Datasets
            </p>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 max-w-2xl mx-auto">
              Search and share links to real-world, open, and free medical datasets
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full">
            <SearchBar />
          </div>

          {/* Specialty Filters */}
          <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-gray-200">
              Browse by Specialty
            </h2>
            <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-9 gap-4">
              {specialties.map((specialty) => {
                const Icon = specialty.icon;
                return (
                  <Link
                    key={specialty.id}
                    href={`/datasets?specialty=${specialty.id}`}
                    className="group flex flex-col items-center p-4 rounded-2xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-500 hover:shadow-lg transition-all duration-300 hover:scale-105"
                  >
                    <Icon className={`w-8 h-8 ${specialty.color} mb-2 group-hover:scale-110 transition-transform`} />
                    <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300 text-center">
                      {specialty.name}
                    </span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
