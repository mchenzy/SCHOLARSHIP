# Testing & Refinement Documentation

This system is designed to facilitate rapid "Select" or "Reject" decisions in under 60 seconds per application. Follow this guide to test and refine the prompt logic.

## 1. How to Test the System
Run pilot tests with these three user archetypes to verify the logic gates work as intended:

*   **Strong Applicants:** 
    *   *Profile:* Clear eligibility, direct alignment, and quantifiable achievements.
    *   *Expectation:* The tool should not constrain them. Ensure the 40-word alignment limit allows them to capture their nuance without fluff.
*   **Average Applicants:** 
    *   *Profile:* Eligible but prone to vague descriptions (e.g., "I am passionate about helping people").
    *   *Expectation:* The "Key Achievement" structured inputs (Role + Action + Outcome) must force them to convert feelings into facts.
*   **Weak Applicants:** 
    *   *Profile:* Ineligible or unaligned field of study.
    *   *Expectation:* The "Eligibility Gate" must stop them immediately, preventing them from generating a summary at all.

## 2. What to Measure
During testing, track these specific metrics:

*   **Reviewer Decision Time:** Can a reviewer make a confident decision on the generated summary in < 60 seconds?
*   **Clarity of Information:** Ratio of factual nouns/verbs to subjective adjectives.
*   **Selection-for-Review Rate:** Does the percentage of applications passing the first screen increase compared to unstructured essays?

## 3. How to Refine
Based on the metrics above, adjust the constraints:

*   **Tighten prompts if vague answers appear:** If applicants still provide fluff, lower the word counts (e.g., reduce Intent from 70 to 50 words).
*   **Improve examples rather than expanding freedom:** If applicants are confused, provide more specific "Bad vs. Good" examples in the hint boxes. Do not relax the constraints.
*   **Reduce word limits to eliminate fluff:** Emotional appeals usually appear when word limits are too high. Constraint forces priority.

## 4. Task Mapping
This solution addresses the core requirements as follows:
*   **Task 1 (Prompts):** Implemented specific constrained inputs for Alignment, Achievement, and Intent.
*   **Task 2 (Info Hierarchy):** Prioritizes Eligibility (Tier 1) and Signals (Tier 2) over Context (Tier 3).
*   **Task 3 (Interface):** Step-by-step React UI with live counters and PDF generation.
*   **Task 4 (Testing):** Explicit testing footer added to UI and this strategy document included.
