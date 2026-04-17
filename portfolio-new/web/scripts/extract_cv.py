from pypdf import PdfReader

reader = PdfReader("/Users/debarghabandyopadhyay/Dev/spore-portfolio/portfolio-new/Debargha_CV.pdf")
text = ""
for page in reader.pages:
    text += page.extract_text() + "\n"

with open("extracted_cv.txt", "w", encoding="utf-8") as f:
    f.write(text)
print("CV extracted successfully.")
