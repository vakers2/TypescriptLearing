enum StringRowFormattingType {
  WrapByWord,
  WrapBySymbol,
  WrapBySentance,
  NoWrap
}

function formatString(
  string: string, 
  maxRowLength?: number, 
  maxRowCount?: number, 
  rowFormattingType?: StringRowFormattingType) : string {
  return string;
}

export default formatString;
export { StringRowFormattingType };