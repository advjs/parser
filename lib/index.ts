import { TokensList } from "marked";

/**
 * 基于 Markdown 解析
 * @param {*} lexer
 */
function parse(tokensList: TokensList) {
  const advTokens = [];
  const serialize = new Serialize();
  for (let i = 0; i < tokensList.length; i++) {
    const token = tokensList[i];
    if (token["text"]) {
      token["text"] = token["text"].trim();
    }
    let advObject = {};
    switch (token["type"]) {
      case "blockquote":
        advObject = serialize.blockquote(token["text"]);
        break;
      case "heading":
        advObject = serialize.heading(token);
        break;
      case "paragraph":
        advObject = serialize.paragraph(token["text"]);
        break;

      default:
        advObject = token;
        break;
    }
    advTokens.push(advObject);
  }

  return advTokens;
}

/**
 * 序列化
 */
class Serialize {
  /**
   * 处理标题
   * @param text
   */
  heading(token: object) {
    const info = {
      type: "heading",
      depth: token["depth"],
      text: token["text"],
    };
    return info;
  }

  /**
   * 处理引用块
   * @param text
   */
  blockquote(text: string) {
    const info = {
      type: "narration",
      text,
    };
    return info;
  }

  /**
   * 处理段落
   * @param text
   */
  paragraph(text: string) {
    const info = {
      type: "paragraph",
      children: [],
    };
    const lines = text.split("\n");
    if (Array.isArray(lines)) {
      lines.forEach((line) => {
        info.children.push(this.line(line));
      });
    }
    return info;
  }

  /**
   * 处理单行文本
   * @param text
   */
  line(text: string) {
    const children = [];
    if (text) {
      const delimiters = [":", "："];
      let pos = 0;
      delimiters.some((delimiter) => {
        pos = text.indexOf(delimiter);
        if (pos > -1) {
          return true;
        }
      });

      const characterInfo = text.slice(0, pos);
      const character = this.character(characterInfo);
      children.push(character);

      const words = text.slice(pos + 1);
      children.push(this.words(words));

      return {
        type: "line",
        children,
      };
    }
  }

  // special for advjs

  /**
   * 人物信息
   */
  character(text: string) {
    const leftBracket = ["(", "（"];
    const rightBracket = [")", "）"];

    const info = {
      type: "character",
      name: "",
      status: "",
    };

    for (let i = 0; i < leftBracket.length; i++) {
      if (text.indexOf(leftBracket[i]) === -1) {
        continue;
      }

      const re = new RegExp(`(.*)${leftBracket[i]}(.*?)${rightBracket[i]}`);
      const r = text.match(re);

      info.name = r[1];
      info.status = r[2];
    }

    if (!info.name) info.name = text;

    return info;
  }

  /**
   * 话语
   * @param words
   */
  words(text: string) {
    return {
      type: "words",
      text,
    };
  }
}

export default {
  parse,
};
