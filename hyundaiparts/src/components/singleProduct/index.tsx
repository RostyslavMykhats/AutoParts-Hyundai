import React,{useState} from "react";
import s from "./index.module.scss";
import Image from "next/image";
import Link from "next/link";
import Popup from "@/components/Popup";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "@/store/features/cart";

const SingleProduct = ({ product }: any) => {
  const dispatch = useDispatch();
  const shortDescription = product.description.slice(0, 70);
  const shortTitle = product.title.slice(0, 15);
  const [showPopup, setShowPopup] = useState(false); // стан для відображення попапу

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));
      setShowPopup(true); // Встановлюємо значення стану на true при натисканні кнопки
    }
  };
  return (
    <>
      <div className={s.card}>
        <Link
          className={s.item}
          style={{
            textDecoration: "none",
            color: "#000",
          }}
          href={`/market/${product.id}?${product.title}?category=${product.category}`}
        >
          <img
            className={s.card__image}
            src={`${product.image}`}
            alt={product.title}
            width="100%"
            height={150}
          />
          <h5 className={s.card__title}>{shortTitle}</h5>
          <p className={s.card__desc}>{shortDescription}</p>
          <p className={s.card__price}>{product.price}$</p>
        </Link>
        <button onClick={handleAddToCart}>buy</button>
      </div>
      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </>
  );
};

export default SingleProduct;
