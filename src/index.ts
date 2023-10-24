import * as commander from 'commander';

const program = new commander.Command();

program.version("0.0.1")

program
  // .argument('<name>')
  .option('-t, --title <honorific>', 'title to use before name')
  .option('-d, --debug', 'display some debugging')
  .action((options, command) => {
    if (options.debug) {
      console.error('Called %s with options %o', command.name(), options);
    }
    const title = options.title ? `${options.title} ` : '';
    console.log(`Thank-you ${title}`);
  });





// program
//   // .argument('<name>')
//   .option('-j, --json <design-tokens>', 'title to use before name')
//   // .option('-d, --debug', 'display some debugging')
//   .action((options, command) => {
//     // if (options.debug) {
//     //   console.error('Called %s with options %o', command.name(), options);
//     // }
//     // const title = options.title ? `${options.title} ` : '';
//     // console.log(`Thank-you ${title}`);
//     console.log("options.title", options.json)
//
//
//   });








program.parse();

// program
//   .command("say")
//   .description("say something")
//   .action((name, options, command) => console.log('lalalalalal', name, options, command))
//   // .action((name) => {
//   //   console.log('lalalalalal', name)
//   // })
//
// program.parse(process.argv)
export function add(a: number, b: number): number {
  // program
  //   .option('--test <test>', 'Option de test personnalisée')
  //   .parse(process.argv);
  //
  // console.log('Option de test personnalisée :', program.test);

  return a + b;
}

console.log("ADDDDDDD", add(3, 5));
