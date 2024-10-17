import React from 'react';
import { Loading } from './Loading';

const SECURITY_CODE = 'paradigma';

function UseReducer({ name }) {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  const { value, error, loading, deleted, confirmed } = state;

  const onConfirm = () => dispatch({ type: actionTypes.confirm });
  const onError = () => dispatch({ type: actionTypes.error });
  const onCheck = () => dispatch({ type: actionTypes.check });
  const onDelete = () => dispatch({ type: actionTypes.delete });
  const onReset = () => dispatch({ type: actionTypes.reset });
  const onWrite = ({ target: { value } }) => dispatch({ type: actionTypes.write, payload: value });

  React.useEffect(() => {
    if (loading) {
      setTimeout(() => {
        value === SECURITY_CODE ? onConfirm() : onError();
      }, 3000);
    }
  }, [loading, value]);

  if (!deleted && !confirmed) {
    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>

        {error && !loading && <p>Error: el código es incorrecto</p>}
        {loading && <Loading />}

        <input
          placeholder="Código de seguridad"
          value={value}
          onChange={onWrite}
        />
        <button onClick={onCheck}>Comprobar</button>
      </div>
    );
  }

  if (confirmed && !deleted) {
    return (
      <>
        <p>Pedimos confirmación. ¿Estás seguro?</p>
        <button onClick={onDelete}>Sí, eliminar</button>
        <button onClick={onReset}>No, me arrepentí</button>
      </>
    );
  }

  return (
    <>
      <p>Eliminado con éxito</p>
      <button onClick={onReset}>Resetear, volver atrás</button>
    </>
  );
}

const initialState = {
  value: '',
  error: false,
  loading: false,
  deleted: false,
  confirmed: false,
};

const actionTypes = {
  confirm: 'CONFIRM',
  delete: 'DELETE',
  error: 'ERROR',
  write: 'WRITE',
  check: 'CHECK',
  reset: 'RESET',
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.confirm:
      return { ...state, error: false, loading: false, confirmed: true };
    case actionTypes.error:
      return { ...state, error: true, loading: false };
    case actionTypes.write:
      return { ...state, value: action.payload };
    case actionTypes.check:
      return { ...state, loading: true };
    case actionTypes.delete:
      return { ...state, deleted: true };
    case actionTypes.reset:
      return { ...state, confirmed: false, deleted: false, value: '' };
    default:
      return state;
  }
};

export { UseReducer };
