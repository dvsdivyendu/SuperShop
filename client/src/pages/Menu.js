// components/MenuCart.js
import React, { useState, useEffect } from 'react';
import './Menu.css';
import { useDispatch } from 'react-redux'; 
import { addItem } from '../slices/slice'; 
import axios from 'axios'; 

const MenuCart = () => {
    const [search, setSearch] = useState('');
    const [filter, setFilter] = useState('');
    const dispatch = useDispatch();
    const [quantities, setQuantities] = useState({});
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/menu');
                const initialQuantities = response.data.reduce((acc, item) => {
                    acc[item._id] = 1; // Set default quantity to 1
                    return acc;
                }, {});
                setMenuItems(response.data);
                setQuantities(initialQuantities);
            } catch (error) {
                console.error('Error fetching menu items:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    const filteredItems = menuItems.filter(item => 
        item.name.toLowerCase().includes(search.toLowerCase()) &&
        (filter ? item.type === filter : true)
    );

    const handleQuantityChange = (id, delta) => {
        setQuantities(prev => ({
            ...prev,
            [id]: Math.max((prev[id] || 1) + delta, 1), // Ensure quantity doesn't go below 1
        }));
    };

    const handleAddToCart = async (item) => {
        const quantity = quantities[item._id];
        if (quantity > 0) {
            try {
                await axios.post('http://localhost:5000/api/cart/add', {
                    itemId: item._id,
                    quantity,
                });

                dispatch(addItem({ 
                    id: item._id, 
                    name: item.name, 
                    price: item.price, 
                    image: item.image, 
                    quantity 
                }));
                
                console.log('Item added to cart successfully');
            } catch (error) {
                console.error('Error adding item to cart:', error.response?.data || error.message);
            }
        } else {
            console.warn('Quantity must be greater than zero');
        }
    };

    return (
        <div className="menu-cart">
            <header className='menuheader'>
                <h1>Products</h1>
                <div className="search-filter">
                    <input 
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select onChange={(e) => setFilter(e.target.value)} value={filter}>
                        <option value="">All</option>
                        <option value="beer">Electronics</option>
                        <option value="cocktail">Food</option>
                        <option value="snack">Cloths</option>
                    </select>
                </div>
            </header>

            {loading ? (
                <p>Loading menu items...</p>
            ) : (
                <div className="menu-items">
                    {filteredItems.map(item => (
                        <div className="menu-item" key={item._id}>
                            <img src={item.image} alt={item.name} className="item-image" />
                            <h3 className="item-name">{item.name}</h3>
                            <p className="item-details">{item.details}</p>
                            <p className="item-price">₹{Math.round(item.price)}</p>
                            <div className="cart-actions">
                                <button
                                    className="decrease-button"
                                    onClick={() => handleQuantityChange(item._id, -1)}
                                >
                                    -
                                </button>
                                <input
                                    type="number"
                                    min="1"
                                    value={quantities[item._id]}
                                    readOnly
                                    className="item-count"
                                />
                                <button
                                    className="increase-button"
                                    onClick={() => handleQuantityChange(item._id, 1)}
                                >
                                    +
                                </button>
                            </div>
                            <button
                                className="add-to-cart"
                                onClick={() => handleAddToCart(item)}
                            >
                                Add to Cart
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MenuCart;
