# SEO Setup Guide för Willys Rabattkoll

## ✅ Klart (Implementerat)

### 1. Meta Tags & Structured Data
- ✅ Optimerade title och description med nyckelord
- ✅ Open Graph tags för social media (Facebook, LinkedIn)
- ✅ Twitter Card tags
- ✅ JSON-LD structured data för sökmotorer
- ✅ Keywords: "willys rabatt", "störst rabatt willys", etc.
- ✅ robots.txt (tillåter all indexering)
- ✅ sitemap.xml (för bättre crawling)
- ✅ manifest.json (PWA-support)
- ✅ Canonical URL

### 2. Tekniska Förbättringar
- ✅ Språkinställning (lang="sv")
- ✅ Robots meta tag (index, follow)
- ✅ Responsive viewport

## 📋 Nästa Steg (Gör detta!)

### 1. Skapa en Social Media-bild (OG Image)
Skapa en bild (1200x630px) som heter `og-image.png` och lägg den i `frontend/public/`
- Inkludera logotypen "WiLLY:S"
- Text: "Hitta Störst Rabatt"
- Använd Canva, Figma eller liknande

### 2. Google Search Console (VIKTIGT!)
1. Gå till https://search.google.com/search-console
2. Lägg till property: `https://willys-rabattkoll.vercel.app`
3. Verifiera via HTML-tag (lägg till meta tag) ELLER DNS
4. Skicka in sitemap: `https://willys-rabattkoll.vercel.app/sitemap.xml`
5. Vänta 1-2 veckor på indexering

**HTML Verification (enklast):**
```html
<!-- Lägg till i <head> efter att du fått koden från Search Console -->
<meta name="google-site-verification" content="DIN_KOD_HÄR" />
```

### 3. Google Analytics (Valfritt men rekommenderat)
1. Skapa ett GA4-konto: https://analytics.google.com
2. Få din Measurement ID (G-XXXXXXXXXX)
3. Lägg till detta i `index.html` innan `</head>`:

```html
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

### 4. Prestanda-optimering
Testa din sida på:
- https://pagespeed.web.dev/
- Sikta på 90+ poäng

**Snabba fixar:**
```bash
cd frontend
npm install --save-dev compression-webpack-plugin
```

Lägg till i `package.json` scripts:
```json
"analyze": "react-scripts build && source-map-explorer 'build/static/js/*.js'"
```

### 5. Innehållsförbättringar
- Lägg till en "Om"-sektion med text om hur appen fungerar
- Skapa en FAQ eller tips-sektion
- Använd nyckelord naturligt: "willys rabatt", "störst rabatt", "vecka X"
- Uppdatera sitemap.xml datum varje vecka (automatisera om möjligt)

### 6. Backlinks & Marknadsföring
**Dela på:**
- Reddit: r/sweden, r/Sverige
- X (Twitter): Använd #WillysRabatt #Matrabatter
- Facebook-grupper för sparande/rabatter
- Flashback trådar om matpriser
- LinkedIn (personligt inlägg om projektet)

**Skriv innehåll:**
- Blogg-post på Medium/dev.to: "Hur jag byggde en Willys-rabatttracker"
- Länka tillbaka till din sida

### 7. Custom Domain (Rekommenderas starkt!)
Köp en egen domän för bättre SEO:
- willysrabattkoll.se (ca 100 kr/år på Loopia/Binero)
- Koppla via Vercel: Settings → Domains → Add

Domäner rankar **mycket** bättre än vercel.app subdomäner!

### 8. Uppdatera vercel.json
Lägg till headers för bättre caching och SEO:

```json
{
  "version": 2,
  "builds": [...],
  "routes": [...],
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options",
          "value": "DENY"
        },
        {
          "key": "X-XSS-Protection",
          "value": "1; mode=block"
        }
      ]
    },
    {
      "source": "/static/(.*)",
      "headers": [
        {
          "key": "Cache-Control",
          "value": "public, max-age=31536000, immutable"
        }
      ]
    }
  ]
}
```

## 🚀 Deploy-instruktioner

```bash
cd frontend
npm run build
git add .
git commit -m "SEO improvements: meta tags, robots.txt, sitemap, structured data"
git push
```

Vercel kommer auto-deploya!

## 📊 Förväntat Resultat

- **Vecka 1-2:** Google indexerar sidan
- **Vecka 3-4:** Syns i sökresultat för "willys rabattkoll"
- **Månad 2-3:** Bättre ranking för "willys rabatt", "störst rabatt willys"

## 🔍 Monitoring

Efter 2 veckor, kolla:
1. Google Search Console → Performance (impressions & clicks)
2. Sök "site:willys-rabattkoll.vercel.app" på Google
3. PageSpeed Insights-score

## 📝 Kommande Förbättringar

- [ ] Lägg till mer text-innehåll (inte bara produktlistor)
- [ ] Skapa separata sidor för olika kategorier
- [ ] Blogg-sektion med spartips
- [ ] Weekly newsletter (e-postlista)
- [ ] Progressive Web App (PWA) - redan manifest.json finns!

---

**Viktigt:** När du pushat ändringarna, skicka gärna länken på sociala medier med:
> "🎉 Lanserar Willys Rabattkoll - hitta störst rabatt automatiskt! willys-rabattkoll.vercel.app #WillysRabatt #Matrabatter"

Lycka till! 🚀
