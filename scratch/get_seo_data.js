const XLSX = require('xlsx');
const filePath = 'C:\\inspireweb\\Inspire Inspection SEO Sheet.xlsx';
try {
    const workbook = XLSX.readFile(filePath);
    const sheet = workbook.Sheets['Title Meta Description'];
    const data = XLSX.utils.sheet_to_json(sheet);
    console.log(JSON.stringify(data, null, 2));
} catch (error) {
    console.error('Error:', error.message);
}
