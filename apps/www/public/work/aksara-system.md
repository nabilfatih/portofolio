[All work](https://nabilfatih.com/work)

Platform systems at Nakafa

# A safer release protocol for Nakafa content

> For AI agents: use [llms.txt](https://nabilfatih.com/llms.txt) for the site index. Markdown versions are available at the .md routes or by sending Accept: text/markdown.

Aksara is Nakafa's content release system. It signs and verifies releases, then prepares recovery before a candidate becomes visible.

## Why content needed a release protocol

Nakafa's content and its renderer can change independently. The database and a Vercel deployment do not share one transaction, so a release cannot safely assume that every moving part changes at the same moment.

I designed the protocol around an invisible candidate, a verified inverse, and one atomic visibility change. A failed preparation stays invisible instead of leaving a half-published release for readers.

**The release path**. A candidate can move to active only after its signed contents, deployed renderer, and exact inverse have been verified.

```
flowchart TB
  S["Reviewed source"] --> C["Signed invisible candidate"]
  C --> V{"Content, renderer, and inverse verified?"}
  V -->|No| H["Hold or abort"]
  V -->|Yes| A["Atomic activation"]
  A --> O{"Accept or recover?"}
  O -->|Accept| K["Clear recovery"]
  O -->|Recover| F["Activate signed inverse"]
```

> The candidate never becomes visible before its signed recovery path and renderer compatibility have been verified.

## What the system verifies

| Release state | Visible to readers | Purpose                                            |
| ------------- | ------------------ | -------------------------------------------------- |
| Active        | Yes                | The completed release currently selected by reads. |
| Candidate     | No                 | The release being staged and verified.             |
| Recovery      | No                 | The signed inverse prepared for forward recovery.  |

Every release binds its content, routes, projections, renderer contract, and provenance. The candidate stays hidden while its counts, hashes, signatures, and renderer compatibility are checked. Activation changes visibility in one database mutation, while acceptance and recovery remain explicit operator decisions.

## The trust boundary

Aksara treats authors as trusted production code authors. It does not pretend MDX is safe for arbitrary public uploads. The signature and verification chain protects the reviewed release path, while the application still checks delivery and access rules before returning content.

That boundary matters because a strong release protocol should state what it protects and what it does not.

Public implementation

## The contracts, release protocol, CLI, and architecture decisions are public.

The Aksara repository includes the signed artifact contracts, publication workflow, recovery commands, tests, and the decisions behind them.

[Read the repository](https://github.com/nakafaai/aksara)

Operating a risky release path?

## I can make its states, failures, and recovery explicit.

That can apply to content, data migrations, internal workflows, or any release where partial success is more dangerous than a clear failure.

[Discuss a project](mailto:nabilakbarazzima@gmail.com?subject=Project%20collaboration&body=Hi%20Nabil%2C%0A%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20contract%20or%20B2B%20project.%0A%0ACompany%3A%0AProject%3A%0AWhat%20I%20need%20help%20with%3A%0ATimeline%3A%0ABudget%20range%3A%0A%0ABest%2C%0A%5BYour%20name%5D) [See how I can help](https://nabilfatih.com/collaborate)
