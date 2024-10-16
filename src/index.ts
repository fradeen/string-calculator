export function sum(numbers: string) {
    //check for empty string
    if (numbers.trim().length == 0)
        return 0
    const [delimiter, remainingString] = splitHeader(numbers)
    const numbersList = remainingString.split(new RegExp(String.raw`${delimiter}|\r\n|\r|\n`))
    console.log(numbersList)
    return numbersList.reduce((total, number) => {
        //check of empty string
        if (number.trim().length == 0)
            return total
        const parsedNumber = Number.parseFloat(number)
        //check for NaN
        if (Number.isNaN(parsedNumber))
            throw new Error('Only addition of numbers is supported.')
        return total + Number.parseFloat(number)
    }, 0)
}

function splitHeader(numbers: string) {
    const header = numbers.match(/^((\/\/)(.*?)(\r\n|\r|\n))/g)
    if (!header)
        throw new Error('No header provided.')
    const delimiter = header[0].match(/(?<=\/\/)(.+?)(?=(\r\n|\r|\n))/g)
    if (!delimiter)
        throw new Error('No delimiter provided.')
    if (delimiter[0].length > 1)
        throw new Error('Delimiter must a single character.')
    //sanitize delimiter character before passing to regx.
    delimiter[0] = delimiter[0].replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const remainingString = numbers.replace(header[0], '').toString()
    return [delimiter, remainingString] as [RegExpMatchArray | null, string]
}