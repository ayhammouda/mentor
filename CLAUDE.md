# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What This Is

Mentor is a Claude skill (SKILL.md with YAML frontmatter) that generates structured, official-first learning paths for technical topics. It runs on Claude.ai and Claude Code, and relies on web search to verify resource URLs and freshness.

## Repository Structure

- `SKILL.md` — The skill definition. This is the primary artifact. All behavior rules, output format, source ranking, and anti-patterns live here.
- `references/schema.json` — JSON Schema contract for machine-readable output. SKILL.md references this for when users request JSON instead of markdown.
- `examples/` — Gold-standard example outputs that demonstrate correct behavior:
  - `example-output-rust.md` — broad topic with user background
  - `example-output-cloud-run.md` — broad topic, default assumptions
  - `example-output-terraform-modules.md` — narrow topic, compressed phases
  - `example-output-react-server-components.md` — clarification trigger + fast-moving topic
- `evals/evals.json` — 9 test cases with machine-gradable assertions covering structural, source quality, mode variety, dedup, content, clarification, personalization, freshness, time-constraint, weak-docs-handling, and schema-compliance checks.

## How the Artifacts Relate

SKILL.md is the source of truth. The schema, examples, and evals must stay consistent with it:
- If you change the output format in SKILL.md, update `references/schema.json` to match.
- If you change decision rules (e.g., phase structure, resource counts, clarification policy), update affected examples and eval assertions.
- Evals assert on structural rules defined in SKILL.md (e.g., "core path has between 6 and 12 resources" for broad topics). Changing those bounds in SKILL.md means updating the corresponding assertions in evals.json.

## Validation

There is no automated test runner. To validate changes:
1. Read `evals/evals.json` — each eval has a `prompt`, `expected_output` description, and `assertions` array.
2. Mentally or manually check that SKILL.md changes don't violate any assertion in the evals.
3. Check that examples still conform to the updated rules.

## Key Design Constraints

- **Source tier hierarchy is strict**: Official Docs > Vendor/Maintainer > Official Sample Repos > Community. Community content must justify its inclusion.
- **Broad vs. narrow topics produce different output shapes**: Broad uses 4 phases; narrow compresses/merges. Never force 4 phases on a narrow topic.
- **Dedup rule**: A resource in the core path must not appear in exploration branches.
- **Clarification policy is minimal**: Ask only when the answer would change the first 5 resources. Narrow + clear ask = no questions.
- **Time-constrained paths** (under 3 hours): 4–6 core resources, drop Phase 4, reduce branches.
- **Mode variety matters**: Not every resource should be "Read now" — use Skim, Hands-on, and Bookmark as reference where honest.
