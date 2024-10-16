export function sum(numbers: string) {
    //check for empty string
    if (numbers.trim().length == 0)
        return 0
    const [delimiters, remainingString] = splitHeader(numbers)
    const numbersList = remainingString.split(new RegExp(String.raw`${delimiters.reduce((delimitersList, delimiter) => `${delimitersList}${delimiter}|`, '')}\r\n|\r|\n`))
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
    const trimmedHeader = header[0].match(/(?<=\/\/)(.+?)(?=(\r\n|\r|\n))/g)
    if (!trimmedHeader)
        throw new Error('No delimiter provided.')
    const delimiters = trimmedHeader[0].match(/(?<=\[)(.+?)(?=\])/g)
    if (!delimiters)
        throw new Error('No delimiter provided.')
    //sanitize delimiter characters before passing to regx.
    const updatedDelimiters = delimiters.map(delimiter => delimiter.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
    const remainingString = numbers.replace(header[0], '').toString()
    return [updatedDelimiters, remainingString] as [RegExpMatchArray, string]
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