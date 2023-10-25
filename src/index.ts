import * as commander from 'commander';
import * as fs from 'fs';

const program = new commander.Command();

program
  .option('-j, --json <path>', 'Path to the JSON design tokens')
  .action((options) => {
    if (options.json) {
      fs.readFile(options.json, 'utf8', (err, data) => {
        if (err) {
          console.log('Erreur de lecture du fichier JSON: ', err)
        } else {
          const jsonContent = JSON.parse(data)
          console.log("jsonContent", jsonContent)
        }
      })
    }
  })
  .parse(process.argv)

// program
//   // .argument('<name>')
//   .option('-t, --title <honorific>', 'title to use before name')
//   .option('-d, --debug', 'display some debugging')
//   .action((options, command) => {
//     if (options.debug) {
//       console.error('Called %s with options %o', command.name(), options);
//     }
//     const title = options.title ? `${options.title} ` : '';
//     console.log(`Thank-you ${title}`);
//   });

export function add(a: number, b: number): number {
  // program
  //   .option('--test <test>', 'Option de test personnalisée')
  //   .parse(process.argv);
  //
  // console.log('Option de test personnalisée :', program.test);

  return a + b;
}

console.log("ADDDDDDD", add(3, 5));
