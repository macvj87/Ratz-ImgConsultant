import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import AboutSection from "@/components/about-section";
import ServicesSection from "@/components/services-section";
import TestimonialsSection from "@/components/testimonials-section";
import BlogSection from "@/components/blog-section";
import NewsletterSignup from "@/components/newsletter-signup";
import ContactSection from "@/components/contact-section";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-champagne">
      <Navigation />
      <main>
        <HeroSection />
        <section className="py-20 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-reseda mb-6">Stuck with your colour and style?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Did you know that how you see and feel about yourself directly influences your self-esteem and confidence?
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
              <div>
                <h3 className="text-2xl font-bold text-reseda mb-8">DO YOU...</h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-4">
                    <span className="text-buff text-xl">▶</span>
                    <p className="text-lg text-gray-700">Struggle with putting outfits together?</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <span className="text-buff text-xl">▶</span>
                    <p className="text-lg text-gray-700">Feel unsure which colours flatter you?</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <span className="text-buff text-xl">▶</span>
                    <p className="text-lg text-gray-700">Confused about which styles suit you?</p>
                  </div>
                  <div className="flex items-start space-x-4">
                    <span className="text-buff text-xl">▶</span>
                    <p className="text-lg text-gray-700">Get frustrated shopping?</p>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                  alt="Fashion styling consultation session" 
                  className="rounded-xl shadow-lg w-full"
                />
              </div>
            </div>

            <div className="mt-16 text-center">
              <p className="text-lg text-gray-700 mb-8 max-w-4xl mx-auto">
                I hope your wardrobe is filled with clothes that you love and actually wear—items that bring you joy, empowerment, and clarity. Understanding colour analysis and how to style your unique body shape are powerful tools that help you show up as your most confident self.
              </p>
            </div>
          </div>
        </section>
        
        <section className="py-20 bg-gradient-to-r from-sage to-reseda">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">You're invited...</h2>
            <p className="text-xl text-champagne mb-8 max-w-3xl mx-auto">
              If you're not sure where to start, I'd love to gift you a free 20-minute Style Discovery session (valued at over $60) to help you gain greater insights into where your style is right now, where you would like it to be, and how you can get there.
            </p>
            <a 
              href="#contact" 
              className="bg-champagne text-reseda px-8 py-4 rounded-lg hover:bg-white transition-all duration-200 text-lg font-semibold inline-block shadow-lg hover:shadow-xl"
            >
              YES, I'D LIKE A FREE CONSULTATION
            </a>
          </div>
        </section>

        <AboutSection />
        <ServicesSection />
        <TestimonialsSection />
        <BlogSection />
        <NewsletterSignup />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
