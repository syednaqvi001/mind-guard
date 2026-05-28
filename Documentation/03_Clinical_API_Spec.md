# 🔌 Clinical API Reference

Mind-Guard exposes a robust REST API for cross-platform integration between patients and therapists.

## 🔑 Authentication
All requests must include a valid JWT in the header, except for registration and login.
`Authorization: Bearer <your_jwt_token>`

---

## 🔔 Alert Management (Therapists)

### Resolve Clinical Signal
`PUT /api/alerts/{alertId}/resolve`

Resolves a flagged clinical alert and triggers a notification to the patient.
**Request Body:**
```json
{
  "resolutionNotes": "Clinical follow-up completed. Patient is stable.",
  "recommendation": "Increase weekly mindfulness exercises to 20 mins."
}
```
**Response (200 OK):**
Returns the updated Alert object with therapist attribution.

---

## 📓 Journaling (Patients)

### Create Journal Entry
`POST /api/journals`

Submits a new journal entry and triggers the AI Analysis Pipeline.
**Request Body:**
```json
{
  "title": "Evening Reflections",
  "content": "Full journal content here...",
  "mood": "Stable",
  "tags": "work, coping"
}
```
*Note: Minimum content length is now 2 characters to allow for urgent 'SOS' signals.*

---

## 📊 AI Analysis (System)

### Comprehensive Analysis Results
`GET /api/analysis/{journalEntryId}`

Retrieves the results of the Triple LLM pipeline.
**Response Fields:**
- `sentiment`: (e.g., NEGATIVE, POSITIVE)
- `riskScore`: (0-100 normalization)
- `distressLevel`: Clinical categorization
- `wellnessGuidance`: AI-generated patient feedback

---

## 🛠️ Global Parameters & Headers
- `X-Correlation-ID`: Used for tracking AI analysis across asynchronous calls.
- `Pagination`: All list endpoints support `page` and `size` parameters.
