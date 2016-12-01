require('shelljs/global');
const ora = require('ora');
const path = require('path');
const chalk = require('chalk');
const date = require('../utils/date');
const rootPath = path.resolve(__dirname, '../../');
const filePath = path.resolve(rootPath, `_source/_posts/${date.year}/${date.month}`);
const spinner = ora(chalk.blue('Creating post..'));

const createPost = (title) => {
  const basename = `${title}.md`;
  const wrap = str => parseInt(str, 10) < 10 ? `0${str}` : str;
  const datetime = `${date.year}-${wrap(date.month)}-${wrap(date.day)} ${wrap(date.hours)}:${wrap(date.minutes)}:${wrap(date.seconds)}`;
  cd(filePath);
  set('-e');
  cp(`${rootPath}/_source/_templates/post.md`, basename);
  sed('-i', '{{ title }}', title, basename);
  sed('-i', '{{ author }}', 'eteplus', basename);
  sed('-i', '{{ date }}', datetime, basename);
  spinner.text = chalk.green('Create new post succeed：') + `${filePath}/${basename}`;
  spinner.succeed();
}

const createFolder = () => {
  spinner.text = chalk.blue('Creating folder..');
  mkdir('-p', filePath);
  spinner.text = chalk.green('Create folder succeed：') + filePath;
  spinner.succeed();
}

const builder = (yargs) => {
  const argv = yargs.reset()
    .usage('Usage: eureka new <title> | --title=<title>')
    .example(`eureka new 'welcome'`, `create post with title of 'welcome'`)
    .example(`eureka new --title='Eureka'`, `create post with title of 'Eureka'`)
    .string('title')
    .describe('title', `Post title. Wrap it with ${chalk.red('quotations')} to escape.`)
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
  /* folder is not exists */
  if (!test('-d', filePath)) {
    spinner.start();
    createFolder();
    createPost(title);
    return;
  }
  if (!test('-f', `${filePath}/${title}.md`)) {
    spinner.start();
    createPost(title);
    return;
  }
  console.warn(chalk.yellow(`The ${title}.md already exists`));
};

module.exports = {
  command: `new`,
  aliases: [],
  describe: 'Create a new post.',
  builder: builder,
  handler: handler
}
