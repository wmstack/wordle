/** checks the equality of two arrays by comparing their contents one-by-one. */
export function arrayEq<T>(arr1: T[], arr2: T[]) {
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