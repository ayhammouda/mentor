# Contributing to Mentor

Thanks for improving Mentor. This is a skill definition repo: contributions change the skill's behavior rules, examples, schema, and eval coverage.

## Product Intent

Mentor is a **mentorship compass**, not a tutorial generator.

Default behavior should:
- point learners to exact docs, references, repos, and examples
- explain what to notice in each resource
- sequence concepts by mental model
- keep practice optional unless requested

Default behavior should not:
- include install commands
- include `npx`, shell, clone, or deploy steps
- require exercises or labs
- turn GitHub repos into mandatory execution steps
- start with quickstarts when conceptual docs exist

## Ways to Contribute

- Report issues with generated compasses: bad sequencing, weak docs, broken links, wrong source tier, tutorial drift
- Propose changes to decision rules, source ranking, or output format in `SKILL.md`
- Add or improve compass-style example outputs in `examples/`
- Strengthen eval coverage in `evals/evals.json`
- Improve documentation

## Getting Started

1. Fork the repository and create a descriptive branch, such as `tighten-rsc-compass`.
2. Read `SKILL.md`; it is the source of truth.
3. Read `evals/evals.json`; evals define the behavior the skill must preserve.
4. Read the relevant example output before editing a behavior it demonstrates.

## Contribution Guidelines

### Changes to SKILL.md

- Changes must not break existing eval assertions.
- If you change output shape or resource fields, update `references/schema.json`.
- If you change behavior rules, update affected examples.
- New behavior rules should have at least one eval assertion.
- Keep the skill concise; do not add long explanations that repeat obvious model knowledge.

### New or Updated Example Outputs

Examples must follow the compass model:

- Use `## Mentorship Compass: {Topic}`.
- Include assumptions and "Why this topic is tricky."
- Use `### Learning Compass` with iterations.
- Each iteration should include `Read first`, optional `Check next`, optional `Inspect`, `What to notice`, and `Stop before`.
- Use resource modes from `SKILL.md`: `Read first`, `Read next`, `Skim for context`, `Inspect`, `Bookmark`, `Practice later`.
- Repos must be framed as inspection targets unless the user asked for practice.
- Practice resources belong in `Explore Later` unless explicitly requested.
- Do not include effort estimates by default.
- Do not include setup, install, clone, build, deploy, or command steps by default.
- No resource should appear in both Learning Compass and Explore Later.

### New Evals

Include at least 3 machine-gradable assertions covering structure, source quality, and tutorial-drift behavior.

Use assertion types such as:
- `structural`
- `source_quality`
- `mode_variety`
- `dedup`
- `content`
- `clarification`
- `personalization`
- `freshness`
- `time_constraint`
- `weak_docs_handling`
- `schema_compliance`
- `tutorial_drift_guard`

Good tutorial-drift assertions:
- "No mandatory commands, install steps, clone steps, or required exercises"
- "GitHub repositories are framed as Inspect or Practice later, not clone/run/complete"
- "Quickstart material, if included, is marked Practice later or Skim for context"

## Validation

Before submitting a pull request:

1. Run `npm test`.
2. Read every changed eval assertion and check that changed examples still satisfy the relevant behavior.
3. Confirm any tutorial or practice content is explicitly marked `Practice later` or only appears for an explicit hands-on request.
4. Forward-test at least one broad topic and one narrow topic in a fresh agent/thread when possible.
5. See `TESTING.md` for what the automated harness covers and what still needs manual review.

## Quality Standards

- **Direction over instruction**: tell the learner where to look and what to notice.
- **Specific over broad**: exact docs beat homepages.
- **Official-first over popular**: use community sources only when they earn their place.
- **Concise over complete**: a short compass is better than a bloated syllabus.
- **Testable over subjective**: if a rule matters, add an eval assertion.

## Submitting Changes

1. Open a pull request against `main`.
2. Keep it to one logical behavior change.
3. Explain why the change improves mentorship-compass behavior.
4. Include which examples and evals changed.

## Code of Conduct

Be respectful, constructive, and specific. This project follows the [Contributor Covenant](https://www.contributor-covenant.org/version/2/1/code_of_conduct/).
