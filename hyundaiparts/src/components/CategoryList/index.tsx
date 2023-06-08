import React from "react";
import s from "./categoryList.module.scss";

const CategoryList = ({ categories, selectedCategory, handleCategoryClick }) => {
  return (
    <ul className={`mb-5 ${s.categories}`}>
      <li
        style={{
          marginBottom: "20px",
          borderBottom: "1px solid silver",
          width: "100%",
        }}
      >
        Category
      </li>
      <li
        className={`${s.category} ${selectedCategory === "All" ? s.active : ""}`}
        onClick={() => handleCategoryClick("All")}
      >
        All items
      </li>
      {categories.map((category) => (
        <li
          key={category}
          className={`${s.category} ${
            selectedCategory === category ? s.active : ""
          }`}
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;
