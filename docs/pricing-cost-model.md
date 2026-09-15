# Eskai Pricing & Cost Model

**Status:** working assumptions — replace with supplier quotes as they land.
**Last reviewed:** 2026-09 (by Cline from repo data + public street prices; price sites were scrape-blocked, so figures are approximate market prices, not quotes).

Public prices live in `src/components/Pricing.tsx` (see the `PRICE BASIS` comment block above `tiers`). This document holds the reasoning behind them so anyone can recompute, not just tweak.

## 1. Price points (current, public)

| Tier | One-time | Care Plan (optional) | UGX note shown |
|---|---|---|---|
| Personal | **$199** | +$9/mo | ≈ UGX 740,000 |
| Business | **$599** | +$29/mo | ≈ UGX 2.2M |
| Custom | **from $2,500** | included (SLA) | — |

FX basis: **~UGX 3,700 / USD (Sept 2026)**. If the rate moves more than ~5%, update:
- `Pricing.tsx` → `priceNote` on Personal and Business
- the UGX column above

## 2. Cost assumptions per unit

### Personal ($199) — Pi-class mini appliance
| Item | Est. cost (USD) |
|---|---|
| SBC (Raspberry Pi 5 4–8GB class, or equivalent) | $60–80 |
| Case, PSU, SD/NVMe storage | $25–35 |
| Enclosure/branding, packaging | $5–10 |
| **Hardware BOM** | **≈ $95–125** |
| Configuration labour (flash, configure, test, burn-in) | $15–25 |
| Delivery (Kampala) | $3–5 |
| **Fully loaded COGS** | **≈ $115–155** |
| **Gross margin at $199** | **≈ $45–85 (23–42%)** |

### Business ($599) — N100-class mini PC
| Item | Est. cost (USD) |
|---|---|
| Mini PC (N100, 16GB RAM, 512GB SSD class) | $150–190 |
| Branding/packaging | $10 |
| **Hardware BOM** | **≈ $160–200** |
| Configuration labour (multi-user, integrations, burn-in) | $40–60 |
| Delivery | $5–10 |
| **Fully loaded COGS** | **≈ $205–270** |
| **Gross margin at $599** | **≈ $330–395 (55–66%)** |

### Custom (from $2,500)
Server-class hardware + on-site install + training + integrations, scoped per deal. Keep the floor at ≥ 2× expected COGS until real quotes exist.

> Note: the `PRICE BASIS` comment in `Pricing.tsx` quotes slightly wider BOM ranges ($100–130 / $250–320, hardware only). When supplier quotes land, make the comment and this table agree.

## 3. What would force a price change

- Pi 5-class BOM landing **above ~$140** → Personal to $229 (or $219 + slimmer packaging).
- Mini-PC BOM landing **above ~$260** → Business to $649.
- Shipping/fuel shock (Kampala delivery + import duties) → revisit both.
- Margin floor we hold: **≥ 30% gross** on hardware at launch; the Business tier subsidises Personal ramp-up.

## 4. Recurring economics (sanity check)

- Tokens: customer pays OpenAI/Anthropic directly (BYO key, zero markup) or buys prepaid credits ($10/$25/$50). Our credits margin target: **15–20%** on face value.
- Care Plan: $9 (Personal) / $29 (Business) per month — covers updates, encrypted backup of memory/personality, priority support. Target ≤ 15% of installed base needing > 30 min support/mo.
- A Personal owner spending ~$5–15/mo in tokens is the LTV anchor: device margin once + credits/Care Plan recurring.

## 5. Edit points (one-line each)

| What | Where |
|---|---|
| Tier prices, care plans, running-cost text, UGX notes | `src/components/Pricing.tsx` → `tiers` |
| "What you actually pay" explainer | `src/components/Pricing.tsx` → `costParts` |
| Affordability / payments line | `src/components/Pricing.tsx` → bottom of section |
| FX rate + price-basis summary | `PRICE BASIS` comment, `Pricing.tsx` (keep in sync with this doc) |

## 6. Testimonial / proof policy

The old landing claimed 1,500+ adopters / 40+ countries / 250k+ tasks — **unverifiable, removed 2026-09**. Rule going forward (`AlreadyUsing.tsx` carries the same comment): every number on the page is either a documented first-party result (BioThrive) or a product guarantee. Named customer testimonials get added **only** with the customer's real name, business and consent — the "Your story here" card in `AlreadyUsing.tsx` is the designed slot for the first one.
