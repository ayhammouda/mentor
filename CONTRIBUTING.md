# Contributing to Mentor

Thanks for your interest in improving Mentor. This is a Claude skill definition repo — contributions improve the skill's rules, examples, and test coverage, not traditional application code.

## Ways to Contribute

- **Report issues** with generated learning paths (bad sequencing, broken links, missing sources, wrong source tier)
- **Propose changes** to decision rules, source ranking, or output format in SKILL.md
- **Add or improve example outputs** in `examples/`
- **Strengthen eval coverage** in `evals/evals.json`
- **Improve documentation** (README, CLAUDE.md)

## Getting Started

1. Fork the repository and create a descriptive branch (e.g., `improve-narrow-topic-rules`, `add-kubernetes-example`)
2. Read **SKILL.md** thoroughly — it is the source of truth for all behavior
3. Read **CLAUDE.md** to understand how the artifacts relate to each other

## Contribution Guidelines

### Changes to SKILL.md

- Changes must not break existing eval assertions in `evals/evals.json`
- If you change the output format or decision rules, update `references/schema.json` and any affected examples to match
- New behavioral rules should come with a corresponding eval assertion

### New Example Outputs

- Must follow the exact output structure defined in SKILL.md (Assumptions, Why This Topic Is Tricky, Core Path with all resource contract fields, Explore Further, Checkpoints, Avoid for Now, Next Topics, Navigator's Note)
- Every core resource must include: source tier, mode, title, URL, one-sentence rationale, and effort estimate
- Branch resources must include: source tier, mode, title, URL, and one-sentence rationale
- No resource should appear in both the core path and exploration branches

### New Evals

- Include at least 3 machine-gradable assertions covering structure, source quality, and content
- Use the existing assertion types: `structural`, `source_quality`, `mode_variety`, `dedup`, `content`, `clarification`, `personalization`, `freshness`, `time_constraint`, `weak_docs_handling`, `schema_compliance`
- Write prompts that sound like real users — include context, casual phrasing, and specificity

## Validation

There is no automated test runner. Before submitting a pull request:

1. Read `evals/evals.json` — each eval has a prompt, expected output description, and assertions
2. Verify your changes do not violate any existing assertion
3. Check that all examples still conform to the rules
4. If you added a new rule to SKILL.md, confirm it is testable via an eval assertion

## Quality Standards

- **Clarity over volume** — a tighter rule change is better than a longer one
- **Specific over vague** — "link to the exact doc page, not the homepage" is better than "use good links"
- **Testable rules** — if you can't write an eval assertion for it, it may be too subjective for SKILL.md

## Submitting Changes

1. Open a pull request against `main`
2. Keep it to one logical change per PR
3. Write a clear title and include "why" in the description, not just "what"
4. Maintainers will review and may request changes

## Code of Conduct

Be respectful, constructive, and specific. This project follows the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
