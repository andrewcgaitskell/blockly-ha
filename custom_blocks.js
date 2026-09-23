// Define the visual layout of your block
Blockly.common.defineBlocksWithJSONArray([
  {
    "type": "my_simple_block",
    "message0": "Simple Drag & Drop Block",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120
  }
]);

// Define the output generator logic
Blockly.JavaScript['my_simple_block'] = function(block) {
  return "console.log('Simple block executed!');\n";
};

