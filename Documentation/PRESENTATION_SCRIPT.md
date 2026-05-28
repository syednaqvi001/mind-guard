# 🎤 Presentation Script: Mind-Guard Resurrection

**Duration**: 5 - 7 Minutes

---

## Slide 1: Initial Analysis (1 Min)
- **Problem**: I inherited a mental health portal that was technically "fragile."
- **Current State**: Hardcoded credentials, broken history feeds, and a lack of accountability in the AI pipeline.
- **Goal**: Transform it into a production-ready, HIPAA-aware clinical tool.

## Slide 2: Brownfield Improvements (1.5 Mins)
- **Fix 1 (Security)**: Moved everything to `.env`. The app now starts with a secure validation check.
- **Fix 2 (UX)**: Added a **Collapsible Sidebar**. Why? Therapists need screen real estate for dense patient data.
- **Fix 3 (Bugs)**: Repaired the broken "Signal History" tab. It’s now a unified, searchable audit log.
- **Before vs After**: Mention the 401 Unauthorized errors we cleared and the UI responsiveness we added.

## Slide 3: AI Safety Implementation (1.5 Mins)
- **Feature**: **The Clinical Accountability Shield**.
- **The Risk**: Raw LLM output can hallucinate or give poor advice in a crisis.
- **The Solution**: I gated all AI wellness insights. A patient only sees "Reviewed by Dr. [Name]" once the therapist has verified the AI's findings and added their own recommendation.
- **Impact**: We moved from "Experimental AI" to "Regulated Clinical Tool."

## Slide 4: AI Innovation (1 Min)
- **Feature**: **Orchestrated Triple-LLM Pipeline**.
- **Technical approach**: We use three distinct agents (Sentiment, Distress, and Synthesis).
- **Benefit**: It doesn't just flag a post; it interprets the "Why" and "What Next" for the clinician, reducing triage time by an estimated 80%.

## Slide 5: Reflection & Conclusion (1 Min)
- **Claude & Gemini**: Claude helped me nail the premium UI aesthetics; Gemini helped me untangle the complex Spring Data JPA relationships.
- **Closing**: We didn't just fix bugs; we engineered a responsible, maintainable, and clinically-aligned platform.

---

### 🎨 Pro-Tip for Demo:
1. Show the **collapsing sidebar** first (UI/UX).
2. Submit a journal with **"sos"** (Validation fix).
3. Switch to therapist, **Resolve with notes** (Safety + Innovation).
4. Switch back to patient to show the **"Reviewed by"** badge (The full loop).
