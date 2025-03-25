import React from 'react';
import { Star } from 'lucide-react';

const Testimonials: React.FC = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-900/10 to-transparent"></div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-white">What Our Users Say</h2>
          <p className="text-xl max-w-3xl mx-auto text-white">Join thousands of job seekers who&apos;ve landed their dream jobs</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-purple-500/50 transition">
            <div className="flex gap-1 mb-4">
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
            </div>
            <p className="mb-6 text-white">&quot;After 3 months of job searching with no responses, I used RebuildCV to optimize my resume. Within a week, I had 5 interview requests!&quot;</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-lg font-bold">M</div>
              <div>
                <p className="font-medium text-white">Michael S.</p>
                <p className="text-sm text-white">Software Engineer</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-cyan-500/50 transition">
            <div className="flex gap-1 mb-4">
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
            </div>
            <p className="mb-6 text-white">&quot;The keyword optimization feature is a game-changer. I was able to tailor my resume perfectly for each application without spending hours rewriting it.&quot;</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-lg font-bold">J</div>
              <div>
                <p className="font-medium text-white">Jennifer L.</p>
                <p className="text-sm text-white">Marketing Director</p>
              </div>
            </div>
          </div>
          
          <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-xl border border-gray-800 hover:border-purple-500/50 transition">
            <div className="flex gap-1 mb-4">
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
              <Star className="text-yellow-500 w-5 h-5 fill-yellow-500" />
            </div>
            <p className="mb-6 text-white">&quot;As a career changer, I struggled to highlight my transferable skills. RebuildCV made it simple to showcase my relevant experience for new roles.&quot;</p>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-500 flex items-center justify-center text-lg font-bold">A</div>
              <div>
                <p className="font-medium text-white">Alex T.</p>
                <p className="text-sm text-white">Project Manager</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
