"use client";

import { useState } from "react";
import Image from "next/image";
import { ImageIcon } from "lucide-react";

interface DatasetImageProps {
  src: string;
  alt: string;
  className?: string;
  fill?: boolean;
  width?: number;
  height?: number;
}

const FallbackImage = ({ message }: { message: string }) => (
  <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-50">
    <div className="text-center p-4">
      <ImageIcon className="w-12 h-12 text-gray-300 mx-auto mb-2" />
      <p className="text-xs text-gray-400">{message}</p>
    </div>
  </div>
);

export default function DatasetImage({
  src,
  alt,
  className = "",
  fill = false,
  width,
  height,
}: DatasetImageProps) {
  const [imageError, setImageError] = useState(false);
  const [useUnoptimized, setUseUnoptimized] = useState(false);

  // Validate URL
  const imageUrl = src?.trim();
  const isValidUrl = imageUrl && (
    imageUrl.startsWith("http://") ||
    imageUrl.startsWith("https://") ||
    imageUrl.startsWith("/")
  );

  if (!isValidUrl) {
    return <FallbackImage message="Invalid image URL" />;
  }

  if (imageError) {
    return <FallbackImage message="Image unavailable" />;
  }

  const handleError = () => {
    if (!useUnoptimized) {
      // Try unoptimized as fallback
      setUseUnoptimized(true);
    } else {
      // Both optimized and unoptimized failed
      setImageError(true);
    }
  };

  if (fill) {
    return (
      <Image
        src={imageUrl}
        alt={alt}
        fill
        className={className}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        onError={handleError}
        unoptimized={useUnoptimized}
      />
    );
  }

  return (
    <Image
      src={imageUrl}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      onError={handleError}
      unoptimized={useUnoptimized}
      sizes="100vw"
    />
  );
}

