const { execSync } = require('child_process');

async function runSetup() {
  try {
    execSync('pnpm run build');
  } catch (error) {
    console.error('Build failed:', error);
    process.exit(1);
  }
}

module.exports = runSetup;
