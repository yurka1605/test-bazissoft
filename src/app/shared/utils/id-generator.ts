export function generateId(): number {
    const array = new BigUint64Array(1);
    crypto.getRandomValues(array);
    return Number(array[0]);
}