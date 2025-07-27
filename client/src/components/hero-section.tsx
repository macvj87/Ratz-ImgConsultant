export default function HeroSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="relative bg-gradient-to-br from-champagne to-desert-sand py-20 lg:py-32">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="order-2 lg:order-1">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-reseda leading-tight mb-6">
              Welcome to<br />
              <span className="text-buff">Vivid by Rathi</span>
            </h1>
            <p className="text-xl text-gray-700 mb-8 leading-relaxed">
              I'm here to help you create the wardrobe of your dreams by empowering you with personal colour analysis and confidence-boosting style advice.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-buff text-white px-8 py-4 rounded-lg hover:bg-sage transition-all duration-200 text-lg font-semibold text-center shadow-lg hover:shadow-xl"
              >
                Book Free Consultation
              </button>
              <button
                onClick={() => scrollToSection('services')}
                className="border-2 border-buff text-buff px-8 py-4 rounded-lg hover:bg-buff hover:text-white transition-all duration-200 text-lg font-semibold text-center"
              >
                Learn More
              </button>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800" 
              alt="Rathi - Professional Image Consultant" 
              className="rounded-2xl shadow-2xl w-full max-w-md mx-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
