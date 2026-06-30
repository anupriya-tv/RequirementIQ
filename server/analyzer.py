import os
import json
from groq import Groq
from dotenv import load_dotenv

load_dotenv()

USE_MOCK = False  # set True anytime to fall back to sample data

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

ANALYSIS_PROMPT = """You are an expert Business Analyst. Analyze the following raw meeting notes, emails, or stakeholder input and extract structured business requirements.

Return ONLY valid JSON (no markdown, no preamble) in exactly this format:

{
  "functional_requirements": [
    {"id": "FR-01", "requirement": "...", "priority": "High/Medium/Low", "source": "who mentioned it"}
  ],
  "non_functional_requirements": [
    {"id": "NFR-01", "requirement": "...", "metric": "..."}
  ],
  "user_stories": [
    {"id": "FR-01", "story": "As a [user], I want [goal] so that [reason]"}
  ],
  "acceptance_criteria": [
    {"requirement_id": "FR-01", "criteria": ["criterion 1", "criterion 2"]}
  ],
  "ambiguities": [
    {"id": "A-01", "issue": "...", "stakeholders_to_consult": "...", "impact": "..."}
  ]
}

Raw input to analyze:
---
{input_text}
---

Remember: respond with ONLY the JSON object, nothing else. No markdown fences, no explanation."""


MOCK_RESPONSE = {
    "functional_requirements": [
        {"id": "FR-01", "requirement": "The system shall display a sales data dashboard accessible to authorized users", "priority": "High", "source": "Product"},
        {"id": "FR-02", "requirement": "Users shall be able to export dashboard data to Excel format", "priority": "High", "source": "Finance"},
        {"id": "FR-03", "requirement": "The system shall support a self-service password reset flow via email", "priority": "Critical", "source": "Customer Success"}
    ],
    "non_functional_requirements": [
        {"id": "NFR-01", "requirement": "Login page shall load within an acceptable response time", "metric": "Target: <2 seconds (current: 4-5s)"}
    ],
    "user_stories": [
        {"id": "FR-01", "story": "As an authorized user, I want to view a sales data dashboard so that I can monitor performance metrics relevant to my role."},
        {"id": "FR-03", "story": "As a user, I want to reset my password myself so that I can regain access immediately without waiting for IT support."}
    ],
    "acceptance_criteria": [
        {"requirement_id": "FR-03", "criteria": ["User can initiate password reset from login page", "Reset link sent within 60 seconds", "Reset link expires after 24 hours"]}
    ],
    "ambiguities": [
        {"id": "A-01", "issue": "Sales dashboard data scope undefined - which metrics, time periods, or sources?", "stakeholders_to_consult": "Product, Engineering", "impact": "Cannot begin dashboard development"},
        {"id": "A-02", "issue": "Export format conflict - Finance wants Excel, Customer Success wants Google Sheets", "stakeholders_to_consult": "Finance, Customer Success", "impact": "Export feature scope unclear"}
    ]
}


def analyze_requirements(raw_text):
    """
    Takes raw meeting notes / emails and returns structured requirements as a dict.
    Uses Groq (Llama models) - fast and has a genuinely working free tier.
    """
    if USE_MOCK:
        print("[MOCK MODE] Returning sample data - no API call made.\n")
        return MOCK_RESPONSE

    prompt = ANALYSIS_PROMPT.replace("{input_text}", raw_text)

    response = client.chat.completions.create(
        model="llama-3.3-70b-versatile",
        messages=[
            {"role": "user", "content": prompt}
        ],
        temperature=0.3,
        max_tokens=2000,
    )

    raw_output = response.choices[0].message.content.strip()

    # Clean up in case the model adds markdown fences
    if raw_output.startswith("```"):
        raw_output = raw_output.split("```")[1]
        if raw_output.startswith("json"):
            raw_output = raw_output[4:]
        raw_output = raw_output.strip()
    if raw_output.endswith("```"):
        raw_output = raw_output[:-3].strip()

    try:
        parsed = json.loads(raw_output)
        return parsed
    except json.JSONDecodeError as e:
        return {"error": "Failed to parse AI response", "details": str(e), "raw": raw_output}


if __name__ == "__main__":
    sample_notes = """
    sarah said the new dashboard needs to show sales data. ravi asked which sales data exactly
    but we moved on. priya wants export functionality for her team. the login should be faster,
    it currently takes 4-5 seconds. password reset is broken, users have to email IT which takes 2 days.
    """

    result = analyze_requirements(sample_notes)
    print(json.dumps(result, indent=2))