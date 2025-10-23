import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL; 
const API_URL = '`${API_BASE_URL}/food`';

// Estado inicial do objeto Food (deve corresponder ao seu modelo Java)
const initialFoodState = {
    id: null,
    name: '',
    expirationDate: '', // O formato ISO (AAAA-MM-DD) é ideal
    quantity: 1,
};

const Home = ({ editingFood, setEditingFood, setFoods, foods }) => {
    
    // Estado interno para gerenciar os dados do formulário
    const [foodData, setFoodData] = useState(initialFoodState);
    const isEditing = editingFood !== null;

    // Efeito para preencher o formulário quando editingFood muda
    useEffect(() => {
        if (isEditing) {
            // Se estiver editando, preenche com os dados do item
            let formattedDate = editingFood.expirationDate;

            // Lógica de segurança para garantir o formato YYYY-MM-DD
            if (formattedDate && formattedDate.length > 10) {
                formattedDate = formattedDate.substring(0, 10);
            }
            
            setFoodData({
                ...editingFood,
                expirationDate: formattedDate || '' // Usa a data formatada
            });

        } else {
            // Se não estiver editando, reseta para o estado inicial
            setFoodData(initialFoodState);
        }
    }, [editingFood, isEditing]);

    // Handler para mudanças nos campos do formulário
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFoodData({
            ...foodData,
            // Converte quantity para número, senão, mantém como string
            [name]: name === 'quantity' ? parseInt(value) || 0 : value, 
        });
    };
    
    // Handler para submissão do formulário
    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Verifica se a quantidade é zero ou nula e ajusta para 1 (ou o valor mínimo que você deseja)
        const foodToSave = {
            ...foodData,
            quantity: foodData.quantity > 0 ? foodData.quantity : 1 
        };
        
        try {
            let response;
            
            if (isEditing && foodToSave.id) {
                // Lógica de EDIÇÃO (PUT)
                // O backend (Spring Boot) geralmente usa PUT para /food/{id} para atualizar
                response = await axios.put(`${API_URL}/${foodToSave.id}`, foodToSave);
                
                // 1. Atualiza a lista no frontend com o item editado
                setFoods(foods.map(f => (f.id === response.data.id ? response.data : f)));

            } else {
                // Lógica de CRIAÇÃO (POST)
                response = await axios.post(API_URL, foodToSave);
                
                // 2. Adiciona o novo item à lista
                setFoods([...foods, response.data]);
            }

            console.log('Item salvo com sucesso:', response.data);
            
            // 3. Reseta o formulário e o estado de edição
            setFoodData(initialFoodState);
            setEditingFood(null); 

        } catch (error) {
            console.error("Erro ao salvar alimento:", error);
            alert(`Erro ao salvar: ${error.message}. Verifique o console.`);
        }
    };
    
    // Handler para cancelar a edição
    const handleCancel = () => {
        setFoodData(initialFoodState);
        setEditingFood(null);
    };

    return (
        <div className="food-form-container" style={{ padding: '20px', border: '1px solid #ddd', margin: '20px' }}>
            <h2>{isEditing ? `Editar Item: ${editingFood.name}` : 'Adicionar Novo Item'}</h2>

            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="name">Nome do Item:</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={foodData.name}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div>
                    <label htmlFor="quantity">Quantidade:</label>
                    <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={foodData.quantity}
                        onChange={handleChange}
                        min="1"
                        required
                    />
                </div>

                <div>
                    <label htmlFor="expirationDate">Data de Validade:</label>
                    <input
                        type="date"
                        id="expirationDate"
                        name="expirationDate"
                        value={foodData.expirationDate}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className="form-actions" style={{ marginTop: '15px' }}>
                    <button type="submit">
                        {isEditing ? 'Salvar Edição' : 'Adicionar'}
                    </button>
                    
                    {isEditing && (
                        <button type="button" onClick={handleCancel} style={{ marginLeft: '10px' }}>
                            Cancelar
                        </button>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Home;