// Starting content, copied from the original site. Used only until the
// first save in the admin, after which the stored version takes over.
import type { Section } from './sections';
import type { Post, Settings } from './store';

const unsplash = (id: string, w = 800, h = 600) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&h=${h}&q=80`;

export const defaultSettings: Settings = {
  siteName: 'Vivid by Rathi',
  seoTitle: 'Colour Analysis & Personal Stylist Sydney | Vivid by Rathi',
  seoDescription:
    'Colour analysis, style consultations and personal shopping in Sydney, and online Australia-wide, with certified image consultant Rathi. Book a free chat.',
  footerText:
    'Personal colour analysis, style consultations, wardrobe edits and personal shopping with a certified image consultant. In person in Sydney and online Australia-wide.',
  location: 'Sydney, NSW, Australia',
  locationNote: 'In-person appointments across Sydney, online consultations Australia-wide',
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
      heading: 'Personal Colour Analysis & Styling',
      highlight: 'in Sydney & Australia-wide',
      text: "I'm Rathi, a certified image consultant and personal stylist based in Sydney. Discover the colours and styles that suit you, and build a wardrobe you love wearing, in person in Sydney or online anywhere in Australia.",
      image: unsplash('1573496359142-b8d87734a5a2', 800, 800),
      primaryLabel: 'Book a Free Consultation', primaryLink: '#contact',
      secondaryLabel: 'View Services', secondaryLink: '#services',
    },
  },
  {
    id: id(), type: 'checklist', visible: true, anchor: 'stuck', navLabel: '', background: 'white',
    data: {
      heading: 'Not sure which colours and styles suit you?',
      intro: 'How you see and feel about yourself directly influences your self-esteem and confidence. The right colours and a style that fits your body shape and lifestyle make getting dressed simple.',
      listTitle: 'DO YOU...',
      items: [
        'Struggle to put outfits together?',
        'Feel unsure which colours suit your skin tone?',
        'Wonder which styles flatter your body shape?',
        'Have a full wardrobe and nothing to wear?',
        'Get frustrated shopping for clothes, in store or online?',
      ],
      image: unsplash('1441986300917-64674bd600d8'),
      closing:
        'Your wardrobe should be filled with clothes you love and actually wear. A personal colour analysis and a style consultation built around your body shape are practical tools that help you show up as your most confident self, at work, at home and everywhere in between.',
    },
  },
  {
    id: id(), type: 'cta', visible: true, anchor: 'invite', navLabel: '', background: 'accent',
    data: {
      heading: 'Free 20-minute Style Discovery session',
      text: "Not sure where to start? I'd love to gift you a free 20-minute Style Discovery session (valued at over $60). We'll talk about where your style is right now, where you'd like it to be and how to get there. Available in Sydney or online anywhere in Australia.",
      buttonLabel: 'BOOK MY FREE CONSULTATION', buttonLink: '#contact',
    },
  },
  {
    id: id(), type: 'textImage', visible: true, anchor: 'about', navLabel: 'About', background: 'light',
    data: {
      heading: 'Your Sydney Image Consultant & Personal Stylist',
      subheading: "Hi, I'm Rathi",
      text: [
        "I'm a certified image consultant based in Sydney, Australia, and I help men and women find their best colours and styles.",
        'My passion is to empower you to become the best version of yourself, with more confidence, clarity, fun and success.',
        'Each session is totally focused on you: personalised colour analysis, style and wardrobe solutions that build a powerful, authentic personal brand and enhance every aspect of your appearance.',
        "I'd love to be on your team as your image consultant, personal stylist, colour consultant, personal shopper and makeover professional, whether we meet in Sydney or online from anywhere in Australia.",
      ].join('\n\n'),
      image: unsplash('1573496359142-b8d87734a5a2', 800, 800),
      imageSide: 'left',
      buttonLabel: "Let's Chat About Your Style", buttonLink: '#contact',
    },
  },
  {
    id: id(), type: 'services', visible: true, anchor: 'services', navLabel: 'Services', background: 'white',
    data: {
      heading: 'Colour Analysis & Personal Styling Services',
      intro: 'Image consulting services in Sydney and online across Australia, tailored to your colouring, body shape, personality and lifestyle.',
      linkLabel: 'Enquire Now',
      items: [
        {
          title: 'Personal Colour Analysis',
          description: 'Find your seasonal colour palette and the shades that suit your skin tone, hair and eyes, so everything you wear makes you glow.',
          features: ['Complete seasonal colour analysis', 'Personal colour swatch wallet', 'Makeup colour recommendations', 'Wardrobe colour audit'],
          image: unsplash('1522335789203-aabd1fc54bc9', 600, 400),
        },
        {
          title: 'Personal Style Consultation',
          description: 'Define a personal style that reflects your personality, lifestyle and goals, and learn how to dress for your body shape.',
          features: ['Body shape analysis', 'Personal style development', 'Outfit coordination techniques', 'Style guide creation'],
          image: unsplash('1445205170230-053b83016050', 600, 400),
        },
        {
          title: 'Wardrobe Edit & Organisation',
          description: 'Turn your wardrobe into a curated collection of pieces you love, decluttered and organised so outfits come together easily.',
          features: ['Complete wardrobe audit', 'Wardrobe organisation system', 'Mix and match outfit guide', 'Shopping list creation'],
          image: unsplash('1558618666-fcd25c85cd64', 600, 400),
        },
        {
          title: 'Personal Shopping',
          description: 'Shop with a personal stylist. Save time and avoid costly mistakes with expert guidance matched to your style, budget and needs.',
          features: ['Pre-shopping consultation', 'Personal shopping trips in Sydney', 'Online shopping assistance', 'Budget optimisation'],
          image: unsplash('1567401893414-76b7b1e5a7a5', 600, 400),
        },
        {
          title: 'Online Colour & Style Consultations',
          description: 'Work with an image consultant from anywhere in Australia. Virtual colour analysis and styling sessions run over Zoom.',
          features: ['Online colour analysis', 'Virtual wardrobe review', 'Digital style guide', 'Follow-up support'],
          image: unsplash('1587560699334-cc4ff634909a', 600, 400),
        },
        {
          title: 'Group & Corporate Style Workshops',
          description: 'Fun, interactive colour and style workshops for corporate teams, special events or groups of friends.',
          features: ['Corporate style workshops', 'Group colour analysis', 'Team building events', 'Special occasion styling'],
          image: unsplash('1556909114-f6e7ad7d3136', 600, 400),
        },
      ],
    },
  },
  {
    id: id(), type: 'testimonials', visible: true, anchor: 'testimonials', navLabel: 'Testimonials', background: 'sand',
    data: {
      heading: 'Client Reviews',
      intro: 'What clients say about their colour analysis, style consultations and personal shopping with Rathi.',
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
    id: id(), type: 'faq', visible: true, anchor: 'faq', navLabel: '', background: 'light',
    data: {
      heading: 'Colour Analysis & Styling FAQs',
      intro: 'Common questions about working with a personal stylist and colour consultant in Sydney or online.',
      items: [
        {
          question: 'What is a personal colour analysis?',
          answer: 'A personal colour analysis identifies the colours that work best with your natural skin tone, hair and eye colour. You leave knowing your seasonal colour palette, so choosing clothes, makeup and accessories that flatter you becomes much easier.',
        },
        {
          question: 'Do you offer online colour analysis and styling across Australia?',
          answer: "Yes. Virtual consultations run over Zoom, so you can book from anywhere in Australia, including Melbourne, Brisbane, Perth, Adelaide, Canberra, Hobart, Darwin and regional areas. Online sessions cover colour analysis, wardrobe reviews and style advice, with a digital style guide and follow-up support.",
        },
        {
          question: 'Where are in-person appointments available?',
          answer: "I'm based in Sydney, NSW, and see clients in person across Sydney and surrounding areas. Get in touch to arrange a time and place that suits you.",
        },
        {
          question: 'Do you work with men as well as women?',
          answer: 'Yes. I work with both men and women on colour analysis, personal style, wardrobe planning and personal shopping.',
        },
        {
          question: 'What does an image consultant do?',
          answer: 'An image consultant helps you look and feel your best through colour analysis, body shape and style advice, wardrobe organisation and personal shopping. The goal is a wardrobe that suits you and a personal brand that feels authentic.',
        },
        {
          question: 'How do I get started?',
          answer: "Book a free 20-minute Style Discovery session using the form below. We'll talk through your style goals and I'll recommend the service that fits you best. There's no obligation.",
        },
      ],
    },
  },
  {
    id: id(), type: 'blog', visible: true, anchor: 'blog', navLabel: 'Blog', background: 'white',
    data: {
      heading: 'Style Tips & Colour Advice',
      intro: 'Colour analysis guides, wardrobe advice and confidence-building style tips from a Sydney personal stylist.',
      count: 3, buttonLabel: 'View All Articles',
    },
  },
  {
    id: id(), type: 'newsletter', visible: true, anchor: 'newsletter', navLabel: '', background: 'secondary',
    data: {
      heading: 'Style Tips in Your Inbox',
      text: 'Get fresh style tips, seasonal colour guides for the Australian seasons and exclusive offers delivered to your inbox.',
      buttonLabel: 'Subscribe',
      successMessage: "Thank you for subscribing! You'll receive fresh style tips and exclusive offers.",
    },
  },
  {
    id: id(), type: 'contact', visible: true, anchor: 'contact', navLabel: 'Contact', background: 'light',
    data: {
      heading: 'Book Your Colour Analysis or Style Consultation',
      intro: 'Ready to discover your best colours and build a wardrobe you love? Get in touch for a free consultation, in person in Sydney or online anywhere in Australia.',
      formTitle: 'Book Your Free Consultation',
      serviceOptions: ['Personal Colour Analysis', 'Personal Style Consultation', 'Wardrobe Edit & Organisation', 'Personal Shopping', 'Online Colour & Style Consultation', 'Group or Corporate Workshop'],
      buttonLabel: 'Book My Free Consultation',
      footnote: 'Free 20-minute consultation • No obligation • Sydney & Australia-wide',
      successMessage: "Thank you for your interest! I'll be in touch within 24 hours to schedule your free consultation.",
    },
  },
];

const bookingLine = 'Ready for personal advice? [Book a free 20-minute Style Discovery session](/#contact), in person in Sydney or online anywhere in Australia.';

export const defaultPosts: Post[] = [
  {
    id: 'seed-post-1', slug: 'how-to-choose-colours-that-make-you-glow', published: true, date: '2024-01-15',
    title: 'How to Choose Colours That Suit You and Make You Glow',
    excerpt: 'How to tell which colours suit your skin tone, what a seasonal colour analysis involves, and simple ways to start wearing your best shades.',
    image: unsplash('1434389677669-e08b4cac3105', 1200, 800),
    body: [
      "Have you ever put on a top and been told you look tired, then worn a different colour and been asked if you've been on holiday? That is colour at work. The right shades brighten your skin and eyes. The wrong ones can wash you out.",
      '## Start with your undertone',
      'Your undertone is the cool, warm or neutral cast beneath your skin, and it stays the same whether you are tanned or pale. A few quick checks at home:',
      '- **Jewellery:** does silver or gold look better against your skin? Silver often suits cool undertones, gold often suits warm.\n- **White test:** hold pure white and then cream near your face in daylight. Notice which one makes your skin look clearer.\n- **Favourites:** think about the colours that always earn you compliments. They are usually a clue.',
      '## What a seasonal colour analysis tells you',
      'A seasonal colour analysis looks at three things together: undertone (warm or cool), depth (light or dark) and clarity (bright or soft). The result is a palette, traditionally named after a season, of shades that work with your natural colouring.',
      'It takes the guesswork out of shopping. Instead of asking whether you like a colour, you can ask whether it is in your palette.',
      '## Wear your best colours near your face',
      "You don't need to replace your wardrobe. Start with what sits closest to your face: tops, scarves, jackets, glasses frames and lipstick. Colours outside your palette can still work as trousers, skirts and shoes.",
      '## Check colours in natural light',
      'Shop lighting can be misleading. Step near a window or doorway before you decide, which is especially worth doing under bright Australian daylight, where colours read very differently than they do indoors.',
      '## Want a definite answer?',
      'Home tests are a useful start, but a professional personal colour analysis gives you a full palette and a swatch wallet to take shopping. ' + bookingLine,
    ].join('\n\n'),
  },
  {
    id: 'seed-post-2', slug: '5-wardrobe-essentials-every-woman-needs', published: true, date: '2024-01-10',
    title: '5 Wardrobe Essentials Every Woman Needs',
    excerpt: 'Build a capsule wardrobe around five timeless pieces that mix and match for work, weekends and everything in between.',
    image: unsplash('1489987707025-afc232f7ea0f', 1200, 800),
    body: [
      'A wardrobe full of clothes and nothing to wear is one of the most common style frustrations. The fix is rarely more clothes. It is a small set of well-chosen essentials that go with everything else you own. These five pieces are the foundation of a capsule wardrobe.',
      '## 1. A blazer that fits well',
      'A tailored blazer pulls an outfit together in seconds. Wear it over a dress for work or with jeans and a tee on the weekend. Choose a neutral from your own colour palette, such as navy, camel, charcoal or soft white, and check that the shoulders sit correctly.',
      '## 2. Jeans that flatter your shape',
      'One pair of jeans in a dark or mid wash that fits your body shape is worth more than five pairs that almost fit. Look at the rise and leg shape that balance your proportions.',
      '## 3. A quality white or cream shirt',
      'A crisp shirt or a good tee works under blazers and knits, with skirts and with trousers. Pure white suits cooler colouring, while cream or ivory is kinder to warmer skin tones.',
      '## 4. A dress you can dress up or down',
      'Pick a simple dress in one of your best colours that works with flats or sneakers during the day and with heels and jewellery at night. Breathable fabrics such as cotton and linen are practical for the Australian climate.',
      '## 5. Comfortable neutral shoes',
      'A pair of shoes you can walk in all day, in a neutral that matches most of your wardrobe, finishes every outfit above.',
      '## Make the essentials your own',
      'The right version of each piece depends on your colouring, body shape and lifestyle. A wardrobe edit shows you what you already own, what is missing and what to buy next. ' + bookingLine,
    ].join('\n\n'),
  },
  {
    id: 'seed-post-3', slug: 'dressing-for-confidence-psychology-of-style', published: true, date: '2024-01-05',
    title: 'Dressing for Confidence: The Psychology of Style',
    excerpt: 'How the clothes you wear affect your mindset and first impressions, and practical ways to dress for confidence every day.',
    image: unsplash('1492447166138-50c3889fccb1', 1200, 800),
    body: [
      'What you wear changes more than how other people see you. It changes how you feel, how you hold yourself and how you approach your day. Dressing with intention is one of the simplest ways to build confidence.',
      '## Clothes affect how you feel',
      'Most of us know the difference between a day in an outfit we love and a day spent tugging at something that does not fit. When your clothes fit well and suit you, you stop thinking about them and focus on what you are doing.',
      '## First impressions happen quickly',
      'People form an impression within moments of meeting you, and clothing is a large part of it. That matters in job interviews, client meetings and presentations. Dressing well is not about being formal. It is about looking like you made a considered choice.',
      '## Practical ways to dress for confidence',
      '- **Prioritise fit.** A well-fitting inexpensive piece looks better than a poorly fitting expensive one.\n- **Wear your best colours.** Shades that suit your colouring make you look healthy and awake.\n- **Dress for your body shape now.** Not the shape you had or hope to have.\n- **Plan ahead.** Deciding the night before removes morning stress.\n- **Keep only what you enjoy wearing.** If it makes you feel uncomfortable, it does not belong in your wardrobe.',
      '## Define your personal style',
      'Confidence comes from clothes that feel like you. Choose three words that describe how you want to feel, for example polished, relaxed and creative, and use them as a filter when you get dressed or shop.',
      '## A little help goes a long way',
      'A personal stylist can show you which colours, shapes and pieces work for you, so getting dressed becomes easy. ' + bookingLine,
    ].join('\n\n'),
  },
];
