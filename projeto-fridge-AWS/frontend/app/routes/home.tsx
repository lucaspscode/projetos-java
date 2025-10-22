import React, { useState, useEffect } from 'react'; // Adicionar useEffect
import axios from 'axios'; // Adicionar axios
import Header from '../../src/components/Header.jsx';
import FoodList from '../../src/components/FoodList.jsx';
import Home from '../../src/pages/Home.jsx';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';
const API_URL = `${API_BASE_URL}/API/fridge`;

export default function HomeRoute() {
    const [editingFood, setEditingFood] = useState(null);
    // 1. ESTADO CENTRALIZADO: O estado da lista agora vive aqui
    const [foods, setFoods] = useState([]);

    // 2. FUNÇÃO DE BUSCA: Lógica para buscar os alimentos
    const fetchFoods = async () => {
        try {
            const response = await axios.get(API_URL);
            setFoods(response.data); 
        } catch (error) {
            console.error("Erro ao buscar alimentos:", error);
        }
    };

    // 3. EFEITO: Chama a busca na montagem do componente
    useEffect(() => {
        fetchFoods();
    }, []);

    return (
        <div>
            <Header />
            {/* 4. Passa foods, setFoods e setEditingFood para FoodList */}
            <FoodList 
                foods={foods} 
                setFoods={setFoods} 
                setEditingFood={setEditingFood} 
            />
            {/* 5. Passa o estado completo para o formulário (Home) */}
            <Home 
                editingFood={editingFood} 
                setEditingFood={setEditingFood} 
                setFoods={setFoods} 
                foods={foods}
            />
        </div>
    );
}