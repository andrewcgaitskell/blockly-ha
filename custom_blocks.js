// ---- 1. What the blocks look like ----
Blockly.common.defineBlocksWithJsonArray([
  {
    "type": "my_simple_block",
    "message0": "Simple Drag & Drop Block",
    "previousStatement": null,
    "nextStatement": null,
    "colour": 120
  },
  {
    "type": "robot_forward",
    "message0": "forward %1 cm",
    "args0": [{ "type": "field_number", "name": "CM", "value": 10, "min": 0, "max": 200 }],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20
  },
  {
    "type": "robot_turn",
    "message0": "turn %1 %2 degrees",
    "args0": [
      { "type": "field_dropdown", "name": "DIR", "options": [["left", "LEFT"], ["right", "RIGHT"]] },
      { "type": "field_number", "name": "DEG", "value": 90, "min": 0, "max": 360 }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "colour": 20
  }
]);

// ---- 2. What JavaScript each block produces ----
// Note: generators live in .forBlock (not directly on Blockly.JavaScript).
Blockly.JavaScript.forBlock['my_simple_block'] = function (block) {
  return "console.log('Simple block executed!');\n";
};

Blockly.JavaScript.forBlock['robot_forward'] = function (block) {
  return 'forward(' + block.getFieldValue('CM') + ');\n';
};

Blockly.JavaScript.forBlock['robot_turn'] = function (block) {
  const sign = block.getFieldValue('DIR') === 'LEFT' ? -1 : 1;
  return 'turn(' + sign * block.getFieldValue('DEG') + ');\n';
};
