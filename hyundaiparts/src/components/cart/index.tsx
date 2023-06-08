import React from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import cartLogo from "./Bag2.png";
import Link from "next/link";
import { RootState } from "@/store";
import s from "./index.module.scss";

const Cart = () => {
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const uniqueItemCount = cartItems.length;

  return (
    <>
      <Link href="/cart">
        <div className={s.cart_icon}>
          <Image src={cartLogo} alt="Cart" />
          {uniqueItemCount > 0 && <div className={s.cart_badge}>{uniqueItemCount}</div>}
        </div>
      </Link>
    </>
  );
};

export default Cart;
