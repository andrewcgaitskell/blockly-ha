// Create the workspace and keep the code panel up to date.
const workspace = Blockly.inject('blocklyDiv', {
  toolbox: toolboxJson,
  trashcan: true,
  media: 'blockly/media/'   // sounds and icons come from this folder, not the internet
});

workspace.addChangeListener((e) => {
  if (e.isUiEvent) return;
  document.getElementById('codeArea').textContent =
    Blockly.JavaScript.workspaceToCode(workspace);
});
