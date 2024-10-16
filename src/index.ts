export function sum(numbers: string) {
    const numbersList = numbers.split(/,|\r\n|\r|\n/)
    return numbersList.reduce((total, number) => {
        //check for empty string
        if (number.trim().length == 0)
            return total
        const parsedNumber = Number.parseFloat(number)
        //check for NaN
        if (Number.isNaN(parsedNumber))
            throw new Error('Only addition of numbers is supported.')
        return total + Number.parseFloat(number)
    }, 0)
}