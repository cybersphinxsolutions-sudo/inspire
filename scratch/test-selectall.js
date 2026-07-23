const list = ['A', 'B', 'C'];
let statuses = {};
const findings = [{ section: 'outside', item: 'A' }];

const selectAll = (status) => {
    const itemsWithFindings = new Set(findings.filter(f => f.section === 'outside').map(f => f.item));
    const itemsToToggle = list.filter(item => !itemsWithFindings.has(item));
    const allSelected = itemsToToggle.length > 0 && itemsToToggle.every(item => statuses[item] === status);
    
    const newStatuses = { ...statuses };
    itemsToToggle.forEach(item => {
        newStatuses[item] = allSelected ? null : status;
    });
    
    itemsWithFindings.forEach(item => {
        newStatuses[item] = 'OD';
    });
    
    statuses = newStatuses;
    console.log(`Statuses after selectAll('${status}'):`, statuses);
};

console.log("Initial:", statuses);
selectAll('OD');
selectAll('OD');
selectAll('No OD');
