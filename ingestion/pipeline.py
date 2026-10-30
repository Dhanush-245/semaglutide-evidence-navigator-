"""
Medical Data Ingestion Pipeline
Semaglutide Evidence Navigator
"""

import hashlib
from typing import Dict, Any

def process_document(doc_id: str, content: str, metadata: Dict[str, Any]) -> Dict[str, Any]:
    """Generates SHA256 content hash and attaches structured metadata ledger entry."""
    content_hash = hashlib.sha256(content.encode('utf-8')).hexdigest()
    metadata["content_hash"] = content_hash
    return {
        "doc_id": doc_id,
        "content": content,
        "metadata": metadata
    }
