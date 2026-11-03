/* =========================================================
   BRAND BANGLADESH — Homepage logic
   Demo content below — replace with your CMS / API data.
   ========================================================= */
(() => {
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];
  const BN_DIGITS = '০১২৩৪৫৬৭৮৯';

  let lang = 'en';
  try { lang = localStorage.getItem('bb-lang') || 'en'; } catch (e) {}

  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };

  const t = (o) => (o && typeof o === 'object' ? o[lang] : o);
  const L = (en, bn) => (lang === 'bn' ? bn : en);
  const num = (v) => (lang === 'bn' ? String(v).replace(/\d/g, (d) => BN_DIGITS[d]) : String(v));
  const pad = (n) => String(n).padStart(2, '0');
  const img = (name) => `images/${name}.jpg`;
  const readTime = (m) => L(`${m} min read`, `${num(m)} মিনিট পড়া`);
  const randId = (prefix, digits = 4) => `${prefix}-${Math.floor(10 ** (digits - 1) + Math.random() * 9 * 10 ** (digits - 1))}`;

  /* ---------------- DATA ---------------- */
  const DATA = {
    ticker: [
      { en: 'Metro Rail to run until midnight from next week', bn: 'আগামী সপ্তাহ থেকে মধ্যরাত পর্যন্ত চলবে মেট্রোরেল' },
      { en: 'Remittance inflow crosses $2.6 billion in October', bn: 'অক্টোবরে রেমিট্যান্স প্রবাহ ২৬০ কোটি ডলার ছাড়াল' },
      { en: 'Winter vegetables arrive early; prices ease in Dhaka markets', bn: 'আগাম শীতের সবজি বাজারে, ঢাকায় কমছে দাম' },
      { en: "Cox's Bazar tourist season opens with record bookings", bn: 'রেকর্ড বুকিং নিয়ে শুরু কক্সবাজারের পর্যটন মৌসুম' },
      { en: "Women's cricket team clinches home series 2–1", bn: '২–১ ব্যবধানে ঘরের মাঠে সিরিজ জিতল নারী ক্রিকেট দল' }
    ],

    brief: [
      { cat: { en: 'Transport', bn: 'পরিবহন' }, title: { en: 'Metro Rail to run until midnight from next week', bn: 'আগামী সপ্তাহ থেকে মধ্যরাত পর্যন্ত চলবে মেট্রোরেল' }, sum: { en: 'Trains will run every 12 minutes after 9 pm, easing late-night commutes across the capital.', bn: 'রাত ৯টার পর প্রতি ১২ মিনিট অন্তর ট্রেন চলবে, স্বস্তি পাবেন রাতের যাত্রীরা।' } },
      { cat: { en: 'Economy', bn: 'অর্থনীতি' }, title: { en: 'Remittance inflow crosses $2.6 billion in October', bn: 'অক্টোবরে রেমিট্যান্স প্রবাহ ২৬০ কোটি ডলার ছাড়াল' }, sum: { en: 'Steady flows through formal channels push reserves upward for a third straight month.', bn: 'বৈধ পথে প্রবাসী আয় বাড়ায় টানা তৃতীয় মাসে রিজার্ভ ঊর্ধ্বমুখী।' } },
      { cat: { en: 'Markets', bn: 'বাজার' }, title: { en: 'Winter vegetables arrive early as prices ease', bn: 'আগাম শীতের সবজিতে কমছে দাম' }, sum: { en: 'Cauliflower and beans dropped up to 30% at Karwan Bazar as early harvests reach the capital.', bn: 'আগাম ফসল আসায় কারওয়ান বাজারে ফুলকপি ও শিমের দাম ৩০% পর্যন্ত কমেছে।' } },
      { cat: { en: 'Technology', bn: 'প্রযুক্তি' }, title: { en: 'Flood-alert app reaches 2 million users in the north', bn: 'উত্তরাঞ্চলে বন্যা-সতর্কতা অ্যাপের ব্যবহারকারী ২০ লাখ ছাড়াল' }, sum: { en: 'Alerts arrive in Bangla by voice, helping farmers move livestock in time.', bn: 'বাংলায় ভয়েস বার্তায় সতর্কতা পাচ্ছেন কৃষকেরা, সময়মতো সরাতে পারছেন গবাদিপশু।' } },
      { cat: { en: 'Sports', bn: 'খেলা' }, title: { en: "Women's cricket team clinches home series", bn: 'ঘরের মাঠে সিরিজ জিতল নারী ক্রিকেট দল' }, sum: { en: 'A composed run-chase in Mirpur sealed the series in front of a full house.', bn: 'মিরপুরে ঠান্ডা মাথার রান তাড়ায় দর্শকে ঠাসা গ্যালারির সামনে সিরিজ নিশ্চিত।' } },
      { cat: { en: 'Travel', bn: 'পর্যটন' }, title: { en: "Cox's Bazar season opens with record bookings", bn: 'রেকর্ড বুকিং নিয়ে শুরু কক্সবাজারের মৌসুম' }, sum: { en: 'Hotels report 85% occupancy for December as domestic travel rebounds.', bn: 'দেশীয় পর্যটন ফিরতে থাকায় ডিসেম্বরে হোটেলগুলোতে ৮৫% বুকিং।' } },
      { cat: { en: 'Business', bn: 'ব্যবসা' }, title: { en: 'Chattogram startups draw fresh foreign investment', bn: 'চট্টগ্রামের স্টার্টআপে নতুন বিদেশি বিনিয়োগ' }, sum: { en: 'Logistics and port-tech firms raised the bulk of the funding this quarter.', bn: 'এ প্রান্তিকে বিনিয়োগের বড় অংশ পেয়েছে লজিস্টিকস ও বন্দর-প্রযুক্তি প্রতিষ্ঠান।' } },
      { cat: { en: 'Health', bn: 'স্বাস্থ্য' }, title: { en: 'Dengue cases fall as temperatures drop', bn: 'তাপমাত্রা কমায় কমছে ডেঙ্গু সংক্রমণ' }, sum: { en: 'Health officials still urge clearing standing water through November.', bn: 'তবে নভেম্বরজুড়ে জমা পানি পরিষ্কারের আহ্বান স্বাস্থ্য কর্মকর্তাদের।' } }
    ],

    briefCfg: {
      60: { count: 4, sum: false, label: { en: '60-second briefing', bn: '৬০ সেকেন্ডের ব্রিফিং' }, title: { en: 'The headlines, nothing more', bn: 'শুধু শিরোনাম, এক নজরে' } },
      180: { count: 6, sum: true, label: { en: '3-minute update', bn: '৩ মিনিটের আপডেট' }, title: { en: 'Catch up with context', bn: 'প্রেক্ষাপটসহ আজকের আপডেট' } },
      300: { count: 8, sum: true, label: { en: '5-minute overview', bn: '৫ মিনিটের পর্যালোচনা' }, title: { en: 'The full picture of your day', bn: 'আপনার দিনের পূর্ণ চিত্র' } }
    },

    five: [
      { seed: 'reserve', min: 4, cat: { en: 'Economy', bn: 'অর্থনীতি' }, title: { en: 'Why the taka is steadier than it has been in two years', bn: 'দুই বছরের মধ্যে টাকা এখন সবচেয়ে স্থিতিশীল কেন' }, why: { en: 'Import costs — and the price of your groceries — depend on it.', bn: 'আমদানি খরচ আর আপনার বাজারের দাম—দুটোই এর ওপর নির্ভর করে।' } },
      { seed: 'school', min: 3, cat: { en: 'Education', bn: 'শিক্ষা' }, title: { en: 'New curriculum assessments begin in 12,000 schools', bn: '১২ হাজার বিদ্যালয়ে নতুন শিক্ষাক্রমের মূল্যায়ন শুরু' }, why: { en: 'Parents will see project grades replace some written exams.', bn: 'কিছু লিখিত পরীক্ষার বদলে প্রকল্পভিত্তিক মূল্যায়ন দেখবেন অভিভাবকেরা।' } },
      { seed: 'embankment', min: 5, cat: { en: 'Climate', bn: 'জলবায়ু' }, title: { en: 'Coastal embankment plan gets its first funding round', bn: 'উপকূলীয় বাঁধ পরিকল্পনায় প্রথম দফা অর্থায়ন' }, why: { en: 'Over 4 million people live behind ageing embankments.', bn: 'পুরোনো বাঁধের ভরসায় বাস করেন ৪০ লাখেরও বেশি মানুষ।' } },
      { seed: 'voice', min: 3, cat: { en: 'Technology', bn: 'প্রযুক্তি' }, title: { en: 'Bangla AI voice tools go mainstream in public services', bn: 'সরকারি সেবায় ছড়িয়ে পড়ছে বাংলা এআই ভয়েস প্রযুক্তি' }, why: { en: 'Forms and helplines could soon understand spoken Bangla.', bn: 'শিগগিরই ফরম আর হেল্পলাইন বুঝবে মুখের বাংলা।' } },
      { seed: 'hospital', min: 2, cat: { en: 'Health', bn: 'স্বাস্থ্য' }, title: { en: 'Upazila hospitals add evening outpatient hours', bn: 'উপজেলা হাসপাতালে চালু হচ্ছে সান্ধ্যকালীন বহির্বিভাগ' }, why: { en: "Working families can see a doctor without losing a day's pay.", bn: 'এক দিনের মজুরি না হারিয়েই ডাক্তার দেখাতে পারবেন শ্রমজীবী পরিবার।' } }
    ],

    stories: [
      { seed: 'weaver', min: 7, cat: { en: 'Feature', bn: 'বিশেষ প্রতিবেদন' }, title: { en: 'The weavers of Tangail are rewriting the future of the saree', bn: 'তাঁতের শাড়ির ভবিষ্যৎ নতুন করে লিখছেন টাঙ্গাইলের তাঁতিরা' }, excerpt: { en: 'A new generation is pairing hand-looms with online storefronts — and finding buyers from Sylhet to Sydney.', bn: 'হস্তচালিত তাঁতের সঙ্গে অনলাইন দোকান জুড়ে দিচ্ছে নতুন প্রজন্ম—ক্রেতা মিলছে সিলেট থেকে সিডনি পর্যন্ত।' } },
      { seed: 'garment', min: 4, cat: { en: 'Economy', bn: 'অর্থনীতি' }, title: { en: 'Garment exports rise 8% as new markets open', bn: 'নতুন বাজারে পোশাক রপ্তানি বেড়েছে ৮%' } },
      { seed: 'canal', min: 5, cat: { en: 'Environment', bn: 'পরিবেশ' }, title: { en: "Dhaka's canals get a second life", bn: 'নতুন প্রাণ পাচ্ছে ঢাকার খালগুলো' } },
      { seed: 'folk', min: 3, cat: { en: 'Culture', bn: 'সংস্কৃতি' }, title: { en: 'A folk music revival fills concert halls', bn: 'লোকসংগীতের পুনর্জাগরণে মুখর মিলনায়তন' } },
      { seed: 'cricket', min: 3, cat: { en: 'Sports', bn: 'খেলা' }, title: { en: 'Inside the academy shaping the next pace attack', bn: 'আগামীর পেস আক্রমণ গড়ছে যে একাডেমি' } }
    ],

    tracker: [
      {
        days: 142, tag: { en: 'Infrastructure', bn: 'অবকাঠামো' },
        title: { en: 'Mirpur road repair promised in June', bn: 'জুনে প্রতিশ্রুত মিরপুর সড়ক সংস্কার' },
        steps: [
          { s: 'done', l: { en: 'Reported', bn: 'প্রতিবেদন' }, d: { en: 'Jun 12', bn: '১২ জুন' } },
          { s: 'done', l: { en: 'Authority responded', bn: 'কর্তৃপক্ষের জবাব' }, d: { en: 'Jun 20', bn: '২০ জুন' } },
          { s: 'now', l: { en: 'Work started', bn: 'কাজ শুরু' }, d: { en: 'Oct 05', bn: '৫ অক্টোবর' } },
          { s: 'next', l: { en: 'Completed', bn: 'সম্পন্ন' }, d: { en: 'Pending', bn: 'অপেক্ষমাণ' } }
        ]
      },
      {
        days: 38, tag: { en: 'Public health', bn: 'জনস্বাস্থ্য' },
        title: { en: 'Contaminated water supply in Jatrabari', bn: 'যাত্রাবাড়ীতে দূষিত পানি সরবরাহ' },
        steps: [
          { s: 'done', l: { en: 'Reported', bn: 'প্রতিবেদন' }, d: { en: 'Sep 26', bn: '২৬ সেপ্টেম্বর' } },
          { s: 'done', l: { en: 'Probe committee', bn: 'তদন্ত কমিটি' }, d: { en: 'Oct 02', bn: '২ অক্টোবর' } },
          { s: 'done', l: { en: 'Pipeline replaced', bn: 'পাইপলাইন বদল' }, d: { en: 'Oct 29', bn: '২৯ অক্টোবর' } },
          { s: 'now', l: { en: 'Water re-tested', bn: 'পুনরায় পানি পরীক্ষা' }, d: { en: 'This week', bn: 'চলতি সপ্তাহ' } }
        ]
      }
      ,{
        days: 61, tag: { en: 'Education', bn: 'শিক্ষা' },
        title: { en: 'Stipends withheld from 300 Rangpur nursing students', bn: 'রংপুরে ৩০০ নার্সিং শিক্ষার্থীর বৃত্তি আটকে' },
        steps: [
          { s: 'done', l: { en: 'Reported', bn: 'প্রতিবেদন' }, d: { en: 'Sep 03', bn: '৩ সেপ্টেম্বর' } },
          { s: 'done', l: { en: 'Ministry inquiry', bn: 'মন্ত্রণালয়ের তদন্ত' }, d: { en: 'Sep 15', bn: '১৫ সেপ্টেম্বর' } },
          { s: 'now', l: { en: 'Partial payment', bn: 'আংশিক পরিশোধ' }, d: { en: 'Oct 20', bn: '২০ অক্টোবর' } },
          { s: 'next', l: { en: 'Fully paid', bn: 'পুরো পরিশোধ' }, d: { en: 'Pending', bn: 'অপেক্ষমাণ' } }
        ]
      }
    ],

    promises: [
      { status: 'progress', progress: 72, owner: { en: 'Ministry of Road Transport', bn: 'সড়ক পরিবহন মন্ত্রণালয়' }, title: { en: 'Dhaka Elevated Expressway fully open by December', bn: 'ডিসেম্বরের মধ্যে পুরোপুরি চালু হবে ঢাকা এলিভেটেড এক্সপ্রেসওয়ে' }, due: { en: 'Due Dec 2026', bn: 'সময়সীমা ডিসেম্বর ২০২৬' } },
      { status: 'progress', progress: 45, owner: { en: 'Ministry of Education', bn: 'শিক্ষা মন্ত্রণালয়' }, title: { en: 'Free textbooks in every school on January 1', bn: '১ জানুয়ারি প্রতিটি স্কুলে বিনামূল্যের পাঠ্যবই' }, due: { en: 'Due Jan 2027', bn: 'সময়সীমা জানুয়ারি ২০২৭' } },
      { status: 'open', progress: 18, owner: { en: 'Dhaka North City Corporation', bn: 'ঢাকা উত্তর সিটি করপোরেশন' }, title: { en: 'A waterlogging-free Mirpur before the monsoon', bn: 'বর্ষার আগেই জলাবদ্ধতামুক্ত মিরপুর' }, due: { en: 'Was due Jun 2026', bn: 'সময়সীমা ছিল জুন ২০২৬' } },
      { status: 'resolved', progress: 100, owner: { en: 'Power Division', bn: 'বিদ্যুৎ বিভাগ' }, title: { en: 'Prepaid meters for every Chattogram household', bn: 'চট্টগ্রামের প্রতিটি বাড়িতে প্রিপেইড মিটার' }, due: { en: 'Delivered Oct 2026', bn: 'পূরণ অক্টোবর ২০২৬' } }
    ],
    promiseLabel: {
      open: { en: 'Behind schedule', bn: 'পিছিয়ে আছে' },
      progress: { en: 'On track', bn: 'সঠিক পথে' },
      resolved: { en: 'Delivered', bn: 'পূরণ হয়েছে' }
    },

    problems: [
      { status: 'open', votes: 412, place: { en: 'Dhaka', bn: 'ঢাকা' }, title: { en: 'Broken streetlights on Tejgaon link road', bn: 'তেজগাঁও লিংক রোডে বিকল সড়কবাতি' } },
      { status: 'progress', votes: 287, place: { en: 'Rangpur', bn: 'রংপুর' }, title: { en: 'School without a boundary wall beside the highway', bn: 'মহাসড়কের পাশে সীমানাপ্রাচীরহীন বিদ্যালয়' } },
      { status: 'progress', votes: 655, place: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, title: { en: 'Waterlogging after every rain at Muradpur', bn: 'প্রতি বৃষ্টিতে মুরাদপুরে জলাবদ্ধতা' } },
      { status: 'resolved', votes: 198, place: { en: 'Barishal', bn: 'বরিশাল' }, title: { en: 'Ticket overcharging at the ferry ghat', bn: 'ফেরিঘাটে টিকিটের বাড়তি দাম' } }
    ],
    statusLabel: {
      open: { en: 'Open', bn: 'চলমান' },
      progress: { en: 'In progress', bn: 'প্রক্রিয়াধীন' },
      resolved: { en: 'Resolved', bn: 'সমাধান হয়েছে' }
    },

    divisions: [
      { id: 'all', en: 'All', bn: 'সব' },
      { id: 'dhaka', en: 'Dhaka', bn: 'ঢাকা' },
      { id: 'chattogram', en: 'Chattogram', bn: 'চট্টগ্রাম' },
      { id: 'rajshahi', en: 'Rajshahi', bn: 'রাজশাহী' },
      { id: 'khulna', en: 'Khulna', bn: 'খুলনা' },
      { id: 'sylhet', en: 'Sylhet', bn: 'সিলেট' },
      { id: 'barishal', en: 'Barishal', bn: 'বরিশাল' },
      { id: 'rangpur', en: 'Rangpur', bn: 'রংপুর' },
      { id: 'mymensingh', en: 'Mymensingh', bn: 'ময়মনসিংহ' }
    ],
    local: [
      { div: 'dhaka', h: 1, seed: 'rooftop', sum: { en: 'Residents of Shankhari Bazar have turned 200 rooftops green — and the lanes below are up to 2°C cooler this summer.', bn: 'শাঁখারীবাজারের বাসিন্দারা ২০০টি ছাদ সবুজ করেছেন—এ গ্রীষ্মে নিচের গলিগুলো ২ ডিগ্রি পর্যন্ত শীতল।' }, title: { en: "Old Dhaka's rooftop gardens cool the lanes below", bn: 'পুরান ঢাকার ছাদবাগান শীতল করছে নিচের গলি' } },
      { div: 'chattogram', h: 2, seed: 'coffee', title: { en: 'Hill tracts coffee finds its first export buyer', bn: 'প্রথম রপ্তানি ক্রেতা পেল পার্বত্য অঞ্চলের কফি' } },
      { div: 'rajshahi', h: 3, seed: 'mango', title: { en: 'Mango growers try cold storage for the first time', bn: 'প্রথমবার হিমাগার ব্যবহার করছেন আমচাষিরা' } },
      { div: 'khulna', h: 4, seed: 'honey', title: { en: 'Sundarbans honey collectors get insurance cover', bn: 'বিমার আওতায় সুন্দরবনের মৌয়ালরা' } },
      { div: 'sylhet', h: 5, seed: 'tea', title: { en: 'Tea garden schools add digital classrooms', bn: 'চা বাগানের স্কুলে ডিজিটাল ক্লাসরুম' } },
      { div: 'barishal', h: 6, seed: 'floating', title: { en: 'Floating guava markets draw weekend visitors', bn: 'ভাসমান পেয়ারা বাজারে সাপ্তাহিক পর্যটকের ভিড়' } },
      { div: 'rangpur', h: 7, seed: 'weaver', title: { en: 'Women-led co-op revives Shataranji weaving', bn: 'নারীদের সমবায়ে প্রাণ ফিরছে শতরঞ্জিতে' } }
    ],

    topics: [
      { id: 'bangladesh', icon: 'ph-flag-banner', en: 'Bangladesh', bn: 'বাংলাদেশ' },
      { id: 'world', icon: 'ph-globe-hemisphere-east', en: 'World', bn: 'বিশ্ব' },
      { id: 'economy', icon: 'ph-chart-line-up', en: 'Economy', bn: 'অর্থনীতি' },
      { id: 'technology', icon: 'ph-cpu', en: 'Technology', bn: 'প্রযুক্তি' },
      { id: 'culture', icon: 'ph-palette', en: 'Culture', bn: 'সংস্কৃতি' },
      { id: 'sports', icon: 'ph-soccer-ball', en: 'Sports', bn: 'খেলা' },
      { id: 'health', icon: 'ph-heartbeat', en: 'Health', bn: 'স্বাস্থ্য' },
      { id: 'education', icon: 'ph-student', en: 'Education', bn: 'শিক্ষা' }
    ],
    feed: [
      { topic: 'economy', seed: 'garment', min: 4, title: { en: 'Garment exports rise 8% as new markets open', bn: 'নতুন বাজারে পোশাক রপ্তানি বেড়েছে ৮%' } },
      { topic: 'technology', seed: 'flood', min: 3, title: { en: 'Flood-alert app reaches 2 million users in the north', bn: 'উত্তরাঞ্চলে বন্যা-সতর্কতা অ্যাপের ব্যবহারকারী ২০ লাখ ছাড়াল' } },
      { topic: 'bangladesh', seed: 'canal', min: 5, title: { en: "Dhaka's canals get a second life", bn: 'নতুন প্রাণ পাচ্ছে ঢাকার খালগুলো' } },
      { topic: 'economy', seed: 'remittance', min: 3, title: { en: 'Remittance inflow crosses $2.6 billion in October', bn: 'অক্টোবরে রেমিট্যান্স প্রবাহ ২৬০ কোটি ডলার ছাড়াল' } },
      { topic: 'technology', seed: 'voice', min: 4, title: { en: 'Bangla AI voice tools go mainstream in public services', bn: 'সরকারি সেবায় ছড়িয়ে পড়ছে বাংলা এআই ভয়েস প্রযুক্তি' } },
      { topic: 'bangladesh', seed: 'metro', min: 2, title: { en: 'Metro Rail to run until midnight from next week', bn: 'আগামী সপ্তাহ থেকে মধ্যরাত পর্যন্ত চলবে মেট্রোরেল' } },
      { topic: 'world', seed: 'climate', min: 5, title: { en: 'Climate finance talks put delta nations in focus', bn: 'জলবায়ু অর্থায়ন আলোচনার কেন্দ্রে ব-দ্বীপের দেশগুলো' } },
      { topic: 'world', seed: 'gulf', min: 4, title: { en: 'Gulf hiring rebounds for skilled Bangladeshi workers', bn: 'দক্ষ বাংলাদেশি কর্মীদের জন্য উপসাগরীয় দেশে নিয়োগ বাড়ছে' } },
      { topic: 'sports', seed: 'cricket', min: 3, title: { en: "Women's cricket team clinches home series", bn: 'ঘরের মাঠে সিরিজ জিতল নারী ক্রিকেট দল' } },
      { topic: 'culture', seed: 'folk', min: 3, title: { en: 'A folk music revival fills concert halls', bn: 'লোকসংগীতের পুনর্জাগরণে মুখর মিলনায়তন' } },
      { topic: 'health', seed: 'hospital', min: 2, title: { en: 'Upazila hospitals add evening outpatient hours', bn: 'উপজেলা হাসপাতালে চালু হচ্ছে সান্ধ্যকালীন বহির্বিভাগ' } },
      { topic: 'education', seed: 'school', min: 3, title: { en: 'New curriculum assessments begin in 12,000 schools', bn: '১২ হাজার বিদ্যালয়ে নতুন শিক্ষাক্রমের মূল্যায়ন শুরু' } }
    ],

    knowledge: [
      { icon: 'ph-lightbulb', tone: '', count: 120, title: { en: 'Explainers', bn: 'ব্যাখ্যামূলক লেখা' }, desc: { en: 'The news, decoded in plain language.', bn: 'সহজ ভাষায় খবরের ব্যাখ্যা।' }, unit: { en: 'articles', bn: 'লেখা' } },
      { icon: 'ph-video-camera', tone: 'gold', count: 24, title: { en: 'Video courses', bn: 'ভিডিও কোর্স' }, desc: { en: 'Short courses taught by journalists and experts.', bn: 'সাংবাদিক ও বিশেষজ্ঞদের ছোট ছোট কোর্স।' }, unit: { en: 'courses', bn: 'কোর্স' } },
      { icon: 'ph-exam', tone: 'gold', count: 60, title: { en: 'Exam preparation', bn: 'পরীক্ষার প্রস্তুতি' }, desc: { en: 'Current affairs for BCS, admission and job tests.', bn: 'বিসিএস, ভর্তি ও চাকরির পরীক্ষার সাম্প্রতিক বিষয়াবলি।' }, unit: { en: 'quizzes', bn: 'কুইজ' } },
      { icon: 'ph-briefcase', tone: '', count: 40, title: { en: 'Career guide', bn: 'ক্যারিয়ার গাইড' }, desc: { en: 'Skills, CVs and interviews that actually work.', bn: 'দক্ষতা, সিভি আর ইন্টারভিউয়ের কার্যকর পরামর্শ।' }, unit: { en: 'guides', bn: 'গাইড' } }
    ],

    poll: [
      { v: 412, en: 'Hospital waiting times', bn: 'হাসপাতালে অপেক্ষার সময়' },
      { v: 538, en: 'Rising house rents in Dhaka', bn: 'ঢাকায় বাড়িভাড়া বৃদ্ধি' },
      { v: 334, en: 'Air quality near brick kilns', bn: 'ইটভাটার আশপাশের বাতাসের মান' }
    ],

    modal: {
      problem: {
        prefix: 'PP',
        eyebrow: { en: 'Public Problem Tracker', bn: 'জনসমস্যা ট্র্যাকার' },
        title: { en: 'Report a problem', bn: 'সমস্যা জানান' },
        desc: { en: 'A broken road, waterlogging, a dark street? Tell us where — we log it, track it and follow up with the authorities.', bn: 'ভাঙা রাস্তা, জলাবদ্ধতা, অন্ধকার সড়ক? কোথায় জানান—আমরা তালিকাভুক্ত করব, নজর রাখব এবং কর্তৃপক্ষের কাছে ফলোআপ করব।' },
        ph: { en: 'Describe the problem and how long it has gone on…', bn: 'সমস্যাটি কী এবং কতদিন ধরে চলছে, লিখুন…' },
        done: { en: 'Thank you. Your report is logged as', bn: 'ধন্যবাদ। আপনার রিপোর্ট নথিভুক্ত হয়েছে, নম্বর' }
      },
      story: {
        prefix: 'LE',
        eyebrow: { en: 'Local Eyes', bn: 'লোকাল আইজ' },
        title: { en: 'Send a local story', bn: 'এলাকার খবর পাঠান' },
        desc: { en: 'Citizen reports are verified by our district correspondents before anything is published.', bn: 'প্রকাশের আগে আমাদের জেলা প্রতিনিধিরা প্রতিটি নাগরিক প্রতিবেদন যাচাই করেন।' },
        ph: { en: 'What happened, and when?', bn: 'কী ঘটেছে, কখন?' },
        done: { en: 'Thank you. Our desk will verify story', bn: 'ধন্যবাদ। আমাদের ডেস্ক যাচাই করবে, প্রতিবেদন নম্বর' }
      }
    },

    ai: {
      greet: { en: "Hi! I'm your Press Assistant. Ask me to explain any story, define a term or summarise the day.", bn: 'স্বাগতম! আমি আপনার প্রেস সহকারী। যেকোনো খবর ব্যাখ্যা, কঠিন শব্দের মানে কিংবা দিনের সারাংশ—জিজ্ঞেস করুন।' },
      chips: [
        { en: "Explain today's top story", bn: 'আজকের প্রধান খবর বুঝিয়ে দাও' },
        { en: 'What is remittance?', bn: 'রেমিট্যান্স কী?' },
        { en: 'Summarise Five That Matter', bn: 'আলোচিত ৫ ঘটনার সারাংশ' }
      ],
      replies: [
        { en: 'The taka has held steady for months because more remittance is arriving through banks and import bills have eased. For you, that means imported goods are less likely to jump in price suddenly.', bn: 'ব্যাংকিং চ্যানেলে প্রবাসী আয় বাড়া এবং আমদানি ব্যয় কিছুটা কমায় কয়েক মাস ধরে টাকার মান স্থিতিশীল। ফলে আমদানি করা পণ্যের দাম হঠাৎ বেড়ে যাওয়ার আশঙ্কা কম।' },
        { en: "Remittance is money that Bangladeshis working abroad send home. It is one of the country's largest sources of foreign currency and helps keep reserves healthy.", bn: 'প্রবাসে কর্মরত বাংলাদেশিরা দেশে যে অর্থ পাঠান, সেটিই রেমিট্যান্স। এটি দেশের বৈদেশিক মুদ্রার অন্যতম বড় উৎস এবং রিজার্ভ শক্ত রাখতে সাহায্য করে।' },
        null // built from Five That Matter
      ],
      fallback: { en: "Good question! In the live version I'll answer from our verified reporting. For now, try one of the suggestions below.", bn: 'চমৎকার প্রশ্ন! চূড়ান্ত সংস্করণে আমাদের যাচাই করা প্রতিবেদন থেকে উত্তর দেব। আপাতত নিচের প্রস্তাবগুলোর একটি চেষ্টা করুন।' }
    }
  };

  /* ---------------- STATIC TEXT (data-bn) ---------------- */
  function applyStatic() {
    $$('[data-bn]').forEach((el) => {
      if (el.dataset.en === undefined) el.dataset.en = el.textContent.trim();
      el.textContent = lang === 'bn' ? el.dataset.bn : el.dataset.en;
    });
    $$('[data-bn-ph]').forEach((el) => {
      if (el.dataset.enPh === undefined) el.dataset.enPh = el.placeholder;
      el.placeholder = lang === 'bn' ? el.dataset.bnPh : el.dataset.enPh;
    });
  }

  /* ---------------- DATES ---------------- */
  const dhakaNow = () => {
    const d = new Date();
    return new Date(d.getTime() + (d.getTimezoneOffset() + 360) * 60000);
  };

  // Revised Bangladesh calendar (Pohela Boishakh = 14 April)
  function banglaDate(g) {
    const BN_MONTHS = ['বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'];
    const EN_MONTHS = ['Boishakh', 'Joishtho', 'Asharh', 'Shrabon', 'Bhadro', 'Ashwin', 'Kartik', 'Ogrohayon', 'Poush', 'Magh', 'Falgun', 'Choitro'];
    let y = g.getFullYear();
    const start = new Date(y, 3, 14);
    const day = new Date(g.getFullYear(), g.getMonth(), g.getDate());
    if (day < start) y -= 1;
    const s = new Date(y, 3, 14);
    let diff = Math.round((day - s) / 86400000);
    const leap = ((y + 1) % 4 === 0 && (y + 1) % 100 !== 0) || (y + 1) % 400 === 0;
    const lens = [31, 31, 31, 31, 31, 31, 30, 30, 30, 30, leap ? 30 : 29, 30];
    let m = 0;
    while (diff >= lens[m]) { diff -= lens[m]; m++; }
    const by = y - 593;
    return lang === 'bn'
      ? `${num(diff + 1)} ${BN_MONTHS[m]} ${num(by)} বঙ্গাব্দ`
      : `${diff + 1} ${EN_MONTHS[m]} ${by}`;
  }

  function renderDate() {
    const d = new Date();
    const loc = lang === 'bn' ? 'bn-BD' : 'en-GB';
    $('#today').textContent = d.toLocaleDateString(loc, { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', timeZone: 'Asia/Dhaka' });
    $('#clock').textContent = d.toLocaleTimeString(loc, { hour: '2-digit', minute: '2-digit', timeZone: 'Asia/Dhaka' });
    $('#bdate').textContent = banglaDate(dhakaNow());
  }

  /* ---------------- TICKER ---------------- */
  function renderTicker() {
    const html = DATA.ticker.map((x) => `<span class="tk-item">${t(x)}</span>`).join('');
    $('#tickerTrack').innerHTML = html + html;
  }

  /* ---------------- BRIEF ---------------- */
  let briefTime = 60;
  function renderBrief() {
    const cfg = DATA.briefCfg[briefTime];
    $('#bpLabel').textContent = t(cfg.label);
    $('#bpTitle').textContent = t(cfg.title);
    $('#bpList').dataset.count = cfg.count;
    $('#bpList').innerHTML = DATA.brief.slice(0, cfg.count).map((b, i) => `
      <li style="--i:${i}">
        <span class="bp-n">${num(pad(i + 1))}</span>
        <div>
          <span class="bp-cat">${t(b.cat)}</span>
          <h4>${t(b.title)}</h4>
          ${cfg.sum ? `<p>${t(b.sum)}</p>` : ''}
        </div>
      </li>`).join('');
    $('#bpBar').style.width = '0%';
  }

  function selectTime(sec) {
    stopAudio();
    briefTime = sec;
    $$('.time-card').forEach((c, i) => {
      c.classList.toggle('active', +c.dataset.time === sec);
      if (+c.dataset.time === sec) $('#timeSeg').dataset.i = i;
    });
    $$('.la-btn').forEach((b) => b.classList.toggle('active', +b.dataset.time === sec));
    renderBrief();
  }

  $$('.time-card').forEach((card) => card.addEventListener('click', () => selectTime(+card.dataset.time)));
  $$('.la-btn').forEach((b) => b.addEventListener('click', () => {
    selectTime(+b.dataset.time);
    $('#brief').scrollIntoView({ behavior: 'smooth' });
  }));

  /* ---------------- HANDS-FREE AUDIO ---------------- */
  let playing = false;
  let cur = -1;
  let token = 0; // invalidates callbacks from a cancelled utterance
  let fallbackTimer = null;
  const hasSpeech = 'speechSynthesis' in window;
  const items = () => $$('#bpList li');

  function setPlayIcon(on) {
    $('#bpPlay').classList.toggle('playing', on);
    $('#bpPlay').innerHTML = `<i class="ph-fill ${on ? 'ph-pause' : 'ph-play'}"></i>`;
  }

  function speakItem(i) {
    const list = items();
    if (i >= list.length) { stopAudio(true); return; }
    cur = Math.max(0, i);
    const my = ++token;
    if (hasSpeech) speechSynthesis.cancel();
    clearTimeout(fallbackTimer);

    list.forEach((li, k) => li.classList.toggle('active', k === cur));
    $('#bpBar').style.width = `${((cur + 1) / list.length) * 100}%`;

    const p = list[cur].querySelector('p');
    const text = `${list[cur].querySelector('h4').textContent}. ${p ? p.textContent : ''}`;
    const next = () => { if (playing && my === token) speakItem(cur + 1); };

    if (hasSpeech) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
      u.rate = 1;
      u.onend = next;
      speechSynthesis.speak(u);
    } else {
      fallbackTimer = setTimeout(next, 3500);
    }
  }

  function startAudio(from = 0) {
    playing = true;
    setPlayIcon(true);
    speakItem(from);
  }

  function stopAudio(finished = false) {
    playing = false;
    token++;
    if (hasSpeech) speechSynthesis.cancel();
    clearTimeout(fallbackTimer);
    setPlayIcon(false);
    if (!finished) { items().forEach((li) => li.classList.remove('active')); cur = -1; }
  }

  function step(d) {
    const n = Math.min(items().length - 1, Math.max(0, (cur < 0 ? 0 : cur + d)));
    startAudio(n);
  }

  $('#bpPlay').addEventListener('click', () => (playing ? stopAudio() : startAudio(cur < 0 ? 0 : cur)));
  $('#bpPrev').addEventListener('click', () => step(-1));
  $('#bpNext').addEventListener('click', () => step(1));

  const listenFromTop = () => {
    $('#brief').scrollIntoView({ behavior: 'smooth' });
    if (!playing) setTimeout(() => startAudio(0), 600);
  };
  $('#headerListen').addEventListener('click', listenFromTop);
  $('#laListen').addEventListener('click', listenFromTop);

  /* ---------------- VOICE COMMANDS ---------------- */
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  let rec = null;
  let listening = false;

  function setMic(on) {
    listening = on;
    $('#bpMic').classList.toggle('on', on);
    $('#micLabel').textContent = on ? L('Listening…', 'শুনছি…') : L('Voice commands', 'ভয়েস কমান্ড');
    $('#bpHint').textContent = on
      ? L('Say “next”, “previous”, “pause” or “play”.', 'বলুন “পরের খবর”, “আগের খবর”, “থামো” বা “শুরু করো”।')
      : '';
  }

  function handleCommand(said) {
    const s = said.toLowerCase();
    if (/next|skip|পরের|পরে/.test(s)) step(1);
    else if (/previous|back|আগের/.test(s)) step(-1);
    else if (/stop|pause|থাম|বন্ধ/.test(s)) stopAudio();
    else if (/play|start|resume|শুরু|চালাও|শোনাও/.test(s)) startAudio(cur < 0 ? 0 : cur);
  }

  function stopListening() {
    if (rec) { rec.onend = null; try { rec.stop(); } catch (e) {} }
    setMic(false);
  }

  $('#bpMic').addEventListener('click', () => {
    if (!SR) {
      $('#bpHint').textContent = L('Voice commands need Chrome or Edge.', 'ভয়েস কমান্ডের জন্য Chrome বা Edge ব্যবহার করুন।');
      return;
    }
    if (listening) { stopListening(); return; }
    rec = new SR();
    rec.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
    rec.continuous = true;
    rec.interimResults = false;
    rec.onresult = (e) => handleCommand(e.results[e.results.length - 1][0].transcript);
    rec.onerror = (e) => { if (e.error === 'not-allowed' || e.error === 'service-not-allowed') stopListening(); };
    rec.onend = () => { if (listening) { try { rec.start(); } catch (e) { setMic(false); } } };
    try { rec.start(); setMic(true); } catch (e) {}
  });

  /* ---------------- FIVE THAT MATTER ---------------- */
  let firstPaint = true;
  const rv = () => (firstPaint ? 'reveal' : 'reveal in');

  function renderFive() {
    const why = (f) => `<p class="f-why"><strong>${L('Why it matters', 'কেন গুরুত্বপূর্ণ')}</strong>${t(f.why)}</p>`;
    const foot = (f) => `<span class="f-foot"><i class="ph-light ph-clock"></i> ${readTime(f.min)}</span>`;
    const [lead, ...rest] = DATA.five;
    $('#pillars').innerHTML = `
      <article class="f-lead ${rv()}">
        <div class="f-media">
          <img src="${img(lead.seed)}" alt="" loading="lazy" />
          <span class="f-badge">${num('01')}</span>
        </div>
        <div class="f-body">
          <span class="f-cat">${t(lead.cat)}</span>
          <h3 class="f-title">${t(lead.title)}</h3>
          ${why(lead)}
          ${foot(lead)}
        </div>
      </article>
      <ol class="f-list">
        ${rest.map((f, i) => `
          <li class="f-item ${rv()}" style="--d:${(i + 1) * 90}ms">
            <span class="f-num">${num(pad(i + 2))}</span>
            <div class="f-body">
              <span class="f-cat">${t(f.cat)}</span>
              <h3 class="f-title">${t(f.title)}</h3>
              ${why(f)}
              ${foot(f)}
            </div>
            <img class="f-thumb" src="${img(f.seed)}" alt="" loading="lazy" />
          </li>`).join('')}
      </ol>`;
  }

  /* ---------------- EDITION ---------------- */
  function renderStories() {
    const [lead, ...side] = DATA.stories;
    $('#leadStory').innerHTML = `
      <a href="#">
        <div class="ls-media"><img src="${img(lead.seed, 1200, 750)}" alt="" /></div>
        <span class="kicker">${t(lead.cat)}</span>
        <h3>${t(lead.title)}</h3>
        <p>${t(lead.excerpt)}</p>
        <div class="meta">
          <span><i class="ph-light ph-user"></i> ${L('Staff Correspondent', 'নিজস্ব প্রতিবেদক')}</span>
          <span><i class="ph-light ph-clock"></i> ${readTime(lead.min)}</span>
          <span><i class="ph-light ph-headphones"></i> ${L('Listen', 'শুনুন')}</span>
        </div>
      </a>`;
    $('#sideStories').innerHTML = side.slice(0, 3).map((s) => `
      <a href="#" class="side-story">
        <div>
          <span class="kicker">${t(s.cat)}</span>
          <h4>${t(s.title)}</h4>
          <div class="meta"><span><i class="ph-light ph-clock"></i> ${readTime(s.min)}</span></div>
        </div>
        <div class="ss-media"><img src="${img(s.seed, 300, 300)}" alt="" loading="lazy" /></div>
      </a>`).join('');
  }

  /* ---------------- ACCOUNTABILITY ---------------- */
  function renderTracker() {
    $('#trackerList').innerHTML = DATA.tracker.map((tr) => `
      <article class="track-card">
        <div class="tc-top">
          <span class="tag">${t(tr.tag)}</span>
          <span class="tc-days"><i class="ph-light ph-eye"></i>
            ${L(`Tracking for ${tr.days} days`, `${num(tr.days)} দিন ধরে নজরে`)}
          </span>
        </div>
        <h3>${t(tr.title)}</h3>
        <ol class="steps">
          ${tr.steps.map((s) => `<li class="${s.s}"><span class="dot"></span><strong>${t(s.l)}</strong><small>${t(s.d)}</small></li>`).join('')}
        </ol>
      </article>`).join('');
  }

  function renderPromises() {
    $('#promiseList').innerHTML = DATA.promises.map((p) => `
      <article class="promise ${p.status}">
        <div class="pr-top">
          <span class="pr-owner"><i class="ph-light ph-bank"></i> ${t(p.owner)}</span>
          <span class="status ${p.status}">${t(DATA.promiseLabel[p.status])}</span>
        </div>
        <h3>${t(p.title)}</h3>
        <div class="pr-bar"><i style="width:${p.progress}%"></i></div>
        <div class="pr-meta"><span><strong>${num(p.progress)}%</strong> ${L('delivered', 'সম্পন্ন')}</span><span>${t(p.due)}</span></div>
      </article>`).join('');
  }

  $('#accTabs').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    $$('#accTabs button').forEach((x) => x.classList.toggle('active', x === b));
    $('#trackerList').hidden = b.dataset.tab !== 'follow';
    $('#promiseList').hidden = b.dataset.tab !== 'promise';
  });

  function renderProblems() {
    $('#problemList').innerHTML = DATA.problems.map((p, i) => `
      <div class="prob">
        <div>
          <h5>${t(p.title)}</h5>
          <div class="prob-meta">
            <span class="status ${p.status}">${t(DATA.statusLabel[p.status])}</span>
            <span><i class="ph-light ph-map-pin"></i> ${t(p.place)}</span>
          </div>
        </div>
        <button class="vote ${p.voted ? 'voted' : ''}" data-i="${i}" aria-label="Upvote">
          <i class="ph-light ph-arrow-fat-up"></i>${num(p.votes)}
        </button>
      </div>`).join('');
  }

  $('#problemList').addEventListener('click', (e) => {
    const btn = e.target.closest('.vote');
    if (!btn) return;
    const p = DATA.problems[+btn.dataset.i];
    p.voted = !p.voted;
    p.votes += p.voted ? 1 : -1;
    renderProblems();
  });

  /* ---------------- LOCAL EYES ---------------- */
  let currentDiv = 'all';
  function renderLocal() {
    $('#divChips').innerHTML = DATA.divisions.map((d) =>
      `<button class="chip ${d.id === currentDiv ? 'active' : ''}" data-div="${d.id}">${t(d)}</button>`).join('');

    const list = currentDiv === 'all' ? DATA.local.slice(0, 5) : DATA.local.filter((l) => l.div === currentDiv);
    const hasLead = list.length > 2;
    $('#localGrid').innerHTML = list.length
      ? list.map((l, i) => {
        const dv = DATA.divisions.find((d) => d.id === l.div);
        const lead = hasLead && i === 0;
        return `
          <article class="local-card ${lead ? 'lc-lead' : ''}" style="--i:${i}">
            <div class="lc-media"><img src="${img(l.seed)}" alt="" loading="lazy" /></div>
            <span class="lc-meta"><i class="ph-light ph-map-pin"></i> ${t(dv)} <span class="lc-time">· ${L(`${l.h}h ago`, `${num(l.h)} ঘণ্টা আগে`)}</span></span>
            <h4>${t(l.title)}</h4>
            ${lead && l.sum ? `<p>${t(l.sum)}</p>` : ''}
          </article>`;
      }).join('')
      : `<p class="lc-empty">${L('No stories from this division yet — be the first to send one.', 'এই বিভাগ থেকে এখনো কোনো খবর নেই—প্রথম খবরটি আপনিই পাঠান।')}</p>`;
  }

  $('#divChips').addEventListener('click', (e) => {
    const c = e.target.closest('.chip');
    if (!c) return;
    currentDiv = c.dataset.div;
    renderLocal();
  });

  /* ---------------- MY PRESS ---------------- */
  const prefs = store.get('bb-mypress', { topics: ['bangladesh', 'economy', 'technology'], region: 'all' });

  function renderMyPress() {
    $('#mpTopics').innerHTML = DATA.topics.map((tp) => {
      const on = prefs.topics.includes(tp.id);
      return `<button class="topic ${on ? 'on' : ''}" data-id="${tp.id}" aria-pressed="${on}"><i class="ph-light ${tp.icon}"></i>${t(tp)}</button>`;
    }).join('');
    $('#mpRegion').innerHTML = DATA.divisions.map((d) =>
      `<option value="${d.id}" ${d.id === prefs.region ? 'selected' : ''}>${d.id === 'all' ? L('All of Bangladesh', 'সারা বাংলাদেশ') : t(d)}</option>`).join('');

    const local = DATA.local.filter((l) => l.div === prefs.region)
      .map((l) => ({ topic: 'local', div: l.div, seed: l.seed, min: 3, title: l.title }));
    const list = [...local, ...DATA.feed.filter((f) => prefs.topics.includes(f.topic))].slice(0, 6);

    $('#mpCount').textContent = L(`${list.length} stories · updated just now`, `${num(list.length)}টি খবর · এইমাত্র হালনাগাদ`);
    $('#mpFeed').innerHTML = list.length
      ? list.map((f, i) => {
        const tag = f.topic === 'local'
          ? { icon: 'ph-map-pin', ...DATA.divisions.find((d) => d.id === f.div) }
          : DATA.topics.find((x) => x.id === f.topic);
        return `
          <a href="#" class="mp-item" style="--i:${i}">
            <img src="${img(f.seed, 200, 200)}" alt="" loading="lazy" />
            <div>
              <span class="mp-tag"><i class="ph-light ${tag.icon}"></i> ${t(tag)}</span>
              <h4>${t(f.title)}</h4>
              <small>${readTime(f.min)}</small>
            </div>
          </a>`;
      }).join('')
      : `<p class="mp-empty">${L('Pick at least one topic to build your front page.', 'আপনার প্রথম পাতা সাজাতে অন্তত একটি বিষয় বেছে নিন।')}</p>`;
  }

  $('#mpTopics').addEventListener('click', (e) => {
    const b = e.target.closest('.topic');
    if (!b) return;
    const id = b.dataset.id;
    prefs.topics = prefs.topics.includes(id) ? prefs.topics.filter((x) => x !== id) : [...prefs.topics, id];
    store.set('bb-mypress', prefs);
    renderMyPress();
  });
  $('#mpRegion').addEventListener('change', (e) => {
    prefs.region = e.target.value;
    store.set('bb-mypress', prefs);
    renderMyPress();
  });

  /* ---------------- KNOWLEDGE ---------------- */
  function renderKnowledge() {
    $('#knTracks').innerHTML = DATA.knowledge.map((k, i) => `
      <a href="#" class="kn-track" style="--i:${i}">
        <span class="ic-tile ${k.tone}"><i class="ph-light ${k.icon}"></i></span>
        <div>
          <h4>${t(k.title)}</h4>
          <p>${t(k.desc)}</p>
        </div>
        <span class="kn-count">${num(k.count)}+ <small>${t(k.unit)}</small></span>
        <i class="ph-light ph-arrow-right kn-go"></i>
      </a>`).join('');
  }

  /* ---------------- AUDIO WAVE + QR (decorative) ---------------- */
  function buildWave() {
    let html = '';
    for (let i = 0; i < 44; i++) {
      const h = 20 + Math.round(Math.abs(Math.sin(i * 0.7) * 60 + Math.cos(i * 1.9) * 20));
      html += `<i style="--h:${Math.min(h, 100)}%;--dl:${(i % 11) * -0.12}s"></i>`;
    }
    $('#wave').innerHTML = html;
  }

  function buildQR() {
    const N = 21;
    let seed = 7;
    const rnd = () => (seed = (seed * 9301 + 49297) % 233280) / 233280;
    const finder = (x, y) => {
      for (const [zx, zy] of [[0, 0], [N - 7, 0], [0, N - 7]]) {
        if (x >= zx && x < zx + 7 && y >= zy && y < zy + 7) {
          const dx = x - zx, dy = y - zy;
          return dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4);
        }
        if (x >= zx - 1 && x <= zx + 7 && y >= zy - 1 && y <= zy + 7) return false;
      }
      return null;
    };
    let html = '';
    for (let y = 0; y < N; y++) {
      for (let x = 0; x < N; x++) {
        const f = finder(x, y);
        const on = f !== null ? f : rnd() > 0.52;
        html += `<i${on ? ' class="on"' : ''}></i>`;
      }
    }
    $('#qr').innerHTML = html;
  }

  /* ---------------- FORMS: shared bits ---------------- */
  document.addEventListener('click', (e) => {
    const s = e.target.closest('.seg button');
    if (!s) return;
    $$('button', s.parentElement).forEach((b) => b.classList.toggle('active', b === s));
  });

  function showDone(form, done, html) {
    form.hidden = true;
    done.innerHTML = `<i class="ph-light ph-check-circle"></i><p>${html}</p>`;
    done.hidden = false;
  }

  /* Helpline — opens a ticket */
  $('#helpForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const id = randId('BBP', 5);
    showDone(e.target, $('#helpDone'),
      `${L('Ticket opened:', 'টিকেট খোলা হয়েছে:')} <strong>${num(id)}</strong>. ${L('A member of our reader desk will reply within 24 hours.', '২৪ ঘণ্টার মধ্যে আমাদের পাঠক ডেস্ক থেকে উত্তর দেওয়া হবে।')}`);
  });

  /* Feedback — star rating + suggestion */
  let rating = 0;
  const paintStars = (v) => $$('#stars button').forEach((b) => b.classList.toggle('on', +b.dataset.v <= v));
  $('#stars').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    rating = +b.dataset.v;
    paintStars(rating);
  });
  $('#stars').addEventListener('mouseover', (e) => { const b = e.target.closest('button'); if (b) paintStars(+b.dataset.v); });
  $('#stars').addEventListener('mouseleave', () => paintStars(rating));
  $('#fbForm').addEventListener('submit', (e) => {
    e.preventDefault();
    showDone(e.target, $('#fbDone'),
      `${L('Thank you', 'ধন্যবাদ')}${rating ? ` (${num(rating)}/${num(5)})` : ''}! ${L('Your feedback goes straight to the editors — we read every message.', 'আপনার মতামত সরাসরি সম্পাদকদের কাছে যায়—আমরা প্রতিটি বার্তা পড়ি।')}`);
  });

  /* Report a problem / Send a local story */
  const modal = $('#modal');
  let modalType = 'problem';

  function fillModal() {
    const m = DATA.modal[modalType];
    $('#mEyebrow').textContent = t(m.eyebrow);
    $('#mTitle').textContent = t(m.title);
    $('#mDesc').textContent = t(m.desc);
    $('#mMsg').placeholder = t(m.ph);
    const sel = $('#mDiv');
    const val = sel.value;
    sel.innerHTML = `<option value="" disabled ${val ? '' : 'selected'}>${L('Division', 'বিভাগ')}</option>` +
      DATA.divisions.filter((d) => d.id !== 'all').map((d) => `<option value="${d.id}" ${d.id === val ? 'selected' : ''}>${t(d)}</option>`).join('');
  }

  function openModal(type) {
    modalType = type;
    $('#mForm').reset();
    $('#mForm').hidden = false;
    $('#mDone').hidden = true;
    fillModal();
    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
    setTimeout(() => $('#mForm input').focus(), 250);
  }
  const closeModal = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); };

  document.addEventListener('click', (e) => {
    const r = e.target.closest('.js-report');
    if (r) openModal(r.dataset.type);
  });
  $('#modalX').addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
  $('#mForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const m = DATA.modal[modalType];
    showDone(e.target, $('#mDone'), `${t(m.done)} <strong>${num(randId(m.prefix))}</strong>.`);
  });

  /* ---------------- READERS' CLUB POLL ---------------- */
  let pollVote = store.get('bb-poll', null);
  function renderPoll() {
    const voted = pollVote !== null;
    const total = DATA.poll.reduce((s, o) => s + o.v, 0) + (voted ? 1 : 0);
    $('#pollList').innerHTML = DATA.poll.map((o, i) => {
      const v = o.v + (pollVote === i ? 1 : 0);
      const pct = Math.round((v / total) * 100);
      return `
        <button class="poll-opt ${pollVote === i ? 'voted' : ''}" data-i="${i}" ${voted ? 'disabled' : ''}>
          <span class="po-bar" style="width:${voted ? pct : 0}%"></span>
          <span class="po-label">${t(o)}</span>
          <span class="po-pct">${voted ? `${num(pct)}%` : ''}</span>
        </button>`;
    }).join('');
    $('#pollTotal').textContent = `${num(total.toLocaleString('en-US'))} ${L('votes', 'ভোট')}`;
  }
  $('#pollList').addEventListener('click', (e) => {
    const b = e.target.closest('.poll-opt');
    if (!b || pollVote !== null) return;
    pollVote = +b.dataset.i;
    store.set('bb-poll', pollVote);
    renderPoll();
  });

  $('#clubForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerHTML = `<i class="ph-light ph-check"></i> ${L('Welcome aboard!', 'স্বাগতম!')}`;
    e.target.reset();
  });

  /* ---------------- AI ASSISTANT ---------------- */
  const aiPanel = $('#aiPanel');
  const aiBody = $('#aiBody');

  function addMsg(text, who = 'bot') {
    const m = document.createElement('div');
    m.className = `msg ${who}`;
    m.textContent = text;
    aiBody.appendChild(m);
    aiBody.scrollTop = aiBody.scrollHeight;
    return m;
  }

  function botReply(text) {
    const typing = document.createElement('div');
    typing.className = 'msg bot';
    typing.innerHTML = '<span class="typing"><span></span><span></span><span></span></span>';
    aiBody.appendChild(typing);
    aiBody.scrollTop = aiBody.scrollHeight;
    setTimeout(() => { typing.remove(); addMsg(text); }, 900);
  }

  function fiveSummary() {
    const head = L("Today's Five That Matter:", 'আজকের আলোচিত ৫ ঘটনা:');
    return `${head}\n${DATA.five.map((f, i) => `${num(i + 1)}. ${t(f.title)}`).join('\n')}`;
  }

  function initAI() {
    aiBody.innerHTML = '';
    addMsg(t(DATA.ai.greet));
    $('#aiChips').innerHTML = DATA.ai.chips.map((c, i) => `<button data-i="${i}">${t(c)}</button>`).join('');
  }

  $('#aiChips').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const i = +b.dataset.i;
    addMsg(b.textContent, 'me');
    botReply(i === 2 ? fiveSummary() : t(DATA.ai.replies[i]));
  });

  $('#aiForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const input = e.target.querySelector('input');
    const q = input.value.trim();
    if (!q) return;
    addMsg(q, 'me');
    input.value = '';
    const lower = q.toLowerCase();
    if (lower.includes('remit') || q.includes('রেমিট')) botReply(t(DATA.ai.replies[1]));
    else if (lower.includes('reserve') || q.includes('রিজার্ভ')) botReply(t(DATA.ai.replies[0]));
    else if (lower.includes('five') || q.includes('৫') || q.includes('আলোচিত')) botReply(fiveSummary());
    else botReply(t(DATA.ai.fallback));
  });

  const openAI = () => aiPanel.classList.add('open');
  $('#aiFab').addEventListener('click', () => aiPanel.classList.toggle('open'));
  $('#aiClose').addEventListener('click', () => aiPanel.classList.remove('open'));
  $$('.js-open-ai').forEach((a) => a.addEventListener('click', (e) => { e.preventDefault(); openAI(); }));

  /* ---------------- SEARCH ---------------- */
  const searchOv = $('#searchOv');
  $('#openSearch').addEventListener('click', () => {
    searchOv.classList.add('open');
    setTimeout(() => searchOv.querySelector('input').focus(), 200);
  });
  $('#closeSearch').addEventListener('click', () => searchOv.classList.remove('open'));
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') { searchOv.classList.remove('open'); aiPanel.classList.remove('open'); closeModal(); }
  });

  /* ---------------- STICKY NAV MINI LOGO ---------------- */
  new IntersectionObserver(([entry]) => {
    $('#mainnav').classList.toggle('stuck', !entry.isIntersecting);
  }, { threshold: 0 }).observe($('#brand'));

  /* ---------------- REVEAL ON SCROLL ---------------- */
  const revealObs = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) { en.target.classList.add('in'); revealObs.unobserve(en.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
  const observeReveal = () => $$('.reveal:not(.in)').forEach((el) => revealObs.observe(el));

  /* ---------------- LANGUAGE ---------------- */
  function renderAll() {
    renderDate();
    renderTicker();
    renderBrief();
    renderFive();
    renderStories();
    renderTracker();
    renderPromises();
    renderProblems();
    renderLocal();
    renderMyPress();
    renderKnowledge();
    renderPoll();
    fillModal();
    initAI();
    observeReveal();
  }

  function setLang(l, animate = true) {
    const apply = () => {
      lang = l;
      try { localStorage.setItem('bb-lang', l); } catch (e) {}
      document.documentElement.lang = l;
      document.body.classList.toggle('lang-bn', l === 'bn');
      $('#langSwitch').dataset.active = l;
      $$('#langSwitch button').forEach((b) => b.classList.toggle('active', b.dataset.lang === l));
      stopAudio();
      stopListening();
      applyStatic();
      renderAll();
    };
    if (!animate) return apply();
    document.body.classList.add('switching');
    setTimeout(() => { apply(); document.body.classList.remove('switching'); }, 250);
  }

  $$('#langSwitch button').forEach((b) => b.addEventListener('click', () => {
    if (b.dataset.lang !== lang) setLang(b.dataset.lang);
  }));

  /* ---------------- INIT ---------------- */
  buildQR();
  buildWave();
  setLang(lang, false);
  firstPaint = false;
  setInterval(renderDate, 30000);

  // Loader: wait for page load (min 1.4s so the mark finishes building, max 3s)
  const minTime = new Promise((r) => setTimeout(r, 1400));
  const pageLoad = new Promise((r) => (document.readyState === 'complete' ? r() : window.addEventListener('load', r)));
  const maxTime = new Promise((r) => setTimeout(r, 3000));
  Promise.race([Promise.all([minTime, pageLoad]), maxTime]).then(() => {
    document.body.classList.remove('is-loading');
    document.body.classList.add('loaded');
  });
})();
