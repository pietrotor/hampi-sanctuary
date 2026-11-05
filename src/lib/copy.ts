export const site = {
  name: "Hampi Sanctuary",
  title: "Hampi Sanctuary | Intentional Retreat Community",
  description:
    "An intentional retreat community designed to give people the time, environment, and community to live differently long enough to discover what genuinely improves their lives.",
  shortDescription:
    "Live alongside a small intentional community while exploring nourishing food, movement, meditation, nature and meaningful conversation.",
};

export const nav = [
  { href: "#life", label: "Life" },
  { href: "#why", label: "Why" },
  { href: "#everyday", label: "Everyday" },
  { href: "#pathways", label: "Pathways" },
  { href: "#faq", label: "FAQ" },
  { href: "#people", label: "People" },
] as const;

export const heroOptions = [
  {
    id: "option-1",
    label: "Option 1",
    headline: "A place for meaningful transformation.",
    body: "Live alongside a small community while exploring nourishing food, movement, meditation, healthy routines and meaningful conversations.",
  },
  {
    id: "option-5",
    label: "Option 5",
    headline: "Live differently. See what changes.",
    body: "Explore a more intentional rhythm of life through nature, nourishing food, movement, meditation and meaningful conversations alongside a small community.",
  },
  {
    id: "option-6",
    label: "Option 6",
    headline: "You know what matters. Make space to live it.",
    body: "Nature, movement, nourishing food and meaningful connection are easy to postpone. Hampi Sanctuary creates space to put them at the centre of daily life.",
  },
] as const;

export const life = {
  id: "life",
  headline: "Imagine waking without urgency.",
  paragraphs: [
    "No two days at Hampi Sanctuary look exactly the same.",
    "Some people begin with yoga, breathwork, or meditation. Others prefer a slow breakfast and tea. As the day unfolds, you might spend time in the gardens, work remotely, read, join a workshop, share meaningful conversations, or simply enjoy the slower rhythm of the gardens.",
    "As evening arrives, the community often comes together over dinner before ending the day in the sauna.",
  ],
};

export const why = {
  id: "why",
  headline: "Knowing isn't the hard part.",
  paragraphs: [
    "Most people don't need more information.",
    "We already know that sleep, movement, nourishing food, meaningful relationships, less stress, and time in nature are good for us.",
    "The difficult part isn't understanding them. It's creating the time and space to actually live that way.",
    "That's the environment Hampi Sanctuary is designed to provide.",
    "Hampi Sanctuary doesn't change people. It creates the conditions in which people can change themselves.",
  ],
};

export const documentary = {
  id: "documentary",
  kicker: "A closer look",
  headline: "The Hampi experience in 20 minutes",
  paragraphs: [
    "Our 20-minute documentary offers an honest look at everyday life, the philosophy behind Hampi, and the people who are bringing it to life.",
  ],
  cta: "Watch our short documentary",
};

export const everyday = {
  id: "everyday",
  headline: "Everyday life at Hampi Sanctuary",
  categories: [
    {
      title: "Nourishing Food",
      body: "Fresh, wholesome communal meals prepared with health in mind, with fresh seasonal organic fruit and local produce available whenever feasible. Food is part of the environment for living well, not a luxury amenity. Specific dietary flexibility varies by pathway.",
    },
    {
      title: "Daily Practices",
      body: "Explore meditation, movement, breathwork, yoga, cold exposure and other suitable practices at your own pace. Keep what works, leave the rest.",
    },
    {
      title: "Gardens & Nature",
      body: "Slow down among edible gardens, fruit trees, herbs and peaceful outdoor spaces designed to make nature part of everyday life.",
    },
    {
      title: "Sauna & Cold",
      body: "Sauna and cold exposure offer opportunities for recovery, presence, relaxation and conversation as part of the community rhythm.",
    },
    {
      title: "Community",
      body: "Share meals, ideas and experiences with people from different parts of the world who value curiosity, responsibility, meaningful conversation and intentional living.",
    },
    {
      title: "Integration & Support",
      body: "Reflect through meaningful conversations, facilitated explorations, practical frameworks and appropriate personal guidance. The amount of individual support depends on the participation pathway.",
    },
  ],
};

export const pathways = {
  id: "pathways",
  headline: "3 Paths To Experience Hampi Sanctuary",
  items: [
    {
      title: "Volunteering",
      line: "Help create the environment.",
      paragraphs: [
        "For people who genuinely want to help create and maintain Hampi Sanctuary, have enough time to contribute reliably, and want to become part of the community rather than simply stay as guests.",
        "Volunteering is for people who want to take an active role in helping create and maintain Hampi Sanctuary while becoming part of the community. Participants contribute approximately 20 hours per week through useful work matched to Hampi Sanctuary's real needs and their abilities. Reliability, initiative, independence and a good community attitude matter more than impressive credentials, although specialist skills can be especially valuable when they meet a current need. Contributors stay in shared accommodation, share simple nutritious vegetarian communal meals, use the shared facilities, and participate in suitable scheduled practices and ordinary community life. It is a genuine exchange of value and belonging — not simply a discounted version of another pathway.",
      ],
    },
    {
      title: "Community Living",
      line: "Live inside the environment.",
      paragraphs: [
        "For independent, curious people who want to step outside their normal environment for an extended period without putting their own life on hold — particularly remote workers and digital nomads, people taking a sabbatical, writing or creating, resting, reconsidering what comes next, or developing healthier routines.",
        "You don't need to put your life on hold to experience Hampi Sanctuary. Bring your life with you — and experiment with living it differently. Community Living is particularly suited to remote workers and digital nomads, people on sabbatical, writers and creators, people between chapters of life, and others who have enough independence to direct their own time but want a more supportive environment around them. It combines community, nourishing food, practices, facilitated group explorations, regular personal check-ins, nature, and space for work, rest or personal projects. The value is not simply freedom from a work obligation; it is the opportunity to live your actual life inside a deliberately different environment long enough to discover what changes.",
      ],
    },
    {
      title: "Guided Transformation",
      line: "Use the environment deliberately.",
      paragraphs: [
        "Sometimes life gives us a reason to pause.",
        "For people who have something meaningful they want to understand, address or change — and who want to make that process a central priority of their stay with substantially more individual attention, structure and guidance from Hampi Sanctuary.",
        "Guided Transformation is for someone facing a meaningful goal, problem, transition or desired change who does not simply want access to a good environment, but wants help navigating what to do with it. Hampi Sanctuary works with the participant to clarify what matters, understand relevant routines, patterns and previous attempts, develop and explain an individualized approach, observe what happens, and review and adapt the process over time. This can include greater personal guidance, accountability and coordination with appropriate specialists where useful. It is not Community Living with more activities; its value is the depth of attention, personalization, coordination and adaptation. The participant remains responsible for their choices and development throughout.",
      ],
    },
  ],
  plantMedicine: {
    title: "Plant Medicines",
    quote:
      "For the right person, plant medicine is the most powerful catalyst for change I've seen.",
    attribution: "Daniel Albinsson",
    body: "Microdosing and ceremony are never automatic inclusions or guaranteed experiences. Ceremony requires separate suitability screening and preparation and should be understood as a broader process rather than a single event.",
  },
};

export const faq = {
  id: "faq",
  items: [
    {
      question: "Do I need previous experience with meditation, yoga or similar practices?",
      answer:
        "No. Curiosity and willingness to explore matter more than previous experience.",
    },
    {
      question: "Can I work remotely while staying at Hampi Sanctuary?",
      answer:
        "Yes. Community Living is specifically compatible with remote work and personal projects. Volunteering can work for some remote workers only when they genuinely have enough time for their contribution responsibilities. Guided Transformation is designed for people prioritizing a more focused personal process.",
    },
    {
      question: "Do I have to participate in every activity?",
      answer:
        "No. Most practices are invitations rather than obligations. Volunteering responsibilities are real commitments, and safety-related requirements may also be mandatory.",
    },
    {
      question: "Are plant-medicine ceremonies required?",
      answer:
        "No. Ceremony is optional, is not appropriate for everyone, and requires separate suitability screening and preparation.",
    },
    {
      question: "How long should I stay?",
      answer:
        "It depends on the pathway and what you are looking for. Hampi Sanctuary is designed around enough time to genuinely experience a different rhythm rather than rushing through a short retreat. The Digital Host can help you explore what makes sense for your situation.",
    },
    {
      question: "Can couples come together?",
      answer:
        "Yes, when Hampi Sanctuary appears to be a good fit for both people and the available arrangement suits their needs.",
    },
    {
      question: "What language is spoken at Hampi Sanctuary?",
      answer:
        "English is the primary language for the international guest experience. Spanish is also widely spoken locally and within the Hampi Sanctuary environment.",
    },
    {
      question: "What happens after I apply?",
      answer:
        "The application process is conversational. The Digital Host helps answer questions, understand what you are looking for and explore mutual fit. Suitable applicants then continue to a personal conversation with Hampi Sanctuary before final acceptance.",
    },
  ],
};

export const people = {
  id: "people",
  headline: "The people behind Hampi Sanctuary",
  portraits: [
    {
      name: "Daniel",
      bio: "Daniel's work has long centered on a practical question: what helps people live well? Before founding Hampi Sanctuary, he helped build a company making scientific research on well-being accessible. For more than a decade, he has pursued that same question across continents — learning from traditional practitioners and exploring what different approaches to meaning, consciousness and personal change have in common. He built Hampi Sanctuary to put that learning into practice. Today, he helps guests examine how their habits and priorities shape their lives, and identify changes that reflect what truly matters to them.",
    },
    {
      name: "Andrea",
      bio: "Andrea brings a deep interest in medicinal plants and a dedicated meditation practice rooted in Vipassana. She grows herbs and creates teas, soaps and botanical care products through her own independent brand, sharing her knowledge of plants and meditation with those around her. Her empathy, compassion and feminine sensibility help shape the warmth of Hampi Sanctuary — from the spaces we share to the way people are welcomed.",
    },
  ],
};

export const closing = {
  id: "invitation",
  headline: "Could You Be Right For Hampi Sanctuary?",
  body: "Takes 15 minutes to find out. Answer a few questions and see if you're a good fit.",
  cta: "Start a conversation",
};

export const placeholders = {
  conversationHref: "/conversation",
  documentaryHref: "/documentary",
  conversationTitle: "Start a conversation",
  conversationBody:
    "This is the future entry point for the Digital Host. The conversation space is not live yet. When it opens, you will be able to ask questions and explore whether Hampi Sanctuary is a good fit from here.",
  documentaryTitle: "Watch our short documentary",
  documentaryBody:
    "The documentary is not available to stream yet. When the film is ready, this page will play it here.",
  back: "Back to Hampi Sanctuary",
};
