## Mentorship Compass: Rust (for a Go developer)

**Assumptions:**
- Level: Intermediate systems programmer, experienced with Go, new to Rust
- Goal: Build the right mental model before writing much Rust
- Time budget: A focused weekend for orientation, then a second pass for practice
- Context: You already understand compiled languages, tooling, and basic concurrency tradeoffs

**Why this topic is tricky:** Ownership and borrowing are the mental-model shift. Rust asks you to make data lifetime and mutation decisions explicit, where Go often lets runtime behavior or convention carry that weight.

---

### Learning Compass

#### Iteration 1 - Ownership Before Syntax Comfort
- **Read first:** `[Official Docs]` `[Read first]` [The Rust Programming Language - Ch. 4: Understanding Ownership](https://doc.rust-lang.org/book/ch04-00-understanding-ownership.html) - Start here because ownership is the idea that will make the rest of Rust either coherent or frustrating.
- **Check next:** `[Official Docs]` `[Read next]` [References and Borrowing](https://doc.rust-lang.org/book/ch04-02-references-and-borrowing.html) - This narrows the broad ownership idea into the everyday question of when a value is moved, borrowed, or mutably borrowed.
- **Inspect:** `[Official Sample Repo]` `[Inspect]` [rust-lang/rustlings](https://github.com/rust-lang/rustlings) - Look at how the exercise order isolates compiler feedback by concept; do not treat it as an assignment yet.
- **What to notice:** The compiler is not just checking syntax; it is enforcing a model of who owns data and who may mutate it.
- **Stop before:** Async Rust, unsafe Rust, macros, and crates; they will all distract from the first mental model.

#### Iteration 2 - Familiar Syntax, Unfamiliar Defaults
- **Read first:** `[Official Docs]` `[Read first]` [The Rust Programming Language - Ch. 3: Common Programming Concepts](https://doc.rust-lang.org/book/ch03-00-common-programming-concepts.html) - Read this after ownership so variables, mutability, and expressions do not look deceptively Go-like.
- **Check next:** `[Official Docs]` `[Read next]` [The Rust Programming Language - Ch. 6: Enums and Pattern Matching](https://doc.rust-lang.org/book/ch06-00-enums.html) - Enums and pattern matching are central to Rust's style, especially because `Option` and `Result` replace many nil/error habits from Go.
- **What to notice:** Rust makes invalid states harder to represent, but that requires you to model cases explicitly.
- **Stop before:** Do not map every Go idiom directly to Rust; the syntax may look approachable while the design pressure is different.

#### Iteration 3 - Error Handling and Project Shape
- **Read first:** `[Official Docs]` `[Read first]` [The Rust Programming Language - Ch. 9: Error Handling](https://doc.rust-lang.org/book/ch09-00-error-handling.html) - This shows how Rust separates recoverable errors from unrecoverable failures, which is the next major shift after ownership.
- **Check next:** `[Official Docs]` `[Skim for context]` [The Cargo Book](https://doc.rust-lang.org/cargo/) - Skim Cargo as the map for packages, builds, dependencies, and workspace vocabulary rather than reading it linearly.
- **Inspect:** `[Official Docs]` `[Inspect]` [The Rust Programming Language - Ch. 12: An I/O Project](https://doc.rust-lang.org/book/ch12-00-an-io-project.html) - Inspect the chapter structure to see how modules, errors, tests, and ownership meet in one small CLI.
- **What to notice:** Rust project shape is not only files and packages; it is also how error flow and ownership boundaries become visible.
- **Stop before:** Do not optimize for crate selection yet; first learn the standard project vocabulary.

#### Iteration 4 - Traits, Lifetimes, and the Go Interface Trap
- **Read first:** `[Official Docs]` `[Read first]` [The Rust Programming Language - Ch. 10: Generic Types, Traits, and Lifetimes](https://doc.rust-lang.org/book/ch10-00-generics.html) - Traits may remind you of Go interfaces, but lifetimes and trait bounds make the design space more explicit.
- **Check next:** `[Official Docs]` `[Bookmark]` [The Rust Reference](https://doc.rust-lang.org/reference/) - Bookmark this for exact language rules once The Book's explanations are no longer enough.
- **Inspect:** `[Official Docs]` `[Inspect]` [std::result::Result](https://doc.rust-lang.org/std/result/) - Inspect how the standard docs explain a foundational enum and its methods; this is the style of reference reading you will use constantly.
- **What to notice:** Rust abstractions carry constraints in the type system instead of leaving them in comments or convention.
- **Stop before:** Do not start with advanced trait patterns; learn ordinary trait bounds and lifetimes first.

#### Iteration 5 - Concurrency Only After Ownership Clicks
- **Read first:** `[Official Docs]` `[Read next]` [The Rust Programming Language - Ch. 16: Fearless Concurrency](https://doc.rust-lang.org/book/ch16-00-concurrency.html) - Read this only after ownership feels less foreign, because Rust concurrency is ownership applied under pressure.
- **Check next:** `[Official Docs]` `[Bookmark]` [Asynchronous Programming in Rust](https://rust-lang.github.io/async-book/) - Bookmark this for later; async Rust is not Rust's version of goroutines.
- **What to notice:** Rust prevents entire classes of shared-state mistakes by making ownership and synchronization choices visible.
- **Stop before:** Do not begin with async frameworks; they stack a second mental model on top of the first.

---

### Explore Later

**Practice when ready** - Convert the compass into deliberate exercises after the reading layers make sense.
- `[Official Docs]` `[Practice later]` [Rust By Example](https://doc.rust-lang.org/rust-by-example/) - Use this when you want small runnable examples after you understand what each concept is for.

**Deep internals** - Only useful once safe Rust feels normal.
- `[Official Docs]` `[Bookmark]` [The Rustonomicon](https://doc.rust-lang.org/nomicon/) - Keep this as unsafe Rust background, not as an early learning source.

---

### Checkpoints
- [ ] I can explain ownership, borrowing, and mutable borrowing without comparing them to Go pointers too loosely.
- [ ] I can describe why `Option` and `Result` shape Rust control flow.
- [ ] I can identify where Cargo, modules, and errors fit in a small Rust project.
- [ ] I can explain why async Rust should come after ownership and traits.

### Avoid for Now
- Do not start with async Rust.
- Do not reach for unsafe Rust to get around borrow-checker friction.
- Do not copy Go patterns directly into Rust designs.
- Do not browse crates before you know the standard library and Cargo vocabulary.

### Next Topics
- Error handling patterns with `thiserror` and `anyhow`
- Async Rust and Tokio
- Writing library crates
- FFI and unsafe boundaries

---

**Navigator's Note:** Your Go background helps with systems tradeoffs, but it can also make Rust feel more familiar than it is. Let ownership be the first lens, then revisit syntax, errors, traits, and concurrency through that lens. The point is not to complete every linked page; it is to know which page should answer which kind of confusion.
