import { InvalidInputError } from './invalid-input-error';

export function ensureInteger(value: string) {
  const castedValue = Number(value);

  if (Number.isInteger(castedValue)) {
    return castedValue;
  }

  throw new InvalidInputError();
}
