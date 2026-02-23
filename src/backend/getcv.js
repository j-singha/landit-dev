const express = require('express');
const extractCV= require('./tools/parsecv');
const redactPII = require('./tools/redactpii').redactPII;

const app = express();

// ... (assume multer is set up to save uploaded files to a 'uploads/' folder) ...

app.post('/api/upload-cv', async (req, res) => {
    try {
        // 1. Get the path of the file the student just uploaded
        const uploadedFilePath = req.file.path; 

        // 2. Extract the text/markdown based on the file type
        const rawCVText = await extractCV(uploadedFilePath);

        // 3. Scrub the PII for GDPR compliance
        const safeCVText = redactPII(rawCVText);

        // 4. Send the safe text to OpenAI! (You will build this next)
        // const skills = await callOpenAI(safeCVText);
        
        res.status(200).json({ 
            message: "CV Processed Successfully",
            extractedText: safeCVText 
        });

    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});