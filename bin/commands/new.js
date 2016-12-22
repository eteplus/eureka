require('shelljs/global');
const path = require('path');
const chalk = require('chalk');
const date = require('../utils/date');
const util = require('../utils/util');
const rootPath = path.resolve(__dirname, '../../');
const filePath = path.resolve(rootPath, `_source/_posts/${date.year}/${date.month}`);

const builder = (yargs) => {
  const argv = yargs.reset()
    .usage('Usage: eureka new <title> [template]')
    .example(`eureka new 'welcome'`, `use the default template from '_config.toml' and create post with title of 'welcome'`)
    .example(`eureka new 'welcome' 'custom'`, `use 'custom.md' as the template and create post with title of 'welcome'`)
    .example(`eureka new --title='Eureka' --template='custom'`, `use 'custom.md' as the template and create post with title of 'Eureka'`)
    .string('title')
    .describe('title', `Post title. Wrap it with ${chalk.red('quotations')} to escape.`)
    .string('template')
    .describe('template', `If no ${chalk.red('template')} is provided, eureka will use the default_template from _config.toml. `)
    .help()
    .showHelpOnFail()
    .argv;
  /* Missing post title*/
  if (argv._.length <= 1 && !argv.title) {
    return yargs.showHelp()
  }
  return argv;
}

const handler = (argv) => {
  const title = argv._[1] || argv.title;
  const template = argv._[2] || argv.template || 'post';
  if (template && template !== 'post') {
    if (!test('-f', `${rootPath}/_source/_templates/${template}.md`)) {
      console.error(chalk.yellow('[WRAN]:'), chalk.yellow(`The ${rootPath}/_source/_templates/${template}.md is not found.`));
      return;
    }
  }
  console.log(chalk.blue(`[Template]: ${template}.md`));
  /* The post folder does not exist */
  if (!test('-d', filePath)) {
    util.createFolder(filePath);
    util.createPost(title, template, filePath);
    return;
  }
  /* The post file already exists */
  if (test('-f', `${filePath}/${title}.md`)) {
    console.warn(chalk.yellow('[WRAN]:'), chalk.yellow(`The ${filePath}/${title}.md already exists`));
    return;
  }
  // create post
  util.createPost(title, template, filePath);
};

module.exports = {
  command: `new`,
  aliases: [],
  describe: 'Create a new post.',
  builder: builder,
  handler: handler
}
