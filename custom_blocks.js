// A self-checking loop that waits until Blockly is fully loaded into memory
const checkBlockly = setInterval(() => {
  // Try to find Blockly globally (either window.Blockly or directly)
  const blocklyInstance = window.Blockly || Blockly;
  
  if (blocklyInstance) {
    clearInterval(checkBlockly); // Stop checking once found
    initializeCustomBlocks(blocklyInstance);
  }
}, 50); // Checks every 50ms

function initializeCustomBlocks(Blockly) {
  
  // 1. Natively define your block's behavior using the fallback method
  Blockly.Blocks['my_simple_block'] = {
    init: function() {
      this.appendDummyInput()
          .appendField("Simple Drag & Drop Block");
      this.setPreviousStatement(true, null);
      this.setNextStatement(true, null);
      this.setColour(120);
      this.setTooltip("");
      this.setHelpUrl("");
    }
  };

  // 2. Attach your code generator
  if (Blockly.JavaScript) {
    Blockly.JavaScript['my_simple_block'] = function(block) {
      return "// Simple block dropped\n";
    };
  }

  // 3. Inject it straight into the live active UI workspace
  const checkWorkspace = setInterval(() => {
    const workspace = Blockly.getMainWorkspace();
    if (workspace) {
      clearInterval(checkWorkspace);

      // Extract the existing sidebar toolbox layout configuration
      const toolbox = workspace.getOptions().languageTree;
      
      if (toolbox && toolbox.contents) {
        // Look to see if "Custom Blocks" category already exists
        let customCategory = toolbox.contents.find(c => c.name === "Custom Blocks");
        
        if (!customCategory) {
          customCategory = {
            "kind": "category",
            "name": "Custom Blocks",
            "contents": []
          };
          toolbox.contents.push(customCategory);
        }

        // Drop your custom block straight inside the category list
        customCategory.contents.push({
          "kind": "block",
          "type": "my_simple_block"
        });

        // Push the updated toolbox array configuration straight back to the live editor UI
        workspace.updateToolbox(toolbox);
      }
    }
  }, 50);
}

