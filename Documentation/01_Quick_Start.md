# 🚀 Getting Started with Mind-Guard

Welcome to the **Mind-Guard Clinical Portal**. This guide provides everything you need to set up and run the full-stack AI-powered mental health platform.

## 📋 Prerequisites

Before you begin, ensure you have the following installed:
- **Java 17 or 21**
- **Node.js 18+** (with npm)
- **PostgreSQL 14+**
- **A Hugging Face API Key** ([Get it here](https://huggingface.co/settings/tokens))

---

## 🛠️ Installation & Setup

### 1. Database Initialization
Create a new database and run the initialization script:
```bash
createdb mindguard
# Run the schema script located in: 
# backend/src/main/resources/scripts/init.sql
```

### 2. Backend Configuration (.env)
Navigate to the `backend/` directory and ensure your `.env` file is configured. This project uses a hardened security model where all credentials are decoupled from the code.

**Key Environment Variables:**
- `DB_PASSWORD`: Your PostgreSQL password
- `JWT_SECRET`: A secure string for token signing (min 64 chars)
- `HUGGINGFACE_API_KEY`: Your inference token
- `ENCRYPTION_KEY`: A 32-character AES key for journal encryption

### 3. Launching the Services

**Start the Backend:**
```bash
cd backend
mvn clean install
mvn spring-boot:run
```
*Backend will be available at: http://localhost:8081*

**Start the Frontend:**
```bash
cd frontend
npm install
npm start
```
*Frontend will be available at: http://localhost:4200 (or http://localhost:4201 for demo environments)*

---

## 📱 Standard Demo Workflow

To verify the system's "Triple LLM" pipeline:
1. **Patient Registration**: Register a new user with the `PATIENT` role.
2. **Journal Submission**: Create a new journal entry. Use a high-distress message like *"I'm feeling very overwhelmed and alone right now"* to trigger clinical alerts.
3. **AI Processing**: Wait 2-3 seconds for the asynchronous AI analysis (Sentiment, Distress, and Insight) to complete.
4. **Clinical Triage**: Log in as a `THERAPIST`. You will see the new alert on your dashboard with full AI-generated insights.
5. **Resolution**: Resolve the alert and provide a clinical recommendation. This will be visible on the patient's side immediately.

---

## 📁 Repository Structure
- `/backend`: Spring Boot 3.3 REST API with JWT & AES Security.
- `/frontend`: Angular 18 Portal with premium Clinical UI.
- `/Documentation`: High-fidelity technical guides and API specs.
