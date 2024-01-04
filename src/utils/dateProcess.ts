export function dateConversion(due_date: Date){
    const options = {year: 'numeric', month: 'short', day: 'numeric' };
    const formattedDate = due_date.toLocaleDateString('en-US', options);

    return formattedDate;
}

export function daysLeftConversion(due_date: Date){
    const today = new Date();
    const diffTime = Math.abs(due_date.getTime() - today.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays;
}