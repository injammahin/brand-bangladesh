// Vercel serverless function: /api/tts?tl=bn&q=...
// Fetches the Google Translate voice on the server. Google refuses these requests when they
// come straight from a website (it checks the Referer), so the browser can't call it directly.
const ALLOWED_LANGS = new Set(['bn', 'en', 'en-IN']);

module.exports = async (req, res) => {
  const { tl = 'bn', q = '' } = req.query || {};
  const text = String(q).trim();

  if (!ALLOWED_LANGS.has(tl) || !text || text.length > 200) {
    res.status(400).send('Bad request');
    return;
  }

  const url = 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob'
    + `&tl=${encodeURIComponent(tl)}&q=${encodeURIComponent(text)}`;

  try {
    const r = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36' }
    });
    if (!r.ok) { res.status(502).send(`Upstream ${r.status}`); return; }
    const audio = Buffer.from(await r.arrayBuffer());
    res.setHeader('Content-Type', 'audio/mpeg');
    // Same headline = same audio: let Vercel's CDN and the browser cache it
    res.setHeader('Cache-Control', 'public, max-age=86400, s-maxage=2592000, stale-while-revalidate=86400');
    res.status(200).send(audio);
  } catch (e) {
    res.status(502).send('Upstream error');
  }
};
