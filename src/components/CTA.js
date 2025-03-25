import React from "react";

export default function CTA() {
  return (
    <div>
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-cyan-900/20"></div>
        <div className="absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-gray-900 to-transparent"></div>
        <div className="absolute inset-x-0 bottom-0 h-96 bg-gradient-to-t from-gray-900 to-transparent"></div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-gray-900/70 backdrop-blur-lg p-12 rounded-2xl border border-gray-800">
            <h2 className="text-3xl sm:text-4xl font-bold mb-6">
              Ready to Land Your Dream Job?
            </h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of successful job seekers who've optimized their
              resumes with RebuildCV
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="px-8 py-4 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium text-lg hover:shadow-lg hover:shadow-purple-500/20 transition"
            >
              Try RebuildCV for Free
            </button>
            <p className="mt-4 text-gray-400">
              No credit card required. One free resume optimization.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
