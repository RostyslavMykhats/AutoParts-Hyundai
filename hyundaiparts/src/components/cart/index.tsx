import React from "react";
import Image from "next/image";
import cartLogo from "./Bag2.png";
import Link from "next/link";

const Cart = () => {
  return (
    <>
      <Link href="/cart">
        <Image src={cartLogo} alt="Cart" />
      </Link>
    </>
  );
};

export default Cart;
