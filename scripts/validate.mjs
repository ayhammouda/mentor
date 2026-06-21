#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const failures = [];

function readText(relativePath) {
  return fs.readFileSync(path.join(root, relativePath), "utf8");
}

function readJson(relativePath) {
  try {
    return JSON.parse(readText(relativePath));
  } catch (error) {
    failures.push(`${relativePath}: invalid JSON (${error.message})`);
    return null;
  }
}

function check(condition, message) {
  if (!condition) {
    failures.push(message);
  }
}

function sorted(value) {
  return [...value].sort();
}

function sameSet(left, right) {
  const a = sorted(left);
  const b = sorted(right);
  return a.length === b.length && a.every((value, index) => value === b[index]);
}

function sectionBetween(markdown, startHeading, endHeadings) {
  const start = markdown.indexOf(startHeading);
  if (start === -1) {
    return "";
  }

  const afterStart = start + startHeading.length;
  const ends = endHeadings
    .map((heading) => markdown.indexOf(heading, afterStart))
    .filter((index) => index !== -1);
  const end = ends.length > 0 ? Math.min(...ends) : markdown.length;
  return markdown.slice(afterStart, end);
}

function markdownUrls(markdown) {
  return [...markdown.matchAll(/\]\((https?:\/\/[^)]+)\)/g)].map((match) => {
    return match[1].replace(/\/$/, "");
  });
}

function validHttpUrl(value) {
  try {
    const parsed = new URL(value);
    return parsed.protocol === "http:" || parsed.protocol === "https:";
  } catch {
    return false;
  }
}

function validateAgainstSchema(value, schema, pathLabel = "$", rootSchema = schema) {
  const errors = [];

  function resolveRef(ref) {
    if (!ref.startsWith("#/")) {
      errors.push(`${pathLabel}: unsupported schema ref ${ref}`);
      return {};
    }

    return ref
      .slice(2)
      .split("/")
      .reduce((node, segment) => node?.[segment], rootSchema) ?? {};
  }

  function visit(nodeValue, nodeSchema, nodePath) {
    if (nodeSchema.$ref) {
      visit(nodeValue, resolveRef(nodeSchema.$ref), nodePath);
      return;
    }

    if (nodeSchema.type) {
      const type = nodeSchema.type;
      const typeMatches =
        (type === "object" &&
          nodeValue !== null &&
          typeof nodeValue === "object" &&
          !Array.isArray(nodeValue)) ||
        (type === "array" && Array.isArray(nodeValue)) ||
        (type === "string" && typeof nodeValue === "string") ||
        (type === "integer" && Number.isInteger(nodeValue)) ||
        (type === "boolean" && typeof nodeValue === "boolean");

      if (!typeMatches) {
        errors.push(`${nodePath}: expected ${type}`);
        return;
      }
    }

    if (nodeSchema.enum && !nodeSchema.enum.includes(nodeValue)) {
      errors.push(`${nodePath}: ${JSON.stringify(nodeValue)} is not an allowed value`);
    }

    if (nodeSchema.format === "uri" && typeof nodeValue === "string" && !validHttpUrl(nodeValue)) {
      errors.push(`${nodePath}: expected a valid http(s) URI`);
    }

    if (nodeSchema.minimum !== undefined && nodeValue < nodeSchema.minimum) {
      errors.push(`${nodePath}: expected minimum ${nodeSchema.minimum}`);
    }

    if (nodeSchema.type === "array") {
      if (nodeSchema.minItems !== undefined && nodeValue.length < nodeSchema.minItems) {
        errors.push(`${nodePath}: expected at least ${nodeSchema.minItems} item(s)`);
      }

      if (nodeSchema.items) {
        nodeValue.forEach((item, index) => visit(item, nodeSchema.items, `${nodePath}[${index}]`));
      }
    }

    if (nodeSchema.type === "object") {
      const required = nodeSchema.required ?? [];
      for (const key of required) {
        if (!Object.hasOwn(nodeValue, key)) {
          errors.push(`${nodePath}: missing required property ${key}`);
        }
      }

      const properties = nodeSchema.properties ?? {};
      if (nodeSchema.additionalProperties === false) {
        for (const key of Object.keys(nodeValue)) {
          if (!Object.hasOwn(properties, key)) {
            errors.push(`${nodePath}: unexpected property ${key}`);
          }
        }
      }

      for (const [key, childSchema] of Object.entries(properties)) {
        if (Object.hasOwn(nodeValue, key)) {
          visit(nodeValue[key], childSchema, `${nodePath}.${key}`);
        }
      }
    }
  }

  visit(value, schema, pathLabel);
  return errors;
}

function clone(value) {
  return JSON.parse(JSON.stringify(value));
}

const schema = readJson("references/schema.json");
const evals = readJson("evals/evals.json");
const skill = readText("SKILL.md");

if (schema) {
  const requiredTopLevel = [
    "topic",
    "topic_scope",
    "assumptions",
    "why_this_topic_is_tricky",
    "learning_compass",
    "explore_later",
    "checkpoints",
    "avoid_for_now",
    "next_topics",
    "navigators_note"
  ];

  const expectedModes = [
    "Read first",
    "Read next",
    "Skim for context",
    "Inspect",
    "Bookmark",
    "Practice later"
  ];

  check(schema.title === "MentorCompass", "references/schema.json: title should be MentorCompass");
  check(schema.additionalProperties === false, "references/schema.json: top-level additionalProperties should be false");
  check(sameSet(schema.required ?? [], requiredTopLevel), "references/schema.json: required top-level fields are out of sync");
  check(
    sameSet(schema.$defs?.resource?.properties?.mode?.enum ?? [], expectedModes),
    "references/schema.json: resource mode enum is out of sync"
  );

  const skillModes = [...skill.matchAll(/^- `([^`]+)` - /gm)].map((match) => match[1]);
  check(sameSet(skillModes, expectedModes), "SKILL.md: Resource Modes list is out of sync with schema enum");

  const validResource = {
    source_tier: "Official Docs",
    mode: "Read first",
    title: "Docker overview",
    url: "https://docs.docker.com/get-started/docker-overview/",
    why_here_now: "It establishes the base model before implementation details."
  };

  const validCompass = {
    topic: "Docker",
    topic_scope: "broad",
    assumptions: {
      level: "Backend developer",
      goal: "Understand the platform model",
      time_budget: "A focused weekend",
      context: "No specific runtime provided"
    },
    why_this_topic_is_tricky: "Docker mixes image, container, registry, and runtime vocabulary early.",
    learning_compass: [
      {
        iteration: 1,
        focus: "The container model",
        read_first: validResource,
        check_next: [{ ...validResource, mode: "Read next", title: "Docker concepts" }],
        inspect: [{ ...validResource, source_tier: "Official Sample Repo", mode: "Inspect", title: "Docker samples" }],
        what_to_notice: "Images and containers are related but not interchangeable.",
        stop_before: "Do not start with orchestration."
      }
    ],
    explore_later: [
      {
        name: "Practice later",
        purpose: "Use after the model is clear.",
        resources: [{ ...validResource, source_tier: "Official Tutorial", mode: "Practice later", title: "Docker workshop" }]
      }
    ],
    checkpoints: ["I can explain images and containers."],
    avoid_for_now: ["Do not start with Kubernetes."],
    next_topics: ["Docker Compose"],
    navigators_note: "Keep the first pass focused on vocabulary and boundaries."
  };

  check(
    validateAgainstSchema(validCompass, schema).length === 0,
    "references/schema.json: valid compass fixture should pass schema validation"
  );

  const invalidMode = clone(validCompass);
  invalidMode.learning_compass[0].read_first.mode = "Hands-on";
  check(
    validateAgainstSchema(invalidMode, schema).length > 0,
    "references/schema.json: invalid resource mode should fail validation"
  );

  const missingResourceField = clone(validCompass);
  delete missingResourceField.learning_compass[0].read_first.why_here_now;
  check(
    validateAgainstSchema(missingResourceField, schema).length > 0,
    "references/schema.json: missing resource why_here_now should fail validation"
  );

  const extraTopLevel = clone(validCompass);
  extraTopLevel.core_path = [];
  check(
    validateAgainstSchema(extraTopLevel, schema).length > 0,
    "references/schema.json: extra top-level fields should fail validation"
  );

  const invalidUrl = clone(validCompass);
  invalidUrl.learning_compass[0].read_first.url = "not-a-url";
  check(
    validateAgainstSchema(invalidUrl, schema).length > 0,
    "references/schema.json: invalid URLs should fail validation"
  );

  const missingIterationField = clone(validCompass);
  delete missingIterationField.learning_compass[0].stop_before;
  check(
    validateAgainstSchema(missingIterationField, schema).length > 0,
    "references/schema.json: missing iteration stop_before should fail validation"
  );
}

if (evals) {
  const knownAssertionTypes = new Set([
    "structural",
    "source_quality",
    "mode_variety",
    "dedup",
    "content",
    "clarification",
    "personalization",
    "freshness",
    "time_constraint",
    "weak_docs_handling",
    "schema_compliance",
    "tutorial_drift_guard"
  ]);

  check(evals.skill_name === "mentor", "evals/evals.json: skill_name should be mentor");
  check(evals.version === "v2-mentorship-compass", "evals/evals.json: version should be v2-mentorship-compass");
  check(Array.isArray(evals.evals) && evals.evals.length >= 10, "evals/evals.json: expected at least 10 eval cases");

  const ids = new Set();
  for (const testCase of evals.evals ?? []) {
    check(!ids.has(testCase.id), `evals/evals.json: duplicate eval id ${testCase.id}`);
    ids.add(testCase.id);
    check(Boolean(testCase.category), `evals/evals.json: eval ${testCase.id} is missing category`);
    check(Boolean(testCase.prompt), `evals/evals.json: eval ${testCase.id} is missing prompt`);
    check(Boolean(testCase.expected_output), `evals/evals.json: eval ${testCase.id} is missing expected_output`);
    check(
      Array.isArray(testCase.assertions) && testCase.assertions.length >= 3,
      `evals/evals.json: eval ${testCase.id} should have at least 3 assertions`
    );

    for (const assertion of testCase.assertions ?? []) {
      check(Boolean(assertion.text), `evals/evals.json: eval ${testCase.id} has an assertion without text`);
      check(
        knownAssertionTypes.has(assertion.type),
        `evals/evals.json: eval ${testCase.id} has unknown assertion type ${assertion.type}`
      );
    }
  }
}

const docFiles = [
  "SKILL.md",
  "README.md",
  "CONTRIBUTING.md",
  "CLAUDE.md",
  "AGENTS.md",
  ...fs.readdirSync(path.join(root, "examples")).filter((file) => file.endsWith(".md")).map((file) => `examples/${file}`)
];

for (const relativePath of docFiles) {
  const text = readText(relativePath);
  for (const staleTerm of ["Read now", "Bookmark as reference", "Core Path", "Explore Further"]) {
    check(!text.includes(staleTerm), `${relativePath}: stale compass terminology found: ${staleTerm}`);
  }
  check(!/\bHands-on\b/.test(text), `${relativePath}: stale mode label found: Hands-on`);
  check(!/#### Phase \d/.test(text), `${relativePath}: stale phase heading found`);
}

const sourceTiers = new Set(schema?.$defs?.resource?.properties?.source_tier?.enum ?? []);
const modes = new Set(schema?.$defs?.resource?.properties?.mode?.enum ?? []);
const exampleFiles = fs.readdirSync(path.join(root, "examples")).filter((file) => file.endsWith(".md")).sort();

const expectedIterationRanges = new Map([
  ["example-output-cloud-run.md", [4, 5]],
  ["example-output-rust.md", [4, 5]],
  ["example-output-terraform-modules.md", [2, 4]],
  ["example-output-react-server-components.md", [2, 4]]
]);

for (const file of exampleFiles) {
  const relativePath = `examples/${file}`;
  const markdown = readText(relativePath);
  const learningCompass = sectionBetween(markdown, "### Learning Compass", ["### Explore Later", "### Checkpoints"]);
  const exploreLater = sectionBetween(markdown, "### Explore Later", ["### Checkpoints"]);
  const checkpoints = sectionBetween(markdown, "### Checkpoints", ["### Avoid for Now"]);
  const avoidForNow = sectionBetween(markdown, "### Avoid for Now", ["### Next Topics"]);
  const nextTopics = sectionBetween(markdown, "### Next Topics", ["---\n\n**Navigator's Note:**"]);

  check(markdown.startsWith("## Mentorship Compass:"), `${relativePath}: should start with Mentorship Compass heading`);
  check(markdown.includes("**Assumptions:**"), `${relativePath}: missing Assumptions section`);
  for (const assumption of ["Level", "Goal", "Time budget", "Context"]) {
    check(markdown.includes(`- ${assumption}:`), `${relativePath}: missing assumption field ${assumption}`);
  }
  check(markdown.includes("**Why this topic is tricky:**"), `${relativePath}: missing tricky-topic note`);
  check(Boolean(learningCompass), `${relativePath}: missing Learning Compass section`);
  check(markdown.includes("**Navigator's Note:**"), `${relativePath}: missing Navigator's Note`);

  const iterationMatches = [...learningCompass.matchAll(/^#### Iteration (\d+) - .+$/gm)];
  const [minIterations, maxIterations] = expectedIterationRanges.get(file) ?? [1, 5];
  check(
    iterationMatches.length >= minIterations && iterationMatches.length <= maxIterations,
    `${relativePath}: expected ${minIterations}-${maxIterations} iterations, found ${iterationMatches.length}`
  );

  iterationMatches.forEach((match, index) => {
    const next = iterationMatches[index + 1];
    const block = learningCompass.slice(match.index, next?.index ?? learningCompass.length);
    const expectedNumber = index + 1;
    check(Number(match[1]) === expectedNumber, `${relativePath}: iteration numbers should be sequential`);
    check(block.includes("- **Read first:**"), `${relativePath}: iteration ${expectedNumber} missing Read first`);
    check(block.includes("- **What to notice:**"), `${relativePath}: iteration ${expectedNumber} missing What to notice`);
    check(block.includes("- **Stop before:**"), `${relativePath}: iteration ${expectedNumber} missing Stop before`);
  });

  const learningResources = [
    ...learningCompass.matchAll(
      /^- \*\*(Read first|Check next|Inspect):\*\* `\[([^\]]+)\]` `\[([^\]]+)\]` \[([^\]]+)\]\((https?:\/\/[^)]+)\) - (.+)$/gm
    )
  ];
  check(learningResources.length > 0, `${relativePath}: no parseable Learning Compass resources found`);

  const firstResource = learningResources[0];
  if (firstResource) {
    check(firstResource[1] === "Read first", `${relativePath}: first resource should be Read first`);
    check(firstResource[2].startsWith("Official "), `${relativePath}: first resource should be official`);
  }

  for (const resource of learningResources) {
    const [, label, sourceTier, mode, title, url, why] = resource;
    check(sourceTiers.has(sourceTier), `${relativePath}: unknown source tier ${sourceTier}`);
    check(modes.has(mode), `${relativePath}: unknown mode ${mode}`);
    check(mode !== "Practice later", `${relativePath}: Practice later should not appear in the main Learning Compass`);
    if (label === "Inspect") {
      check(mode === "Inspect", `${relativePath}: Inspect line for ${title} should use Inspect mode`);
    }
    check(validHttpUrl(url), `${relativePath}: invalid resource URL ${url}`);
    check(Boolean(why.trim()), `${relativePath}: ${title} is missing sequencing rationale`);
  }

  const exploreResources = [
    ...exploreLater.matchAll(/^- `\[([^\]]+)\]` `\[([^\]]+)\]` \[([^\]]+)\]\((https?:\/\/[^)]+)\) - (.+)$/gm)
  ];
  for (const resource of exploreResources) {
    const [, sourceTier, mode, title, url, why] = resource;
    check(sourceTiers.has(sourceTier), `${relativePath}: unknown Explore Later source tier ${sourceTier}`);
    check(modes.has(mode), `${relativePath}: unknown Explore Later mode ${mode}`);
    check(validHttpUrl(url), `${relativePath}: invalid Explore Later URL ${url}`);
    check(Boolean(why.trim()), `${relativePath}: ${title} is missing Explore Later rationale`);
  }

  const learningUrls = new Set(markdownUrls(learningCompass));
  const duplicatedUrls = markdownUrls(exploreLater).filter((url) => learningUrls.has(url));
  check(duplicatedUrls.length === 0, `${relativePath}: repeated Learning Compass URL(s) in Explore Later: ${duplicatedUrls.join(", ")}`);

  const checkpointItems = [...checkpoints.matchAll(/^- \[ \] (.+)$/gm)].map((match) => match[1]);
  check(checkpointItems.length >= 3 && checkpointItems.length <= 5, `${relativePath}: expected 3-5 checkpoints`);
  for (const item of checkpointItems) {
    check(item.startsWith("I can "), `${relativePath}: checkpoint should start with "I can": ${item}`);
  }

  const avoidItems = [...avoidForNow.matchAll(/^- (.+)$/gm)];
  check(avoidItems.length >= 2 && avoidItems.length <= 4, `${relativePath}: expected 2-4 Avoid for Now items`);

  const nextItems = [...nextTopics.matchAll(/^- (.+)$/gm)];
  check(nextItems.length >= 2 && nextItems.length <= 4, `${relativePath}: expected 2-4 Next Topics`);
}

if (failures.length > 0) {
  console.error(`Validation failed with ${failures.length} issue(s):`);
  for (const failure of failures) {
    console.error(`- ${failure}`);
  }
  process.exit(1);
}

console.log("Validation passed.");
