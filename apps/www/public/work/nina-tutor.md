[All work](https://nabilfatih.com/work)

Applied AI at Nakafa

# Inside Nina's source-backed tutoring system

> For AI agents: use [llms.txt](https://nabilfatih.com/llms.txt) for the site index. Markdown versions are available at the .md routes or by sending Accept: text/markdown.

Nina is Nakafa's AI tutor. It combines source-backed retrieval, explicit learning capabilities, tool use, and deterministic evaluations.

## What a useful tutor has to do

A learning answer needs more than fluent text. Nina has to find relevant evidence, understand the current learning context, choose the right capability, use tools when they help, and stream a response through the product interface.

**One Nina turn**. The harness combines verified context with the smallest reliable evidence path before a response reaches the learner and the evaluation boundary.

```
flowchart TB
  Q["Learner question"] --> H["Nina harness"]
  C["Verified context"] --> H
  H --> D{"Evidence path"}
  D -->|Sources| N["Nakafa or research evidence"]
  D -->|Tool or direct| M["Math or direct response"]
  N --> S["Streamed answer"]
  M --> S
  S --> E["Named evaluations"]
```

> One package-owned Nina harness gives the application a single interface while learning capabilities keep their own behavior.

## The architecture

I built one package-owned Effect service as the app-facing boundary for Nina. Internal learning capabilities own the behavior behind that boundary, while evidence and context packs keep source material separate from model instructions.

This structure gives the application one stable interface without turning every learning behavior into the same prompt. A capability can change its retrieval or tool use without forcing the product surface to learn those details.

| Part                 | Responsibility                                                        | How I check it                                                           |
| -------------------- | --------------------------------------------------------------------- | ------------------------------------------------------------------------ |
| Harness              | Owns the one app-facing interface for a Nina turn.                    | Contract and integration tests exercise the same interface the app uses. |
| Learning capability  | Chooses the behavior for a specific learning need.                    | Named evaluation cases cover the capability's behavior.                  |
| Evidence and context | Separates source material and learning state from model instructions. | Fixtures keep the expected evidence visible during review.               |
| Provider adapter     | Handles model and streaming details behind the harness.               | Provider-backed evaluations remain explicit and opt-in.                  |

## Checking behavior before release

I use named evaluation suites for specific behavior boundaries. Deterministic cases run in normal development and continuous integration. Provider-backed evaluations stay opt-in because they depend on external models, cost, and network conditions.

The evaluation layer does not claim that every answer is correct. It gives each important behavior an explicit place to be checked, reviewed, and changed.

Public implementation

## The architecture and evaluation boundaries are documented in the Nakafa repository.

The public context and architecture decision record describe Nina's harness, learning capabilities, evidence, context packs, and evaluation suites.

[Read the repository](https://github.com/nakafaai/nakafa.com)

Building an AI feature?

## I can design the product system around the model call.

That includes retrieval, tool use, evaluation boundaries, service integration, and the controls needed to operate the feature in production.

[Discuss a project](mailto:nabilakbarazzima@gmail.com?subject=Project%20collaboration&body=Hi%20Nabil%2C%0A%0AI%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20contract%20or%20B2B%20project.%0A%0ACompany%3A%0AProject%3A%0AWhat%20I%20need%20help%20with%3A%0ATimeline%3A%0ABudget%20range%3A%0A%0ABest%2C%0A%5BYour%20name%5D) [See how I can help](https://nabilfatih.com/collaborate)
