import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import { FileText, CheckCircle2, Rocket, Sparkles, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const LandingHero = () => {
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8 } },
  };

  const stagger = {
    visible: { transition: { staggerChildren: 0.3 } },
  };

  return (
    <main className="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-inter">
      {/* Hero Section */}
      <section className="w-full py-32 px-8 bg-gradient-to-br from-blue-50 to-gray-50 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <svg viewBox="0 0 1440 320" className="w-full h-full">
            <path fill="#3b82f6" d="M0,224L48,213.3C96,203,192,181,288,170.7C384,160,480,160,576,149.3C672,139,768,117,864,122.7C960,128,1056,160,1152,176C1248,192,1344,192,1392,192L1440,192L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path>
          </svg>
        </div>
        <div className="max-w-7xl mx-auto text-center relative">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-8 text-gray-900" variants={fadeInUp}>
              Land Your Dream Job with <span className="text-blue-500">AI-Powered Resume Analysis</span>
            </motion.h1>
            <motion.p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto mb-12" variants={fadeInUp}>
              Optimize your resume, match it to job postings, and get tailored suggestions to boost your interview chances—all in seconds.
            </motion.p>
            <motion.div className="flex gap-6 justify-center" variants={fadeInUp}>
              <Button asChild className="px-12 py-4 bg-blue-500 text-white rounded-xl text-lg font-semibold flex items-center gap-3 hover:bg-blue-600">
                <Link to="/dashboard">Get Started Free <ArrowRight className="h-6 w-6" /></Link>
              </Button>
              <Button asChild className="px-12 py-4 bg-transparent border-2 border-blue-500 text-blue-500 rounded-xl text-lg font-semibold hover:bg-blue-50">
                <Link to="/pricing">See Pricing</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-gray-900">Why Choose Us?</h2>
          <p className="text-xl text-gray-600 mb-16">Powerful features to help you stand out in the job market.</p>
          <motion.div className="grid md:grid-cols-3 gap-12" variants={stagger} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            {[
              {
                icon: <FileText className="h-12 w-12 text-blue-500" />,
                title: "Smart Resume Analysis",
                desc: "Get detailed feedback on your resume’s clarity, structure, and relevance to your target role.",
              },
              {
                icon: <CheckCircle2 className="h-12 w-12 text-blue-500" />,
                title: "Job Match Insights",
                desc: "Compare your resume against job postings to identify gaps and optimize for keywords.",
              },
              {
                icon: <Rocket className="h-12 w-12 text-blue-500" />,
                title: "Actionable Suggestions",
                desc: "Receive AI-driven tips tailored to your industry and role to improve your chances.",
              },
            ].map((f, i) => (
              <motion.div key={i} className="p-8 bg-gray-50 rounded-xl shadow-lg hover:scale-105 transition-transform" variants={fadeInUp}>
                <div className="mb-6">{f.icon}</div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-900">{f.title}</h3>
                <p className="text-lg text-gray-600">{f.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-32 px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-gray-900">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: "Upload Your Resume", desc: "Simply drag and drop your resume to get started with the analysis." },
              { step: "Match with Jobs", desc: "Paste a job posting URL to see how well your resume aligns with the role." },
              { step: "Optimize & Apply", desc: "Use AI suggestions to improve your resume and apply with confidence." },
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-6 p-8 bg-white rounded-xl shadow-md">
                <div className="text-4xl font-bold text-blue-500 flex-shrink-0">{`0${i + 1}`}</div>
                <div>
                  <h3 className="text-2xl font-semibold mb-3 text-gray-900">{item.step}</h3>
                  <p className="text-lg text-gray-600">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-32 px-8 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-16 text-gray-900">What Our Users Say</h2>
          <div className="grid md:grid-cols-2 gap-8">
            {[
              { quote: "This tool helped me revamp my resume and land interviews within a week!", author: "Sarah M., Software Engineer" },
              { quote: "The job matching feature is a game-changer. I knew exactly what to improve!", author: "James T., Marketing Manager" },
            ].map((t, i) => (
              <div key={i} className="p-10 bg-gray-50 rounded-xl shadow-md">
                <Sparkles className="h-8 w-8 text-amber-500 mb-6" />
                <p className="text-xl text-gray-600 mb-6">{t.quote}</p>
                <p className="text-lg font-semibold text-blue-500">{t.author}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-8 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Boost Your Job Search?</h2>
        <p className="text-xl mb-12 max-w-3xl mx-auto">
          Start for free today and take the first step toward landing your dream job.
        </p>
        <Button asChild className="px-12 py-4 bg-white text-blue-500 rounded-xl text-lg font-semibold flex items-center gap-3 mx-auto hover:bg-gray-100">
          <Link to="/dashboard">Get Started Now <ArrowRight className="h-6 w-6" /></Link>
        </Button>
      </section>
    </main>
  );
};

export default LandingHero;