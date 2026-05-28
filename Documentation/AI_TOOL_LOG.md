# 📝 AI Usage & Prompt Log

This project was a collaborative effort between the developer and AI Coding Assistants (**Claude Code** and **Gemini Code Assist**).

## 🛠️ Tool Attribution

### Claude Code (UI/UX & Frontend Logic)
- **Primary Contribution**: Designing the "Glassmorphic" CSS system and the stateful collapsible sidebar.
- **Problem Solving**: Refactored the Angular routing and guard architecture to ensure 401 errors were handled gracefully.
- **Innovation**: Proposed the "Single Source of Truth" approach for clinical triage filters.

### Gemini Code Assist (Backend & Architecture)
- **Primary Contribution**: Architecting the Spring Boot `.env` integration and the Data Transfer Object (DTO) patterns.
- **Problem Solving**: Fixed complex JPA mapping issues in the `AlertRepository` that were causing the blank history bug.
- **Safety**: Guided the implementation of the `JournalService` role-based attribution logic.

---

## 📈 Prompt Evolution Examples

### Scenario: Fixing the 401 Unauthorized Issue
- **Step 1 (Basic)**: "The therapist login is failing after success."
- **Step 2 (Technical)**: "The JWT is saved in localStorage but the subsequent /alerts call is failing. Check the interceptor."
- **Step 3 (Refined)**: "Update the `AuthInterceptor` to correctly retrieve the token from localStorage and ensure the `TherapistService` adds the Bearer prefix."

### Scenario: AI Safety Attribution
- **Step 1**: "I want the patient to see who reviewed their alert."
- **Step 2**: "Update the `Alert` entity to include `resolved_by`. When a therapist resolves it, save their ID."
- **Step 3**: "Refactor `JournalService` to cross-reference `resolved_by` with the `User` table to return the therapist's full name as 'Dr. [Lastname]' in the `JournalEntryResponse`."

---

## 🚦 AI Failure & Hallucination Log

### Failure Observed
Initially, the AI suggested using a simple Angular `Service` variable for the sidebar state.
- **The Issue**: This state was lost on page refresh.
- **Engineering Correction**: We overrode this by implementing a `BehaviorSubject` in the `SharedService` to provide a persistent, observable state.

### Hallucination Observed
The AI suggested a library for Pepper encryption that was incompatible with Spring Boot 3.3.
- **Engineering Correction**: We opted for a manual implementation using Java's built-in `SecretKey` and `Cipher` classes for maximum stability and control.
