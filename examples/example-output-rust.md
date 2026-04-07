## Learning Path: Rust (for a Go developer)

**Assumptions:**
- **Level:** Intermediate — experienced systems programmer (3 years Go), new to Rust specifically
- **Goal:** Practical competence — able to write, compile, and reason about Rust code confidently
- **Time budget:** A focused weekend to get the mental model, a second week to solidify
- **Style:** Docs-first, but you'll want to compile things quickly given your Go background

**Why this topic is tricky:** Ownership and borrowing are the mental-model shift — Rust requires you to prove memory safety at compile time, which rewires assumptions built from garbage-collected languages like Go.

---

### Phase 1 — Mental Model

- `[Official Docs]` `[Read now]` [The Rust Programming Language — Ch. 4: Understanding Ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html) — Ownership is the concept that will rewire your brain coming from Go; this chapter covers ownership, borrowing, and slices — read it before writing any real code. ⏱ ~45 min
- `[Official Docs]` `[Hands-on]` [Rust By Example](https://doc.rust-lang.org/rust-by-example/) — Runnable, annotated examples for every core concept; as a Go developer you'll prefer seeing code over reading prose, and this pairs well with The Book. ⏱ ~1 hour (skim and run examples)

### Phase 2 — Core Mechanics

- `[Official Docs]` `[Read now]` [The Rust Programming Language — Ch. 3: Common Programming Concepts](https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html) — Variables, types, functions, control flow — familiar territory from Go, but the mutability defaults and expression-based syntax will catch you. ⏱ ~30 min
- `[Official Docs]` `[Read now]` [The Rust Programming Language — Ch. 6: Enums and Pattern Matching](https://doc.rust-lang.org/book/ch06-00-enums.html) — Rust's enums (especially Option and Result) replace Go's error-return-value pattern; pattern matching is how you interact with them idiomatically. ⏱ ~30 min
- `[Official Docs]` `[Read now]` [The Rust Programming Language — Ch. 10: Generic Types, Traits, and Lifetimes](https://doc.rust-lang.org/book/ch10-00-generics.html) — Traits are Rust's answer to Go interfaces but more powerful; lifetimes are unique to Rust and connect directly to the ownership model. ⏱ ~1 hour
- `[Official Docs]` `[Skim]` [The Cargo Book](https://doc.rust-lang.org/cargo/) — Cargo is to Rust what go mod + go build is to Go, but it does more; understanding Cargo early avoids friction on everything else. ⏱ ~20 min skim

### Phase 3 — Applied Patterns

- `[Official Docs]` `[Hands-on]` [The Rust Programming Language — Ch. 12: An I/O Project](https://doc.rust-lang.org/book/ch12-00-an-io-project.html) — Builds a complete CLI tool (minigrep) from scratch, exercising ownership, error handling, and testing in a realistic context. ⏱ ~1.5 hours
- `[Community Guide]` `[Hands-on]` [Rust By Practice](https://practice.course.rs/) — Exercises organized by concept with solutions; the ownership and borrowing sections are especially useful for internalizing what The Book explains. ⏱ ~2–3 hours across multiple sessions
- `[Official Sample Repo]` `[Hands-on]` [rust-lang/rustlings](https://github.com/rust-lang/rustlings) — Small exercises that run in your terminal; the compiler errors guide you to the solution, which is exactly how Rust is meant to be learned. ⏱ ~3–4 hours total

### Phase 4 — Go Deeper

- `[Official Docs]` `[Read now]` [The Rust Programming Language — Ch. 16: Fearless Concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html) — As a Go developer you'll reach for concurrency early; this chapter shows how Rust's ownership model prevents data races at compile time instead of at runtime. ⏱ ~45 min
- `[Official Docs]` `[Bookmark as reference]` [The Rustonomicon](https://doc.rust-lang.org/nomicon/) — Unsafe Rust, raw pointers, FFI — only when you're comfortable with safe Rust and need to understand what's under the hood. ⏱ Reference, not linear reading

---

### Explore Further

**Go-to-Rust bridge** — Resources that map Go concepts to Rust equivalents
- `[Community Guide]` `[Skim]` [Rust for Go developers (blog posts and comparisons)](https://github.com/nicholasgasior/gopher-and-ferris) — Side-by-side comparisons of Go and Rust patterns; useful when you find yourself thinking "how would I do this Go thing in Rust?"

**Async Rust** — If you need Rust's equivalent of goroutines
- `[Official Docs]` `[Bookmark as reference]` [Asynchronous Programming in Rust](https://rust-lang.github.io/async-book/) — Async in Rust is fundamentally different from Go's goroutine model; read this only after you're solid on ownership and traits.

**Ecosystem orientation** — Finding and evaluating crates
- `[Official Docs]` `[Bookmark as reference]` [crates.io](https://crates.io/) + [lib.rs](https://lib.rs/) — lib.rs offers better discoverability and categorization than crates.io alone; use both when evaluating dependencies.

---

### Checkpoints
- [ ] I can explain ownership, borrowing, and lifetimes to a colleague without looking at notes
- [ ] I can write a small CLI tool that reads files, handles errors with Result, and compiles without warnings
- [ ] I can identify when to use &, &mut, clone, and owned values without trial-and-error
- [ ] I can compare how Rust and Go handle concurrency and explain the tradeoffs

### Avoid for Now
- Don't start with async Rust — it layers complexity on top of ownership that will confuse the fundamentals
- Don't reach for unsafe code; if you think you need it this early, you're probably fighting the borrow checker instead of learning from it
- Don't try to replicate Go patterns directly in Rust (e.g., channels everywhere) — Rust has different idioms for the same problems

### Next Topics
- Error handling patterns (thiserror, anyhow)
- Async Rust with tokio
- Writing and publishing crates
- FFI and interop with C libraries

---

**Navigator's Note:** Coming from Go, the biggest shift is that Rust makes you prove things to the compiler that Go handles at runtime (or doesn't handle at all). The first few hours will feel slower — that's normal and it's the borrow checker doing its job. Follow the compiler errors; they're genuinely helpful and the best teacher you have. Once ownership clicks, the rest of Rust falls into place faster than you'd expect.
