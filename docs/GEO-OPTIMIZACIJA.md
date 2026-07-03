# GEO Master Spec — Generative Engine Optimization (Puterina Cakes)

> **Cilj:** kada potencijalni kupac pita AI asistenta (ChatGPT, Google AI Overviews,
> Gemini, Perplexity, Claude) „gde da naručim tortu u Beogradu", „najbolja domaća
> poslastičarnica za rođendansku tortu" i sl. — da AI **pomene i citira Puterinu** kao
> izvor.
>
> **Status:** specifikacija/zahtevi. Ovo je *šta i kako*, prioritizovano. **Implementacija
> ide u dev fazi** — ovaj dokument se NE kodira sada; služi da znamo tačno šta radimo kad
> dođe vreme. Isti playbook se primenjuje i na **Bravo Domaćine** (vidi taj projekat).
>
> **Stack kontekst:** Next.js 16 (App Router, SSR/SSG) + Sanity CMS. Domen
> `https://puterinacakes.rs`. Sve preporuke su prilagođene ovom stacku, ne WordPress-u.
>
> **Princip (od korisnika):** ne preterivati. Uraditi tačno onoliko koliko nosi efekat;
> ne implementirati spekulativno. Prioriteti P0/P1/P2 ispod služe upravo tome.

---

## 0. Kako AI engine bira šta će citirati (mentalni model)

Da bismo optimizovali pravu stvar, treba razumeti lanac:

1. **Crawl** — AI crawler (npr. `OAI-SearchBot`, `PerplexityBot`) dođe na sajt i pročita
   HTML. Vidi **kod, ne sliku**. Ako je sadržaj iza JS-a koji se ne renderuje server-side,
   crawler ga možda ne vidi.
2. **Index / embedding** — sadržaj se isparsira, iseče na **pasuse (chunks)** i smesti u
   indeks / vektorsku bazu (RAG).
3. **Retrieve** — kad korisnik postavi pitanje, engine povuče najrelevantnije *pasuse*,
   ne cele stranice.
4. **Generate + cite** — model sastavi odgovor i **citira** izvore kojima „veruje"
   (potkrepljeni podacima, jasni, autoritativni).

Iz ovoga slede tri poluge, redom po uticaju:
**(A) tehnička pristupačnost** (da nas crawler uopšte vidi) → **(B) strukturirani podaci**
(da lako razume činjenice) → **(C) sadržaj i pisanje** (da baš naš pasus bude izabran i
citiran). (C) nosi najveći sadržajni ROI prema istraživanju [§ Izvori, Princeton GEO].

---

## 1. GEO vs SEO i očekivanja

GEO **ne zamenjuje** SEO — nadograđuje ga. Jak SEO temelj (domen autoritet, čist HTML,
brzina, struktuirani podaci, backlinkovi) **pozitivno korelira** sa šansom da te AI citira.
Ključne razlike:

- SEO cilja **plavi link / rang**; GEO cilja **da uđeš u sam AI odgovor** (citat).
- SEO se istorijski oslanja na **backlinkove**; GEO dodatno na **brand mentions i
  atribucije** — pominjanje imena bez obaveznog linka.

> GEO je **dugoročan** kanal i meri se mesecima. Realno očekivanje: prvo dolaze crawl-ovi i
> pokoji citat, pa rast AI referral saobraćaja. Nema „preko noći" efekta.

---

## 2. Trenutno stanje Puterine (polazna osnova)

Sajt već ima dobar temelj — zahtevi **nadograđuju**:

| Oblast | Stanje | Fajl / napomena |
|---|---|---|
| SSR/SSG render (crawler vidi HTML) | ✅ ima | Next.js App Router — ključno, već radimo dobro |
| `robots.ts` (dozvoljava sve, `*`) | ✅ ima | `app/robots.ts` — AI botovi nisu blokirani, ali nisu ni eksplicitni |
| `sitemap.ts` (dinamički iz Sanity) | ✅ ima | `app/sitemap.ts` |
| Meta / OpenGraph / canonical | ✅ ima | `app/layout.tsx` |
| FAQ stranica + `FAQPage` JSON-LD | ✅ ima | `app/faq` + Sanity `faq` schema |
| `Product` JSON-LD | ✅ ima | `app/proizvod/[slug]` |
| Stranica „Utisci" (recenzije) | ⚠️ delimično | `app/utisci` — testimonijali hardkodovani, bez `Review`/`AggregateRating` schema |
| **`Organization`/`LocalBusiness` (Bakery) sitewide** | ❌ nema | najveća tehnička praznina za brand-entitet |
| **`BreadcrumbList`** | ❌ nema | — |
| **`llms.txt`** | ❌ nema | — |
| **AEO stil sadržaja u FAQ/opisima** | ⚠️ delimično | primeniti §6 pravila |
| **Merenje AI referral saobraćaja (GA4)** | ❌ nema | analytics još nije postavljen |

---

## 3. DEO A — Tehnička pristupačnost (crawlability) · **P0**

### A1 — AI crawler pristup (`robots.txt`)
**Šta:** eksplicitno dozvoliti AI crawlere i potvrditi da ništa ključno nije slučajno
blokirano. Trenutni `*` ih *tehnički* već pušta, ali eksplicitnost je jasnija i otpornija.

**Kako (dev faza):** u `app/robots.ts` zadržati `allow: "/"` za `*`, plus po želji dodati
imenovane grupe za AI botove (radi jasnoće i lakšeg log-praćenja). Bitni botovi 2026:

| Bot | Vlasnik | Tip | Za GEO |
|---|---|---|---|
| `OAI-SearchBot` | OpenAI | search-time (ChatGPT pretraga) | **dozvoli** — daje citate |
| `ChatGPT-User` | OpenAI | live fetch (na akciju korisnika) | **dozvoli** |
| `GPTBot` | OpenAI | training | dozvoli (brand u budućim modelima) |
| `PerplexityBot` | Perplexity | search index | **dozvoli** |
| `Perplexity-User` | Perplexity | live fetch | **dozvoli** |
| `ClaudeBot` | Anthropic | training | dozvoli |
| `Claude-SearchBot` / `Claude-User` | Anthropic | search / live | **dozvoli** |
| `Googlebot` | Google | klasičan + AI Overviews | **dozvoli** (već je) |
| `Google-Extended` | Google | *kontrolni token* za Gemini training | dozvoli; **napomena:** nije zaseban fetcher — kontroliše da li se sadržaj koristi za Gemini; za AI Overviews dovoljan je `Googlebot` |
| `Applebot-Extended` | Apple | training kontrola | po izboru |

> Za poslastičarnicu cilj je **maksimalna vidljivost**, pa dozvoljavamo i search-time i
> training crawlere. (Blokiranje ima smisla samo kad štitiš ekskluzivan sadržaj — nije naš
> slučaj.) ⚠️ Anti-pattern: slučajno `Disallow` na CSS/JS/slike — crawler tad ne vidi
> renderovan sadržaj.

### A2 — `llms.txt`
**Šta:** Markdown fajl na rutu `/llms.txt` koji LLM-ovima daje **kuriran pregled** brenda i
linkove ka ključnim stranicama (standard Jeremyja Howarda / Answer.AI). Komplementaran je
sa `robots.txt` i `sitemap.xml` — nije zamena.

**Format (po spec-u):** H1 (ime), `>` blockquote sažetak, opcioni pasusi, pa `##` sekcije sa
listama linkova `[naziv](url): opis`. Za e-commerce: objasniti proizvode i politike
(dostava, poručivanje, cene-na-upit).

**Kako (dev faza):** `public/llms.txt` ili `app/llms.txt/route.ts` (dinamički iz Sanity da
ostane svež). Sadržaj orijentaciono: ime + jednorečenični opis brenda; sekcije „Proizvodi"
(katalog + ključne torte), „Česta pitanja" (link na FAQ), „Poručivanje i dostava",
„Kontakt". Kratko, tačno, bez marketinškog šuma.

### A3 — Render, sitemap, performanse
- **Render:** ključni sadržaj (opisi, FAQ, cene/uslovi) mora biti u **server-renderovanom
  HTML-u** (SSR/SSG) — Next.js to već radi; pravilo je: ne stavljati ključne činjenice u
  client-only komponente koje se popunjavaju tek u browseru.
- **Sitemap:** već dinamičan; održavati da pokriva sve proizvode i stranice (već radi).
- **Performanse:** brz, čist HTML pomaže i crawl i SEO (Core Web Vitals). Bez teških
  client bundle-ova za sadržajne stranice.

---

## 4. DEO B — Strukturirani podaci (schema.org JSON-LD) · **P0–P1**

JSON-LD je način da modelu **doslovno serviraš činjenice** u formatu koji lako parsira.
Cilj: svaka važna stranica ima odgovarajući tip. (Validacija: Google Rich Results Test +
Schema.org validator.)

- **B1 · `Organization` + `LocalBusiness`/`Bakery` (sitewide) — P0.** Identitet brenda:
  ime, logo, `url`, `telephone`, `address` (Beograd), `openingHours`, `sameAs` (Instagram i
  ostale mreže), `priceRange`, `areaServed`. Postaviti jednom globalno (npr. u `layout.tsx`).
  *Zašto:* ovo je „lična karta" koju AI vezuje za entitet „Puterina".
- **B2 · `Product` (postoji) — P1, proširiti.** Dodati gde realno postoji: `brand`,
  `offers` (sa `priceCurrency: RSD`, dostupnost), i kad bude recenzija — `aggregateRating` +
  `review`. *Napomena:* ne izmišljati ocene; dodati tek kad ima pravih utisaka.
- **B3 · `FAQPage` (postoji) — održavati.** Svaka FAQ stavka = `Question` + `acceptedAnswer`.
  Sadržaj pisati po §6.
- **B4 · `BreadcrumbList` — P1.** Na podstranicama (katalog → proizvod). Pomaže razumevanju
  strukture i daje lepše citate.
- **B5 · opciono (P2):** `WebSite` (+ ime sajta), `ImageObject` za ključne fotografije,
  `Article`/`BlogPosting` **ako** se uvede blog (recepti/vodiči — vrlo dobar GEO kanal).

---

## 5. DEO C — Sadržaj i pisanje (najveći ROI) · **P1**

Princeton GEO istraživanje (KDD 2024, 9 metoda × 10.000 upita) je pokazalo da **način
pisanja** menja vidljivost u AI odgovorima i do ~40%. Najjače poluge:

### C1 — Statistike, citati izvora i navodi eksperata
Tri najefikasnije tehnike iz papera. Za svaki ključni odgovor/opis, gde je istinito:

- **Konkretne statistike i brojevi.** (Dodavanje statistika je bilo među najjačim
  pojedinačnim potezima u istraživanju.) Npr. rok izrade u danima, broj realizovanih
  porudžbina, godine iskustva — **samo proverljivo**.
- **Citiranje pouzdanih izvora.** Vezati tvrdnju za priznat izvor → model ceo sadržaj
  tretira kao pouzdaniji.
- **Navodi eksperata.** Kad je relevantno, citat osobe sa kredibilitetom nosi veću težinu.

> ⚠️ **Provenance pravilo (naš projekat):** nikad ne izmišljati brojeve/citate radi „GEO
> efekta". Lažna statistika = gubitak kredibiliteta i rizik. Bolje manje, ali tačno.

### C2 — Samostalni pasusi (RAG-friendly)
Engine izvlači **pasus po pasus**. Svaki pasus mora da stoji sam za sebe:
izbegavati „mi/naša cena/naša dostava" bez konteksta → umesto „naša dostava je…" →
„**Puterina** dostavlja torte u Beogradu…". Tako citat ima smisla i van stranice.

### C3 — Odgovor odmah (front-loading)
- Prvih ~200 reči stranice/sekcije **direktno odgovaraju** na glavno pitanje, ne grade uvod.
- Prva rečenica ispod naslova = **definicija u stilu rečnika** (glossary-style), koju model
  lako izvuče.

### C4 — Q&A i tabele
- **Q&A blokovi** su format koji LLM najpouzdanije izvlači → zato je FAQ tako vredan.
- Za poređenja („koja torta za koju priliku", „X vs Y") **tabele** su među najcitiranijim
  formatima u AI odgovorima.

### C5 — Pokrivenost FAQ-a (realna pitanja)
FAQ treba da odgovara na **prava pitanja koja kupci kucaju u ChatGPT**: poručivanje, rokovi,
dostava (zone/cena), sastojci i alergeni, cene/„cena na upit", prilagođene/tematske torte,
veličine/porcije, plaćanje. Pitanja generisati iz: realnih upita klijentkinje (WhatsApp/
Instagram DM), „People Also Ask", i AI brainstorma. Svaki odgovor po C1–C3.

### C6 — E-E-A-T i poverenje
Jasna „O nama" priča, autor/brend identitet, vidljiv kontakt (NAP: Name-Address-Phone),
radno vreme, realne fotografije. AI favorizuje izvore koji deluju pouzdano i koji **sami
citiraju** proverljive podatke (postaju „trusted hub").

### C7 — Svežina (freshness)
AI sistemi favorizuju svež sadržaj — postoji „~3 meseca citation cliff". Ključne stranice
povremeno osvežavati (datum ažuriranja, nove torte, sezonske ponude).

---

## 6. DEO D — Off-site / autoritet · **P1–P2** (operativno, van koda)

- **D1 · Recenzije (P1).** Prikupljati recenzije na izvorima koje LLM skenira; za Srbiju
  prioritet **Google Business Profile**, plus po potrebi Facebook i relevantni lokalni
  direktorijumi. (GBP proces je već u planu — PLAN-REDIZAJNA T6.11.) Recenzije sa nezavisnih
  izvora jačaju kredibilitet entiteta.
- **D2 · Brand mentions (P1).** Pominjanje imena „Puterina" na visoko-autoritativnim
  izvorima koje LLM rado skenira: **Reddit, LinkedIn, YouTube**. Link nije obavezan. Možemo
  sami kreirati citate (LinkedIn objave, YouTube video sa transkriptom). Konzistentan NAP
  svuda (isto ime, adresa, telefon).
- **D3 · Prisustvo na „trusted" izvorima (P2).** Lokalni portali, relevantni katalozi,
  (eventualno) Wikipedia/Wikidata ako brend dostigne značaj. *Napomena:* Instagram/TikTok
  slabo pomažu GEO-u (sadržaj iza login-zida) — korisni za marketing, ne za citate.

---

## 7. DEO E — Merenje · **P1**

„What gets measured gets done." Bez merenja ne znamo da li GEO radi.

- **E1 · GA4 AI referral tracking.** Postaviti GA4 i pratiti referral saobraćaj sa LLM
  domena (`chatgpt.com`, `perplexity.ai`, `gemini.google.com`, `claude.ai`, `copilot.
  microsoft.com`…) — npr. custom channel grupa / segment. Pratiti **trend mesec-po-mesec**.
- **E2 · Crawler log monitoring.** Proveravati (server/hosting logovi ili Vercel analytics)
  da li `OAI-SearchBot`, `PerplexityBot`, `GPTBot` itd. uopšte dolaze i šta čitaju.
- **E3 · Prompt-based vidljivost (P2, opciono).** Periodično pitati same asistente realna
  pitanja i beležiti da li/kako pominju Puterinu. Za automatizaciju postoje alati (Otterly.ai,
  Semrush AI Toolkit, Ahrefs Brand Radar) — uvesti tek ako bude potrebe/budžeta.

---

## 8. Prioriteti (sažeto) — mapa zahtev → fajl

| P | Zahtev | Gde (dev faza) |
|---|---|---|
| **P0** | A1 AI crawler pristup (eksplicitno) | `app/robots.ts` |
| **P0** | B1 `Organization`/`LocalBusiness` sitewide | `app/layout.tsx` (+ `lib/`) |
| **P0** | A3 ključni sadržaj SSR (drži se postojećeg) | cele app rute |
| **P1** | A2 `llms.txt` | `public/llms.txt` ili `app/llms.txt/route.ts` |
| **P1** | C1–C7 AEO sadržaj (FAQ + opisi) | Sanity (`faq`, `product`) + stranice |
| **P1** | B4 `BreadcrumbList` | podstranice |
| **P1** | B2 `Product` proširenje (offers/rating) | `app/proizvod/[slug]` |
| **P1** | E1 GA4 + AI referral | analytics setup |
| **P1** | D1/D2 recenzije + brand mentions | operativno (van koda) |
| **P2** | B5 blog/Article schema, E3 alati, D3 | po potrebi |

---

## 9. Šta NE raditi (anti-patterns)

- **Keyword stuffing** — u Princeton istraživanju nije pomagao; može i da šteti.
- **Izmišljene statistike/citati** — kredibilitet i pravni rizik.
- **Cloaking** (drugačiji sadržaj za botove nego za ljude) — kažnjivo, gubi poverenje.
- **Slučajno blokiranje** AI botova ili CSS/JS u `robots` — sadržaj postaje nevidljiv.
- **Sve odjednom / prerano** — implementirati po prioritetima u dev fazi, ne sad.

---

## 10. Izvori

- **GEO: Generative Engine Optimization** — Aggarwal, Murahari, Rajpurohit, Kalyan,
  Narasimhan, Deshpande (Princeton/Georgia Tech), KDD 2024. 9 metoda × GEO-bench (10.000
  upita); citati/navodi/statistike ↑ vidljivost do ~40%; statistike među najjačima.
  https://collaborate.princeton.edu/en/publications/geo-generative-engine-optimization/
- **llms.txt standard** — Jeremy Howard / Answer.AI (2024). https://llmstxt.org/
- **AI crawler landscape 2026** (GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot,
  Claude-SearchBot, PerplexityBot, Google-Extended, Applebot-Extended; training vs
  search-time). Momentic / No Hacks / Contently reference (2026).
- **GEO best practices 2026** (front-loading 200 reči, glossary-rečenice, Q&A + tabele,
  trusted-hub citiranje, freshness „3-month cliff", merni alati Otterly/Semrush/Ahrefs).
  Backlinko, Enrich Labs i dr. (2026).
- **Polazni video:** „How to Get ChatGPT to Recommend Your Business (Full GEO Tutorial)" —
  Helena Liu (YouTube `20pTTT8jcEw`).

---

*Dokument je spec (šta i kako), ne implementacija. Sledeće: isti playbook za Bravo Domaćine,
pa — kad dođe dev faza — implementacija po prioritetima P0→P2.*
