# LabelGuard frontend (demo)
React + Vite prototype of the LabelGuard self-validating labeling pipeline.
It runs on sample data, so no backend is needed to record the demo.

## Run
```bash
cd frontend
npm install
npm run dev
```
Open the URL shown in the terminal (usually http://localhost:5173).

## Demo flow (about 90 seconds)
1. Overview: show the change request and the six-step pipeline.
2. Change and impact: click **Analyse impact** (30 labels across 5 markets).
3. Draft and validate: click **Run self-validation**, then apply each fix and watch the risk score rise.
4. Approval and audit: type a reviewer name, **Sign and approve**, then trace an element and show the audit trail.
Use **Reset demo** in the sidebar to retake.
