# Contributing Guidelines

Thank you for contributing to the **Semaglutide Evidence Navigator** project!

We enforce strict engineering standards to ensure medical data accuracy, safety compliance, and code quality.

---

## 🔒 Branching Strategy & PR Rules

1. **Direct commits to `main` are strictly prohibited.**
2. All work must take place on dedicated feature or fix branches:
   - Feature branch format: `feature/m<milestone_number>-<short-description>` (e.g., `feature/m0-repo-setup`)
   - Fix branch format: `fix/<short-description>` (e.g., `fix/citation-validator-null-check`)
3. Every Pull Request (PR) requires:
   - At least **1 mandatory peer review and approval**.
   - **All CI checks passing** (linting, type checks, unit tests, and milestone gate scripts).
   - Clear description referencing the associated GitHub Issue.

---

## 🚦 Definition of Done (DoD)

A task or issue is considered **Done** when:
- [ ] Code is implemented according to the architectural specification.
- [ ] Unit tests are written in `tests/` and achieve >85% test coverage.
- [ ] No hardcoded secrets or API keys are committed (`.env.example` updated if new vars added).
- [ ] Markdown documentation or ADRs are updated if architecture changed.
- [ ] Milestone gate verification script (`python scripts/check_week0_gate.py`) completes with 0 errors.
- [ ] PR is approved by a peer reviewer and merged to `main`.

---

## 🧪 Running Tests & Gate Verification

```bash
# Run pytest test suite
pytest tests/ -v

# Run Week 0 Gate Verification
python scripts/check_week0_gate.py
```
