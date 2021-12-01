var StringRowFormattingType;
(function (StringRowFormattingType) {
    StringRowFormattingType[StringRowFormattingType["WrapByWord"] = 0] = "WrapByWord";
    StringRowFormattingType[StringRowFormattingType["WrapBySymbol"] = 1] = "WrapBySymbol";
    StringRowFormattingType[StringRowFormattingType["WrapBySentence"] = 2] = "WrapBySentence";
    StringRowFormattingType[StringRowFormattingType["NoWrap"] = 3] = "NoWrap";
})(StringRowFormattingType || (StringRowFormattingType = {}));
function parseFormatType(value) {
    var numValue = Number(value);
    if (StringRowFormattingType[numValue]) {
        return numValue;
    }
    return StringRowFormattingType.WrapByWord;
}
function formatString(string, maxRowLength, maxRowCount, rowFormattingType) {
    if (!maxRowLength) {
        return string;
    }
    if (rowFormattingType == StringRowFormattingType.WrapByWord) {
        return formatStringByWord(string, maxRowLength, maxRowCount);
    }
    if (rowFormattingType == StringRowFormattingType.WrapBySymbol) {
        return formatStringBySymbol(string, maxRowLength, maxRowCount);
    }
    if (rowFormattingType == StringRowFormattingType.WrapBySentence) {
        return formatStringBySentence(string, maxRowLength, maxRowCount);
    }
    if (rowFormattingType == StringRowFormattingType.NoWrap) {
        return formatStringNoWrap(string, maxRowLength);
    }
    return string;
}
function formatStringByWord(string, maxRowLength, maxRowCount) {
    var rows = [];
    var indexRowStart = 0;
    var indexRowEnd = 0;
    var indexLastWordStart = 0;
    var charCount = 0;
    for (var index = 0; index < string.length; index++) {
        var char = string[index];
        var isPartOfWord = char.match(/[a-zA-Z]/i);
        charCount++;
        if (string[index - 1] == ' ' && isPartOfWord) {
            indexLastWordStart = index;
        }
        if (charCount % maxRowLength == 0) {
            indexRowEnd = index;
            if (isPartOfWord) {
                indexRowEnd = indexLastWordStart - 1;
            }
            rows.push(string.substring(indexRowStart, indexRowEnd));
            indexRowStart = indexRowEnd;
            charCount = index - indexRowEnd;
        }
    }
    if (rows.length !== maxRowCount) {
        rows.push(string.substring(indexRowStart, string.length));
    }
    return joinRows(rows.slice(0, maxRowCount));
}
function formatStringBySymbol(string, maxRowLength, maxRowCount) {
    var rowCount = Math.ceil(string.length / maxRowLength);
    var rows = [];
    var rowStartIndex = 0;
    for (var i = 0; i < rowCount; ++i, rowStartIndex += maxRowLength) {
        rows[i] = string.substring(rowStartIndex, rowStartIndex + maxRowLength);
    }
    return joinRows(rows.slice(0, maxRowCount));
}
function formatStringBySentence(string, maxRowLength, maxRowCount) {
    var rows = [];
    var indexRowStart = 0;
    var indexRowEnd = 0;
    var indexLastSentenceStart = 0;
    var charCount = 0;
    for (var index = 0; index < string.length; index++) {
        var char = string[index];
        var isEndOfSentence = char.match(/[\.!?]/i);
        charCount++;
        if (isEndOfSentence) {
            indexLastSentenceStart = index;
        }
        if (charCount % maxRowLength == 0) {
            indexRowEnd = index;
            if (isEndOfSentence) {
                indexRowEnd = indexLastSentenceStart;
            }
            rows.push(string.substring(indexRowStart, indexRowEnd));
            indexRowStart = indexRowEnd;
            charCount = index - indexRowEnd;
        }
    }
    return joinRows(rows.slice(0, maxRowCount));
}
function formatStringNoWrap(string, maxRowLength) {
    return string.substring(0, maxRowLength || string.length);
}
function joinRows(rows) {
    return rows.join('\n');
}
export default formatString;
export { StringRowFormattingType, parseFormatType };
