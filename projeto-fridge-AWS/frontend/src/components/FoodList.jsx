import React from 'react';
import axios from 'axios'; 

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const API_URL = `${API_BASE_URL}/API/fridge`;

// 1. Recebe foods e setFoods (para delete) e setEditingFood (para edição) via props
function FoodList({ foods, setFoods, setEditingFood }) {
    
    const handleDelete = async (id) => {
        if (!window.confirm('Tem certeza que deseja excluir este item?')) {
            return;
        }

        try {
            await axios.delete(`${API_URL}/${id}`);
            
            // 2. Atualiza a lista no frontend usando o setFoods do pai
            setFoods(foods.filter(food => food.id !== id));

            console.log(`Item com ID ${id} deletado com sucesso.`);

        } catch (error) {
            console.error("Erro ao deletar alimento:", error);
        }
    };

    const handleEdit = (food) => {
        setEditingFood(food);
    };

    const formatDate = (isoDateString) => {
    if (!isoDateString) return 'Sem data';

    // Cria um objeto Date com base na string ISO (YYYY-MM-DD)
    const [year, month, day] = isoDateString.split('-');
    
    // Retorna a string no formato DD/MM/AAAA
    return `${day}/${month}/${year}`; 
};
    
    return (
        <div className="food-list-container">
            <h1>Itens na Geladeira</h1>
            
            {foods.length === 0 ? (
                <p>Nenhum item para exibir. Adicione um novo!</p>
            ) : (
                <ul className="food-items">
                    {Array.isArray(foods) && foods.map(food => (
                        <li key={food.id} className="food-item">
                            <span className="food-name">Item: {food.name}</span> 
                            <span className="food-quantity">Qtd: {food.quantity}</span>
                            <span className="food-date">Validade: {formatDate(food.expirationDate)}</span>
                            
                            <button onClick={() => handleEdit(food)}>Editar</button>
                            <button onClick={() => handleDelete(food.id)}>Excluir</button>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

export default FoodList;