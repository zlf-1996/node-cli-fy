const { Command } = require('commander');
const program = new Command();
const { translate } = require('./main.js');

program
  .name('translation')
  .version('0.0.1')
  .argument('<word>', '请输入需要翻译的单词')
  .action(word => {
    translate(word);
  });
program.parse(process.argv);