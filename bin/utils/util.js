const path = require('path');
const ora = require('ora');
const chalk = require('chalk');
const date = require('./date');
const spinner = ora(chalk.blue('Creating post..\n'));
const rootPath = path.resolve(__dirname, '../../');
/**
 * create the post markdown file
 */
const createPost = (title, template, filePath) => {
  spinner.start();
  const basename = `${title}.md`;
  const wrap = str => parseInt(str, 10) < 10 ? `0${str}` : str;
  const datetime = `${date.year}-${wrap(date.month)}-${wrap(date.day)} ${wrap(date.hours)}:${wrap(date.minutes)}:${wrap(date.seconds)}`;
  cd(filePath);
  set('-e');
  cp(`${rootPath}/_source/_templates/${template}.md`, basename);
  sed('-i', '{{ title }}', title, basename);
  sed('-i', '{{ author }}', 'eteplus', basename);
  sed('-i', '{{ date }}', datetime, basename);
  spinner.text = chalk.green('Create new post succeed：') + `${filePath}/${basename}`;
  spinner.succeed();
}

/**
 * create the folder
 */
const createFolder = (filePath) => {
  spinner.text = chalk.blue('Creating folder..');
  spinner.start();
  mkdir('-p', filePath);
  spinner.text = chalk.green('Create folder succeed：') + filePath;
  spinner.succeed();
}

module.exports = {
  createPost,
  createFolder
}
