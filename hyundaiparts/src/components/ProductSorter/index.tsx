import React, { useState } from "react";
import styles from "./ProductSorter.module.scss";

const ProductSorter = ({ products, onSort }) => {
  const [sortOption, setSortOption] = useState("");

  const handleSortChange = (e) => {
    const option = e.target.value;
    setSortOption(option);
    onSort(option);
  };

  return (
    <div className={styles.productSorter}>
      <label htmlFor="sort" className={styles.label}>
        Sort By:
      </label>
      <select
        id="sort"
        value={sortOption}
        onChange={handleSortChange}
        className={styles.select}
      >
        <option value="">None</option>
        <option value="price-asc">Price: Low to High</option>
        <option value="price-desc">Price: High to Low</option>
      </select>
    </div>
  );
};

export default ProductSorter;
