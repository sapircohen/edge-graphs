export const getAverage = (arr) =>{
    const sum = getSum(arr);
    return (sum / arr.length) || 0;
}

export const getSum = (arr) =>{
    return arr.reduce((a, b) => a + b, 0);
}
