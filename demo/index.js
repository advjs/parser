const $loadingElem = document.querySelector('#loading');
const $markdownElem = document.querySelector('#markdown');
const $clearElem = document.querySelector('#clear');
const $outputTypeElem = document.querySelector('#outputType');
const $outputContentElem = document.querySelector('#outputContent');

function setInitialText() {
  const mdName = './test.md';
  return fetch(mdName)
    .then((res) => {
      return res.text();
    })
    .then((text) => {
      if ($markdownElem.value === '') {
        $markdownElem.value = text;
        window.markdown = text;
      }
      return text;
    });
}

function setResponseTime(ms) {
  const amount = ms;
  const $responseTimeElem = document.querySelector('#responseTime');
  $responseTimeElem.textContent = `Response Time: ${amount} ms`;
}

$clearElem.addEventListener('click', () => {
  $markdownElem.value = '';
});

$outputTypeElem.addEventListener('change', function () {
  let outputContent = window.highlightAdv;
  switch (this.value) {
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
});

setInitialText().then((markdown) => {
  $loadingElem.style.display = 'none';

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

  $outputContentElem.innerHTML = highlightLexer;

  const endTime = new Date();
  const delayTime = endTime - startTime;
  setResponseTime(delayTime);
});
