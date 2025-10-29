"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/datasets?search=${encodeURIComponent(query.trim())}`);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group">
        {/* Glowing background effect */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-400 rounded-3xl blur-xl opacity-30 group-hover:opacity-40 transition-opacity duration-300" />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-30 transition-opacity duration-300" />
        
        {/* Glassmorphism container */}
        <div className="relative flex items-center gap-4 bg-white/90 backdrop-blur-xl rounded-3xl border border-white/50 shadow-2xl p-4 pl-6">
          <Input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search medical datasets... (e.g., cardiology, cancer, genetics)"
            className={cn(
              "flex-1 border-0 bg-transparent outline-none text-gray-900 placeholder:text-gray-400",
              "text-2xl md:text-3xl font-medium",
              "focus-visible:ring-0 focus-visible:ring-offset-0",
              "shadow-none"
            )}
            style={{ 
              border: 'none', 
              boxShadow: 'none', 
              outline: 'none',
              height: '60px',
              padding: '20px'
            }}
            onFocus={(e) => {
              e.target.style.border = 'none';
              e.target.style.boxShadow = 'none';
              e.target.style.outline = 'none';
            }}
          />
          <Button
            type="submit"
            variant="gradient"
            className="rounded-full w-[60px] h-[60px] p-0 shadow-lg hover:shadow-2xl hover:scale-105 flex items-center justify-center"
          >
            <Search className="w-7 h-7" />
          </Button>
        </div>
      </div>
    </form>
  );
}

