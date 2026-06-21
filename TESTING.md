# Testing Mentor

Mentor is a skill definition, so the test suite protects behavior contracts rather than application runtime behavior.

## Run Validation

```bash
npm test
```

The validation script is dependency-free and runs on Node 18 or newer.

## What Is Covered

- JSON syntax for `references/schema.json` and `evals/evals.json`
- Minimal JSON Schema behavior for required fields, enums, URI fields, and extra-property rejection
- Alignment between `SKILL.md` resource modes and `references/schema.json`
- Evals structure, unique IDs, known assertion types, and minimum assertion counts
- Example-output structure for assumptions, Learning Compass iterations, supporting sections, and navigator notes
- Resource source-tier and mode validation in examples
- Deduplication between Learning Compass resources and Explore Later resources
- Stale terminology checks for the old phase/core-path model and old mode labels

## What Still Needs Manual Review

The automated suite does not grade live model outputs or verify that generated sources are current. For behavior changes, still forward-test at least:

- one broad topic
- one narrow topic
- one fast-moving or ambiguous topic
- one explicit JSON-output request

When reviewing live outputs, check that the response stays docs-first, starts with conceptual material, avoids mandatory setup commands, and uses GitHub repositories as inspection targets unless hands-on practice was explicitly requested.
