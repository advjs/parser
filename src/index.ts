import * as marked from 'marked';

interface Token {
  /**
   * 类型
   */
  type?: string;
  /**
   * 文本
   */
  text?: string;
  [propName: string]: any;
}

/**
 * Parse ADV Text
 * @param text The text to parsed
 */
export function parse(text: string): Token[] {
  const tokens = marked.lexer(text);
  const parsedText = tokens;
  return parsedText;
}
