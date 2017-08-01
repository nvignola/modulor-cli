#! /usr/bin/env node
const program = require("commander");
const file = require("./helpers/file");

program
  .version("1.0.0")
  .option("-n, --name [name]", "component name")
  .parse(process.argv);

const dir = program.name;
file.createFilesInDir(dir);
