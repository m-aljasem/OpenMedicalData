"use client";

import { ExternalLink } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { useState } from "react";

interface DownloadButtonProps {
  datasetId: string;
  datasetLink: string;
  userId?: string;
}

export default function DownloadButton({
  datasetId,
  datasetLink,
  userId,
}: DownloadButtonProps) {
  const [tracked, setTracked] = useState(false);
  const supabase = createClient();

  const handleDownload = async () => {
    if (!tracked) {
      await supabase.from("downloads").insert({
        dataset_id: datasetId,
        user_id: userId || null,
      });
      setTracked(true);
    }
  };

  return (
    <a
      href={datasetLink}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleDownload}
      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-xl hover:from-green-600 hover:to-emerald-600 transition-all font-medium shadow-lg hover:shadow-xl"
    >
      <ExternalLink className="w-5 h-5" />
      Download Dataset
    </a>
  );
}

