import { useState } from 'react';
import { PDFDocument } from 'pdf-lib';

const GenerateResume = () => {
  const [resumeData, setResumeData] = useState({
    name: '',
    skills: '',
    experience: '',
    education: ''
  });

  const [resume, setResume] = useState('');

  // Function to generate PDF
  const generatePDF = async (resumeContent: string) => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    page.drawText(resumeContent, { x: 50, y: 350 });
    const pdfBytes = await pdfDoc.save();
    const blob = new Blob([pdfBytes], { type: 'application/pdf' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'resume.pdf';
    link.click();
  };

  // Function to handle resume generation (e.g., from an API or user input)
  const generateResume = async () => {
    // You would typically call an API here to get the resume data
    // For now, we will just generate a dummy resume based on user input
    const resumeContent = `
      Name: ${resumeData.name}
      Skills: ${resumeData.skills}
      Experience: ${resumeData.experience}
      Education: ${resumeData.education}
    `;
    setResume(resumeContent);
    generatePDF(resumeContent); // Generate the PDF after setting the resume content
  };

  return (
    <div>
      <h1>Generate Your Resume</h1>

      <div>
        <input
          type="text"
          placeholder="Name"
          value={resumeData.name}
          onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
        />
      </div>

      <div>
        <textarea
          placeholder="Skills"
          value={resumeData.skills}
          onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
        />
      </div>

      <div>
        <textarea
          placeholder="Experience"
          value={resumeData.experience}
          onChange={(e) => setResumeData({ ...resumeData, experience: e.target.value })}
        />
      </div>

      <div>
        <textarea
          placeholder="Education"
          value={resumeData.education}
          onChange={(e) => setResumeData({ ...resumeData, education: e.target.value })}
        />
      </div>

      <button onClick={generateResume}>Generate Resume & PDF</button>

      {resume && <div><h2>Your Generated Resume</h2><pre>{resume}</pre></div>}
    </div>
  );
};

export default GenerateResume;
