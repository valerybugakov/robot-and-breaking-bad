export enum DIRECTION {
  NORTH = 90,
  EAST = 0,
  SOUTH = 270,
  WEST = 180,
}

type TRobotPositionArgs = {
  x: number;
  y: number;
  direction: number;
};

export class RobotPosition {
  x: number;
  y: number;
  direction: number;

  constructor({ x, y, direction }: TRobotPositionArgs) {
    this.x = x;
    this.y = y;
    this.direction = direction;
  }

  rotate(degrees: number) {
    this.direction = (this.direction + degrees + 360) % 360;
  }

  advance() {
    switch (this.direction) {
      case DIRECTION.NORTH:
        this.y += 1;
        break;
      case DIRECTION.SOUTH:
        this.y -= 1;
        break;
      case DIRECTION.EAST:
        this.x += 1;
        break;
      case DIRECTION.WEST:
        this.x -= 1;
    }
  }

  toString() {
    return `${this.x} ${this.y} ${DIRECTION[this.direction]}`;
  }
}
