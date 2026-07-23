const XLSX = require('xlsx');
const path = require('path');

const filePath = 'C:\\inspireweb\\Inspire Inspection SEO Sheet.xlsx';
try {
    const workbook = XLSX.readFile(filePath);
    const sheetNames = workbook.SheetNames;
    console.log('Sheet Names:', sheetNames);

    sheetNames.forEach(name => {
        console.log(`\n--- Sheet: ${name} ---`);
        const sheet = workbook.Sheets[name];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        // Print first 10 rows of each sheet to understand structure
        data.slice(0, 10).forEach(row => console.log(JSON.stringify(row)));
    });
} catch (error) {
    console.error('Error reading excel:', error.message);
}
