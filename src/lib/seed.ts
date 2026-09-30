// Starting content, copied from the original site. Used only until the
// first save in the admin, after which the stored version takes over.
import type { Section } from './sections';
import type { Post, Settings } from './store';

const unsplash = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const defaultSettings: Settings = {
  siteName: 'Vivid by Rathi',
  seoDescription:
    'Personal colour analysis, style consultations and personal shopping in Sydney with certified image consultant Rathi.',
  footerText:
    'Empowering you to become the best version of yourself through personalised colour analysis and confidence-boosting style advice.',
  location: 'Sydney, NSW, Australia',
  locationNote: 'Serving Sydney and surrounding areas',
  phone: '',
  email: 'hello@vividbyrathi.com',
  hours: 'Mon – Fri: 9:00 AM – 6:00 PM\nSat: 10:00 AM – 4:00 PM\nEvening and weekend appointments available',
  instagram: '',
  facebook: '',
  linkedin: '',
  notifyEmail: '',
  theme: {
    primary: '#d0a07c',
    secondary: '#a5a989',
    accent: '#778d4e',
    background: '#fff8e6',
    surface: '#e2d9cf',
    text: '#374151',
    headingFont: 'Inter',
    bodyFont: 'Inter',
  },
};

let n = 0;
const id = () => `seed${++n}`;

export const defaultSections: Section[] = [
  {
    id: id(), type: 'hero', visible: true, anchor: 'home', navLabel: 'Home', background: 'hero',
    data: {
      heading: 'Welcome to',
      highlight: 'Vivid by Rathi',
      text: "I'm here to help you create the wardrobe of your dreams by empowering you with personal colour analysis and confidence-boosting style advice.",
      image: unsplash('1573496359142-b8d87734a5a2', 800, 800),
      primaryLabel: 'Book Free Consultation', primaryLink: '#contact',
      secondaryLabel: 'Learn More', secondaryLink: '#services',
    },
  },
  {
    id: id(), type: 'checklist', visible: true, anchor: 'stuck', navLabel: '', background: 'white',
    data: {
      heading: 'Stuck with your colour and style?',
      intro: 'Did you know that how you see and feel about yourself directly influences your self-esteem and confidence?',
      listTitle: 'DO YOU...',
      items: [
        'Struggle with putting outfits together?',
        'Feel unsure which colours flatter you?',
        'Confused about which styles suit you?',
        'Get frustrated shopping?',
      ],
      image: unsplash('1441986300917-64674bd600d8'),
      closing:
        'I hope your wardrobe is filled with clothes that you love and actually wear—items that bring you joy, empowerment, and clarity. Understanding colour analysis and how to style your unique body shape are powerful tools that help you show up as your most confident self.',
    },
  },
  {
    id: id(), type: 'cta', visible: true, anchor: 'invite', navLabel: '', background: 'accent',
    data: {
      heading: "You're invited...",
      text: "If you're not sure where to start, I'd love to gift you a free 20-minute Style Discovery session (valued at over $60) to help you gain greater insights into where your style is right now, where you would like it to be, and how you can get there.",
      buttonLabel: "YES, I'D LIKE A FREE CONSULTATION", buttonLink: '#contact',
    },
  },
  {
    id: id(), type: 'textImage', visible: true, anchor: 'about', navLabel: 'About', background: 'light',
    data: {
      heading: 'Your Colour Analysis & Style Expert',
      subheading: "Hi, I'm Rathi",
      text: [
        "I'm here to help you with your best colours and styles.",
        "I'm a certified image consultant based in Sydney, Australia. My passion is to empower men and women to become the best version of themselves to have more confidence, clarity, fun, and success!",
        'Each session is totally focused on you: creating personalised colour analysis, style, and wardrobing solutions, building a powerful and authentic personal brand that enhances all aspects of your appearance.',
        "I'd love to be on your team, serving as your image consultant, personal stylist, colour consultant, personal shopper, and makeover professional.",
      ].join('\n\n'),
      image: unsplash('1573496359142-b8d87734a5a2', 800, 800),
      imageSide: 'left',
      buttonLabel: "Let's Chat About Your Style", buttonLink: '#contact',
    },
  },
  {
    id: id(), type: 'services', visible: true, anchor: 'services', navLabel: 'Services', background: 'white',
    data: {
      heading: 'My Services',
      intro: 'Comprehensive image consulting services tailored to your unique style, personality, and lifestyle.',
      linkLabel: 'Learn More',
      items: [
        {
          title: 'Personal Colour Analysis',
          description: 'Discover your perfect colour palette that enhances your natural beauty and makes you glow with confidence.',
          features: ['Complete seasonal colour analysis', 'Personal colour swatch wallet', 'Makeup colour recommendations', 'Wardrobe colour audit'],
          image: unsplash('1522335789203-aabd1fc54bc9', 600, 400),
        },
        {
          title: 'Style Consultation',
          description: 'Develop your personal style that reflects your personality, lifestyle, and goals while flattering your unique body shape.',
          features: ['Body shape analysis', 'Personal style development', 'Outfit coordination techniques', 'Style guide creation'],
          image: unsplash('1445205170230-053b83016050', 600, 400),
        },
        {
          title: 'Wardrobe Organisation',
          description: 'Transform your closet into a curated collection of pieces you love, organised for easy outfit creation.',
          features: ['Complete wardrobe audit', 'Closet organisation system', 'Mix and match guide', 'Shopping list creation'],
          image: unsplash('1558618666-fcd25c85cd64', 600, 400),
        },
        {
          title: 'Personal Shopping',
          description: 'Save time and avoid costly mistakes with expert shopping guidance tailored to your style, budget, and needs.',
          features: ['Pre-shopping consultation', 'Personal shopping trips', 'Online shopping assistance', 'Budget optimisation'],
          image: unsplash('1567401893414-76b7b1e5a7a5', 600, 400),
        },
        {
          title: 'Virtual Consultations',
          description: 'Get expert image consulting from anywhere with comprehensive virtual sessions via Zoom.',
          features: ['Online colour analysis', 'Virtual wardrobe review', 'Digital style guide', 'Follow-up support'],
          image: unsplash('1587560699334-cc4ff634909a', 600, 400),
        },
        {
          title: 'Group Workshops',
          description: 'Fun, interactive workshops perfect for corporate teams, special events, or groups of friends.',
          features: ['Corporate style workshops', 'Group colour analysis', 'Team building events', 'Special occasion styling'],
          image: unsplash('1556909114-f6e7ad7d3136', 600, 400),
        },
      ],
    },
  },
  {
    id: id(), type: 'testimonials', visible: true, anchor: 'testimonials', navLabel: 'Testimonials', background: 'sand',
    data: {
      heading: 'What My Clients Say',
      intro: 'Real transformations from real people who discovered their confidence through style.',
      items: [
        { name: 'Sarah M.', role: 'Marketing Professional', quote: 'My online shopping experience with Rathi was perfect. Before meeting her, I was frustrated with trying to purchase items that would work together and fit my style. Rathi was able to make the shopping process easy and fun.' },
        { name: 'Louise K.', role: 'Business Owner', quote: 'I was so pleased with my consultation with Rathi - she got it exactly right with me. I was hoping to get out of my comfort zone and explore new looks and colours and she was spot on with all her suggestions.' },
        { name: 'Kathryn P.', role: 'Executive', quote: 'I highly recommend Rathi whether you are looking for help with identifying your best colours, de-cluttering your wardrobe, or going on a personal shopping trip. I was extremely impressed with her natural eye for style.' },
        { name: 'Zina B.', role: 'Teacher', quote: 'I found the colour analysis particularly useful and am thrilled with my new wardrobe! Never thought I could actually enjoy shopping, but Rathi made it so easy and effortless for me.' },
        { name: 'Nicole K.', role: 'Healthcare Professional', quote: 'I had the most enjoyable time with Rathi. It has only been 3 days and I have had compliments on my clothes already! She is so professional and personable and an expert in her field.' },
        { name: 'Heather K.', role: 'Remote Worker', quote: "Rathi's colour consultation via Zoom worked perfectly for me. I now understand why I've been drawn to certain colours and have some new ideas to help me choose outfits instead of wasting money on clothes I don't wear." },
      ],
    },
  },
  {
    id: id(), type: 'blog', visible: true, anchor: 'blog', navLabel: 'Blog', background: 'white',
    data: {
      heading: 'Latest Style Tips',
      intro: 'Stay updated with the latest fashion insights, style tips, and confidence-building advice.',
      count: 3, buttonLabel: 'View All Articles',
    },
  },
  {
    id: id(), type: 'newsletter', visible: true, anchor: 'newsletter', navLabel: '', background: 'secondary',
    data: {
      heading: 'Stay Stylish',
      text: 'Get fresh style tips, seasonal colour guides, and exclusive offers delivered to your inbox.',
      buttonLabel: 'Subscribe',
      successMessage: "Thank you for subscribing! You'll receive fresh style tips and exclusive offers.",
    },
  },
  {
    id: id(), type: 'contact', visible: true, anchor: 'contact', navLabel: 'Contact', background: 'light',
    data: {
      heading: "Let's Transform Your Style",
      intro: 'Ready to discover your best colours and create a wardrobe you love? Get in touch for your free consultation.',
      formTitle: 'Book Your Free Consultation',
      serviceOptions: ['Personal Colour Analysis', 'Style Consultation', 'Wardrobe Organisation', 'Personal Shopping', 'Virtual Consultation', 'Group Workshop'],
      buttonLabel: 'Book My Free Consultation',
      footnote: 'Free 20-minute consultation • No obligation • Personalised advice',
      successMessage: "Thank you for your interest! I'll be in touch within 24 hours to schedule your free consultation.",
    },
  },
];

export const defaultPosts: Post[] = [
  {
    id: 'seed-post-1', slug: 'how-to-choose-colours-that-make-you-glow', published: true, date: '2024-01-15',
    title: 'How to Choose Colours That Make You Glow',
    excerpt: 'Discover the secret to finding colours that enhance your natural beauty and boost your confidence every day.',
    image: unsplash('1434389677669-e08b4cac3105', 1200, 800),
    body: 'Discover the secret to finding colours that enhance your natural beauty and boost your confidence every day.\n\n*Full article coming soon.*',
  },
  {
    id: 'seed-post-2', slug: '5-wardrobe-essentials-every-woman-needs', published: true, date: '2024-01-10',
    title: '5 Wardrobe Essentials Every Woman Needs',
    excerpt: 'Build a capsule wardrobe with these timeless pieces that work for any occasion and never go out of style.',
    image: unsplash('1489987707025-afc232f7ea0f', 1200, 800),
    body: 'Build a capsule wardrobe with these timeless pieces that work for any occasion and never go out of style.\n\n*Full article coming soon.*',
  },
  {
    id: 'seed-post-3', slug: 'dressing-for-confidence-psychology-of-style', published: true, date: '2024-01-05',
    title: 'Dressing for Confidence: Psychology of Style',
    excerpt: 'Learn how your clothing choices impact your mindset and discover the power of dressing for success.',
    image: unsplash('1492447166138-50c3889fccb1', 1200, 800),
    body: 'Learn how your clothing choices impact your mindset and discover the power of dressing for success.\n\n*Full article coming soon.*',
  },
];
