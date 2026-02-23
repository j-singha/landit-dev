import pymupdf4llm
import mammoth
import os

def read_pdf(file_path):
    """
    Extracts PDF content into structured markdown.
    """
    try:
        # This single line handles the opening, parsing, and layout detection
        md_text = pymupdf4llm.to_markdown(file_path)

        clean_text = md_text.replace("**", "").replace("*", "").replace("_", "").replace("#", "")
        
        return clean_text
    
    except Exception as e:
        return f"An error occurred during Markdown extraction: {e}"


def read_docx(file_path):
    """
    Extracts Word document content into Markdown format.
    """
    try:
        # Mammoth requires the file to be opened in binary read mode ('rb')
        with open(file_path, "rb") as docx_file:
            # Convert directly to markdown
            result = mammoth.convert_to_markdown(docx_file)
            
            md_text = result.value # The generated Markdown string

            clean_text = md_text.replace("\\", "").replace("*", "").replace("_", "").replace("#", "")
            
            # Debug messages from Mammoth
            """
            if result.messages:
            print("--- Conversion Warnings ---")
            for message in result.messages:
                print(message)
            """
            return clean_text.strip()
            
    except Exception as e:
        return f"An error occurred during DOCX to Markdown conversion: {e}"


def extract_cv(file_path):
    """
    Checks the file extension of the provided path and routes it 
    to the correct markdown extraction function.
    """
    # os.path.splitext splits the path into the base name and the extension
    # .lower() safely handles extensions like .PDF or .DocX
    _, extension = os.path.splitext(file_path.lower())
    
    if extension == '.pdf':
        print(f"Detected PDF format for: {file_path}")
        return read_pdf(file_path)
        
    elif extension == '.docx':
        print(f"Detected DOCX format for: {file_path}")
        return read_docx(file_path)
        
    else:
        # Handle cases where a student uploads a .txt, .png, or unsupported format
        raise ValueError(f"Unsupported file type '{extension}'. Please upload a .pdf or .docx file.")


if __name__ == "__main__":
    # Test file paths
    sample_cv_path = "JishnuSingha_2.pdf" 
    
    if os.path.exists(sample_cv_path):
        
        extracted_markdown = extract_cv(sample_cv_path)
        
        print(extracted_markdown)
    else:
        print(f"File not found: {sample_cv_path}. Please check the path.")