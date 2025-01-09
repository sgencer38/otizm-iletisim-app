const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, '../public/icons');
const outputDir = path.join(__dirname, '../public/icons');

// PNG'ye dönüştürme fonksiyonu
async function convertSvgToPng(inputFile) {
    const fileName = path.basename(inputFile, '.svg');
    const outputFile = path.join(outputDir, `${fileName}.png`);
    
    try {
        await sharp(inputFile)
            .resize(200, 200)
            .png()
            .toFile(outputFile);
        console.log(`Converted ${fileName}.svg to PNG`);
    } catch (error) {
        console.error(`Error converting ${fileName}.svg:`, error);
    }
}

// Tüm SVG dosyalarını dönüştür
fs.readdir(iconsDir, (err, files) => {
    if (err) {
        console.error('Error reading directory:', err);
        return;
    }

    files.filter(file => file.endsWith('.svg'))
        .forEach(file => {
            convertSvgToPng(path.join(iconsDir, file));
        });
});
