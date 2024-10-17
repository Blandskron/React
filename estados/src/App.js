import React from 'react';
import { UseState } from './UseState.js';
import { ClassState } from './ClassState.js';
import './styles/App.css';

function App() {
  return (
    <div className="App">
      <UseState name="Componente con Hooks" />
      <ClassState name="Componente de Clase" />
    </div>
  );
}

export default App;
