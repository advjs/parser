import * as marked from 'marked';

/**
 * Parse ADV Text
 * @param text The text to parsed
 */
export function parse(text: string) {
  const tokens = marked.lexer(text);
  const parsedText = tokens;
  return parsedText;
}
