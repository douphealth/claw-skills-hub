# Amazon Commission Fix: Implementation Pack (2026-11-25)

Scope: Plantastic Haven quick wins before Black Friday (Nov 27) and Cyber Monday (Nov 30), plus the diagnosis for the portfolio.
Permission level: P1 (draft). Nothing below has been published. Each change is a reversible post edit.

---

## 1. Evidence (all checked today)

| Fact | Source | Status |
|---|---|---|
| MTD: 458 clicks, 17 items, $8.91, so **$0.019 per click** and **$0.52 per item** | Your Associates screenshot | Confirmed |
| Google organic clicks for **all** sites, Nov 11–24: **72 in total** (Plantastic Haven 57, OutdoorMisting 8, GearUpToGrow 3, AMFS 2, GearUpToFit 1, the rest 0) | GSC via Supermetrics | Confirmed |
| GearUpToFit: 21 impressions in 14 days. US ranking keywords went 100 (May) → 37 (Jun) → 7 (Jul) → 0 (Aug–Nov 2026) | GSC and DataforSEO history | Confirmed |
| `site:gearuptofit.com` returns only the homepage | Live Google SERP (DataforSEO) | Confirmed |
| GearUpToFit has no technical blocker: posts return 200, canonicals point to themselves, no X-Robots noindex, robots.txt allows crawling | curl as Googlebot | Confirmed |
| GearUpToFit sitemaps list 498 posts, 273 `watch-match` URLs, 28 pages and 3 lovable URLs. A second WordPress post sitemap lists 186 URLs | Live sitemaps | Confirmed |
| Cause of the GearUpToFit loss: a sitewide quality/scaled-content demotion, or a manual action | Inference | Hypothesis. Check GSC → Manual actions |
| Plantastic Haven ranking keywords: 188 (Nov 2025) → 478 (Nov 2026) | DataforSEO | Confirmed |
| On every Plantastic Haven money page checked, the **first Amazon link sits 60–72% of the way down the page**. Most mobile readers never scroll that far | HTML audit of 7 pages | Confirmed |
| `string-of-pearls-plant-care`: 465 impressions/14d for "string of pearls indoor care" at position 8.9, **0 Amazon links, no meta description** | GSC and HTML | Confirmed |
| `how-to-start-a-philodendron`: "how to grow philodendron" (440 impressions, position 8.7) and "when to plant philodendron" (316, position 8.2) brought **0 clicks**. The title doesn't match either query | GSC | Confirmed |
| Each site has its own tracking ID: `papalex-ph-20`, `papalex-gutf-20`, `papalex-mgg-20` | HTML | Confirmed |
| `amazon.com/deals?tag=papalex-ph-20` currently redirects to `/blackfriday` and keeps the tag | curl | Confirmed |
| Amazon clicks (~18/day) are about 3.5× all Google organic clicks (~5/day), so most Amazon clicks come from something other than Google organic | Arithmetic on the rows above | Likely. Source unknown, see step 2 |

**Bottom line:** conversion (3.71%) isn't the problem. You have two problems:
1. **Traffic is missing.** Your only high-ticket site, GearUpToFit (running shoes cost about $140 each, versus about $15 for a plant product), has been out of Google since August.
2. **Placement is weak.** On the one growing site, the links sit where nobody reaches them, and the cheapest products are the ones shown.

---

## 2. Do today (≈90 min): Plantastic Haven above-the-fold boxes

Paste each block into Classic Editor in **Text** mode. Every ASIN below is already on that page, and the product names come from the page's own image alt text. Amazon answered HTTP 200 for these ASINs today. Stock was not verified, so open each link once before you publish.

### 2a. `/how-cold-can-philodendron-tolerate/` (position 4.0, 518 impressions)
Placement: directly after the opening answer paragraph, before the first H2.

```html
<div style="border:1px solid #d6e4d6;border-left:4px solid #2f7d32;background:#f6faf6;padding:14px 16px;margin:18px 0;border-radius:6px">
<p style="margin:0 0 8px;font-weight:700">Keeping a philodendron warm this winter: 3 tools that help</p>
<ul style="margin:0 0 10px 18px;padding:0">
<li><a href="https://www.amazon.com/dp/B01H1R0K68?tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">TempPro TP50 digital thermometer &amp; hygrometer</a>: measure the temperature at the plant itself. A windowsill at night can be much colder than the thermostat reading.</li>
<li><a href="https://www.amazon.com/dp/B09234GQXV?tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">Bamworld plant stand</a>: lifts pots off cold floors and away from drafty glass.</li>
<li><a href="https://www.amazon.com/dp/B00P7U259C?tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">VIVOSUN seedling heat mat (10" × 20.75")</a>: gentle bottom warmth for a small pot in a cool room.</li>
</ul>
<p style="margin:0 0 6px"><a href="https://www.amazon.com/deals?tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">Check today's Amazon deals on plant care gear →</a></p>
<p style="margin:0;font-size:13px;color:#555">As an Amazon Associate, Plantastic Haven earns from qualifying purchases.</p>
</div>
```

### 2b. `/dripping-water-in-philodendron-plants/` (position 4.8, 391 impressions)
Placement: right after the paragraph that explains guttation versus overwatering.

```html
<div style="border:1px solid #d6e4d6;border-left:4px solid #2f7d32;background:#f6faf6;padding:14px 16px;margin:18px 0;border-radius:6px">
<p style="margin:0 0 8px;font-weight:700">Guttation or overwatering? Check the soil, not the leaf</p>
<ul style="margin:0 0 10px 18px;padding:0">
<li><a href="https://www.amazon.com/dp/B014MJ8J2U?tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">XLUX soil moisture meter (battery-free)</a>: if the root zone reads wet days after watering, the drips are a warning sign, not normal guttation.</li>
<li><a href="https://www.amazon.com/dp/B0CZPPGMWN?tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">Molly's chunky soil-free potting mix</a>: an airy mix to repot into if the current soil stays soggy.</li>
</ul>
<p style="margin:0 0 6px"><a href="https://www.amazon.com/deals?tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">Check today's Amazon deals on plant care gear →</a></p>
<p style="margin:0;font-size:13px;color:#555">As an Amazon Associate, Plantastic Haven earns from qualifying purchases.</p>
</div>
```

### 2c. `/how-to-start-a-philodendron/` (position 8.3, 940 impressions, 0 clicks)
**Title** (replace): `How to Grow Philodendron: When to Plant, Light, Soil & Watering`
**Meta description:** `Plant or repot philodendron in spring to early summer, when growth is active. Use bright indirect light and a chunky, fast-draining mix, and water once the top inch dries.`
**H1** (match the title): `How to Grow Philodendron: When to Plant and How to Set It Up`
Before publishing, confirm the body already says spring/early summer for planting. If it doesn't, add one sentence saying so under the first H2.

Box placement: after the intro, before the first H2.

```html
<div style="border:1px solid #d6e4d6;border-left:4px solid #2f7d32;background:#f6faf6;padding:14px 16px;margin:18px 0;border-radius:6px">
<p style="margin:0 0 8px;font-weight:700">Starter setup for a new philodendron</p>
<ul style="margin:0 0 10px 18px;padding:0">
<li><a href="https://www.amazon.com/dp/B085CDPSMR?tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">GooingTop full-spectrum grow light</a>: for rooms without bright indirect window light, especially in winter.</li>
<li><a href="https://www.amazon.com/dp/B0CZPPGMWN?tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">Molly's chunky soil-free potting mix</a>: the airy, fast-draining base philodendron roots need.</li>
<li><a href="https://www.amazon.com/dp/B0GKJ634WP?tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">Stackable 16" moss poles (4-pack)</a>: for climbing types that grow bigger leaves when supported.</li>
<li><a href="https://www.amazon.com/dp/B014MJ8J2U?tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">XLUX soil moisture meter</a>: takes the guesswork out of "has the top inch dried?"</li>
</ul>
<p style="margin:0 0 6px"><a href="https://www.amazon.com/deals?tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">Check today's Amazon deals on plant care gear →</a></p>
<p style="margin:0;font-size:13px;color:#555">As an Amazon Associate, Plantastic Haven earns from qualifying purchases.</p>
</div>
```

### 2d. `/string-of-pearls-plant-care/` (position 8.9, 465 impressions, 0 Amazon links)
**Title** (replace; the current one is 100+ characters and gets truncated): `String of Pearls Indoor Care: Light, Watering, Soil & Fixes`
**Meta description** (none exists today): `String of pearls indoors needs bright light, a gritty cactus mix and a pot with drainage. Water only after the soil dries out. Fixes for shriveled or mushy pearls.`
Check before publishing: make sure the body supports "shriveled/mushy pearls". If it doesn't, change the end of the meta to "...and common problems."

Box placement: after the intro, before the first H2. This box uses Amazon search links on purpose, so no product claim can go stale.

```html
<div style="border:1px solid #d6e4d6;border-left:4px solid #2f7d32;background:#f6faf6;padding:14px 16px;margin:18px 0;border-radius:6px">
<p style="margin:0 0 8px;font-weight:700">What string of pearls needs indoors</p>
<ul style="margin:0 0 10px 18px;padding:0">
<li><a href="https://www.amazon.com/s?k=cactus+and+succulent+potting+mix&amp;tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">Cactus &amp; succulent potting mix</a>: gritty and fast-draining. Regular potting soil holds too much water.</li>
<li><a href="https://www.amazon.com/s?k=shallow+terracotta+pot+with+drainage+hole&amp;tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">Shallow terracotta pot with a drainage hole</a>: shallow roots, and unglazed clay dries out faster.</li>
<li><a href="https://www.amazon.com/dp/B085CDPSMR?tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">GooingTop full-spectrum grow light</a>: for winter or a dim window, when the plant stretches and the gaps between pearls widen.</li>
</ul>
<p style="margin:0 0 6px"><a href="https://www.amazon.com/deals?tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">Check today's Amazon deals on plant care gear →</a></p>
<p style="margin:0;font-size:13px;color:#555">As an Amazon Associate, Plantastic Haven earns from qualifying purchases.</p>
</div>
```

### 2e. `/plants-that-look-like-spider-plants/` (your top page: 20 clicks, position 10.8)
The search intent here is identification, so don't put products above the answer. Placement: right after the quick-reference ID table.

```html
<div style="border:1px solid #d6e4d6;border-left:4px solid #2f7d32;background:#f6faf6;padding:14px 16px;margin:18px 0;border-radius:6px">
<p style="margin:0 0 8px;font-weight:700">Confirmed it's a real spider plant?</p>
<p style="margin:0 0 8px">Spider plants trail and push out plantlets on runners, so they do best in a <a href="https://www.amazon.com/dp/B07XXNV1W1?tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">hanging basket</a> with a <a href="https://www.amazon.com/dp/B084KRDD5F?tag=papalex-ph-20" rel="sponsored nofollow noopener" target="_blank">well-draining potting mix</a>. For pot size and drainage, see <a href="https://plantastichaven.com/choosing-the-perfect-pot-for-your-spider-plant/">choosing the right pot for a spider plant</a>. If you're still unsure, compare <a href="https://plantastichaven.com/spider-plant-vs-dracaena/">spider plant vs dracaena</a>.</p>
<p style="margin:0;font-size:13px;color:#555">As an Amazon Associate, Plantastic Haven earns from qualifying purchases.</p>
</div>
```

**Rollback:** delete the `<div>` block and restore the old title/meta from the WordPress revision history.

**After you publish:** open each page on your phone. The box should be visible within one or two screen scrolls, and each link should land on Amazon with `tag=papalex-ph-20` in the URL.

**Remove the deals line on Dec 2.** `/deals` stays valid all year, but the Black Friday reason for it ends then.

---

## 3. Measurement

- **Baseline:** in Associates → Reports, filter by tracking ID `papalex-ph-20` and note clicks and items for Nov 1–25.
- **Leading indicator:** `papalex-ph-20` clicks per day, Nov 27 – Dec 8, compared with that baseline.
- **Success:** at least 2× the daily clicks on `papalex-ph-20`.
- **Failure:** under 1.3× after 10 days. If that happens, the placement isn't the constraint; traffic is.
- **CTR check (titles in 2c and 2d):** in GSC, compare Dec 1–21 with Nov 11–24 for those two pages. Success is CTR above 2% at the same position.

---

## 4. Portfolio decisions (not for this week)

1. **Find out where the 458 clicks come from (10 min).** Associates → Reports → *Tracking ID Summary*. Google sends all your sites about 5 visitors/day combined, yet Amazon logs about 18 clicks/day, so most clicks come from something that isn't Google organic. Whichever tracking ID carries them (main `papalex-20`, `-gutf-`, `-mgg-`, or AMFS) shows the traffic source to put money into. If it's the bare `papalex-20` ID, the click source isn't tagged per site. That source is the first thing to fix.
2. **GearUpToFit is the money site, and it's offline.** Check GSC → Security & Manual actions, then Pages → "Crawled – currently not indexed" count. The prime suspect is scaled or programmatic content: 498 + 273 sitemap URLs on a site whose WordPress post sitemap lists 186. Noindexing or removing the `watch-match` set is a P4 change and needs your explicit approval plus a backup.
3. **OneLink for Plantastic Haven.** About 47% of its Google clicks come from outside the US (India, Australia, Canada and others). A non-US visitor sent to amazon.com rarely buys. GearUpToFit already loads OneLink; Plantastic Haven doesn't. Join the regional Associates programs listed in Associates Central → Tools → OneLink and add the script.
