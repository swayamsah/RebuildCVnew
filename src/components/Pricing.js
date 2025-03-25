import React from 'react'
import { CheckCircle } from 'lucide-react';

export default function Pricing({ handleonchange }) {
  return (
    <div>
           <section id="pricing" className="py-20 bg-gradient-to-b from-gray-950 via-gray-900 to-gray-950 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">Simple, Transparent Pricing</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">Get started for free, upgrade only when you need more</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-gray-700 transition">
              <h3 className="text-xl font-bold mb-2 text-white">Free Trial</h3>
              <p className="mb-6 text-white">Try before you commit</p>
              <p className="text-4xl font-bold mb-6 text-white">$0</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="text-green-500 w-5 h-5" />
                  <span>1 Resume Optimization</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="text-green-500 w-5 h-5" />
                  <span>Basic ATS Template</span>
                </li>
                <li className="flex items-center gap-2 text-gray-200">
                  <CheckCircle className=" w-5 h-5 text-white" />
                  <span>PDF Download (with watermark)</span>
                </li>
              </ul>
              <button
                onClick={handleonchange}
                className="w-full py-3 rounded-lg border border-gray-700 hover:bg-gray-800 transition font-medium text-white"
              >
                Start Free Trial
              </button>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-purple-500/30 hover:border-purple-500/60 transition transform scale-105 shadow-lg shadow-purple-500/10 relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-cyan-500 text-white text-sm font-medium px-4 py-1 rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-bold mb-2 text-white">Monthly</h3>
              <p className="text-gray-300 mb-6">Perfect for active job seekers</p>
              <p className="text-4xl font-bold mb-6 text-white">$19<span className="text-xl font-normal text-gray-400">/month</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="text-green-500 w-5 h-5" />
                  <span>Unlimited Resume Optimizations</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="text-green-500 w-5 h-5" />
                  <span>All Premium ATS Templates</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="text-green-500 w-5 h-5" />
                  <span>No Watermarks</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="text-green-500 w-5 h-5" />
                  <span>PDF, Word & Text Exports</span>
                </li>
                <li className="flex items-center gap-2 text-white">
                  <CheckCircle className="text-green-500 w-5 h-5" />
                  <span>Cover Letter Generator</span>
                </li>
              </ul>
              <button className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-cyan-500 text-white font-medium hover:shadow-lg hover:shadow-purple-500/20 transition">
                Get Started
              </button>
            </div>
            
            <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-cyan-500/50 transition text-white">
              <h3 className="text-xl font-bold mb-2">Annual</h3>
              <p className="text-gray-300 mb-6">Best value for serious candidates</p>
              <p className="text-4xl font-bold mb-6">$99<span className="text-xl font-normal text-gray-400">/year</span></p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 w-5 h-5" />
                  <span>Everything in Monthly Plan</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 w-5 h-5" />
                  <span>LinkedIn Profile Optimization</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 w-5 h-5" />
                  <span>Interview Question Prep</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 w-5 h-5" />
                  <span>Priority Email Support</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="text-green-500 w-5 h-5" />
                  <span>Save 56% vs. Monthly</span>
                </li>
              </ul>
              <button className="w-full py-3 rounded-lg border border-cyan-700 bg-cyan-900/30 hover:bg-cyan-900/50 transition font-medium">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
