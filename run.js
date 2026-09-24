// The Run button: generate the code from the blocks and execute it.
document.getElementById('runButton').addEventListener('click', () => {
  const out = document.getElementById('output');
  out.textContent = '';
  const say = (...args) => { out.textContent += args.join(' ') + '\n'; };
  robot.say = say;

  const code = Blockly.JavaScript.workspaceToCode(workspace);
  try {
    new Function('console', 'forward', 'turn', code)(
      { log: say },
      (cm) => robot.forward(cm),
      (deg) => robot.turn(deg)
    );
  } catch (err) {
    say('Error: ' + err.message);
  }
});
