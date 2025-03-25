import React from "react";
import { Upload, Briefcase, FileText } from "lucide-react";

export default function Howitwork() {
  return (
    <div>
      <section id="features" className="py-20 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-900/10 to-transparent"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">
              How RebuildCV Works
            </h2>
            <p className="text-xl text-gray-100 max-w-3xl mx-auto">
              Three simple steps to create your perfect, job-winning resume
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-700 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-purple-500/50 transition group">
              <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-6 group-hover:bg-purple-800/50 transition">
                <Upload className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Upload Your Resume</h3>
              <p className="text-white">
                Upload your existing resume in PDF or Word format, or input your
                information manually.
              </p>
            </div>

            <div className="bg-gray-700 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-cyan-500/50 transition group">
              <div className="w-16 h-16 rounded-full bg-cyan-900/30 flex items-center justify-center mb-6 group-hover:bg-cyan-800/50 transition">
                <Briefcase className="text-cyan-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">Select Your Target Job</h3>
              <p className="text-white">
                Paste the job description or select the position and company
                you're applying to.
              </p>
            </div>

            <div className="bg-gray-700 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-purple-500/50 transition group">
              <div className="w-16 h-16 rounded-full bg-purple-900/30 flex items-center justify-center mb-6 group-hover:bg-purple-800/50 transition">
                <FileText className="text-purple-400" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-white">
                Get Your Optimized Resume
              </h3>
              <p className="text-white">
                Our AI tailors your resume to highlight relevant skills and
                experience for your target job.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
