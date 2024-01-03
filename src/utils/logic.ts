function calculatePriority(count: number, percentage:number):number {
    let pWeigth = 0;
    let cWeight = 0;
    if (percentage >= 80) {
        pWeigth = 0.8;
        cWeight = 0.2;
    } else if (percentage < 80 && percentage >= 60) {
        pWeigth = 0.6;
        cWeight = 0.4;
    } else if (percentage < 60 && percentage >= 40) {
        pWeigth = 0.5;
        cWeight = 0.5;
    } else if (percentage < 40 && percentage >= 20) {
        pWeigth = 0.2;
        cWeight = 0.8;
    } else if (percentage < 20 && percentage >= 0) {
        pWeigth = 0.1;
        cWeight = 0.9;
    }

    let prioritylevel = 1 - (count * cWeight + percentage * pWeigth) / 100;

    return prioritylevel
}

function depricateMastery(count: number, mastery: number, lastReviewDate: Date){
    const now = new Date();
    const diff = now.getTime() - lastReviewDate.getTime();
    const hours = Math.round(diff / (1000 * 60 * 60));
    const e = 2.71828;
    let masteryDecay = 0;

    if (count >= 10) {
        masteryDecay = 0.05;
    } else if (count < 10 && count >= 7) {
        masteryDecay = 0.3;
    } else if (count < 7 && count >= 3) {
        masteryDecay = 0.8;
    } else if (count < 3 && count >= 0) {
        masteryDecay = 0.1;
    }
    // console.log("hours")
    // console.log(hours)
    // console.log("-hours/masteryDecay")
    // console.log(-hours/masteryDecay)
    const decayFactor = Math.pow(e, (-hours/masteryDecay));
    console.log(decayFactor)
    const newMastery = mastery * decayFactor;

    return newMastery;
}

function calculateMastery(mastery:number, confidence:string){
    if (confidence === 'perfect') {
        mastery *= 1.2; 
    } else if (confidence === 'good') {
        mastery *= 1.1; 
    } else if (confidence === 'bad') {
        mastery *= 0.8;
    }

    const newMastery = Math.max(0, Math.min(mastery, 100));

    return newMastery;
}


// calculatePriority
// const data1 = [
//     // low percentage
//     { count: 0, percentage: 10 },
//     { count: 5, percentage: 30 },
//     { count: 10, percentage: 20 },
//     { count: 15, percentage: 13 },
//     { count: 20, percentage: 0 },
//     // middle percentage
//     { count: 0, percentage: 50 },
//     { count: 5, percentage: 60 },
//     { count: 10, percentage: 45 },
//     { count: 15, percentage: 55 },
//     { count: 20, percentage: 65 },
//     // hight percentage
//     { count: 0, percentage: 80 },
//     { count: 5, percentage: 90 },
//     { count: 10, percentage: 85 },
//     { count: 15, percentage: 80 },
//     { count: 20, percentage: 100 },
// ];
// // apply calculatePriority to the data set
// for(let i = 0; i < data1.length; i++) {
//     if(i === 0) console.log('Low')
//     else if(i === 5) console.log('Midle')
//     else if(i === 10) console.log('High')
//     console.log(calculatePriority(data1[i].count, data1[i].percentage));
// }

// depricateMastery
const data2 = [
    { count: 0, mastery: 100, lastReviewDate: new Date('2023-12-28T18:38:54.465Z') },
    { count: 1, mastery: 100, lastReviewDate: new Date('2023-12-26T18:38:54.465Z') },
    { count: 5, mastery: 100, lastReviewDate: new Date('2023-12-20T18:38:54.465Z') },
    { count: 9, mastery: 100, lastReviewDate: new Date('2023-12-14T18:38:54.465Z') },
    { count: 12, mastery: 100, lastReviewDate: new Date('2023-11-29T18:38:54.465Z') },
    { count: 20, mastery: 100, lastReviewDate: new Date('2023-11-03T18:38:54.465Z') },
];
// apply depricateMastery to the data set
for(let i = 0; i < data2.length; i++) {
    // if(i === 0) console.log('Low')
    // else if(i === 5) console.log('Midle')
    // else if(i === 10) console.log('High')
    console.log(depricateMastery(data2[i].count, data2[i].mastery, data2[i].lastReviewDate));
}

