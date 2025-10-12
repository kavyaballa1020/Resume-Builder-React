import React, { useState } from "react";
import './ATSChecker.css';

const ATSChecker = () => {
  console.log('ATSChecker component mounted');
  const [resumeText, setResumeText] = useState("");
  const [jobDesc, setJobDesc] = useState("");
  const [result, setResult] = useState(null);
  const [scanning, setScanning] = useState(false);
  const [error, setError] = useState(null);
  const [extractedText, setExtractedText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);

  const getATSScore = (resumeText, jobDescription) => {
    const stopWords = ['the', 'and', 'for', 'with', 'you', 'your', 'are', 'that', 'this'];
    if (!jobDescription || !jobDescription.toString().trim()) {
      return { score: 0, matchedKeywords: [], missingKeywords: [] };
    }

    const jdMatches = jobDescription.toLowerCase().match(/\b(\w+)\b/g) || [];
    const jdWords = jdMatches.filter(word => word.length > 3 && !stopWords.includes(word));

    const resumeWords = (resumeText || '').toLowerCase();

    const matchedKeywords = [];
    const missingKeywords = [];

    jdWords.forEach(word => {
      if (resumeWords.includes(word)) matchedKeywords.push(word);
      else missingKeywords.push(word);
    });

    const score = jdWords.length ? Math.round((matchedKeywords.length / jdWords.length) * 100) : 0;

    return { score, matchedKeywords, missingKeywords };
  };

  const handleCheck = () => {
    const analysis = getATSScore(resumeText, jobDesc);
    setResult(analysis);
  };
  const handleFile = async (e) => {
    setError(null);
    const file = e.target.files && e.target.files[0];
  if (!file) return;
  if (file.type === 'application/pdf') {
      // Extract text from PDF using the legacy pdfjs build.
      setScanning(true);
      const objectUrl = URL.createObjectURL(file);
      try {
        // Use the legacy build which exposes getDocument
        const pdfjsLib = await import('pdfjs-dist/legacy/build/pdf');
        // To avoid runtime failures when a worker script cannot be fetched or
        // when CDN versions mismatch, run pdf.js without a worker. This is
        // slower but reliable in browser dev environments. If you want better
        // performance in production, bundle the worker entry with the app.
        const loadingTask = pdfjsLib.getDocument({ url: objectUrl, disableWorker: true });
        const pdf = await loadingTask.promise;
        let fullText = '';
        for (let i = 1; i <= pdf.numPages; i++) {
          const page = await pdf.getPage(i);
          const content = await page.getTextContent();
          const strings = content.items.map(item => item.str);
          fullText += strings.join(' ') + '\n';
        }
        // If the PDF doesn't contain selectable text (e.g. it's a scanned image),
        // present a user-friendly error instead of an empty preview.
        if (!fullText || !fullText.toString().trim()) {
          console.warn('PDF had no extractable text');
          setError('Unable to extract text from this PDF in the browser. It may be a scanned image — paste the text manually or enable OCR.');
        } else {
          // clear any prior error and store into extractedText so user can preview before inserting
          setError(null);
          setExtractedText(fullText);
        }
      } catch (err) {
        console.error('PDF extraction error:', err);
        setError('Unable to extract text from this PDF in the browser. Try a different PDF or paste the text manually.');
      } finally {
        setScanning(false);
        // revoke the object URL now that we're done
        URL.revokeObjectURL(objectUrl);
      }
    } else if (file.type.startsWith('image/')) {
      // Image OCR has been intentionally disabled. Show the image preview so
      // the user can confirm the upload, and provide guidance about OCR.
      const imgUrl = URL.createObjectURL(file);
      setImagePreview(imgUrl);
      setError('Image OCR is disabled. Please paste text manually or upload a PDF for automatic extraction.');
      return;
    } else {
      setError('Unsupported file type. Please upload a PDF or paste your resume text.');
    }
  };
  return (
    <div className="ats-checker-container">
      <h2>ATS Checker</h2>

      <div className="ats-scanner">
        <div className="scanner-actions">
          <label className="file-label">Upload resume image / PDF</label>
          <input type="file" accept="application/pdf" onChange={handleFile} />

          {scanning && <div className="scanner-status">Extracting text... please wait</div>}
          {error && <div className="scanner-error">{error}</div>}
        </div>

        <div className="scanner-preview">
            {/* PDF extraction preview: user can Insert / Replace / Discard the extracted text */}
            {extractedText ? (
              <div className="extraction-preview">
                <h4>Extracted PDF text (preview)</h4>
                <pre style={{whiteSpace:'pre-wrap',maxHeight:200,overflow:'auto'}}>{extractedText}</pre>
                <div style={{marginTop:8}}>
                  <button className="small-btn" onClick={() => { setResumeText(prev => prev ? prev + '\n' + extractedText : extractedText); setExtractedText(''); }}>Insert</button>
                  <button className="small-btn" onClick={() => { setResumeText(extractedText); setExtractedText(''); }} style={{marginLeft:8}}>Replace</button>
                  <button className="small-btn ghost" onClick={() => setExtractedText('')} style={{marginLeft:8}}>Discard</button>
                </div>
              </div>
            ) : (
              <div style={{color:'#888'}}>PDF extraction preview will appear here after upload.</div>
            )}
        </div>
      </div>

      <textarea
        placeholder="Paste your RESUME here..."
        value={resumeText}
        onChange={(e) => setResumeText(e.target.value)}
        rows={8}
      />

      <textarea
        placeholder="Paste JOB DESCRIPTION here..."
        value={jobDesc}
        onChange={(e) => setJobDesc(e.target.value)}
        rows={8}
      />

      <button onClick={handleCheck}>Check ATS Score</button>

      {result && (
        <div className="ats-result">
          <h3>ATS Score: {result.score}%</h3>
          <p><strong>Matched Keywords:</strong> {result.matchedKeywords.join(", ")}</p>
          <p><strong>Missing Keywords:</strong> {result.missingKeywords.join(", ")}</p>
        </div>
      )}

      {/* small help text */}
      <div style={{marginTop:12,fontSize:13,color:'#555'}}>
        Tip: you can upload an image of your resume or use your camera to scan a printed copy. OCR is powered by <strong>tesseract.js</strong> (install locally: <code>npm install tesseract.js</code>), and PDF text extraction uses <strong>pdfjs-dist</strong> if available.
      </div>
    </div>
  );
};

export default ATSChecker;
