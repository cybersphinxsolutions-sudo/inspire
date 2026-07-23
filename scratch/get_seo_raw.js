const XLSX = require('xlsx');
const filePath = 'C:\\inspireweb\\Inspire Inspection SEO Sheet.xlsx';
try {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets['Title Meta Description'];
    const rawData = XLSX.utils.sheet_to_json(sheet, { header: 1 });
    console.log(JSON.stringify(rawData, null, 2));
} catch (error) {
    console.error('Error:', error.message);
}
