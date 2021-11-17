import { demoTypes } from '../fixtures/demoTypes';
import { types } from '../../types/types';

describe('Pruebas en el archivo types', () => {
  test('deben de ser los mismos types', () => {
    expect(demoTypes).toEqual(types);
  });
});
