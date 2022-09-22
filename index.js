import robot from 'robotjs';
import chalk from 'chalk';
import logUpdate from 'log-update';

const lerp = (value, target, speed = 0.05) => {
  return value + (speed * (target - value));
}

const distance = (x1, y1, x2, y2) => {
  const a = (x2 - x1) ** 2;
  const b = (y2 - y1) ** 2;
  return Math.sqrt(a + b);
};

const colourfulTime = () => {
  const time = (new Date()).toLocaleTimeString();
  return chalk.magenta(`[${time}]`);
}

const log = (...inputs) => {
  console.log(colourfulTime(), ...inputs);
};

const logProgress = (...inputs) => {
  logUpdate(colourfulTime(), ...inputs);
};

const moveMouseToRandomPoint = () => {
  log('Moving mouse');

  let { x, y } = robot.getMousePos();
  const { width, height } = robot.getScreenSize();

  const targetX = Math.floor(Math.random() * width);
  const targetY = Math.floor(Math.random() * height);

  const moveThreshold = 2;

  while (distance(x, y, targetX, targetY) > moveThreshold) {
    x = lerp(x, targetX);
    y = lerp(y, targetY);
    robot.moveMouse(x, y);

    logProgress(chalk.italic(`(${Math.floor(x)}, ${Math.floor(y)}) => (${targetX}, ${targetY})`));
  }

  logUpdate.done();
  log('Mouse moved');
};

const minsInterval = 4;
let count = 0;

const loop = () => {
  moveMouseToRandomPoint();

  log(chalk.bold(`Waiting for ${minsInterval} minutes`));
  if (count > 0) {
    log(`You've been looking busy for ${count * minsInterval} minutes 😎`);
  }
  count++;
};

console.log(chalk.bgMagentaBright.bold('--- Look Busy ---'));
log('Starting loop');

loop();

setInterval(loop, minsInterval * 1000 * 60);