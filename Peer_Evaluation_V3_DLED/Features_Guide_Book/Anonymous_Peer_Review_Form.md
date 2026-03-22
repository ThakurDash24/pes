# Feature: The Anonymous Peer Review Form

## Overview
This feature provides a clean, user-friendly interface for students to evaluate their peers' work without knowing whose work they are grading. It enforces academic integrity and eliminates grading bias by only exposing an auto-generated Anonymous ID to the reviewer.

## Before (Confusion & Potential Bias)
- The overlay simply said `Evaluation Form` with no indication of whose paper it was or whether it was truly anonymous. 
- A reviewer might feel anxious about grading a friend or holding a bias, as the system didn't overtly reassure them that the process was double-blind. 

## After (Clarity & Explicit Anonymity)
- The overlay now clearly states **"Anonymous Peer Review"**.
- A prominent badge displays `Anonymous ID: SUB-XXXXXXXX` so the reviewer explicitly understands they are evaluating a blinded document.
- **User-Friendly Form:** The form maps directly to the teacher's rubric, dynamically rendering simple number inputs (1-10 marks) and an easy feedback text area for every question.
- **Minimal Code Overhead:** The React component naturally connects to the existing layout, preventing massive rewrites of the evaluation UI. It just consumes the `documentUniqueId` passed efficiently from the backend.

### Implementation Snippet Preview
```javascript
// Located in Frontend/src/components/Student/EvaluationOverlay.jsx
<div style={{ textAlign: "center", flex: 1 }}>
  <h2 style={{ marginBottom: "0.2rem", color: "#4b3c70" }}>
    Anonymous Peer Review
  </h2>
  <div style={{ 
    marginBottom: "1rem", fontSize: "0.9rem", color: "#666", 
    fontWeight: "bold", background: "#e8eaf6", 
    padding: "0.3rem 0.8rem", borderRadius: "12px", display: "inline-block" 
  }}>
    Anonymous ID: {selectedEvaluation?.documentUniqueId || "Hidden"}
  </div>
</div>
```
