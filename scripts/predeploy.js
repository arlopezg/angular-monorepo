#!/usr/bin/env node

/**
 * Pre-deploy script
 * Purpose: prepare the Firebase RC file in order to *only* deploy to the desired Firebase project.
 * This is a workaround to deal with some "@angular/fire" issues
 * See https://github.com/angular/angularfire/issues/3309
 */

const fs = require("fs");
const firebaseClient = require("firebase-tools");

const RC_OUTPUT_PATH = ".firebaserc"

const rc = JSON.parse(fs.readFileSync(".firebaserc.tpl"));
const [_nodePath, _filePath, projectId] = process.argv;
const rcProjects = Object.keys(rc.targets);
const projectConfig = rc.targets[projectId];

if (!projectId) {
  throw new Error("Missing project ID");
}
if (!projectConfig) {
  throw new Error(`Invalid project config: ${projectId}. Available configs: ${rcProjects}`)
}

console.log(`Preparing for a deployment to "${projectId}"...`);
firebaseClient.use(projectId).then(() => {
  const newRcContent = { targets: { [projectId]: projectConfig } };
  fs.rmSync(RC_OUTPUT_PATH, { force: true });
  fs.writeFileSync(RC_OUTPUT_PATH, JSON.stringify(newRcContent, undefined, 2), {})
  console.log("Done!");
});

