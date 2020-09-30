const $loadingElem = document.querySelector('#loading');
const $clearElem = document.querySelector('#clear');
const $inputMarkdownElem = document.querySelector('#inputMarkdown');
const $outputTypeElem = document.querySelector('#outputType');
const $outputContentElem = document.querySelector('#outputContent');

function setInitialText() {
  const mdName = './test.md';
  return fetch(mdName)
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      if ($inputMarkdownElem.value === '') {
        $inputMarkdownElem.value = text;
        window.markdown = text;
      }
      return text;
    });
}

function setResponseTime(time) {
  const amount = time;
  const $responseTimeElem = document.querySelector('#responseTime');
  $responseTimeElem.textContent = `Response Time: ${amount} ms`;
}

function setOutputContent(type) {
  let outputContent = window.highlightAdv;
  switch (type) {
    case 'adv':
      outputContent = window.highlightAdv;
      $outputContentElem.classList.add('no-padding');
      break;
    case 'html':
      outputContent = window.html;
      $outputContentElem.classList.remove('no-padding');
      break;
    case 'lexer':
      outputContent = window.highlightLexer;
      $outputContentElem.classList.add('no-padding');
    default:
      break;
  }
  $outputContentElem.innerHTML = outputContent;
}

function handleInputMarkdown(markdown) {
  const startTime = new Date();

  const lexed = marked.lexer(markdown);
  const highlightLexer = `<pre class="language-json"><code>${Prism.highlight(
    JSON.stringify(lexed, null, 2),
    Prism.languages.json,
    'json',
  )}</code></pre>`;

  window.markdown = markdown;
  window.highlightAdv = highlightLexer;
  window.highlightLexer = highlightLexer;
  window.html = marked.parse(markdown);

  setOutputContent($outputTypeElem.value);

  const endTime = new Date();
  const delayTime = endTime - startTime;
  return delayTime;
}

$clearElem.addEventListener('click', () => {
  $inputMarkdownElem.value = '';
});

$inputMarkdownElem.addEventListener('input', function () {
  setResponseTime(handleInputMarkdown(this.value));
});

$outputTypeElem.addEventListener('change', function () {
  setOutputContent(this.value);
});

setInitialText().then((markdown) => {
  $loadingElem.style.display = 'none';
  setResponseTime(handleInputMarkdown(markdown));
});
