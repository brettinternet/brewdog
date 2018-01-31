export default function shortenText(text, textLength, tail) {
  if (text.length > textLength) {
    text = text.substr(0, textLength);
    let lastspace = text.lastIndexOf(' ');
    if (lastspace != -1) {
      if (text.charAt(lastspace-1) == '.' || text.charAt(lastspace-1) == ',') {
        lastspace = lastspace - 1;
      }
      let trailingText = tail ? '…' : '';
      return text.substr(0, lastspace) + trailingText;
    }
  }
  return text;
}
