enum StringRowFormattingType {
    WrapByWord,
    WrapBySymbol,
    WrapBySentence,
    NoWrap
}

function parseFormatType(value: string): StringRowFormattingType {
    const numValue = Number(value);
    if (StringRowFormattingType[numValue]) {
        return numValue as StringRowFormattingType;
    }

    return StringRowFormattingType.WrapByWord;
}

function formatString(
    string: string,
    maxRowLength?: number,
    maxRowCount?: number,
    rowFormattingType?: StringRowFormattingType) : string {
    if (maxRowLength === undefined) {
        return string;
    }

    if (rowFormattingType === StringRowFormattingType.WrapByWord) {
        return formatStringByWord(string, maxRowLength, maxRowCount);
    }

    if (rowFormattingType === StringRowFormattingType.WrapBySymbol) {
        return formatStringBySymbol(string, maxRowLength, maxRowCount);
    }

    if (rowFormattingType === StringRowFormattingType.WrapBySentence) {
        return formatStringBySentence(string, maxRowLength, maxRowCount);
    }

    if (rowFormattingType === StringRowFormattingType.NoWrap) {
        return formatStringNoWrap(string, maxRowLength);
    }

    return string;
}

function formatStringByWord(
    string: string,
    maxRowLength: number,
    maxRowCount?: number) : string {
    const rows = [];

    let indexRowStart = 0;
    let indexRowEnd = 0;
    let indexLastWordStart = 0;
    let charCount = 0;
    let index = 0;
    while (rows.length !== maxRowCount && index < string.length) {
        const char = string[index];
        const isPartOfWord = char.match(/[\w'-]/);
        charCount++;

        if (string[index - 1] === ' ' && isPartOfWord)
        {
            indexLastWordStart = index;
        }

        if (charCount % maxRowLength === 0)
        {
            indexRowEnd = index;
            if (isPartOfWord)
            {
                indexRowEnd = indexLastWordStart - 1;
            }

            rows.push(string.substring(indexRowStart, indexRowEnd));

            indexRowStart = indexRowEnd;
            charCount = index - indexRowEnd;
        }

        index++;
    }

    if (rows.length !== maxRowCount) {
        rows.push(string.substring(indexRowStart, string.length));
    }

    return joinRows(rows);
}

function formatStringBySymbol(
    string: string,
    maxRowLength: number,
    maxRowCount?: number,
    ) : string {

    const rowCount = Math.ceil(string.length / maxRowLength);
    const rows = [];

    let rowStartIndex = 0;
    for (let i = 0; i < rowCount; ++i, rowStartIndex += maxRowLength) {
        rows[i] = string.substring(rowStartIndex, rowStartIndex + maxRowLength);
    }

    return joinRows(rows.slice(0, maxRowCount));
}

function formatStringBySentence(
    string: string,
    maxRowLength: number,
    maxRowCount?: number) : string {
    const rows = [];

    let indexRowStart = 0;
    let indexRowEnd = 0;
    let indexLastSentenceStart = 0;
    let charCount = 0;
    let index = 0
    while (rows.length !== maxRowCount && index < string.length) {
        const char = string[index];
        const isEndOfSentence = char.match(/[\.!?]/i);

        charCount++;

        if (isEndOfSentence)
        {
            indexLastSentenceStart = index;
        }

        if (charCount % maxRowLength === 0)
        {
            indexRowEnd = index;
            if (isEndOfSentence)
            {
                indexRowEnd = indexLastSentenceStart;
            }

            rows.push(string.substring(indexRowStart, indexRowEnd));

            indexRowStart = indexRowEnd;
            charCount = index - indexRowEnd;
        }

        index++;
    }

    return joinRows(rows).slice(0, indexLastSentenceStart + 1);
}

function formatStringNoWrap(
    string: string,
    maxRowLength: number) : string {

    return string.substring(0, maxRowLength);
}

function joinRows(rows: string[]): string {
    return rows.join('\n');
}

export default formatString;
export { StringRowFormattingType, parseFormatType };
