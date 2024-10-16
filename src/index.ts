export function sum(numbers: string) {
    const numbersList = numbers.split(/,/)
    return numbersList.reduce((total, number) => total + Number.parseFloat(number), 0)
}