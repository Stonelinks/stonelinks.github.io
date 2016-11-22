import shell from 'child_process';

function postBuild (pages, callback) {
  shell.execSync('cp -r node_modules/font-awesome/css/font-awesome.css public/');
  shell.execSync('cp -r node_modules/font-awesome/fonts public/');
  shell.execSync('cp -r misc public/misc');
  shell.execSync('cp -r CNAME public/');
  callback();
}

export { postBuild };
