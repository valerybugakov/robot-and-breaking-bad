import { InvalidInputError } from './invalid-input-error';
import { Robot } from './robot-simulator';

describe('Robot', function () {
  it('input test #1', () => {
    const robot = new Robot();

    expect(robot.execute('0 0 NORTH A')).toEqual('0 1 NORTH');
  });

  it('input test #2', () => {
    const robot = new Robot();

    expect(robot.execute('7 3 NORTH RAALAL')).toEqual('9 4 WEST');
  });

  it('input test #3', () => {
    const robot = new Robot();

    expect(robot.execute('0 0 NORTH L')).toEqual('0 0 WEST');
  });

  it('input test #4', () => {
    const robot = new Robot();

    expect(robot.execute('0 0 NORTH R')).toEqual('0 0 EAST');
  });

  it('input test #5', () => {
    const robot = new Robot();

    expect(robot.execute('0 0 NORTH AAAALAAAALAAAALAAAAL')).toEqual(
      '0 0 NORTH',
    );
  });

  it('handles rotation correctly', () => {
    const robot = new Robot();

    expect(robot.execute('0 0 EAST RRR')).toEqual('0 0 NORTH');
    expect(robot.execute('0 0 EAST LLL')).toEqual('0 0 SOUTH');
  });

  it('throws `InvalidInputError` with invalid input', () => {
    const robot = new Robot();

    expect(() => robot.execute('0 A EAST RRR')).toThrowError(InvalidInputError);
    expect(() => robot.execute('A 0 EAST RRR')).toThrowError(InvalidInputError);
    expect(() => robot.execute('0 EAST RRR')).toThrowError(InvalidInputError);
    expect(() => robot.execute('0 0 EAST')).toThrowError(InvalidInputError);
    expect(() => robot.execute('0 0 BOOM RRR')).toThrowError(InvalidInputError);
    expect(() => robot.execute('0 0 RRR')).toThrowError(InvalidInputError);
    expect(() => robot.execute('0 0 EAST ABC')).toThrowError(InvalidInputError);
  });
});
