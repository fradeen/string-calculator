export function sum(numbers: string) {
    //check for empty string
    if (numbers.trim().length == 0)
        return 0
    const [delimiter, remainingString] = splitHeader(numbers)
    const numbersList = remainingString.split(new RegExp(String.raw`${delimiter}|\r\n|\r|\n`))
    console.log(numbersList)
    return numbersList.reduce((total, number, index) => {
        //check of empty string
        if (number.trim().length == 0)
            return total
        const parsedNumber = Number.parseFloat(number)
        //check for NaN
        if (Number.isNaN(parsedNumber))
            throw new Error('Only addition of numbers is supported.')
        if (parsedNumber < 0)
            throwNegativeNumbersError(numbersList, index)
        //ignore numbers greater than 1000
        if (parsedNumber > 1000)
            return total
        return total + Number.parseFloat(number)
    }, 0)
}

function splitHeader(numbers: string) {
    const header = numbers.match(/^((\/\/)(.*?)(\r\n|\r|\n))/g)
    if (!header)
        throw new Error('No header provided.')
    const delimiter = header[0].match(/(?<=\/\/\[)(.+?)(?=(\])(\r\n|\r|\n))/g)
    if (!delimiter)
        throw new Error('No delimiter provided.')
    //sanitize delimiter character before passing to regx.
    delimiter[0] = delimiter[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const remainingString = numbers.replace(header[0], '').toString()
    return [delimiter, remainingString] as [RegExpMatchArray | null, string]
}

function throwNegativeNumbersError(numberList: string[], index: number) {
    const negativeNumbersList: number[] = []
    for (let i = index; i < numberList.length; i++) {
        let parsedNumber = Number.parseFloat(numberList[i])
        if (!Number.isNaN(parsedNumber) && parsedNumber < 0)
            negativeNumbersList.push(parsedNumber)
    }
    throw new Error(`negative numbers not allowed ${negativeNumbersList.toString()}`)
}