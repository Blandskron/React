import React from 'react';
import { Loading } from './Loading';

const SECURITY_CODE = 'paradigma';

class ClassState extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      error: false,
      loading: false,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    // Solo validamos cuando el estado de 'loading' cambia
    if (!prevState.loading && this.state.loading) {
      console.log('Iniciando validación...');
      this.validateCode();
    }
  }

  validateCode = () => {
    setTimeout(() => {
      const isValid = SECURITY_CODE === this.state.value;

      this.setState({
        error: !isValid,
        loading: false,
      });

      console.log(isValid ? 'Código correcto' : 'Error: el código es incorrecto');
    }, 3000);
  };

  handleInputChange = (event) => {
    this.setState({ value: event.target.value });
  };

  handleCheck = () => {
    this.setState({ loading: true });
  };

  render() {
    const { name } = this.props;
    const { value, error, loading } = this.state;

    return (
      <div>
        <h2>Eliminar {name}</h2>
        <p>Por favor, escribe el código de seguridad.</p>

        {error && !loading && <p>Error: el código es incorrecto</p>}
        {loading && <Loading />}

        <input
          placeholder="Código de seguridad"
          value={value}
          onChange={this.handleInputChange}
        />
        <button onClick={this.handleCheck}>Comprobar</button>
      </div>
    );
  }
}

export { ClassState };
