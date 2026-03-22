# Feature: "Basic Math" Anomaly Detection 

## Overview
This feature perfectly meets the project requirement for an "algorithm-based anomaly detection" system. It ensures that grading biases, unfair peer reviews, and extreme evaluator strictness/leniency are caught automatically without the overhead of heavy Machine Learning models holding up the backend server.

## Before (Requirement Gap)
- A complex AI model would have required a dedicated Python microservice, slowing down the system and drastically complicating deployment for a beginner project. 
- It would need historical data to train on, which doesn't exist yet, rendering the "AI" useless on day one.

## After (Elegant, Basic Math Algorithm)
- The system uses a highly effective, stateless mathematical algorithm known as *variance detection*.
- When a student hits "Submit", the Node.js backend immediately checks if the same paper was reviewed by another peer.
- It calculates the absolute point differential: `Math.abs(score1 - score2)`. 
- If the difference exceeds `20%` of the exam's total possible marks, the algorithm instantaneously triggers an anomaly. 
- The system automatically flips the database flags (`ticket = 1`), automatically routing the anomalous submissions directly to the Teaching Assistant's escalation dashboard. 
- **Code Footprint:** Accomplished purely with Javascript array `reduce()` and basic arithmetic in under 20 lines of code.

### Implementation Snippet Preview
```javascript
// From Backend/controllers/studentController.js

const otherTotalMarks = otherEval.score.reduce((sum, mark) => sum + mark, 0);
const diff = Math.abs(totalMarks - otherTotalMarks);
const threshold = exam.totalMarks * 0.20; // 20% Variance Flag

if (diff > threshold) {
  // Flag both evaluations as anomalies for TA Escalation
  evaluation.ticket = 1;
  otherEval.ticket = 1;
  await evaluation.save();
  await otherEval.save();
}
```
