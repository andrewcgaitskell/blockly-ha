// What the robot commands do. Replace the bodies to drive the real robot.
const robot = {
  say: (text) => console.log(text),   // where messages go (run.js points this at the output panel)
  forward(cm) { this.say('forward ' + cm + ' cm'); },
  turn(deg)   { this.say('turn ' + deg + ' degrees'); },
};
