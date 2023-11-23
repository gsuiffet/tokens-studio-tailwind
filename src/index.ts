import { program } from './program';

if (require.main === module) {
  program.parse(process.argv);
}
