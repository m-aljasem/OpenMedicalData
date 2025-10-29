"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createClient } from "@/lib/supabase/client";
import ImageCropper from "./ImageCropper";
import { Upload, X } from "lucide-react";

const specialties = [
  "cardiology",
  "neurology",
  "oncology",
  "ophthalmology",
  "general",
  "pharmacology",
  "genetics",
  "pathology",
  "orthopedics",
];

const submissionSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  abstract: z.string().min(50, "Abstract must be at least 50 characters"),
  doi: z.string().optional().or(z.literal("")),
  tags: z.string(),
  specialty: z.enum([
    "cardiology",
    "neurology",
    "oncology",
    "ophthalmology",
    "general",
    "pharmacology",
    "genetics",
    "pathology",
    "orthopedics",
  ]),
  dataset_link: z.string().url("Must be a valid URL"),
  case_size: z.string().optional().or(z.literal("")),
  sample_data: z.string().optional().or(z.literal("")),
});

type SubmissionFormData = z.infer<typeof submissionSchema>;

interface SubmissionFormProps {
  userId: string;
}

export default function SubmissionForm({ userId }: SubmissionFormProps) {
  const router = useRouter();
  const [coverImage, setCoverImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SubmissionFormData>({
    resolver: zodResolver(submissionSchema),
  });

  const handleImageChange = (file: File | null) => {
    setCoverImage(file);
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    const fileExt = file.name.split(".").pop();
    const fileName = `${userId}/${Math.random()}.${fileExt}`;
    const filePath = `covers/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("dataset-covers")
      .upload(filePath, file);

    if (uploadError) {
      console.error("Upload error:", uploadError);
      return null;
    }

    const {
      data: { publicUrl },
    } = supabase.storage.from("dataset-covers").getPublicUrl(filePath);

    return publicUrl;
  };

  const onSubmit = async (data: SubmissionFormData) => {
    setError("");
    setUploading(true);

    try {
      let coverImageUrl: string | null = null;

      if (coverImage) {
        coverImageUrl = await uploadImage(coverImage);
        if (!coverImageUrl) {
          setError("Failed to upload cover image. Please try again.");
          setUploading(false);
          return;
        }
      }

      const tags = data.tags
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0);

      let sampleData = null;
      if (data.sample_data) {
        try {
          sampleData = JSON.parse(data.sample_data);
        } catch {
          setError("Sample data must be valid JSON");
          setUploading(false);
          return;
        }
      }

      const { error: insertError } = await supabase.from("datasets").insert({
        title: data.title,
        abstract: data.abstract,
        doi: data.doi || null,
        tags,
        specialty: data.specialty,
        dataset_link: data.dataset_link,
        cover_image_url: coverImageUrl,
        sample_data: sampleData,
        case_size: data.case_size || null,
        submitted_by: userId,
        status: "pending",
      });

      if (insertError) {
        setError(insertError.message);
        setUploading(false);
      } else {
        router.push("/datasets?message=Dataset submitted successfully and is pending approval");
        router.refresh();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
      setUploading(false);
    }
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-gray-200 p-8">
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div>
          <label
            htmlFor="title"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Title *
          </label>
          <input
            id="title"
            {...register("title")}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter dataset title"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="abstract"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Abstract *
          </label>
          <textarea
            id="abstract"
            {...register("abstract")}
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Describe the dataset..."
          />
          {errors.abstract && (
            <p className="mt-1 text-sm text-red-600">{errors.abstract.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label
              htmlFor="specialty"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Specialty *
            </label>
            <select
              id="specialty"
              {...register("specialty")}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {specialties.map((spec) => (
                <option key={spec} value={spec}>
                  {spec.charAt(0).toUpperCase() + spec.slice(1)}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="doi"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              DOI (optional)
            </label>
            <input
              id="doi"
              {...register("doi")}
              className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="10.1234/example"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="tags"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Tags (comma-separated) *
          </label>
          <input
            id="tags"
            {...register("tags")}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="medical imaging, MRI, brain"
          />
        </div>

        <div>
          <label
            htmlFor="dataset_link"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Dataset Link (URL) *
          </label>
          <input
            id="dataset_link"
            type="url"
            {...register("dataset_link")}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="https://example.com/dataset"
          />
          {errors.dataset_link && (
            <p className="mt-1 text-sm text-red-600">
              {errors.dataset_link.message}
            </p>
          )}
        </div>

        <div>
          <label
            htmlFor="case_size"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Case Size (optional)
          </label>
          <input
            id="case_size"
            {...register("case_size")}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g., 1000 cases, 500 patients"
          />
        </div>

        <div>
          <label
            htmlFor="sample_data"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Sample Data Preview (JSON, optional)
          </label>
          <textarea
            id="sample_data"
            {...register("sample_data")}
            rows={6}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
            placeholder='{"key": "value", ...}'
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Cover Image (optional)
          </label>
          {previewUrl && (
            <div className="mb-4 relative inline-block">
              <img
                src={previewUrl}
                alt="Cover preview"
                className="max-w-full h-48 object-cover rounded-xl"
              />
              <button
                type="button"
                onClick={() => {
                  setCoverImage(null);
                  setPreviewUrl(null);
                }}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          )}
          <ImageCropper onImageChange={handleImageChange} />
        </div>

        <button
          type="submit"
          disabled={isSubmitting || uploading}
          className="w-full px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all font-medium shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {uploading ? "Uploading..." : isSubmitting ? "Submitting..." : "Submit Dataset"}
        </button>
      </form>
    </div>
  );
}

