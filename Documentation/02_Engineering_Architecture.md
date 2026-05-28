# 🏗️ Engineering & Architecture

Mind-Guard is built on a modern, decoupled architecture designed for high availability, security, and clinical reliability.

## 🧱 The Technology Stack

### Backend: Spring Boot 3.3
- **Language**: Java 17/21
- **Security**: Spring Security 6 with JWT (Access + Refresh tokens)
- **Persistance**: Spring Data JPA with Hibernate & PostgreSQL
- **AI Integration**: Custom async client for Hugging Face Inference API
- **Key Pattern**: DTO (Data Transfer Object) for clean API contracts

### Frontend: Angular 18
- **UI Engine**: Reactive and state-aware components
- **Design System**: Custom Vanilla SCSS with a focus on Glassmorphism and Clinical ergonomics
- **Navigation**: Collapsible sidebar architecture with smart clinical workspace expansion
- **State Management**: BehaviorSubjects for real-time auth and clinical context tracking

---

## 🔒 Security Hardening

### 1. Environment Decoupling (.env)
Mind-Guard utilizes a zero-trust configuration model. Sensitive credentials are never committed to version control. On startup, the `MindGuardApplication` initializes `Dotenv` to load secrets into the system environment, which are then injected into Spring components.

### 2. Clinical Data Protection
- **AES-256 GCM**: All journal content is encrypted at the application layer before hitting the database.
- **PII Masking**: Logs are automatically scrubbed of sensitive patient identifiers.
- **Role-Based Guards**: Strict separation between `PATIENT` and `THERAPIST` views at both the API and UI layers.

---

## 🎨 UI/UX Innovation

### Collapsible Sidebar Logic
The therapist dashboard implements a stateful collapsible sidebar. When collapsed, the clinical workspace expands horizontally, providing therapists with a distraction-free environment for reviewing dense patient data. This state is managed via an `isSidebarCollapsed` observable for consistent interaction across all sub-views.

### Clinical Design System
We avoid generic frameworks to maintain a premium feel. Our CSS uses:
- **Harmonious Palettes**: Specialized "Success Emerald" and "Distress Crimson" for immediate visual triage.
- **Micro-animations**: Subtle transitions on alert cards and filter controls to reduce cognitive load for clinical staff.
