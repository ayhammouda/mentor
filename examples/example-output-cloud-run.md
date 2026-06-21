## Mentorship Compass: Google Cloud Run

**Assumptions:**
- Level: Intermediate developer or platform engineer
- Goal: Understand where Cloud Run fits and which docs to keep close
- Time budget: A focused weekend
- Context: No specific language, framework, or existing Google Cloud setup provided

**Why this topic is tricky:** Cloud Run looks like a simple container service, but learners often blur it with Cloud Functions, GKE, or generic container hosting. The useful first move is to understand the service model before touching operational details.

---

### Learning Compass

#### Iteration 1 - The Service Model
- **Read first:** `[Official Docs]` `[Read first]` [What is Cloud Run](https://docs.cloud.google.com/run/docs/overview/what-is-cloud-run) - Start here because it defines the service abstraction, request model, autoscaling, and where Cloud Run sits in Google Cloud.
- **Check next:** `[Official Docs]` `[Skim for context]` [Deployment options and resource model](https://docs.cloud.google.com/run/docs/resource-model) - Skim this to separate services, revisions, and traffic from the broader product pitch.
- **What to notice:** Cloud Run is organized around services and revisions, not servers or clusters.
- **Stop before:** Do not start with networking, IAM, or CI/CD until the service lifecycle is clear.

#### Iteration 2 - The Container Contract
- **Read first:** `[Official Docs]` `[Read first]` [Container runtime contract](https://docs.cloud.google.com/run/docs/container-contract) - This is the contract your container must satisfy, so it explains many later "why does Cloud Run behave like that?" questions.
- **Check next:** `[Official Docs]` `[Bookmark]` [Compare Cloud Run functions](https://docs.cloud.google.com/run/docs/functions/comparison) - Bookmark this to avoid confusing Cloud Run services with function-shaped deployment models.
- **Inspect:** `[Official Sample Repo]` `[Inspect]` [GoogleCloudPlatform/cloud-run-samples](https://github.com/GoogleCloudPlatform/cloud-run-samples) - Inspect the sample categories and language spread to see what Google treats as normal Cloud Run shapes.
- **What to notice:** The platform expects a portable container, but the runtime contract still creates Cloud Run-specific constraints.
- **Stop before:** Do not treat Cloud Run as "just Docker on Google Cloud"; the platform contract matters.

#### Iteration 3 - Configuration, Revisions, and Traffic
- **Read first:** `[Official Docs]` `[Read first]` [Configure Cloud Run services](https://docs.cloud.google.com/run/docs/configuring) - Read this once the service model is clear because configuration choices create revisions and affect rollout behavior.
- **Check next:** `[Official Docs]` `[Read next]` [Rollouts, rollbacks, and traffic migration](https://docs.cloud.google.com/run/docs/rollouts-rollbacks-traffic-migration) - This gives the release-management shape without turning the learning path into a deployment recipe.
- **What to notice:** A configuration change is not just a setting; it changes the revision and traffic story.
- **Stop before:** Do not optimize rollout patterns before you can explain revisions.

#### Iteration 4 - Identity and Exposure
- **Read first:** `[Official Docs]` `[Read first]` [Authentication overview](https://docs.cloud.google.com/run/docs/authenticating/overview) - Read this before production architecture because Cloud Run exposure and service-to-service access are identity decisions.
- **Check next:** `[Official Docs]` `[Bookmark]` [Security design overview](https://docs.cloud.google.com/run/docs/securing/security) - Bookmark this as the landing page for ingress, IAM, and service security once you move beyond orientation.
- **What to notice:** Access is not a single switch; Cloud Run combines ingress, identity, invocation permissions, and service accounts.
- **Stop before:** Do not design perimeter or VPC details until invocation identity is clear.

#### Iteration 5 - Operations as a Second Pass
- **Read first:** `[Official Docs]` `[Read next]` [Observability in Cloud Run](https://docs.cloud.google.com/run/docs/monitoring) - Read this after the runtime and traffic model so metrics, logs, and traces have something concrete to attach to.
- **Check next:** `[Official Docs]` `[Bookmark]` [Private networking and Cloud Run](https://docs.cloud.google.com/run/docs/securing/private-networking) - Bookmark networking for the moment you need private services, VPC access, or ingress control.
- **Inspect:** `[Vendor Architecture Guide]` `[Inspect]` [Cloud Run architecture center resources](https://cloud.google.com/architecture?product=Cloud%20Run) - Inspect the architecture topics to see which production questions Google expects teams to ask.
- **What to notice:** Operations topics become clearer after you know whether you are debugging runtime behavior, release behavior, identity, or networking.
- **Stop before:** Do not read every production guide linearly; use them as branches from a clear service model.

---

### Explore Later

**Practice later** - Useful after the service model and runtime contract are clear.
- `[Official Tutorial]` `[Practice later]` [Quickstart: Deploy to Cloud Run](https://docs.cloud.google.com/run/docs/quickstarts/deploy-container) - Save this for when you want a short confirmation pass, not as the first conceptual source.

**Jobs and background work** - Cloud Run beyond request-driven services.
- `[Official Docs]` `[Skim for context]` [Cloud Run jobs overview](https://docs.cloud.google.com/run/docs/create-jobs) - Skim this later if your use case includes batch or scheduled work.

---

### Checkpoints
- [ ] I can explain Cloud Run services, revisions, and traffic without mentioning VM or cluster management.
- [ ] I can describe why the container runtime contract matters.
- [ ] I can tell whether a question belongs to configuration, rollout, identity, networking, or observability.
- [ ] I can distinguish Cloud Run from Cloud Functions and GKE at a service-model level.

### Avoid for Now
- Do not start with VPC and networking edge cases.
- Do not treat Cloud Run as generic container hosting.
- Do not begin with CI/CD mechanics before understanding revisions and traffic.

### Next Topics
- Cloud Run IAM and service-to-service authentication
- Private networking and VPC connectivity
- CI/CD release patterns for Cloud Run
- Cost, scaling, and performance tuning

---

**Navigator's Note:** Learn Cloud Run by layering the model: service, container contract, revision, identity, then operations. The docs are broad, so your job is to know which page answers which class of question. Use quickstarts later to confirm the model, not to discover it.
