const fs = require('fs');
const pdfParse = require('pdf-parse');
const pdf = pdfParse.default || pdfParse;

let dataBuffer = fs.readFileSync('/Users/debarghabandyopadhyay/Dev/spore-portfolio/portfolio-new/Debargha_CV.pdf');

pdf(dataBuffer).then(function(data) {
    console.log(data.text);
}).catch(function(err) {
    console.error(err);
});
