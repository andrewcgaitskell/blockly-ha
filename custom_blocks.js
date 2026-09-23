// This function triggers automatically the exact millisecond Webpack loads
window.setupMyBlocks = function(Blockly) {
  
  // 1. Create your block layout
  Blockly.Blocks['my_simple_block'] = {
    init: function() {
      this.appendDummyInput().appendField("Simple Drag & Drop Block");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
    }
  };

  // 2. Wait just a moment for the visual workspace to draw, then add it to the menu
  setTimeout(() => {
    const workspace = Blockly.getMainWorkspace();
    const toolbox = workspace.getOptions().languageTree;
    
    if (toolbox && toolbox.contents) {
      toolbox.contents.push({
        "kind": "category",
        "name": "Custom Blocks",
        "contents": [
          { "kind": "block", "type": "my_simple_block" }
        ]
      });
      workspace.updateToolbox(toolbox);
    }
  }, 100);
};

