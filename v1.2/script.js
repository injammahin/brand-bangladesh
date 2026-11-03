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

  const t = (o) => (o && typeof o === 'object' ? o[lang] : o);
  const num = (v) => (lang === 'bn' ? String(v).replace(/\d/g, (d) => BN_DIGITS[d]) : String(v));
  const pad = (n) => String(n).padStart(2, '0');
  const img = (seed, w = 900, h = 650) => `https://picsum.photos/seed/${seed}/${w}/${h}`;
  const readTime = (m) => (lang === 'bn' ? `${num(m)} মিনিট পড়া` : `${m} min read`);

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
      { min: 4, cat: { en: 'Economy', bn: 'অর্থনীতি' }, title: { en: 'Why the taka is steadier than it has been in two years', bn: 'দুই বছরের মধ্যে টাকা এখন সবচেয়ে স্থিতিশীল কেন' }, why: { en: 'Import costs — and the price of your groceries — depend on it.', bn: 'আমদানি খরচ আর আপনার বাজারের দাম—দুটোই এর ওপর নির্ভর করে।' } },
      { min: 3, cat: { en: 'Education', bn: 'শিক্ষা' }, title: { en: 'New curriculum assessments begin in 12,000 schools', bn: '১২ হাজার বিদ্যালয়ে নতুন শিক্ষাক্রমের মূল্যায়ন শুরু' }, why: { en: 'Parents will see project grades replace some written exams.', bn: 'কিছু লিখিত পরীক্ষার বদলে প্রকল্পভিত্তিক মূল্যায়ন দেখবেন অভিভাবকেরা।' } },
      { min: 5, cat: { en: 'Climate', bn: 'জলবায়ু' }, title: { en: 'Coastal embankment plan gets its first funding round', bn: 'উপকূলীয় বাঁধ পরিকল্পনায় প্রথম দফা অর্থায়ন' }, why: { en: 'Over 4 million people live behind ageing embankments.', bn: 'পুরোনো বাঁধের ভরসায় বাস করেন ৪০ লাখেরও বেশি মানুষ।' } },
      { min: 3, cat: { en: 'Technology', bn: 'প্রযুক্তি' }, title: { en: 'Bangla AI voice tools go mainstream in public services', bn: 'সরকারি সেবায় ছড়িয়ে পড়ছে বাংলা এআই ভয়েস প্রযুক্তি' }, why: { en: 'Forms and helplines could soon understand spoken Bangla.', bn: 'শিগগিরই ফরম আর হেল্পলাইন বুঝবে মুখের বাংলা।' } },
      { min: 2, cat: { en: 'Health', bn: 'স্বাস্থ্য' }, title: { en: 'Upazila hospitals add evening outpatient hours', bn: 'উপজেলা হাসপাতালে চালু হচ্ছে সান্ধ্যকালীন বহির্বিভাগ' }, why: { en: "Working families can see a doctor without losing a day's pay.", bn: 'এক দিনের মজুরি না হারিয়েই ডাক্তার দেখাতে পারবেন শ্রমজীবী পরিবার।' } }
    ],

    stories: [
      { seed: 'tangail-loom', min: 7, cat: { en: 'Feature', bn: 'বিশেষ প্রতিবেদন' }, title: { en: 'The weavers of Tangail are rewriting the future of the saree', bn: 'তাঁতের শাড়ির ভবিষ্যৎ নতুন করে লিখছেন টাঙ্গাইলের তাঁতিরা' }, excerpt: { en: 'A new generation is pairing hand-looms with online storefronts — and finding buyers from Sylhet to Sydney.', bn: 'হস্তচালিত তাঁতের সঙ্গে অনলাইন দোকান জুড়ে দিচ্ছে নতুন প্রজন্ম—ক্রেতা মিলছে সিলেট থেকে সিডনি পর্যন্ত।' } },
      { seed: 'garment-bd', min: 4, cat: { en: 'Economy', bn: 'অর্থনীতি' }, title: { en: 'Garment exports rise 8% as new markets open', bn: 'নতুন বাজারে পোশাক রপ্তানি বেড়েছে ৮%' } },
      { seed: 'dhaka-canal', min: 5, cat: { en: 'Environment', bn: 'পরিবেশ' }, title: { en: "Dhaka's canals get a second life", bn: 'নতুন প্রাণ পাচ্ছে ঢাকার খালগুলো' } },
      { seed: 'folk-music', min: 3, cat: { en: 'Culture', bn: 'সংস্কৃতি' }, title: { en: 'A folk music revival fills concert halls', bn: 'লোকসংগীতের পুনর্জাগরণে মুখর মিলনায়তন' } },
      { seed: 'pace-academy', min: 3, cat: { en: 'Sports', bn: 'খেলা' }, title: { en: 'Inside the academy shaping the next pace attack', bn: 'আগামীর পেস আক্রমণ গড়ছে যে একাডেমি' } }
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
    ],

    problems: [
      { status: 'open', votes: 412, place: { en: 'Dhaka', bn: 'ঢাকা' }, title: { en: 'Broken streetlights on Tejgaon link road', bn: 'তেজগাঁও লিংক রোডে বিকল সড়কবাতি' } },
      { status: 'progress', votes: 287, place: { en: 'Rangpur', bn: 'রংপুর' }, title: { en: 'School without a boundary wall beside the highway', bn: 'মহাসড়কের পাশে সীমানাপ্রাচীরহীন বিদ্যালয়' } },
      { status: 'progress', votes: 655, place: { en: 'Chattogram', bn: 'চট্টগ্রাম' }, title: { en: 'Waterlogging after every rain at Muradpur', bn: 'প্রতি বৃষ্টিতে মুরাদপুরে জলাবদ্ধতা' } },
      { status: 'resolved', votes: 198, place: { en: 'Barishal', bn: 'বরিশাল' }, title: { en: 'Ticket overcharging at the ferry ghat', bn: 'ফেরিঘাটে টিকিটের বাড়তি দাম' } }
    ],
    statusLabel: {
      open: { en: 'Open', bn: 'অমীমাংসিত' },
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
      { div: 'dhaka', h: 1, seed: 'rooftop-garden', title: { en: "Old Dhaka's rooftop gardens cool the lanes below", bn: 'পুরান ঢাকার ছাদবাগান শীতল করছে নিচের গলি' } },
      { div: 'chattogram', h: 2, seed: 'hill-coffee', title: { en: 'Hill tracts coffee finds its first export buyer', bn: 'প্রথম রপ্তানি ক্রেতা পেল পার্বত্য অঞ্চলের কফি' } },
      { div: 'rajshahi', h: 3, seed: 'mango-farm', title: { en: 'Mango growers try cold storage for the first time', bn: 'প্রথমবার হিমাগার ব্যবহার করছেন আমচাষিরা' } },
      { div: 'khulna', h: 4, seed: 'mangrove-honey', title: { en: 'Sundarbans honey collectors get insurance cover', bn: 'বিমার আওতায় সুন্দরবনের মৌয়ালরা' } },
      { div: 'sylhet', h: 5, seed: 'tea-garden', title: { en: 'Tea garden schools add digital classrooms', bn: 'চা বাগানের স্কুলে ডিজিটাল ক্লাসরুম' } },
      { div: 'barishal', h: 6, seed: 'floating-market', title: { en: 'Floating guava markets draw weekend visitors', bn: 'ভাসমান পেয়ারা বাজারে সাপ্তাহিক পর্যটকের ভিড়' } },
      { div: 'rangpur', h: 7, seed: 'weaving-coop', title: { en: 'Women-led co-op revives Shataranji weaving', bn: 'নারীদের সমবায়ে প্রাণ ফিরছে শতরঞ্জিতে' } },
      { div: 'mymensingh', h: 8, seed: 'fish-farm', title: { en: 'Fish farmers adopt solar-powered aerators', bn: 'সৌরচালিত এয়ারেটর ব্যবহার করছেন মৎস্যচাষিরা' } }
    ],

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

  $$('.time-card').forEach((card) => card.addEventListener('click', () => {
    stopAudio();
    $$('.time-card').forEach((c) => c.classList.toggle('active', c === card));
    briefTime = +card.dataset.time;
    renderBrief();
  }));

  /* ---------------- HANDS-FREE AUDIO ---------------- */
  let playing = false;
  let fallbackTimer = null;
  const hasSpeech = 'speechSynthesis' in window;

  function setPlayIcon(on) {
    $('#bpPlay').classList.toggle('playing', on);
    $('#bpPlay').innerHTML = `<i class="fa-solid ${on ? 'fa-pause' : 'fa-play'}"></i>`;
  }

  function speakItem(i) {
    const items = $$('#bpList li');
    if (!playing) return;
    if (i >= items.length) { stopAudio(true); return; }
    items.forEach((li, k) => li.classList.toggle('active', k === i));
    items[i].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    $('#bpBar').style.width = `${((i + 1) / items.length) * 100}%`;
    const p = items[i].querySelector('p');
    const text = `${items[i].querySelector('h4').textContent}. ${p ? p.textContent : ''}`;

    if (hasSpeech) {
      const u = new SpeechSynthesisUtterance(text);
      u.lang = lang === 'bn' ? 'bn-BD' : 'en-US';
      u.rate = 1;
      u.onend = () => { if (playing) speakItem(i + 1); };
      speechSynthesis.speak(u);
    } else {
      fallbackTimer = setTimeout(() => speakItem(i + 1), 3500);
    }
  }

  function startAudio() {
    playing = true;
    setPlayIcon(true);
    speakItem(0);
  }

  function stopAudio(finished = false) {
    playing = false;
    if (hasSpeech) speechSynthesis.cancel();
    clearTimeout(fallbackTimer);
    setPlayIcon(false);
    if (!finished) $$('#bpList li').forEach((li) => li.classList.remove('active'));
  }

  $('#bpPlay').addEventListener('click', () => (playing ? stopAudio() : startAudio()));
  $('#headerListen').addEventListener('click', () => {
    $('#brief').scrollIntoView({ behavior: 'smooth' });
    if (!playing) setTimeout(startAudio, 600);
  });

  /* ---------------- FIVE THAT MATTER ---------------- */
  let firstPaint = true;
  const rv = () => (firstPaint ? 'reveal' : 'reveal in');

  function renderFive() {
    $('#pillars').innerHTML = DATA.five.map((f, i) => `
      <div class="pillar-wrap ${rv()}" style="--d:${i * 100}ms">
        <article class="pillar">
          <span class="p-num">${num(pad(i + 1))}</span>
          <span class="p-cat">${t(f.cat)}</span>
          <h3 class="p-title">${t(f.title)}</h3>
          <div class="p-why">
            <strong>${lang === 'bn' ? 'কেন গুরুত্বপূর্ণ' : 'Why it matters'}</strong>
            ${t(f.why)}
          </div>
          <div class="p-foot">
            <span><i class="fa-regular fa-clock"></i> ${readTime(f.min)}</span>
            <i class="fa-solid fa-arrow-right-long"></i>
          </div>
        </article>
      </div>`).join('');
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
          <span><i class="fa-regular fa-user"></i> ${lang === 'bn' ? 'নিজস্ব প্রতিবেদক' : 'Staff Correspondent'}</span>
          <span><i class="fa-regular fa-clock"></i> ${readTime(lead.min)}</span>
          <span><i class="fa-solid fa-headphones-simple"></i> ${lang === 'bn' ? 'শুনুন' : 'Listen'}</span>
        </div>
      </a>`;
    $('#sideStories').innerHTML = side.map((s) => `
      <a href="#" class="side-story">
        <div>
          <span class="kicker">${t(s.cat)}</span>
          <h4>${t(s.title)}</h4>
          <div class="meta"><span><i class="fa-regular fa-clock"></i> ${readTime(s.min)}</span></div>
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
          <span class="tc-days"><i class="fa-regular fa-eye"></i>
            ${lang === 'bn' ? `${num(tr.days)} দিন ধরে নজরে` : `Tracking for ${tr.days} days`}
          </span>
        </div>
        <h3>${t(tr.title)}</h3>
        <ol class="steps">
          ${tr.steps.map((s) => `<li class="${s.s}"><span class="dot"></span><strong>${t(s.l)}</strong><small>${t(s.d)}</small></li>`).join('')}
        </ol>
      </article>`).join('');
  }

  function renderProblems() {
    $('#problemList').innerHTML = DATA.problems.map((p, i) => `
      <div class="prob">
        <div>
          <h5>${t(p.title)}</h5>
          <div class="prob-meta">
            <span class="status ${p.status}">${t(DATA.statusLabel[p.status])}</span>
            <span><i class="fa-solid fa-location-dot"></i> ${t(p.place)}</span>
          </div>
        </div>
        <button class="vote ${p.voted ? 'voted' : ''}" data-i="${i}" aria-label="Upvote">
          <i class="fa-solid fa-arrow-up"></i>${num(p.votes)}
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

    const list = DATA.local.filter((l) => currentDiv === 'all' || l.div === currentDiv);
    $('#localGrid').innerHTML = list.map((l, i) => {
      const dv = DATA.divisions.find((d) => d.id === l.div);
      return `
        <article class="local-card" style="--i:${i}">
          <div class="lc-media"><img src="${img(l.seed, 600, 450)}" alt="" loading="lazy" /></div>
          <span class="lc-div"><i class="fa-solid fa-location-dot"></i> ${t(dv)}</span>
          <h4>${t(l.title)}</h4>
          <time>${lang === 'bn' ? `${num(l.h)} ঘণ্টা আগে` : `${l.h}h ago`}</time>
        </article>`;
    }).join('');
  }

  $('#divChips').addEventListener('click', (e) => {
    const c = e.target.closest('.chip');
    if (!c) return;
    currentDiv = c.dataset.div;
    renderLocal();
  });

  /* ---------------- QR (decorative) ---------------- */
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
    const head = lang === 'bn' ? 'আজকের আলোচিত ৫ ঘটনা:' : "Today's Five That Matter:";
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
    if (e.key === 'Escape') { searchOv.classList.remove('open'); aiPanel.classList.remove('open'); }
  });

  /* ---------------- CLUB FORM ---------------- */
  $('#clubForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('button');
    btn.innerHTML = `<i class="fa-solid fa-check"></i> ${lang === 'bn' ? 'স্বাগতম!' : 'Welcome aboard!'}`;
    e.target.reset();
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
    renderProblems();
    renderLocal();
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