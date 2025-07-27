import { Instagram, Facebook, Linkedin } from "lucide-react";

export default function Footer() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-reseda text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Vivid by Rathi</h3>
            <p className="text-champagne mb-6 max-w-md">
              Empowering you to become the best version of yourself through personalized color analysis and confidence-boosting style advice.
            </p>
            <div className="flex space-x-4">
              <button className="bg-buff p-2 rounded hover:bg-sage transition-colors duration-200">
                <Instagram size={20} />
              </button>
              <button className="bg-buff p-2 rounded hover:bg-sage transition-colors duration-200">
                <Facebook size={20} />
              </button>
              <button className="bg-buff p-2 rounded hover:bg-sage transition-colors duration-200">
                <Linkedin size={20} />
              </button>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-champagne">
              <li>
                <button
                  onClick={() => scrollToSection('about')}
                  className="hover:text-white transition-colors duration-200"
                >
                  About Rathi
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Services
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('testimonials')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Testimonials
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('blog')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Style Blog
                </button>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-champagne">
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Colour Analysis
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Style Consultation
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Wardrobe Organization
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollToSection('services')}
                  className="hover:text-white transition-colors duration-200"
                >
                  Personal Shopping
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-sage mt-8 pt-8 text-center text-champagne">
          <p>&copy; 2024 Vivid by Rathi. All rights reserved. | Sydney, NSW, Australia</p>
        </div>
      </div>
    </footer>
  );
}
