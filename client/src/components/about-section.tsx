export default function AboutSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="about" className="py-20 bg-champagne">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=800" 
              alt="Rathi - Sydney professional image consultant" 
              className="rounded-2xl shadow-xl w-full"
            />
          </div>
          <div>
            <div className="mb-8">
              <h2 className="text-3xl sm:text-4xl font-bold text-reseda mb-4">Your Colour Analysis & Style Expert</h2>
              <h3 className="text-2xl font-semibold text-buff mb-6">Hi, I'm Rathi</h3>
            </div>
            
            <div className="space-y-4 text-lg text-gray-700">
              <p>
                I'm here to help you with your best colours and styles.
              </p>
              <p>
                I'm a certified image consultant based in Sydney, Australia. My passion is to empower men and women to become the best version of themselves to have more confidence, clarity, fun, and success!
              </p>
              <p>
                Each session is totally focused on you: creating personalised colour analysis, style, and wardrobing solutions, building a powerful and authentic personal brand that enhances all aspects of your appearance.
              </p>
              <p>
                I'd love to be on your team, serving as your image consultant, personal stylist, colour consultant, personal shopper, and makeover professional.
              </p>
            </div>

            <div className="mt-8">
              <button
                onClick={() => scrollToSection('contact')}
                className="bg-buff text-white px-6 py-3 rounded-lg hover:bg-sage transition-colors duration-200 font-semibold"
              >
                Let's Chat About Your Style
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
