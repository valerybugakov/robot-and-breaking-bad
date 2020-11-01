import { DIRECTION, RobotPosition } from './robot-position';
import { InvalidInputError } from './invalid-input-error';
import { ensureInteger } from './ensure-integer';

type TDirection = keyof typeof DIRECTION;

export enum ROTATION {
  L = 90,
  R = -90,
}

export class Robot {
  #position: RobotPosition = new RobotPosition({ x: 0, y: 0, direction: 0 });

  #getRobotPosition = (args: { x: string; y: string; bearing: string }) => {
    const { x, y, bearing } = args;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof DIRECTION[bearing as any] === 'undefined') {
      throw new InvalidInputError();
    }

    return new RobotPosition({
      x: ensureInteger(x),
      y: ensureInteger(y),
      direction: DIRECTION[bearing as TDirection],
    });
  };

  #processCommands = (commands: string) => {
    for (const cmd of commands) {
      switch (cmd) {
        case 'R':
        case 'L':
          this.#position.rotate(ROTATION[cmd]);
          break;
        case 'A':
          this.#position.advance();
          break;
        default:
          throw new InvalidInputError();
      }
    }
  };

  execute(initialPositionAndCommands: string) {
    const input = initialPositionAndCommands.split(' ');

    if (input.length !== 4) {
      throw new InvalidInputError();
    }

    const [x, y, bearing, commands] = input;

    this.#position = this.#getRobotPosition({ x, y, bearing });
    this.#processCommands(commands);

    return this.#position.toString();
  }
}
