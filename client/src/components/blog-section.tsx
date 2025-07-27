import { Calendar, ArrowRight } from "lucide-react";

export default function BlogSection() {
  const blogPosts = [
    {
      title: "How to Choose Colors That Make You Glow",
      excerpt: "Discover the secret to finding colors that enhance your natural beauty and boost your confidence every day.",
      date: "January 15, 2024",
      image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
    },
    {
      title: "5 Wardrobe Essentials Every Woman Needs",
      excerpt: "Build a capsule wardrobe with these timeless pieces that work for any occasion and never go out of style.",
      date: "January 10, 2024",
      image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
    },
    {
      title: "Dressing for Confidence: Psychology of Style",
      excerpt: "Learn how your clothing choices impact your mindset and discover the power of dressing for success.",
      date: "January 5, 2024",
      image: "https://images.unsplash.com/photo-1492447166138-50c3889fccb1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=400"
    }
  ];

  return (
    <section id="blog" className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-reseda mb-6">Latest Style Tips</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Stay updated with the latest fashion insights, style tips, and confidence-building advice.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <article key={index} className="bg-champagne rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-200">
              <img 
                src={post.image} 
                alt={post.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar size={16} className="mr-2" />
                  <span>{post.date}</span>
                </div>
                <h3 className="text-xl font-bold text-reseda mb-3">{post.title}</h3>
                <p className="text-gray-700 mb-4">
                  {post.excerpt}
                </p>
                <button className="text-buff font-semibold hover:text-sage transition-colors duration-200 flex items-center">
                  Read More <ArrowRight size={16} className="ml-1" />
                </button>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="bg-buff text-white px-8 py-3 rounded-lg hover:bg-sage transition-colors duration-200 font-semibold">
            View All Articles
          </button>
        </div>
      </div>
    </section>
  );
}
