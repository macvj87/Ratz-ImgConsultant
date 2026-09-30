// Section types: what each one is called, which fields its admin form shows,
// and the content a brand-new section of that type starts with.

export type Field =
  | { name: string; label: string; type: 'text' | 'textarea' | 'image' | 'lines' | 'number'; help?: string }
  | { name: string; label: string; type: 'select'; options: { value: string; label: string }[]; help?: string }
  | { name: string; label: string; type: 'list'; itemLabel: string; fields: Field[]; help?: string };

export type Section = {
  id: string;
  type: SectionType;
  visible: boolean;
  anchor: string; // the #link used by the menu, e.g. "about"
  navLabel: string; // menu text; empty = not in the menu
  background: Background;
  data: Record<string, any>;
};

export const backgrounds = [
  { value: 'light', label: 'Cream' },
  { value: 'white', label: 'White' },
  { value: 'sand', label: 'Sand' },
  { value: 'hero', label: 'Cream to sand fade' },
  { value: 'accent', label: 'Green feature band' },
  { value: 'secondary', label: 'Sage feature band' },
] as const;
export type Background = (typeof backgrounds)[number]['value'];

const button = (prefix: string, label: string): Field[] => [
  { name: `${prefix}Label`, label: `${label} text`, type: 'text', help: 'Leave empty to hide the button.' },
  { name: `${prefix}Link`, label: `${label} link`, type: 'text', help: 'e.g. #contact, /blog or a full web address.' },
];

type SectionDef = { label: string; description: string; fields: Field[]; defaults: Record<string, any>; background: Background };

export const sectionTypes = {
  hero: {
    label: 'Hero banner',
    description: 'Big welcome at the top with a photo and buttons.',
    background: 'hero',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'highlight', label: 'Highlighted heading line', type: 'text', help: 'Shown on its own line in the accent colour.' },
      { name: 'text', label: 'Text', type: 'textarea' },
      { name: 'image', label: 'Photo', type: 'image' },
      ...button('primary', 'Main button'),
      ...button('secondary', 'Second button'),
    ],
    defaults: { heading: 'Welcome', highlight: '', text: '', image: '', primaryLabel: '', primaryLink: '#contact', secondaryLabel: '', secondaryLink: '' },
  },
  textImage: {
    label: 'Text + photo',
    description: 'A heading, paragraphs and a photo side by side.',
    background: 'white',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'subheading', label: 'Subheading', type: 'text' },
      { name: 'text', label: 'Text', type: 'textarea', help: 'Leave a blank line between paragraphs.' },
      { name: 'image', label: 'Photo', type: 'image' },
      { name: 'imageSide', label: 'Photo position', type: 'select', options: [{ value: 'left', label: 'Left' }, { value: 'right', label: 'Right' }] },
      ...button('button', 'Button'),
    ],
    defaults: { heading: 'New section', subheading: '', text: '', image: '', imageSide: 'right', buttonLabel: '', buttonLink: '#contact' },
  },
  checklist: {
    label: 'Checklist + photo',
    description: 'A question list (e.g. "Do you…") beside a photo.',
    background: 'white',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'intro', label: 'Intro', type: 'textarea' },
      { name: 'listTitle', label: 'List title', type: 'text' },
      { name: 'items', label: 'List items', type: 'lines', help: 'One item per line.' },
      { name: 'image', label: 'Photo', type: 'image' },
      { name: 'closing', label: 'Closing text', type: 'textarea' },
    ],
    defaults: { heading: 'New checklist', intro: '', listTitle: '', items: [], image: '', closing: '' },
  },
  cta: {
    label: 'Call to action',
    description: 'A coloured band with a short message and one button.',
    background: 'accent',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'text', label: 'Text', type: 'textarea' },
      ...button('button', 'Button'),
    ],
    defaults: { heading: 'Ready to start?', text: '', buttonLabel: 'Get in touch', buttonLink: '#contact' },
  },
  services: {
    label: 'Services',
    description: 'Cards for each service with photo and feature list.',
    background: 'white',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'intro', label: 'Intro', type: 'textarea' },
      { name: 'linkLabel', label: 'Card link text', type: 'text', help: 'Link on each card that jumps to the contact form.' },
      {
        name: 'items', label: 'Services', type: 'list', itemLabel: 'Service',
        fields: [
          { name: 'title', label: 'Name', type: 'text' },
          { name: 'description', label: 'Description', type: 'textarea' },
          { name: 'features', label: 'What’s included', type: 'lines', help: 'One per line.' },
          { name: 'image', label: 'Photo', type: 'image' },
        ],
      },
    ],
    defaults: { heading: 'Services', intro: '', linkLabel: 'Learn more', items: [] },
  },
  testimonials: {
    label: 'Testimonials',
    description: 'Client reviews in cards.',
    background: 'sand',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'intro', label: 'Intro', type: 'textarea' },
      {
        name: 'items', label: 'Reviews', type: 'list', itemLabel: 'Review',
        fields: [
          { name: 'name', label: 'Name', type: 'text' },
          { name: 'role', label: 'Role / description', type: 'text' },
          { name: 'quote', label: 'Review', type: 'textarea' },
        ],
      },
    ],
    defaults: { heading: 'What clients say', intro: '', items: [] },
  },
  gallery: {
    label: 'Photo gallery',
    description: 'A grid of photos with optional captions.',
    background: 'white',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'intro', label: 'Intro', type: 'textarea' },
      {
        name: 'items', label: 'Photos', type: 'list', itemLabel: 'Photo',
        fields: [
          { name: 'image', label: 'Photo', type: 'image' },
          { name: 'caption', label: 'Caption', type: 'text' },
        ],
      },
    ],
    defaults: { heading: 'Gallery', intro: '', items: [] },
  },
  faq: {
    label: 'Questions & answers',
    description: 'Frequently asked questions that open when clicked.',
    background: 'light',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'intro', label: 'Intro', type: 'textarea' },
      {
        name: 'items', label: 'Questions', type: 'list', itemLabel: 'Question',
        fields: [
          { name: 'question', label: 'Question', type: 'text' },
          { name: 'answer', label: 'Answer', type: 'textarea' },
        ],
      },
    ],
    defaults: { heading: 'Frequently asked questions', intro: '', items: [] },
  },
  blog: {
    label: 'Latest blog posts',
    description: 'Shows your newest blog posts.',
    background: 'white',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'intro', label: 'Intro', type: 'textarea' },
      { name: 'count', label: 'How many posts to show', type: 'number' },
      { name: 'buttonLabel', label: '“All posts” button text', type: 'text', help: 'Leave empty to hide the button.' },
    ],
    defaults: { heading: 'Latest from the blog', intro: '', count: 3, buttonLabel: 'View all articles' },
  },
  newsletter: {
    label: 'Newsletter signup',
    description: 'Email signup box. Subscribers appear in the admin.',
    background: 'secondary',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'text', label: 'Text', type: 'textarea' },
      { name: 'buttonLabel', label: 'Button text', type: 'text' },
      { name: 'successMessage', label: 'Thank-you message', type: 'text' },
    ],
    defaults: { heading: 'Stay in touch', text: '', buttonLabel: 'Subscribe', successMessage: 'Thank you for subscribing!' },
  },
  contact: {
    label: 'Contact form',
    description: 'Your contact details and the enquiry form.',
    background: 'light',
    fields: [
      { name: 'heading', label: 'Heading', type: 'text' },
      { name: 'intro', label: 'Intro', type: 'textarea' },
      { name: 'formTitle', label: 'Form title', type: 'text' },
      { name: 'serviceOptions', label: 'Services people can pick', type: 'lines', help: 'One per line. Leave empty to hide the dropdown.' },
      { name: 'buttonLabel', label: 'Send button text', type: 'text' },
      { name: 'footnote', label: 'Small print under the button', type: 'text' },
      { name: 'successMessage', label: 'Thank-you message', type: 'textarea' },
    ],
    defaults: {
      heading: 'Get in touch', intro: '', formTitle: 'Send a message', serviceOptions: [], buttonLabel: 'Send',
      footnote: '', successMessage: 'Thank you! I’ll be in touch within 24 hours.',
    },
  },
} satisfies Record<string, SectionDef>;

export type SectionType = keyof typeof sectionTypes;

export function isSectionType(t: string): t is SectionType {
  return Object.hasOwn(sectionTypes, t);
}

/** Convert submitted form values into the right shapes for a type's fields. */
export function normalize(fields: Field[], raw: Record<string, any> = {}): Record<string, any> {
  const out: Record<string, any> = {};
  for (const f of fields) {
    const v = raw[f.name];
    if (f.type === 'list') {
      const items = Array.isArray(v) ? v : v && typeof v === 'object' ? Object.values(v) : [];
      out[f.name] = items.filter(Boolean).map((item) => normalize(f.fields, item));
    } else if (f.type === 'lines') {
      out[f.name] = Array.isArray(v)
        ? v
        : String(v ?? '').split('\n').map((s) => s.trim()).filter(Boolean);
    } else if (f.type === 'number') {
      const n = Number(v);
      out[f.name] = Number.isFinite(n) ? n : 0;
    } else {
      out[f.name] = String(v ?? '').replace(/\r\n/g, '\n').trim();
    }
  }
  return out;
}

export function slugify(s: string) {
  return s.toLowerCase().normalize('NFKD').replace(/[^\w\s-]/g, '').trim().replace(/[\s_]+/g, '-').replace(/-+/g, '-').slice(0, 60);
}
