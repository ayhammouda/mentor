## Learning Path: Google Cloud Run

**Assumptions:**
- **Level:** Intermediate developer or platform engineer
- **Goal:** Get productive with Cloud Run and understand where it fits in Google Cloud
- **Time budget:** A focused weekend
- **Style:** Official docs first, with a practical bias

**Why this topic is tricky:** Cloud Run looks simple at first, but many learners confuse its deployment model and production boundaries with Cloud Functions, GKE, or general container hosting. The key is to understand the service model first, then layer in runtime, delivery, and operations.

---

### Core Path

#### Phase 1 — Mental Model
- `[Official Docs]` `[Read now]` [Cloud Run overview](https://cloud.google.com/run/docs/overview/what-is-cloud-run) — Start here to understand the service model, execution model, and where Cloud Run sits in the Google Cloud compute landscape. ⏱ ~15 min
- `[Official Tutorial]` `[Skim]` [Quickstart: Deploy to Cloud Run](https://cloud.google.com/run/docs/quickstarts/deploy-container) — This gives you the shortest end-to-end view of what deploying a service actually feels like before you go deeper into configuration. ⏱ ~20–30 min

#### Phase 2 — Core Mechanics
- `[Official Docs]` `[Read now]` [Container runtime contract](https://cloud.google.com/run/docs/container-contract) — Read this early because it explains the assumptions Cloud Run makes about your container, which prevents a lot of confusion later. ⏱ ~20 min
- `[Official Docs]` `[Read now]` [Configure services](https://cloud.google.com/run/docs/configuring/services/overview) — This is the operational center of gravity for real usage: revisions, settings, rollout-related choices, and runtime configuration all start here. ⏱ ~25–35 min
- `[Official Docs]` `[Bookmark as reference]` [Authentication overview](https://cloud.google.com/run/docs/authenticating/overview) — You do not need to memorize this now, but you do need to know where auth and identity guidance lives once you start exposing real services. ⏱ ~15 min

#### Phase 3 — Applied Patterns
- `[Official Sample Repo]` `[Hands-on]` [GoogleCloudPlatform/cloud-run-samples](https://github.com/GoogleCloudPlatform/cloud-run-samples) — Use this after the docs to see realistic examples and deployment patterns without wandering into low-quality third-party repos. ⏱ ~45–60 min
- `[Vendor Architecture Guide]` `[Read now]` [Cloud Run architecture center resources](https://cloud.google.com/architecture?product=Cloud%20Run) — This is where Cloud Run starts to look like a production platform instead of just a deployment command. ⏱ ~30–45 min ⚡ Optional

#### Phase 4 — Go Deeper
- `[Official Docs]` `[Bookmark as reference]` [Networking overview](https://cloud.google.com/run/docs/networking/overview) — Networking is essential in production, but it is a better second-pass topic after you understand the base service lifecycle. ⏱ ~20 min ⚡ Optional
- `[Official Docs]` `[Bookmark as reference]` [Observability in Cloud Run](https://cloud.google.com/run/docs/monitoring) — Save this for the point where you are operating services and need to debug latency, errors, or scaling behavior. ⏱ ~20 min ⚡ Optional

---

### Explore Further

**Production and platform usage** — Learn how Cloud Run behaves as part of a broader delivery platform
- `[Official Docs]` `[Bookmark as reference]` [Secure Cloud Run services](https://cloud.google.com/run/docs/securing/overview) — Useful when you start caring about ingress, IAM, and exposure models.
- `[Official Docs]` `[Bookmark as reference]` [Rollouts, rollbacks, and traffic migration](https://cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration) — Helps once you treat Cloud Run as part of a real release process.

**Jobs and batch processing** — Cloud Run beyond request-driven services
- `[Official Docs]` `[Skim]` [Cloud Run jobs overview](https://cloud.google.com/run/docs/create-jobs) — If your use case includes batch or scheduled work, this is where the service model expands.

---

### Checkpoints
- [ ] I can explain when Cloud Run is a better fit than GKE or Cloud Functions for a service.
- [ ] I can deploy a service and describe the container assumptions Cloud Run makes at runtime.
- [ ] I know where to look for service configuration, identity, and rollout behavior.
- [ ] I can find a relevant official sample instead of starting from a random blog.

### Avoid for Now
- Do not start with networking edge cases before you understand the base service model.
- Do not treat Cloud Run as generic container hosting without learning the runtime contract.
- Do not jump into production hardening before you can deploy and revise a simple service.

### Next Topics
- Cloud Run IAM and service-to-service authentication
- Cloud Run networking and VPC connectivity
- CI/CD to Cloud Run
- Cost, scaling, and performance tuning

---

**Navigator's Note:** Cloud Run rewards a layered learning approach: understand the service model first, deploy something small, then let real operational questions pull you into networking, auth, and observability. You do not need to read every page up front; the important thing is to know what belongs in the first pass and what belongs in your reference toolbox.
