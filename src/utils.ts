export function arrayEq(arr1, arr2) {
    if (arr1.length != arr2.length) {
        return false
    }

    for (let index = 0; index < arr1.length; index++) {
        const el = arr1[index];
        if (el != arr2[index]) {
            return false
        }
    }

    return true
}