[All case studies](https://nabilfatih.com/case-studies)

Growth engineering at Nakafa

# Building organic growth into the product

> For AI agents: use [llms.txt](https://nabilfatih.com/llms.txt) for the site index. Markdown versions are available at the .md routes or by sending Accept: text/markdown.

Nakafa is the learning platform I founded. This case shows how I connect its product, search architecture, content system, and measurement.

## Search results

Google Search Console measured these results from April 12, 2025 through August 11, 2026.

- 14,479 organic clicks
- 2,037,927 search impressions
- 0.7% average CTR
- 8.5 average position

## The problem

Useful learning content is not enough on its own. Every lesson needs a stable place in the product, a clear relationship to its subject and curriculum, accurate metadata, and a publishing path that can grow without creating duplicate or stale pages.

Search, content, localization, analytics, and product delivery had to work as one system. I treated that as an engineering problem, not a separate marketing task.

**How the growth system closes the loop**. One content model feeds reusable product routes and indexing. Search and product evidence then guide the next technical or editorial change.

```
flowchart TB
  A["Authored learning content"] --> C["Shared content model"]
  C --> R["Reusable routes and metadata"]
  R --> I["Indexing and discovery"]
  I --> E["Search Console and PostHog evidence"]
  E --> D["Product and content decisions"]
  D --> A
```

## What I owned

| Part                        | What I built                                                                                                                                     | Why it matters                                                                                    |
| --------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------- |
| Search architecture         | Canonical, language-aware routes for lessons, topics, curricula, and articles, with metadata and structured data tied to the same content model. | Readers and crawlers reach one stable version of each learning resource.                          |
| Programmatic content system | Reusable page templates, sitemap generation, internal navigation, and signed releases connected to authored learning content.                    | New coverage can ship through one maintained system instead of a hand-built page for every topic. |
| Measurement and iteration   | Search Console and product analytics views for queries, indexed pages, referrals, and product use.                                               | Evidence guides the next change without assigning the full result to one intervention.            |

## Organic reach earned over time

The cumulative view shows how organic clicks added up across complete months. The source data remains available month by month in the accessible table.

### Cumulative organic clicks

Complete calendar months from May 2025 through July 2026.

| Month   | Monthly clicks | Cumulative clicks |
| ------- | -------------- | ----------------- |
| 2025-05 | 82             | 82                |
| 2025-06 | 63             | 145               |
| 2025-07 | 601            | 746               |
| 2025-08 | 1221           | 1967              |
| 2025-09 | 748            | 2715              |
| 2025-10 | 1508           | 4223              |
| 2025-11 | 2316           | 6539              |
| 2025-12 | 977            | 7516              |
| 2026-01 | 2872           | 10388             |
| 2026-02 | 1415           | 11803             |
| 2026-03 | 773            | 12576             |
| 2026-04 | 531            | 13107             |
| 2026-05 | 633            | 13740             |
| 2026-06 | 405            | 14145             |
| 2026-07 | 227            | 14372             |

Source: Google Search Console, Web search performance. Complete months account for 14,372 clicks. The 14,479 aggregate also includes 18 clicks from April 12 to 30, 2025 and 89 clicks from August 1 to 11, 2026.

## Visibility in Google AI features

Google Search Console reported 71,802 impressions across 549 Nakafa pages in its Generative AI features report from May 18, 2026 through August 11, 2026. I use this as evidence that the same content system is being surfaced in newer search experiences. It is an impression metric, not a conversion metric.

## Google referral traffic

PostHog recorded 26,819 pageviews attributed to Google search from January 1, 2026 through August 13, 2026. The project has no recorded Google-search pageviews before January in this dataset, so I do not present it as a full-period traffic total.

### Pageviews from Google search

Complete calendar months from January through July 2026.

| Month   | Pageviews |
| ------- | --------- |
| 2026-01 | 3958      |
| 2026-02 | 3085      |
| 2026-03 | 2147      |
| 2026-04 | 4655      |
| 2026-05 | 2662      |
| 2026-06 | 2877      |
| 2026-07 | 5656      |

Source: PostHog, pageviews attributed to Google search. August 1 to 13, 2026 is excluded from the chart because it is a partial month. Search Console and PostHog measure different parts of the journey and are not added together.

## What the evidence can support

The data shows Nakafa earned substantial search visibility while I owned the product and growth system. It does not isolate one change as the cause. Search demand, seasonality, content quality, technical work, and changes in Google can all affect the result.

Search Console and PostHog also measure different parts of the journey. Their totals should be read separately and never added together.

Need growth work that reaches the codebase?

## I can connect the growth plan to the software that has to support it.

That can mean auditing the current search foundation, building a programmatic content workflow, improving measurement, or owning the product changes needed to make the growth plan real.

[Discuss a project](mailto:nabilakbarazzima@gmail.com?subject=Project%20collaboration&body=Hi%20Nabil%2C%0A%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20contract%20or%20B2B%20project.%0A%0ACompany%3A%0AProject%3A%0AWhat%20I%20need%20help%20with%3A%0ATimeline%3A%0ABudget%20range%3A%0A%0ABest%2C%0A%5BYour%20name%5D) [See how I can help](https://nabilfatih.com/collaborate)
