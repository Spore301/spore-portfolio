try:
    from pypdf import PdfReader
except ImportError:
    print("pypdf not installed")
    exit(1)

try:
    reader = PdfReader("Debargha_Des-Dev_CV.pdf")
    for page in reader.pages:
        print(page.extract_text())
except Exception as e:
    print(f"Error: {e}")
