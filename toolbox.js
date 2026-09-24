// The block menu. Add a block type here to make it appear in the toolbox.
const toolboxJson = {
  "kind": "categoryToolbox",
  "contents": [
    {
      "kind": "category", "name": "Robot", "colour": "20",
      "contents": [
        { "kind": "block", "type": "robot_forward" },
        { "kind": "block", "type": "robot_turn" }
      ]
    },
    {
      "kind": "category", "name": "Loops", "colour": "120",
      "contents": [
        {
          "kind": "block", "type": "controls_repeat_ext",
          "inputs": { "TIMES": { "shadow": { "type": "math_number", "fields": { "NUM": 4 } } } }
        }
      ]
    },
    {
      "kind": "category", "name": "My Custom Blocks", "colour": "120",
      "contents": [
        { "kind": "block", "type": "my_simple_block" }
      ]
    }
  ]
};
