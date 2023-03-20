export function getMergeSortAnimations(array) {
    const animations = [];
    if (array.length <= 1) {
        return array;
    }
    const auxilaryArray = array.slice();
    mergeSortHelper(array, 0, array.length - 1, auxilaryArray, animations);
    return animations;
}

function mergeSortHelper(mainArray, start, end, auxilaryArray, animations) {
    if (start === end)
        return;
    
    const middleIdx = Math.floor((start + end) / 2);

    mergeSortHelper(auxilaryArray, start, middleIdx, mainArray, animations);
    mergeSortHelper(auxilaryArray, middleIdx + 1, end, mainArray, animations);
    merge(mainArray, start, middleIdx, end, auxilaryArray, animations);
}

function merge(mainArray, start, middleIdx, end, auxilaryArray, animations) {
    let k = start;
    let i = start;
    let j = middleIdx + 1;

    while (i <= middleIdx && j <= end) {
        // push the values that are being compared to the animation array to change their color
        animations.push([i, j]);
        // push the values for the second time to revert their color
        animations.push([i, j]);
        if (auxilaryArray[i] <= auxilaryArray[j]) {
            // overwrite the value at index k in the original array with the value at index i in the auxilary array 
            animations.push([k, auxilaryArray[i]]);
            mainArray[k++] = auxilaryArray[i++];
        } else {
            animations.push([k, auxilaryArray[j]]);
            mainArray[k++] = auxilaryArray[j++];
        }
    }

    while (i <= middleIdx) {
        animations.push([i, i]);
        animations.push([i, i]);
        animations.push([k, auxilaryArray[i]]);
        mainArray[k++] = auxilaryArray[i++];
    }

    while (j <= end) {
        animations.push([j, j]);
        animations.push([j, j]);
        animations.push([k, auxilaryArray[j]]);
        mainArray[k++] = auxilaryArray[j++];
    }
    // console.log(mainArray);
}
