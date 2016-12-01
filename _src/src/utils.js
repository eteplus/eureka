/* eslint-disable import/prefer-default-export, global-require*/
import marked from 'marked';
import highlight from 'highlight.js';

const renderer = new marked.Renderer();
renderer.code = (code, language) => {
  if (code.match(/^sequenceDiagram/) || code.match(/^graph/)) {
    return `<div class="mermaid">${code}</div>`;
  }
  return `<pre><code class="lang-${language}">${highlight.highlightAuto(code).value}</code></pre>`;
};

marked.setOptions({
  renderer
});

/**
 * 统一处理返回数据
 * @param {Object} data 数据
 * @param {String} msg 提示信息
 * @param {String} status 状态
 */
const result = (data = {}, msg = '', status = 'Success') => ({ data, msg, status });

const trim = str => str.replace(/^\s+|\s+$/g, '');

/**
 * resolve meta string
 */
const getMetas = (metaStr) => {
  const metaArray = metaStr.replace(/^\s|\s$/g, '').split(/\n/g);
  const data = {};
  metaArray.forEach((meta) => {
    const [key, value] = trim(meta).split(/:\s{1}/g);
    data[trim(key)] = trim(key) === 'tags' ? trim(value).split(',') : trim(value);
  });
  return data;
};

const resolve = (markdown) => {
  if (!trim(markdown).length) {
    return result(null, 'The Markdown File is empty', 'Failed');
  }
  const regex = /<---\n([^]+)--->\n([^]+)\n?/gm;
  const data = regex.exec(markdown);
  // meta not found
  if (!data[1]) {
    return result(null, 'Article Meta is not found', 'Failed');
  }
  const metas = getMetas(data[1]);
  // content no found
  if (!data[2]) {
    return result(null, 'Article content is not found', 'Failed');
  }
  const content = marked(data[2]);
  return result({
    metas,
    content
  });
};

export {
  trim,
  resolve
};
