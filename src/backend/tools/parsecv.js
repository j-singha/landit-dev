const fs = require('fs');
const path = require('path');
const pdfParse = require('pdf-parse');
const mammoth = require('mammoth');


async function extractTextFromPDF(filePath) {
    try {
        // Read the file from the local file system into a buffer
        const dataBuffer = fs.readFileSync(filePath);
        
        // pdf-parse takes the buffer and returns an object containing the text
        const data = await pdfParse(dataBuffer);
        
        return data.text.trim();
    } catch (error) {
        throw new Error(`Failed to parse PDF: ${error.message}`);
    }
}


async function extractTextFromDOCX(filePath) {
    try {
        // Mammoth reads the file path and attempts to map Word styles to Markdown
        const result = await mammoth.convertToMarkdown({ path: filePath });
        
        // Log any warnings (e.g., if a student used a weird unrecognized font style)
        if (result.messages && result.messages.length > 0) {
            console.log("Mammoth Warnings:", result.messages);
        }

        return result.value.trim();
    } catch (error) {
        throw new Error(`Failed to parse DOCX: ${error.message}`);
    }
}

/**
 * The main routing function. Checks the extension and calls the right parser.
 */
async function extractCV(filePath) {
    // path.extname gets the extension (e.g., '.pdf'), which we make lowercase
    const extension = path.extname(filePath).toLowerCase();

    if (extension === '.pdf') {
        console.log(`Processing PDF: ${filePath}`);
        return await extractTextFromPDF(filePath);
    } else if (extension === '.docx') {
        console.log(`Processing DOCX: ${filePath}`);
        return await extractTextFromDOCX(filePath);
    } else {
        throw new Error(`Unsupported file type: ${extension}. Please upload a .pdf or .docx`);
    }
}

module.exports = { extractCV };