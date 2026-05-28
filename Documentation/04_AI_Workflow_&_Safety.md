# 🧠 AI Workflow & Clinical Safety

Mind-Guard utilizes a sophisticated multi-stage AI pipeline to transform raw patient data into actionable clinical insights.

## 🌊 The "Triple-LLM" Pipeline

When a patient submits a journal entry, the system orchestrates three distinct asynchronous calls to the Hugging Face Inference API:

### 1. Sentiment Analysis 📊
- **Objective**: Determine the baseline emotional tone.
- **Model**: `distilbert-base-uncased-finetuned-sst-2`
- **Output**: Positive/Negative probability score.

### 2. Distress Detection 🚨
- **Objective**: Identify specific indicators of clinical distress.
- **Model**: `facebook/bart-large-mnli` (Zero-Shot)
- **Output**: Clinical risk categorization (Low, Medium, High).

### 3. AI Insight Generation 💡
- **Objective**: Synthesize the results of Call #1 and Call #2 into human-readable guidance.
- **Logic**: This call depends on the completion of the first two, ensuring the generated insight is grounded in accurate sentiment and risk data.

---

## 🛡️ Clinical Safety Measures

### Triage Logic (Risk Scoring)
We use a weighted algorithm to calculate a normalized **Risk Score (0-100)**:
`RiskScore = (SentimentWeight * Sx) + (DistressWeight * Dx)`
- **Standard (0-40)**: No alert; wellness guidance stored.
- **Urgent (40-70)**: Standard alert generated for therapist review.
- **Emergency (70+)**: Immediate high-priority alert with automated escalation.

### Resolution Attribution
To maintain professional accountability (essential for HIPAA-aligned workflows), every resolved alert is attributed to a specific therapist.
- **Doctor Verification**: Only users with the `THERAPIST` role can resolve alerts.
- **Patient Feedback**: Resolved alerts display the therapist's name (e.g., *"Reviewed by Dr. Smith"*) to the patient, closing the care loop.

### Fail-Safe: Mock Mode
In environments where external API connectivity is unstable, Mind-Guard features a **Mock Mode** (Configurable in `.env`). This ensures the application remains functional for testing and demonstration purposes without a live internet connection.
