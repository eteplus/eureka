require('shelljs/global');
const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const fse = require('fs-extra');
const fsp = require('fs-promise');
const matter = require('meta-matter');
const marked = require('marked');
const trimHtml = require('trim-html');
const toml = require('toml-j0.4');
const rootPath = path.resolve(__dirname, '../../');
const dataPath = path.resolve(rootPath, 'site/data');
const postsPath = path.resolve(rootPath, '_source/_posts');
const spinner = ora(chalk.blue('Building data files...'));

const builder = (yargs) => {
  marked.setOptions({
    highlight: (code) => {
      return require('highlight.js').highlightAuto(code).value;
    },
    gfm: true
  });
  const argv = yargs.reset()
    .usage('Usage: eureka generate')
    .help()
    .showHelpOnFail()
    .argv;
  return argv;
};

const handler = (argv) => {
  // remove data path
  fse.removeSync(dataPath);
  // create data path
  fse.ensureDirSync(dataPath);
  fse.ensureDirSync(`${dataPath}/posts`); // posts path
  fse.ensureDirSync(`${dataPath}/archives`) // archives
  fse.ensureDirSync(`${dataPath}/tags`); // tags path

  // config file
  const configToml = fse.readFileSync(path.resolve(rootPath, '_source/_config.toml'), 'utf-8');
  let config;
  try {
    config = toml.parse(configToml);
  } catch (e) {
    if (e instanceof toml.SyntaxError) {
      throw e;
    }
  }
  fse.outputJSONSync(`${dataPath}/config.json`, config);

  const indexFile = path.resolve(rootPath, 'site/index.html');
  //It's not be modified if the index.html does not exist.
  if (test('-f', indexFile)) {
    // title
    sed('-i', /<title>[^]+<\/title>/g, `<title>${config.site.name}</title>`, indexFile);
    // CNAME
    fse.outputFileSync(path.resolve(rootPath, 'site/CNAME'), config.site.url);
    if (config.meta) {
      // keywards
      sed('-i', /<meta name=\"keywords\" [^>]+\">/g, `<meta name="keywords" content="${config.meta.keywords}">`, indexFile);
      // description
      sed('-i', /<meta name=\"description\" [^>]+\">/g, `<meta name="description" content="${config.meta.description}">`, indexFile);
    }
  }

  const posts = [];
  const archives = {};
  const tags = {};

  spinner.start();
  fse.walk(postsPath).on('data', (item) => {
    if (item.stats.isDirectory()) {
      return;
    }
    const [year, month, file] = item.path.replace(`${postsPath}/`, '').split(/\//);
    const filename = path.basename(item.path, '.md').replace(/[\，|\s]/g, '-');
    // create post file path
    const filePath = `data/posts/${year}/${month}`;
    fse.ensureDirSync(`${rootPath}/site/${filePath}`);
    // read post from markdown file
    const markdown = fse.readFileSync(item.path, 'utf-8');
    // meta, content
    const { data, body } = matter(markdown, {
      lang: 'toml',
      delims: ['+++', '+++']
    });
    // parse error
    if (!data) {
      spinner.text = chalk.red(`SyntaxError: ${item.path} meta can't parse.`);
      spinner.fail();
      spinner.text = chalk.red('Build failed.');
      spinner.fail();
      throw new Error(`SyntaxError: meta can't parse`);
    }
    // parse markdown
    const content = marked(body);
    // posts
    const post = Object.assign({}, data);
    // post description
    const description = trimHtml(content, {
      limit: 150
    }).html;
    Object.assign(post, {
      description: description,
      url: `/${year}/${month}/${filename}`
    });
    posts.push(post);
    // post partial info
    const sitem = {
      title: post.title,
      date: post.date,
      url: `/${year}/${month}/${filename}`
    };
    // archive
    const date = `${year}-${month}`;
    !archives[date] ? archives[date] = [] : true;
    archives[date].push(sitem);
    // tags
    post.tags.forEach((tag) => {
      !tags[tag] ? tags[tag] = [] : true;
      tags[tag].push(sitem);
    });
    // a post json file with full of content.
    data.content = content;
    fse.outputJSONSync(`${rootPath}/site/${filePath}/${filename}.json`, data);
  })
  .on('end', () => {
    // posts
    fse.outputJSONSync(`${dataPath}/posts.json`, posts);
    // archives
    fse.outputJSONSync(`${dataPath}/archives.json`, archives);
    // tags
    const tagList = [];
    for(let name in tags) {
      fse.outputJSONSync(`${dataPath}/tags/${name}.json`, tags[name]);
      tagList.push({
        name: name,
        total: tags[name].length,
        url: `/data/tags/${name}.json`
      });
    }
    fse.outputJSONSync(`${dataPath}/tags.json`, tagList);
    spinner.text = chalk.green('Build succeed');
    spinner.succeed();
  });

};

module.exports = {
  command: `generate`,
  aliases: [],
  describe: 'Generate the data files into site floder',
  builder: builder,
  handler: handler
}
