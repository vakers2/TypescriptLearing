var StringRowFormattingType;
(function (StringRowFormattingType) {
    StringRowFormattingType[StringRowFormattingType["WrapByWord"] = 0] = "WrapByWord";
    StringRowFormattingType[StringRowFormattingType["WrapBySymbol"] = 1] = "WrapBySymbol";
    StringRowFormattingType[StringRowFormattingType["WrapBySentance"] = 2] = "WrapBySentance";
    StringRowFormattingType[StringRowFormattingType["NoWrap"] = 3] = "NoWrap";
})(StringRowFormattingType || (StringRowFormattingType = {}));
function formatString(string, maxRowLength, maxRowCount, rowFormattingType) {
    return string;
}
export default formatString;
export { StringRowFormattingType };
