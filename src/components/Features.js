import React from 'react'

export default function Features() {
  return (
    <div>
         <section className="py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Choose RebuildCV</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">The smartest way to optimize your resume for any job application</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="text-purple-500 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">ATS-Optimized Templates</h3>
                    <p className="text-gray-300">Every resume is designed to pass through Applicant Tracking Systems with ease.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="text-purple-500 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Keyword Optimization</h3>
                    <p className="text-gray-300">Our AI identifies and incorporates relevant keywords from the job description.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="text-purple-500 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">No Watermarks</h3>
                    <p className="text-gray-300">Paid plans come with watermark-free exports in multiple formats.</p>
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <ul className="space-y-6">
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="text-cyan-500 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Smart Content Tailoring</h3>
                    <p className="text-gray-300">Highlights your most relevant experience for each specific job application.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="text-cyan-500 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Instant Results</h3>
                    <p className="text-gray-300">Get your optimized resume in seconds, not hours or days.</p>
                  </div>
                </li>
                <li className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle className="text-cyan-500 w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xl mb-2">Multiple Export Options</h3>
                    <p className="text-gray-300">Download your resume as PDF, Word, or plain text formats.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
