const list = ['A', 'B', 'C'];
let statuses: Record<string, string | null> = {};
const findings = [{ section: 'outside', item: 'A' }];

const selectAll = (status: string) => {
    const itemsWithFindings = new Set(findings.filter(f => f.section === 'outside').map(f => f.item));
    const itemsToToggle = list.filter(item => !itemsWithFindings.has(item));
    const allSelected = itemsToToggle.length > 0 && itemsToToggle.every(item => statuses[item] === status);
    
    const newStatuses: Record<string, string | null> = { ...statuses };
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
