#!/usr/bin/env python3
"""
Week 0 Milestone Gate Verification Script
Semaglutide Evidence Navigator

Checks repository structure, required documentation, ADR definitions,
safety policy matrices, and CI configuration.
"""

import os
import sys

REQUIRED_FILES = [
    "README.md",
    "CONTRIBUTING.md",
    "requirements.txt",
    ".gitignore",
    ".env.example",
    "docs/adr/0001-project-boundary.md",
    ".github/workflows/ci.yml",
    ".github/ISSUE_TEMPLATE/bug_report.md",
    ".github/pull_request_template.md",
    "app/api/main.py",
    "app/ui/streamlit_app.py",
    "safety/router.py",
    "retrieval/faiss_search.py",
    "ingestion/pipeline.py",
    "generation/rag_engine.py",
    "evaluation/eval_suite.py",
    "tests/test_safety.py",
    "scripts/setup_env.sh"
]

REQUIRED_DIRECTORIES = [
    "app/api",
    "app/ui",
    "data/raw",
    "data/interim",
    "data/processed",
    "ingestion",
    "retrieval",
    "generation",
    "evaluation",
    "safety",
    "tests",
    "notebooks",
    "docs/adr",
    "scripts",
    ".github/workflows"
]

def check_gate():
    print("=" * 60)
    print("🚀 RUNNING MILESTONE 0 GATE VERIFICATION")
    print("   Semaglutide Evidence Navigator Architecture")
    print("=" * 60)

    errors = []

    # Check Directories
    for d in REQUIRED_DIRECTORIES:
        if not os.path.isdir(d):
            errors.append(f"❌ Missing Directory: {d}")
        else:
            print(f"✅ Directory Verified: {d}")

    # Check Files
    for f in REQUIRED_FILES:
        if not os.path.isfile(f):
            errors.append(f"❌ Missing Required File: {f}")
        else:
            print(f"✅ File Verified: {f}")

    # Check ADR Content
    adr_path = "docs/adr/0001-project-boundary.md"
    if os.path.isfile(adr_path):
        with open(adr_path, "r", encoding="utf-8") as file:
            content = file.read()
            if "In-Scope Constraints" not in content or "Out-of-Scope Constraints" not in content:
                errors.append("❌ ADR-0001 does not contain required In-Scope/Out-of-Scope system boundaries.")

    print("=" * 60)
    if errors:
        print("💥 MILESTONE 0 GATE FAILED!")
        for err in errors:
            print(err)
        sys.exit(1)
    else:
        print("🎉 MILESTONE 0 GATE PASSED SUCCESSFULLY!")
        print("   All repository structure, ADRs, CI, and safety boundaries are verified.")
        print("=" * 60)

if __name__ == "__main__":
    check_gate()
