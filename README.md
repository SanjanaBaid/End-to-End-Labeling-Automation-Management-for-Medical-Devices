# LabelGuard

**End-to-End Labeling Automation Management for Medical Devices**

*Our entry for Teliport Season 4 (Tata Elxsi), Case Study 4.*

A tiny typo on a medical device label can become a recall. LabelGuard is our idea for catching those mistakes before they ever leave the building, and for taking the boring, repetitive parts of labeling off people's plates.

---

## The team

| | |
|---|---|
| **Sanjana Baid** | Team leader |
| **Ankita Kumari** | Team member |
| **Aashwi Sadaria** | Team member |

**Institute:** IIT Goa

---

## Why we picked this problem

Imagine a company that sells stents, surgical instruments and implants around the world. A single small change, like a new storage temperature, can mean updating 30 or more labels in 20 or more languages. Today a lot of that is done by hand: copying details between PLM, ERP and artwork tools, comparing old and new versions by eye, and chasing approvals over email.

People get tired, and tired people miss things. In this industry, a missed detail can reach a patient. We wanted to see how much of that risk we could design away.

## What LabelGuard does

Think of it as a careful colleague who never gets bored. For every change, it:

1. **Takes in the change.** You describe it in plain language and it becomes a structured change request.
2. **Finds what it affects.** It works out which labels, markets and languages are touched.
3. **Drafts the new wording.** Text comes only from approved building blocks, with the source shown, so nothing is made up.
4. **Checks everything.** Rules, text reading and symbol checks look at mandatory fields, UDI and barcodes, dates, symbols and translations, and flag problems right on the label.
5. **Asks a person to approve.** Findings are ranked by risk, and a human signs off. Nothing is released without that.
6. **Keeps the receipts.** Every label element can be traced back to its data, the rule behind it, the approval and the change order.

Our guiding idea is simple: **AI suggests, rules decide, humans approve.**

## What is in this repo right now

```
.
├── README.md        You are here
└── frontend/        A clickable demo of the full flow (React + Vite)
```

The backend, rule catalogue and checker scripts will be added as we build them out.

## Try the demo

You need [Node.js](https://nodejs.org) installed.

```bash
cd frontend
npm install
npm run dev
```

Then open the address shown in your terminal (usually http://localhost:5173).

A quick tour:
1. Open **Change and impact** and click *Analyse impact*.
2. Go to **Draft and validate**, run the checks, and apply each fix to watch the risk score improve.
3. Finish in **Approval and audit**, sign as a reviewer, and trace any label element back to its source.

## An honest note

This is a prototype built to show the idea clearly. The demo runs on **sample data**, and the findings you see are scripted examples rather than live AI output. The company, product and UDI values are made up. Real regulatory details should always be checked against the official sources (EU MDR, FDA 21 CFR 801 and 830, ISO 15223-1, ISO 20417) before anything like this is used for real labels.

## Where we want to take it

- **Phase 1:** check-only mode that reviews existing labels and flags problems
- **Phase 2:** impact analysis and approved-text drafting
- **Phase 3:** several AI helpers working together, with a person approving at every important gate

## Links

- Demo video: *coming soon*
- One-slide submission: *see submission form*

---

Built with care by Team LabelGuard, IIT Goa.
