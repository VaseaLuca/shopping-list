import React, { useState, useEffect } from 'react';
import { Route, useLocation } from 'react-router-dom';
import ProductList from './ProductList';
import CartPage from './ProductList';
import axios from 'axios';
import Menu from './Menu';

const App = () => {
  const [listOfProducts, setListOfProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const location = useLocation();

  useEffect(() => {
    async function fetchListofProducts() {
      const listOfProducts = await axios.get('http://localhost:3001/api/products/');
      setListOfProducts(listOfProducts.data);
    }
    fetchListofProducts();
  }, []);

  function handleAddToCard(item) {
    const exist = cart.find((element) => {
      return element.id === item.id;
    });
    if (!exist) {
      let total = item.price;
      let newItem = { ...item, total, count: 1 };
      setCart((cart) => [...cart, newItem]);
    } else {
      let updatedItem = cart.map((element) => {
        let count = element.count + 1;
        return element.id === item.id ? { ...exist, count } : element;
      });
      setCart([...updatedItem]);
    }
  }
  function handleRemoveItem(item) {
    let updatedItem = cart.filter((element) => {
      return element.id !== item.id;
    });
    setCart([...updatedItem]);
  }
  function handleDecreaseItem(item) {
    const exist = cart.find((element) => {
      return element.id === item.id;
    });
    if (exist.count === 1) {
      let updatedItem = cart.filter((element) => {
        return element.id !== item.id;
      });
      setCart([...updatedItem]);
    } else {
      let updatedItem = cart.map((element) => {
        let count = element.count - 1;
        return element.id === item.id ? { ...exist, count } : element;
      });
      setCart([...updatedItem]);
    }
  }
  function handleAscPrice() {
    let ascItem = [...listOfProducts];
    ascItem.sort((a, b) => (a.price > b.price ? 1 : -1));
    setListOfProducts([...ascItem]);
  }
  function handleDescPrice() {
    let ascItem = [...listOfProducts];
    ascItem.sort((a, b) => (a.price > b.price ? -1 : 1));
    setListOfProducts([...ascItem]);
  }
  function handleAscCategory() {
    let ascName = [...listOfProducts];
    ascName.sort((a, b) => (a.category.name > b.category.name ? 1 : -1));
    setListOfProducts([...ascName]);
  }
  function handleDescCategory() {
    let descName = [...listOfProducts];
    descName.sort((a, b) => (a.category.name > b.category.name ? -1 : 1));
    setListOfProducts([...descName]);
  }
  return (
    <div style={{ height: '100vh' }}>
      <Menu location={location} length={cart.length} />
      <Route
        path="/item-list"
        render={() => (
          <ProductList
            category="Category"
            name="Name"
            price="Price"
            actions="Actions"
            action="Select"
            location={location}
            handleAscCategory={handleAscCategory}
            handleDescCategory={handleDescCategory}
            handleAscPrice={handleAscPrice}
            listOfProducts={listOfProducts}
            handleDescPrice={handleDescPrice}
            handleAddToCard={handleAddToCard}
            handleDecreaseItem={handleDecreaseItem}
          />
        )}
      />
      <Route
        path="/cart-list"
        render={() => (
          <CartPage
            category="Category"
            name="Name"
            quantity="Quantity"
            price="Price"
            actions="Actions"
            total="Total"
            action="Remove"
            listOfProducts={cart}
            location={location}
            handleAscCategory={handleAscCategory}
            handleDescCategory={handleDescCategory}
            handleAscPrice={handleAscPrice}
            handleAddToCard={handleAddToCard}
            handleDescPrice={handleDescPrice}
            handleRemoveItem={handleRemoveItem}
            handleDecreaseItem={handleDecreaseItem}
          />
        )}
      />
    </div>
  );
};
export default App;