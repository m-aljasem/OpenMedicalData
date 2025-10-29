"use client";

import Link from "next/link";
import { Heart, Brain, Activity, Eye, Stethoscope, Pill, Dna, Microscope, Bone, Baby, Scissors, TestTube, User, Sparkles, BrainCircuit, Bug, Wind } from "lucide-react";
import SearchBar from "@/components/SearchBar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { useRef, useState } from "react";

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
  { id: "pediatrics", name: "Pediatrics", icon: Baby, color: "text-rose-400" },
  { id: "surgery", name: "Surgery", icon: Scissors, color: "text-violet-600" },
  { id: "immunology", name: "Immunology", icon: TestTube, color: "text-teal-500" },
  { id: "psychiatry", name: "Psychiatry", icon: User, color: "text-amber-500" },
  { id: "radiology", name: "Radiology", icon: Sparkles, color: "text-sky-400" },
  { id: "neurosurgery", name: "Neurosurgery", icon: BrainCircuit, color: "text-fuchsia-500" },
  { id: "infectious", name: "Infectious Disease", icon: Bug, color: "text-emerald-500" },
  { id: "pulmonology", name: "Pulmonology", icon: Wind, color: "text-blue-400" },
];

const videoFiles = ['/videos/bg-1.mp4', '/videos/bg-2.mp4', '/videos/bg-3.mp4'];

export default function HomePage() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  
  // Randomly select a video on component mount
  const [selectedVideo] = useState<string>(() => {
    const randomIndex = Math.floor(Math.random() * videoFiles.length);
    return videoFiles[randomIndex];
  });

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Video Background */}
      {selectedVideo && (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="fixed inset-0 w-full h-full object-cover z-0"
        >
          <source src={selectedVideo} type="video/mp4" />
        </video>
      )}

      {/* Blur Overlay */}
      <div className="fixed inset-0 bg-white/40 backdrop-blur-2xl z-[1]" />

      {/* Grid background pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_0%,#000_70%,transparent_110%)] pointer-events-none z-[2]" />
      
      {/* Decorative gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl opacity-40 z-[2]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl opacity-40 z-[2]" />
      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-12 md:py-24 relative z-10">
        <div className="w-full max-w-6xl">
          {/* Hero Section */}
          <div className="text-center">
            <h1 className="text-7xl md:text-8xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent drop-shadow-sm bg-[length:200%_auto] animate-gradient mb-6">
              OMeD
            </h1>
            <p className="text-2xl md:text-3xl font-semibold text-gray-700 text-center mb-4">
              Open Medical Datasets
            </p>
            <p className="text-lg md:text-xl text-gray-600 whitespace-nowrap mx-auto text-center mb-0">
              Search and share links to real-world, open, and free medical datasets from around the globe
            </p>
          </div>

          {/* Search Bar */}
          <div className="w-full max-w-5xl mx-auto mt-4 mb-[30px]">
            <SearchBar />
          </div>

          {/* Specialty Filters - Two Row Slider */}
          <div id="categories" className="mt-[30px]">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-5">
              Browse by Specialty
            </h2>
            <div className="relative mt-5">
              {/* Scrollable container with two rows */}
              <div
                ref={scrollContainerRef}
                className="overflow-x-auto scrollbar-hide pb-4 snap-x snap-mandatory scroll-smooth"
                style={{
                  scrollbarWidth: 'none',
                  msOverflowStyle: 'none',
                }}
              >
                <div className="inline-flex flex-col gap-6 md:gap-8" style={{ minWidth: 'max-content' }}>
                  {/* First Row */}
                  <div className="flex gap-6 md:gap-8">
                    {specialties.slice(0, Math.ceil(specialties.length / 2)).map((specialty) => {
                      const Icon = specialty.icon;
                      return (
                        <Link
                          key={specialty.id}
                          href={`/datasets?specialty=${specialty.id}`}
                          className="group block flex-shrink-0 snap-start"
                        >
                          <Card className="relative flex flex-col items-center p-8 bg-white/80 backdrop-blur-xl border-white/60 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden min-h-[180px] w-[200px]">
                            {/* Glowing effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                            <CardContent className="relative z-10 flex flex-col items-center justify-center p-0 w-full h-full">
                              <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-md group-hover:shadow-lg transition-shadow mb-4">
                                <Icon className={cn("w-14 h-14", specialty.color, "group-hover:scale-110 transition-transform duration-300")} />
                              </div>
                              <span className="text-base font-semibold text-gray-700 text-center leading-tight">
                                {specialty.name}
                              </span>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                  {/* Second Row */}
                  <div className="flex gap-6 md:gap-8">
                    {specialties.slice(Math.ceil(specialties.length / 2)).map((specialty) => {
                      const Icon = specialty.icon;
                      return (
                        <Link
                          key={specialty.id}
                          href={`/datasets?specialty=${specialty.id}`}
                          className="group block flex-shrink-0 snap-start"
                        >
                          <Card className="relative flex flex-col items-center p-8 bg-white/80 backdrop-blur-xl border-white/60 shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 hover:-translate-y-1 overflow-hidden min-h-[180px] w-[200px]">
                            {/* Glowing effect on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-100/50 via-purple-100/50 to-pink-100/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-xl" />
                            <CardContent className="relative z-10 flex flex-col items-center justify-center p-0 w-full h-full">
                              <div className="p-4 rounded-2xl bg-gradient-to-br from-white to-gray-50 shadow-md group-hover:shadow-lg transition-shadow mb-4">
                                <Icon className={cn("w-14 h-14", specialty.color, "group-hover:scale-110 transition-transform duration-300")} />
                              </div>
                              <span className="text-base font-semibold text-gray-700 text-center leading-tight">
                                {specialty.name}
                              </span>
                            </CardContent>
                          </Card>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer className="relative z-10" />
    </div>
  );
}
