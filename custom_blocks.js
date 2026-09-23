// Register the block object interface into the shared global namespace
if (typeof Blockly === 'undefined') {
    var Blockly = { Blocks: {}, JavaScript: {} };
}

Blockly.Blocks['my_simple_block'] = {
  init: function() {
    this.appendDummyInput().appendField("Simple Drag & Drop Block");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(120);
  }
};

Blockly.JavaScript['my_simple_block'] = function(block) {
  return "// Simple block dropped\n";
};

