import React, { useState } from 'react';
import './ProductList.css';

const ProductList = ({
  category,
  name,
  quantity,
  price,
  actions,
  action,
  total,
  location,
  listOfProducts,
  handleAddToCard,
  handleRemoveItem,
  handleDecreaseItem,
  handleAscPrice,
  handleDescPrice,
  handleAscCategory,
  handleDescCategory,
}) => {
  let pathName = location.pathname;
  const [sortPrice, setSortPrice] = useState(true);
  const [sortCategory, setSortCategory] = useState(true);

  function handleSortPrice() {
    setSortPrice((sortPrice)=> !sortPrice);
    return sortPrice ? handleAscPrice() : handleDescPrice();
  }
    console.log(sortPrice);
  function handleSortCategory() {
    setSortCategory((sortCategory) => !sortCategory);
    return sortCategory ? handleAscCategory() : handleDescCategory();
  }
  return (
    <div>
      <div style={{ display: 'flex', flexDirection: 'column', margin: '50px 0 0 0' }}>
        <table style={{ textAlign: 'center' }}>
          <thead>
            <tr>
              <th onClick={() => handleSortCategory()} style={{ cursor: 'pointer' }}>
                {`${category}${sortCategory ? '↑' : '↓'}`}
              </th>
              <th>{name}</th>
              {quantity && <th>{quantity}</th>}
              <th onClick={() => handleSortPrice()} style={{ cursor: 'pointer' }}>
                {`${price}${sortPrice ? '↑' : '↓'}`}
              </th>
              <th>{actions}</th>
              {total && <th>{total}</th>}
            </tr>
          </thead>
          <tbody>
            {listOfProducts &&
              listOfProducts.map((item) => {
                return (
                  <tr key={item.id}>
                    <td>{item.category.name}</td>
                    <td>{item.name}</td>
                    {quantity && <td>{item.count}</td>}
                    <td>{`$${item.price}`}</td>
                    <td>
                      <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <div className="product-subtract" onClick={() => handleDecreaseItem(item)}>
                          -
                        </div>
                        <div
                          className="product-select"
                          onClick={() => {
                            if (pathName === '/item-list') {
                              handleAddToCard(item);
                            } else if (pathName === '/cart-list') {
                              handleRemoveItem(item);
                            }
                          }}
                        >
                          {action}
                        </div>
                        <div className="product-add" onClick={() => handleAddToCard(item)}>
                          +
                        </div>
                      </div>
                    </td>
                    {item.total && <td>{`$${(item.total * item.count).toFixed(2)}`}</td>}
                  </tr>
                );
              })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProductList;