import { finishLoading, removeError, setError, startLoading } from '../../actions/ui';
import { types } from '../../types/types';

describe('Pruebas en ui-actions', () => {
  test('Todas las acciones deben de funcionar', () => {
    const action = setError('Help!');

    expect(action).toEqual({
      type: types.uiSetError,
      payload: 'Help!'
    });

    expect(removeError()).toEqual({
      type: types.uiRemoveError
    });

    expect(startLoading()).toEqual({
      type: types.uiStartLoading,
      payload: true
    });

    expect(finishLoading()).toEqual({
      type: types.uiFinishLoading,
      payload: false
    });

  });
  
});
