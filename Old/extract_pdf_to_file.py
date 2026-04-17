try:
    from pypdf import PdfReader
except ImportError:
    print("pypdf not installed")
    exit(1)

text = ""
try:
    reader = PdfReader("Debargha_Des-Dev_CV.pdf")
    for page in reader.pages:
        text += page.extract_text() + "\n"
    
    with open("cv_content.txt", "w") as f:
        f.write(text)
    print("CV content saved to cv_content.txt")
except Exception as e:
    print(f"Error: {e}")
