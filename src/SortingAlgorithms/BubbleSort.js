export function getBubbleSortAnimations(array) {
    const animations = [];
    let i, j;
    const n = array.length;
    for (i = 0; i < n; ++i) {
        for (j = 0; j < n - i - 1; ++j) {
            animations.push(['check', j, j + 1]);
            if (array[j] > array[j + 1]) {
                animations.push(['swap', j, j + 1]);        
                [array[j], array[j + 1]] = [array[j + 1], array[j]];
            }
            animations.push(['checkdone', j, j + 1]);
        }
        animations.push(['correct', n - i - 1]);
    }
    return animations;
}