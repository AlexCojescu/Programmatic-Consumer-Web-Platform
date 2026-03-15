# Programmatic: Legal, Contracts & Compliance

Status: Active  
Purpose: Source of truth for MSAs, liability, and data privacy.




## 1. Master Service Agreement (MSA) Summary
These are the standard "Hard Rules" Programmatic operates under to ensure project clarity.

* **Payment Terms**: 
    * **Accelerated**: 100% upfront (includes $2k discount).
    * **Milestone**: $3,000/mo over 4 months, tied to stage deliverables, not hours.
* **The "Operational Guarantee"**: The project is deemed "Complete" once the first 10 customers move through the system error-free or the team demonstrates autonomy. Support persists in Slack until this threshold is met.
* **IP Ownership**: Upon final payment, the client owns the specific Workflow Configurations and Custom Documentation created for their instance. Programmatic retains ownership of its proprietary Core Frameworks and Pre-built Automation Logic.
* **Liability**: Capped at the total amount paid for the specific engagement. Programmatic is not liable for ISP network downtime or third-party tool outages (e.g., Make.com, NMS provider).

## 2. AI Data Privacy Policy
As an AI agency, this is the most critical section for de-risking the "Messy Reality."

* **Zero-Training Clause**: Programmatic primarily utilizes Local LLMs or Enterprise-grade APIs (Gemini/Claude) with "Opt-Out" of data training enabled. Client data is never used to train global models.
* **PII Sanitization**: Where possible, automation logic is designed to strip Personally Identifiable Information (PII) before processing logs or data through LLM endpoints.
* **Data Residency**: We prioritize local data processing. If cloud-based AI is required, we ensure data remains within the client's regional jurisdiction where supported.
* **Access Control**: Programmatic requests "Least Privilege" access to client tools (NMS/CRM). We utilize secure password managers and never store client login credentials in plain text.



## 3. Non-Disclosure Agreement (NDA) Summary
Standard language Programmatic agrees to and expects from partners.

* **Mutual Protection**: Both parties agree to protect trade secrets, network architecture details, and pricing structures.
* **The "No-Poaching" Clause**: Clients agree not to solicit or hire Programmatic's contractors or employees for a period of 12 months following the engagement.
* **ISP Network Security**: Programmatic acknowledges that Network Management System (NMS) data is critical infrastructure and treats all network maps as "Highly Confidential."

## 4. Project Termination & Offboarding
* **Termination for Convenience**: Either party may terminate with 30 days' notice.
* **Refunds**: Audits are non-refundable. For Build Tiers, refunds are prorated based on the completion of the current Stage (1-4).
* **Handoff Package**: Upon termination, Programmatic provides an Offboarding Packet including all Looms, Playbooks, and Automation documentation created up to that date.

---

### How to use this for RAG:
* **Direct Drafting**: If you ask, "What is my refund policy?", the AI will pull from Section IV.
* **Sales Objections**: If an ISP asks, "Is my data safe with your AI?", the AI pulls the "Zero-Training Clause" from Section II.
* **Contract Checks**: When you receive a client's contract, you can upload it and ask, "Does this conflict with my standard IP Ownership or Liability terms in my Legal file?"


