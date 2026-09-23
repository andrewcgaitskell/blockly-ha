// Define the look of the block
Blockly.common.defineBlocksWithJSONArray([
  {
    "type": "github_log",
    "message0": "Log to GitHub %1",
    "args0": [{ "type": "field_input", "name": "TEXT", "text": "Hello Git" }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 230
  }
]);

// Define what code it generates
Blockly.JavaScript['github_log'] = function(block) {
  const text = block.getFieldValue('TEXT');
  return `console.log(${JSON.stringify(text)});\n`;
};

