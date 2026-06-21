## Mentorship Compass: Terraform Modules

**Assumptions:**
- Level: Intermediate infrastructure engineer with basic Terraform familiarity
- Goal: Understand where modules fit before designing reusable infrastructure abstractions
- Time budget: A focused day
- Context: No specific cloud provider or team module registry provided

**Why this topic is tricky:** Terraform modules sound like a simple reuse mechanism, but learners often jump into abstraction before understanding what problem modules solve. Provider docs and registry browsing are useful later, but they are not the learning path.

---

### Learning Compass

#### Iteration 1 - What Modules Are For
- **Read first:** `[Official Docs]` `[Read first]` [Terraform modules overview](https://developer.hashicorp.com/terraform/language/modules) - Start here because it explains what a module is and why Terraform treats every configuration as a module.
- **Check next:** `[Official Docs]` `[Skim for context]` [Terraform configuration language](https://developer.hashicorp.com/terraform/language) - Skim this to place modules inside the larger language model of blocks, arguments, expressions, and files.
- **What to notice:** A module is a boundary for configuration structure and reuse, not automatically a mark of better design.
- **Stop before:** Do not browse the public registry yet; it will pull you toward consumption before understanding design.

#### Iteration 2 - Calling a Module
- **Read first:** `[Official Docs]` `[Read first]` [Module block reference](https://developer.hashicorp.com/terraform/language/modules/syntax) - Read this to understand how a calling module points to a child module and passes inputs.
- **Check next:** `[Official Docs]` `[Read next]` [Module sources](https://developer.hashicorp.com/terraform/language/modules/sources) - This explains how local paths, registries, and versioned sources change module consumption.
- **What to notice:** The `source` decision is also a lifecycle decision: local structure, versioning, publishing, and trust all enter here.
- **Stop before:** Do not design a shared module API until you understand how callers consume it.

#### Iteration 3 - Designing a Module Shape
- **Read first:** `[Official Docs]` `[Read first]` [Develop modules](https://developer.hashicorp.com/terraform/language/modules/develop) - Read this once syntax is clear because it shifts from using modules to designing them.
- **Check next:** `[Official Docs]` `[Bookmark]` [Terraform style conventions](https://developer.hashicorp.com/terraform/language/style) - Bookmark this for naming and layout questions that matter once more than one person reads the module.
- **Inspect:** `[Official Sample Repo]` `[Inspect]` [hashicorp-education/learn-terraform-modules](https://github.com/hashicorp-education/learn-terraform-modules) - Inspect the folder boundaries and variable/output names to see how HashiCorp teaches module shape.
- **What to notice:** A reusable module is mostly an interface design problem: inputs, outputs, naming, and hidden assumptions.
- **Stop before:** Do not abstract tiny one-off configurations just because modules exist.

#### Iteration 4 - Registry and Testing as Later Concerns
- **Read first:** `[Official Reference]` `[Bookmark]` [Terraform Registry](https://registry.terraform.io/) - Bookmark the registry as discovery material, not as your first teacher for module design.
- **Check next:** `[Official Docs]` `[Bookmark]` [Terraform test framework](https://developer.hashicorp.com/terraform/language/tests) - Save this for when you publish or share modules and need confidence beyond local usage.
- **What to notice:** Registry consumption, versioning, and testing matter after you understand the module boundary.
- **Stop before:** Do not optimize for publishing before you can explain the module's caller-facing contract.

---

### Explore Later

**Team conventions** - Move from "I understand modules" to "others can maintain this module."
- `[Community Guide]` `[Skim for context]` [Terraform Best Practices: Key concepts](https://www.terraform-best-practices.com/key-concepts) - Use this as a practitioner lens on naming and structure after official module concepts are clear.

**Practice later** - Useful after the design vocabulary is in place.
- `[Official Tutorial]` `[Practice later]` [Reuse configuration with modules](https://developer.hashicorp.com/terraform/tutorials/modules/module) - Save this for turning the reading path into a concrete pass through module usage.

---

### Checkpoints
- [ ] I can explain what problem modules solve and when they are unnecessary.
- [ ] I can describe the relationship between root modules, child modules, sources, inputs, and outputs.
- [ ] I can inspect a module and identify its public interface.
- [ ] I can tell when registry browsing is reference work rather than learning work.

### Avoid for Now
- Do not start by copying public registry modules.
- Do not over-abstract small configurations.
- Do not confuse provider documentation with module design guidance.
- Do not publish modules before understanding caller expectations.

### Next Topics
- Module versioning
- Terraform testing
- Team module registries
- Provider-specific module patterns

---

**Navigator's Note:** Learn modules by looking at boundaries, not by chasing examples. First understand what a module hides, what it exposes, and how callers consume it. Once that clicks, tutorials and registry examples become easier to evaluate instead of imitate.
