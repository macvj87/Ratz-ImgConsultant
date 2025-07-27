import { ArrowRight } from "lucide-react";

export default function ServicesSection() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const services = [
    {
      title: "Personal Colour Analysis",
      description: "Discover your perfect colour palette that enhances your natural beauty and makes you glow with confidence.",
      features: [
        "Complete seasonal colour analysis",
        "Personal colour swatch wallet",
        "Makeup colour recommendations",
        "Wardrobe colour audit"
      ],
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
    },
    {
      title: "Style Consultation",
      description: "Develop your personal style that reflects your personality, lifestyle, and goals while flattering your unique body shape.",
      features: [
        "Body shape analysis",
        "Personal style development",
        "Outfit coordination techniques",
        "Style guide creation"
      ],
      image: "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
    },
    {
      title: "Wardrobe Organization",
      description: "Transform your closet into a curated collection of pieces you love, organized for easy outfit creation.",
      features: [
        "Complete wardrobe audit",
        "Closet organization system",
        "Mix and match guide",
        "Shopping list creation"
      ],
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
    },
    {
      title: "Personal Shopping",
      description: "Save time and avoid costly mistakes with expert shopping guidance tailored to your style, budget, and needs.",
      features: [
        "Pre-shopping consultation",
        "Personal shopping trips",
        "Online shopping assistance",
        "Budget optimization"
      ],
      image: "https://images.unsplash.com/photo-1567401893414-76b7b1e5a7a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
    },
    {
      title: "Virtual Consultations",
      description: "Get expert image consulting from anywhere with comprehensive virtual sessions via Zoom.",
      features: [
        "Online colour analysis",
        "Virtual wardrobe review",
        "Digital style guide",
        "Follow-up support"
      ],
      image: "https://images.unsplash.com/photo-1587560699334-cc4ff634909a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
    },
    {
      title: "Group Workshops",
      description: "Fun, interactive workshops perfect for corporate teams, special events, or groups of friends.",
      features: [
        "Corporate style workshops",
        "Group colour analysis",
        "Team building events",
        "Special occasion styling"
      ],
      image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-reseda mb-6">My Services</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Comprehensive image consulting services tailored to your unique style, personality, and lifestyle.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div key={index} className="bg-champagne rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-200">
              <img 
                src={service.image} 
                alt={service.title} 
                className="rounded-lg mb-6 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-bold text-reseda mb-4">{service.title}</h3>
              <p className="text-gray-700 mb-6">
                {service.description}
              </p>
              <ul className="text-sm text-gray-600 space-y-2 mb-6">
                {service.features.map((feature, featureIndex) => (
                  <li key={featureIndex}>• {feature}</li>
                ))}
              </ul>
              <button
                onClick={() => scrollToSection('contact')}
                className="text-buff font-semibold hover:text-sage transition-colors duration-200 flex items-center"
              >
                Learn More <ArrowRight size={16} className="ml-1" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
