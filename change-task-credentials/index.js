const guid = require('uuid').v4;
const fs = require('fs');
const path = require('path');

const repoPath = process.argv[2];
const taskName = process.argv[3];
const patch = process.argv[4];

if (repoPath === undefined) {
  throw new Error('Repo path must be specified');
}
if (taskName === undefined) {
  throw new Error('Task name must be specified');
}

const tasksFolders = fs.readdirSync(path.join(repoPath, 'Tasks'));
tasksFolders.forEach((taskFolder) => {
  if (taskFolder !== taskName) {
    return;
  }

  const fullTaskJsonPath = path.join(repoPath, 'Tasks', taskFolder, 'task.json');
  const taskJson = JSON.parse(fs.readFileSync(fullTaskJsonPath));
  
  taskJson.id = guid();
  taskJson.name = `${taskJson.name}M`;
  taskJson.friendlyName = `${taskJson.friendlyName}M`;
  taskJson.description = `DANIIL SHMELEVS TASK DON'T TOUCH`;
  taskJson.version.Patch = patch ?? 10;

  fs.writeFileSync(fullTaskJsonPath, JSON.stringify(taskJson, null, 4));
});
