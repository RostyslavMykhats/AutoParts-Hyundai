import React, { useState } from "react";
import axios from "axios";
import s from "./search.module.scss";
import Link from "next/link";

const Search = () => {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleSearch = async () => {
    const response = await axios.get(`https://fakestoreapi.com/products`);
    const filteredProducts = response.data.filter((product) =>
      product.title.toLowerCase().includes(searchText.toLowerCase())
    );
    setProducts(filteredProducts);
    setShowResults(true);
  };

  // Додайте цей код для реалізації debounce.
  const debounce = (func, delay) => {
    let timeoutId;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func.apply(context, args);
      }, delay);
    };
  };
  // debounce використовується для затримки виконання функції handleSearch.
  const debouncedSearch = debounce(handleSearch, 1000);

  const closeResults = () => {
    setShowResults(false);
  };

  return (
    <div className={s.search}>
      <input
        type="text"
        placeholder="Search"
        value={searchText}
        onChange={(e) => {
          setSearchText(e.target.value);
          // Затримка виконання handleSearch на 1000 мс.
          debouncedSearch();
        }}
      />
      <button type="submit" onClick={handleSearch}>
        Search
      </button>
      {showResults && (
        <div className={s.results}>
          <button
            onClick={() => {
              setShowResults(false);
              setSearchText("");
            }}
            className={s.results__close}
          >
            close
          </button>
          {products.length ? (
            products.map((product) => (
              <Link
                href={`/products/${product.id}?category=${product.category}`}
                onClick={() => {
                  setShowResults(false);
                  setSearchText("");
                }}
              >
                <div key={product.id}>
                  <img src={product.image} alt={product.title} />
                  <div>
                    <h5>{product.title}</h5>
                    <p>{product.price} USD</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Search;
