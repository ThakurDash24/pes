# Feature: Fully Digital Student Submission with Auto-Anonymization

## Overview
This feature replaces the complex QR-code based physical document submission workflow with a pure digital upload portal. It adds **Auto-Anonymization**, assigning an automated random alias (`SUB-XXXXXXXX`) to each student per exam.

## Before (Complexity & Potential Security Issues)
- Students had to rely on teachers downloading and distributing QR codes. 
- PDFs were scanned and manually split.
- The previous fallback digital upload approach in `studentController.js` just used the student's **MongoDB `_id`** as the `uniqueId`. 
  - **Issue:** The ObjectId is not completely anonymous; if a user knows it, the identity is exposed, reducing the integrity of blind reviews.

## After (Simplicity & Complete Anonymity)
- Students upload their exam documents directly via the Student Portal.
- The `uploadExamDocument` controller automatically generates a randomized, untraceable `anonymousId` (e.g., `SUB-1A2B3D4F`) using Node.js's native `crypto` module.
- This ID is safely mapped inside the `UIDMap` collection. 
- When peers evaluate the document, they only see `SUB-1A2B3D4F`—guaranteeing 100% anonymity.
- **Code Footprint:** Minimal. Escapes the need for OCR splitting libraries or complex QR scanner components on the frontend. 

### Implementation Snippet Preview
```javascript
// Located in Backend/controllers/studentController.js
let uidMap = await UIDMap.findOne({ userId: studentId, examId });
if (!uidMap) {
  // Auto-Anonymization: Generate a random 8-character string 
  const anonymousId = "SUB-" + crypto.randomBytes(4).toString('hex').toUpperCase();
  uidMap = await UIDMap.create({ uniqueId: anonymousId, userId: studentId, examId });
}
```
