#!/usr/bin/env bash
# Semaglutide Evidence Navigator - Local Setup Script

set -e

echo "=== Setting up Python 3.11 Environment ==="
python3 -m venv venv
source venv/bin/activate

echo "=== Installing Dependencies ==="
pip install --upgrade pip
pip install -r requirements.txt

echo "=== Running Week 0 Gate Check ==="
python scripts/check_week0_gate.py

echo "=== Environment Setup Complete! ==="
