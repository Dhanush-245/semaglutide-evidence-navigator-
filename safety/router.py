"""
Safety Router Module
Semaglutide Evidence Navigator

Classifies user questions into 5 safety categories:
Category A: Safe General Info -> Proceed to RAG Retrieval
Category B: Missing Details -> Clarify Country/Brand
Category C: Personal Dose Advice -> Refuse & Direct to Doctor
Category D: Emergency / Acute Symptoms -> Emergency Escalation
Category E: Unapproved / Illegal -> Refuse Unapproved Custom Compounding
"""

from typing import Dict, Any, List

ROUTE_DESCRIPTIONS = {
    "A_SAFE_INFO": "General medical evidence query. Grounded in FDA/EMA labels.",
    "B_NEED_DETAILS": "Query lacks jurisdiction (US vs EU) or brand specification.",
    "C_PERSONAL_ADVICE": "Request for personalized dosage or treatment plan. MUST REFUSE.",
    "D_EMERGENCY": "Acute adverse reaction or emergency symptoms. IMMEDIATE ESCALATION.",
    "E_UNAPPROVED": "Request for custom compounding or unapproved sourcing. MUST REFUSE."
}

def classify_query(query: str) -> Dict[str, Any]:
    """Classifies user question into safety categories with rationale and action."""
    q_lower = query.lower()

    # Emergency check (Category D)
    emergency_signals = [
        "allergic", "severe pain", "severe stomach pain", "radiating to my back",
        "vision loss", "blindness", "pancreatitis", "fainted", "unconscious",
        "breath", "trouble breathing", "anaphylaxis", "jaundice", "yellow eyes",
        "gallbladder attack", "cholecystitis", "stopped urinating", "anuria",
        "suicidal", "thoughts of self harm"
    ]
    if any(sig in q_lower for sig in emergency_signals):
        return {
            "route": "D_EMERGENCY",
            "confidence": 0.99,
            "rationale": "Detected acute safety alert signal requiring emergency medical escalation.",
            "action": "Immediate emergency notice. Advise 911 / ER / Prescribing Physician immediately."
        }

    # Unapproved / Compounding check (Category E)
    unapproved_signals = [
        "compound", "reconstitute", "powder", "without prescription", "salt form",
        "semaglutide sodium", "semaglutide acetate", "black market", "fake ozempic",
        "lot nar0074", "research chemical", "bac water", "no rx", "buy online cheap"
    ]
    if any(sig in q_lower for sig in unapproved_signals):
        return {
            "route": "E_UNAPPROVED",
            "confidence": 0.98,
            "rationale": "Query requests unapproved compounding, research chemicals, or non-prescription procurement.",
            "action": "Refusal notice per FDA alert on unapproved compounding and unsafe procurement."
        }

    # Personal medical advice check (Category C)
    personal_signals = [
        "should i take", "my dosage", "i missed a dose", "can i switch to",
        "how much should i inject", "i took", "my doctor told me", "should i increase my dose",
        "i am pregnant", "trying to get pregnant", "breastfeeding while taking",
        "i have surgery tomorrow", "anesthesia fasting", "doubled my dose"
    ]
    if any(sig in q_lower for sig in personal_signals):
        return {
            "route": "C_PERSONAL_ADVICE",
            "confidence": 0.96,
            "rationale": "Query asks for personalized medical guidance, individual dosage adjustment, or clinical management.",
            "action": "Refusal & referral to prescribing doctor or pharmacist."
        }

    # Needs details check (Category B)
    if "dose" in q_lower and not any(brand in q_lower for brand in ["ozempic", "wegovy", "rybelsus"]):
        return {
            "route": "B_NEED_DETAILS",
            "confidence": 0.88,
            "rationale": "Query asks about dosing without specifying brand (Ozempic vs Wegovy vs Rybelsus).",
            "action": "Ask user to clarify exact product brand and country jurisdiction."
        }

    # Default to Safe Info (Category A)
    return {
        "route": "A_SAFE_INFO",
        "confidence": 0.95,
        "rationale": "General factual query regarding approved drug label or trial evidence.",
        "action": "Proceed to FAISS semantic retrieval & citation generation."
    }
