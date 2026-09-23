// 1. Define what the block looks like
Blockly.common.defineBlocksWithJSONArray([
  {
    "type": "my_simple_block",
    "message0": "Simple Drag & Drop Block",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120
  }
]);

// 2. Define what code it generates (even if it's just a blank line)
Blockly.JavaScript['my_simple_block'] = function(block) {
  return "// Simple block dropped\n";
};

// 3. Inject it straight into the sidebar menu automatically
window.addEventListener('DOMContentLoaded', () => {
  setTimeout(() => {
    const workspace = Blockly.getMainWorkspace();
    if (!workspace) return;

    // Grab the existing sidebar structure from memory
    const toolbox = workspace.getOptions().languageTree;
    
    if (toolbox && toolbox.contents) {
      // Append your new block straight to the end of the existing list
      toolbox.contents.push({
        "kind": "category",
        "name": "Custom Blocks",
        "contents": [
          { "kind": "block", "type": "my_simple_block" }
        ]
      });

      // Force the sidebar menu UI to re-render
      workspace.updateToolbox(toolbox);
    }
  }, 100); // 100ms delay lets bundle.js finish loading first
});

