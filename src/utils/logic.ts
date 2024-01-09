const maxCount = 15;
const maxMaxtery = 100;
const maxHours = 720;

export function calculatePriority(count: number, mastery: number): number {
    let pWeigth = 0;
    let cWeight = 0;

    if (mastery >= 80) {
        pWeigth = 0.8;
        cWeight = 0.2;
    } else if (mastery < 80 && mastery >= 60) {
        pWeigth = 0.6;
        cWeight = 0.4;
    } else if (mastery < 60 && mastery >= 40) {
        pWeigth = 0.5;
        cWeight = 0.5;
    } else if (mastery < 40 && mastery >= 20) {
        pWeigth = 0.2;
        cWeight = 0.8;
    } else if (mastery < 20 && mastery >= 0) {
        pWeigth = 0.1;
        cWeight = 0.9;
    }

    const prioritylevel = 1 - (count * cWeight + mastery * pWeigth) / 100;

    return prioritylevel;
}


// high count & large hours || low count & low hours  -> high effectiveness
// low count & large hours || high count & small hours  -> low effectiveness
function calculateEffectiveness(count: number, hours: number): number {
    const normalizedCount = count / maxCount;
    const normalizedDiff = hours / maxHours;
    const gap = Math.abs(normalizedCount - normalizedDiff);
    const effectiveness = 1 - gap;

    return effectiveness;
}


export function depricateMastery(count: number, mastery: number, lastReviewDate: Date){
    const now = new Date();
    const diff = now.getTime() - lastReviewDate.getTime();
    const hours = Math.round(diff / (1000 * 60 * 60));

    const effectiveness = calculateEffectiveness(count, hours)
    const e = 2.71828;  
    let SoM = 0;
    // SoM = strengthof memory(how quickly information is forgotten, high som -> information is retained longer, low som -> information is forgotten quickly)
    // high effectiveness -> low SoM
    if (effectiveness >= 0.8) {
        SoM = 10;
    } else if (effectiveness < 0.8 && effectiveness >= 0.6) {
        SoM = 50;
    } else if (effectiveness < 0.6 && effectiveness >= 0.4) {
        SoM = 150;
    } else if (effectiveness < 0.4 && effectiveness >= 0.2) {
        SoM = 500;
    } else if (effectiveness < 0.2 && effectiveness >= 0) {
        SoM = 2000;
    }

    const decayRate = Math.pow(e, (-hours/SoM));
    const newMastery = mastery * decayRate;

    return newMastery;
}

// function calculateMastery(confidence: string){
//     let newMastery = 0;

//     if (confidence === 'perfect') {
//         newMastery = 100; 
//     } else if (confidence === 'good') {
//         newMastery = 75; 
//     } else if (confidence === 'bad') {
//         newMastery = 50;
//     }

//     return newMastery;
// }