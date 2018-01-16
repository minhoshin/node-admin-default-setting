#!/usr/bin/env node

const co = require('co');
const fs = require('fs');
const { spawn } = require('child_process');
const inquirer = require('inquirer');
const chalk = require('chalk');

co(function* () {

    const packageData = fs.readFileSync('./package.json');

    const { scripts = {} } = JSON.parse(packageData);
    const { target } = yield inquirer.prompt([{
        type: 'list',
        name: 'target',
        message: 'Select npm script to run\nNODE_ENV 변경\nexport NODE_ENV=development\nexport NODE_ENV=production\nDEBUG=express:* nodemon app.js\nDEBUG=express:router nodemon app.js\nDEBUG=express:application,express:router nodemon app.js\n',
        choices: Object.keys(scripts)
    }]);
    const [ cmd, ...args ] = scripts[target].split(' ');

    spawn(cmd, args, { stdio: 'inherit' });

})
.catch(function () {
    console.log(chalk.blue('package.json'), 'not found.');
});