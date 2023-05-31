import React from "react";
import s from "./index.module.scss";
import Image from "next/image";

const SingleProduct = ({ product }) => {
    const shortDescription = product.description.slice(0, 80);
    const shortTitle = product.title.slice(0, 15);
  return (
    <>
      <div className={s.card}>
        <img className={s.card__image} src={`${product.image}`} alt={product.title} width='100%' height={150} />
        <h5 className={s.card__title}>{shortTitle}</h5>
        <p className={s.card__desc}>{shortDescription}</p>
        <p className={s.card__price}>{product.price}$</p>
      </div>
    </>
  );
};

export default SingleProduct;
