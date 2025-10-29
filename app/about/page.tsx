import type { Metadata } from "next";
import Footer from "@/components/Footer";
import { Heart, Users, Database, Globe, Shield, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export const metadata: Metadata = {
  title: "About - OMeD",
  description: "Learn about OMeD - Open Medical Datasets platform",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
            About OMeD
          </h1>
          <p className="text-xl text-gray-600">
            Open Medical Datasets - Empowering Healthcare Research Worldwide
          </p>
        </div>

        <div className="space-y-8 mb-12">
          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Mission</h2>
            <p className="text-gray-600 leading-relaxed">
              OMeD (Open Medical Datasets) is a comprehensive platform dedicated to discovering, 
              sharing, and accessing real-world, open, and free medical datasets from around the globe. 
              We believe that open access to medical data is essential for advancing healthcare research, 
              improving patient outcomes, and driving innovation in the medical field.
            </p>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">What We Offer</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <CardContent className="p-0">
                  <Database className="w-8 h-8 text-blue-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Curated Datasets</h3>
                  <p className="text-gray-600">
                    Access a diverse collection of medical datasets across multiple specialties including 
                    cardiology, neurology, oncology, and more.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="p-0">
                  <Users className="w-8 h-8 text-purple-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Community Driven</h3>
                  <p className="text-gray-600">
                    Our platform is built by and for the research community. Share your datasets 
                    and help others discover valuable resources.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="p-0">
                  <Globe className="w-8 h-8 text-pink-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Open Access</h3>
                  <p className="text-gray-600">
                    All datasets featured on OMeD are open and free to access, promoting 
                    transparency and collaboration in medical research.
                  </p>
                </CardContent>
              </Card>

              <Card className="p-6">
                <CardContent className="p-0">
                  <Shield className="w-8 h-8 text-green-500 mb-4" />
                  <h3 className="text-xl font-semibold mb-2">Quality Assured</h3>
                  <p className="text-gray-600">
                    All dataset submissions are reviewed by moderators to ensure quality, 
                    accuracy, and relevance for researchers.
                  </p>
                </CardContent>
              </Card>
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Get Involved</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Submit Datasets</h3>
                  <p className="text-gray-600">
                    Have a medical dataset to share? Submit it to our platform and help 
                    researchers worldwide discover valuable resources.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Contribute to Reviews</h3>
                  <p className="text-gray-600">
                    Join our moderator team and help maintain the quality of datasets 
                    on the platform.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-blue-500 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Spread the Word</h3>
                  <p className="text-gray-600">
                    Help grow our community by sharing OMeD with fellow researchers, 
                    clinicians, and data scientists.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8 border border-blue-100">
            <div className="text-center">
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-800 mb-3">
                Join the OMeD Community
              </h2>
              <p className="text-gray-600 mb-6">
                Together, we can build a more open, accessible, and collaborative future for 
                medical research. Your contributions make a difference.
              </p>
              <div className="flex gap-4 justify-center">
                <a
                  href="/submit"
                  className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl hover:from-blue-600 hover:to-purple-700 transition-all font-semibold shadow-lg hover:shadow-xl"
                >
                  Submit Dataset
                </a>
                <a
                  href="/datasets"
                  className="px-6 py-3 bg-white text-gray-700 rounded-xl border border-gray-300 hover:bg-gray-50 transition-all font-semibold shadow-md hover:shadow-lg"
                >
                  Browse Datasets
                </a>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

