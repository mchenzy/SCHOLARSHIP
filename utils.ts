import { ApplicationData } from './types';
import { jsPDF } from 'jspdf';

export const countWords = (text: string): number => {
  if (!text) return 0;
  const matches = text.trim().match(/\S+/g);
  return matches ? matches.length : 0;
};

export const generateSummaryText = (data: ApplicationData): string => {
  return `SCHOLARSHIP APPLICATION SUMMARY
--------------------------------------------------
STEP 1: ELIGIBILITY & BASICS
Institution: ${data.eligibility.institution}
Field: ${data.eligibility.fieldOfStudy}
Level: ${data.eligibility.academicLevel}
Country: ${data.eligibility.country}
--------------------------------------------------
STEP 2: STRATEGIC ALIGNMENT
Alignment: ${data.alignment}

STEP 3: PROOF OF IMPACT
Achievement:
- Role: ${data.achievement.role}
- Action: ${data.achievement.action}
- Outcome: ${data.achievement.outcome}

STEP 4: DIRECTIONAL INTENT
Intent: ${data.intent}
--------------------------------------------------
STEP 5: SUPPORTING CONTEXT
${data.context || "No context provided."}
--------------------------------------------------
Generated for self-review and improvement by 
the Scholarship Screener Assistant.
`;
};

export const downloadTextFile = (filename: string, content: string) => {
  const element = document.createElement("a");
  const file = new Blob([content], { type: "text/plain" });
  element.href = URL.createObjectURL(file);
  element.download = filename;
  document.body.appendChild(element);
  element.click();
  document.body.removeChild(element);
};

export const downloadPDF = (data: ApplicationData) => {
  const doc = new jsPDF();
  const summary = generateSummaryText(data);
  
  doc.setFont("courier", "normal"); 
  doc.setFontSize(10);
  
  const pageWidth = 210; // A4 width in mm
  const margin = 15;
  const maxLineWidth = pageWidth - (margin * 2);
  
  const lines = doc.splitTextToSize(summary, maxLineWidth);
  
  let cursorY = 20;
  const pageHeight = 297; // A4 height in mm
  const lineHeight = 6;
  
  lines.forEach((line: string) => {
      if (cursorY + lineHeight > pageHeight - margin) {
          doc.addPage();
          cursorY = 20;
      }
      doc.text(line, margin, cursorY);
      cursorY += lineHeight;
  });
  
  doc.save('scholarship_application_summary.pdf');
};

const STORAGE_KEY = 'scholarship_app_progress';

export const saveProgress = (step: number, data: ApplicationData) => {
  try {
    const payload = { step, data, savedAt: new Date().toISOString() };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (e) {
    console.error("Failed to save progress", e);
  }
};

export const loadProgress = (): { step: number, data: ApplicationData } | null => {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (!saved) return null;
  try {
    const parsed = JSON.parse(saved);
    return { step: parsed.step, data: parsed.data };
  } catch (e) {
    return null;
  }
};

export const clearProgress = () => {
    localStorage.removeItem(STORAGE_KEY);
};