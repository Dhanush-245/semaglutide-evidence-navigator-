"""
Streamlit Frontend User Interface
Semaglutide Evidence Navigator
"""

import streamlit as st

st.set_page_config(
    page_title="Semaglutide Evidence Navigator",
    page_icon="🩺",
    layout="wide"
)

st.title("🩺 Semaglutide Evidence Navigator")
st.caption("Source-Grounded, Citation-Verified Medical Evidence Engine")

st.sidebar.title("Navigation & Scope")
st.sidebar.info("Milestone 0: Engineering Environment & Safety Router")

query = st.text_input("Ask a medical evidence question about Ozempic, Wegovy, or Rybelsus:", "")

if st.button("Search Official Evidence"):
    if query:
        st.write(f"Analyzing query: **{query}**...")
        st.success("Query processed under Milestone 0 Safety Router guidelines.")
    else:
        st.warning("Please enter a question.")
