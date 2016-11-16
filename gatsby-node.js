import shell from 'child_process';

function postBuild (pages, callback) {
  shell.execSync('cp -r CNAME public/');
  callback();
}

export { postBuild };
