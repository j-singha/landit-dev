import pymupdf4llm
import mammoth

def readpdf(file_path):
    """
    Extracts PDF content into structured markdown.
    Highly recommended before sending data to an LLM.
    """
    try:
        # This single line handles the opening, parsing, and layout detection
        md_text = pymupdf4llm.to_markdown(file_path)
        return md_text
    except Exception as e:
        return f"An error occurred during Markdown extraction: {e}"



def extract_docx_to_markdown(file_path):
    """
    Converts a Word document directly into Markdown format.
    Perfect for preserving CV structure (headings, bullet points) for LLM ingestion.
    """
    try:
        # Mammoth requires the file to be opened in binary read mode ('rb')
        with open(file_path, "rb") as docx_file:
            # Convert directly to markdown
            result = mammoth.convert_to_markdown(docx_file)
            
            md_text = result.value # The generated Markdown string
            
            # Mammoth is great about telling you if it found weird formatting it couldn't parse
            if result.messages:
                print("--- Conversion Warnings ---")
                for message in result.messages:
                    print(message)
                    
            return md_text.strip()
            
    except Exception as e:
        return f"An error occurred during DOCX to Markdown conversion: {e}"

# --- Example Usage ---
# cv_markdown = extract_docx_to_markdown("student_cv.docx")
# print(cv_markdown)

