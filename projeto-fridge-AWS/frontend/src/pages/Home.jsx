import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
const API_URL = `${API_BASE_URL}/API/fridge`;

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

        const isEditing = foodData.id !== null; // Se o ID existe, estamos editando

        try {
            let response;
            const url = isEditing ? `${API_URL}/${foodData.id}` : API_URL;

            if (isEditing) {
                // EDITAR: usa o método PUT
                response = await axios.put(url, foodData);
            } else {
                // ADICIONAR: usa o método POST
                response = await axios.post(url, foodData);
            }

            if (response) {
                if (!isEditing) {
                    // ADICIONAR: Adiciona o novo item (retornado pelo backend) ao final da lista
                    setFoods(prevFoods => [...prevFoods, response.data]);
                } else {
                    // EDITAR: Mapeia a lista e substitui o item editado
                    setFoods(prevFoods =>
                        prevFoods.map(f => (f.id === response.data.id ? response.data : f))
                    );
                }

                // Limpa o formulário e sai do modo de edição
                setFoodData(initialFoodState);
                setEditingFood(null);
            }

        } catch (error) {
            console.error("Erro ao salvar alimento:", error);
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