import { Star } from "lucide-react";

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Sarah M.",
      role: "Marketing Professional",
      content: "My online shopping experience with Rathi was perfect. Before meeting her, I was frustrated with trying to purchase items that would work together and fit my style. Rathi was able to make the shopping process easy and fun.",
      initial: "S"
    },
    {
      name: "Louise K.",
      role: "Business Owner", 
      content: "I was so pleased with my consultation with Rathi - she got it exactly right with me. I was hoping to get out of my comfort zone and explore new looks and colours and she was spot on with all her suggestions.",
      initial: "L"
    },
    {
      name: "Kathryn P.",
      role: "Executive",
      content: "I highly recommend Rathi whether you are looking for help with identifying your best colours, de-cluttering your wardrobe, or going on a personal shopping trip. I was extremely impressed with her natural eye for style.",
      initial: "K"
    },
    {
      name: "Zina B.",
      role: "Teacher",
      content: "I found the colour analysis particularly useful and am thrilled with my new wardrobe! Never thought I could actually enjoy shopping, but Rathi made it so easy and effortless for me.",
      initial: "Z"
    },
    {
      name: "Nicole K.",
      role: "Healthcare Professional",
      content: "I had the most enjoyable time with Rathi. It has only been 3 days and I have had compliments on my clothes already! She is so professional and personable and an expert in her field.",
      initial: "N"
    },
    {
      name: "Heather K.",
      role: "Remote Worker",
      content: "Rathi's colour consultation via Zoom worked perfectly for me. I now understand why I've been drawn to certain colours and have some new ideas to help me choose outfits instead of wasting money on clothes I don't wear.",
      initial: "H"
    }
  ];

  return (
    <section id="testimonials" className="py-20 bg-desert-sand">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-reseda mb-6">What My Clients Say</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Real transformations from real people who discovered their confidence through style.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-white rounded-xl p-8 shadow-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-buff">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={16} fill="currentColor" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 mb-6 italic">
                "{testimonial.content}"
              </p>
              <div className="flex items-center">
                <div className="w-12 h-12 bg-buff rounded-full flex items-center justify-center text-white font-bold">
                  {testimonial.initial}
                </div>
                <div className="ml-4">
                  <p className="font-semibold text-reseda">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
