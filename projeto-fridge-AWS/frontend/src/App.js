import React, { useState } from 'react'; // Importe useState
import Header from './components/Header';
import Home from './pages/Home';
import './styles/globals.css';
import './styles/app.css';
import FoodList from './components/FoodList';

function App() {
  // O estado de edição deve estar no PAI (App.js) para ser compartilhado.
  const [editingFood, setEditingFood] = useState(null); 

  return (
    <div>
      <Header />
      
      {/* 1. Passa o setter para a FoodList para que ela possa começar a edição */}
      <FoodList setEditingFood={setEditingFood} /> 
      
      {/* 2. Passa o estado e o setter para o formulário (Home) */}
      <Home editingFood={editingFood} setEditingFood={setEditingFood} /> 
      
      {/* Remova o ponto e vírgula extra aqui: */}
      {/* <Home editingFood={editingFood} setEditingFood={setEditingFood} /> */}
    </div>
  );
}

export default App;