import { useRouter } from "next/router";  // Підключення useRouter для отримання інформації про поточний шлях
import React, { useState, useEffect } from "react";  // Підключення useState та useEffect для управління станом та ефектами
import axios from "axios";  // Підключення axios для здійснення HTTP-запитів
import { useDispatch, useSelector } from "react-redux";  // Підключення useDispatch та useSelector для взаємодії з Redux store
import {  // Підключення дій addToCart, removeFromCart, updateCartItemQuantity з Redux store
  addToCart,
  removeFromCart,
  updateCartItemQuantity,
} from "@/store/features/cart";
import { Col, Container, Row } from "react-bootstrap";  // Підключення компонентів Col, Container, Row з бібліотеки react-bootstrap
import s from "./single.module.scss";  // Імпорт стилів для цієї сторінки
import ButtonUi from "@/components/button";  // Підключення компонента ButtonUi
import Popup from "@/components/Popup";  // Підключення компонента Popup
import trash from "@/pages/cart/Trash.png";  // Імпорт зображення смітника
import Image from "next/image";  // Підключення компонента Image з бібліотеки Next.js
import SingleProduct from "@/components/singleProduct";  // Підключення компонента SingleProduct

// Оголошення інтерфейсу для продукту
interface Product {
  title: string;  // Назва продукту
  image: string;  // Зображення продукту
  description: string;  // Опис продукту
  price: number;  // Ціна продукту
  id: number;  // Ідентифікатор продукту
  category: string;  // Категорія продукту
}

// Оголошення інтерфейсу для стану корзини
interface RootState {
  cart: {
    items: { product: Product; quantity: number }[];  // Масив елементів корзини, що містить продукт та його кількість
  };
}

const SingleProductPage = () => {
  const dispatch = useDispatch();  // Отримання методу dispatch для виклику Redux дій
  const router = useRouter();  // Отримання поточного шляху використовуючи useRouter
  const { id } = router.query;  // Отримання ідентифікатора продукту з параметрів шляху
  const [product, setProduct] = useState<Product | null>(null);  // Оголошення стану для продукту
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);  // Оголошення стану для пов'язаних продуктів
  const [showPopup, setShowPopup] = useState(false);  // Оголошення стану для відображення спливаючого вікна
  const cartItems = useSelector((state: RootState) => state.cart.items);  // Отримання елементів корзини зі стану Redux store

  useEffect(() => {
    const fetchProduct = async () => {
      if (id < 20) {
        try {
          const response = await axios.get(
            `https://fakestoreapi.com/products/${id}`
          );
          setProduct(response.data);
          return; // Вийти, якщо продукт отримано з fakestoreapi
        } catch (error) {
          console.log("Помилка отримання продукту з fakestoreapi:", error);
        }
      }

      if (id > 20) {
        try {
          const response = await axios.get(
            `https://64820d8829fa1c5c503286f2.mockapi.io/products/${id}`
          );
          setProduct(response.data);
          return; // Вийти, якщо продукт отримано з іншого джерела
        } catch (error) {
          console.log("Помилка отримання продукту з іншого джерела:", error);
        }
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id]);

  useEffect(() => {
    const fetchRelatedProducts = async () => {
      if (id < 20) {
        try {
          const response = await axios.get(
            `https://fakestoreapi.com/products/${id}`
          );
          const relatedResponse = await axios.get(
            `https://fakestoreapi.com/products/category/${response.data.category}`
          );
          const filteredProducts = relatedResponse.data.filter(
            (p: Product) => p.id !== response.data.id
          );
          setRelatedProducts(filteredProducts.slice(0, 4));
        } catch (error) {
          console.log("Помилка отримання пов'язаних продуктів:", error);
        }
      }

      if (id > 20) {
        try {
          const response = await axios.get(
            `https://64820d8829fa1c5c503286f2.mockapi.io/products/${id}`
          );
          const relatedResponse = await axios.get(
            `https://fakestoreapi.com/products/category/${response.data.category}`
          );
          const filteredProducts = relatedResponse.data.filter(
            (p: Product) => p.id !== response.data.id
          );
          setRelatedProducts(filteredProducts.slice(0, 4));
        } catch (error) {
          console.log("Помилка отримання пов'язаних продуктів:", error);
        }
      }
    };

    if (product) {
      fetchRelatedProducts();
    }
  }, [id, product]);

  const handleAddToCart = () => {
    if (product) {
      dispatch(addToCart(product));  // Виклик Redux дії addToCart з переданим продуктом
      setShowPopup(true);  // Показати спливаюче вікно
    }
  };

  const handleRemoveFromCart = (productId: number) => {
    dispatch(removeFromCart(productId));  // Виклик Redux дії removeFromCart з переданим ідентифікатором продукту
  };

  if (!product) {
    return <div>Loading...</div>;  // Відображення "Завантаження..." поки продукт не отримано
  }

  const handleQuantityChange = (productId: number, newQuantity: number) => {
    dispatch(updateCartItemQuantity({ productId, quantity: newQuantity }));  // Виклик Redux дії updateCartItemQuantity з переданим ідентифікатором продукту та новою кількістю
  };

  const handleIncrementQuantity = (productId: number) => {
    const item = cartItems.find((item) => item.product.id === productId);  // Знайти елемент корзини за ідентифікатором продукту
    if (item) {
      const newQuantity = item.quantity + 1;  // Збільшити кількість на 1
      handleQuantityChange(productId, newQuantity);  // Змінити кількість товару
    }
  };

  const handleDecrementQuantity = (productId: number) => {
    const item = cartItems.find((item) => item.product.id === productId);  // Знайти елемент корзини за ідентифікатором продукту
    if (item && item.quantity > 1) {
      const newQuantity = item.quantity - 1;  // Зменшити кількість на 1
      handleQuantityChange(productId, newQuantity);  // Змінити кількість товару
    }
  };

  return (
    <div className="mt-5" style={{ minHeight: "80vh" }}>
      <Container>
        <Row>
          <Col xs={12}>
            <div
              className={`d-flex align-items-center justify-content-start gap-5 m-5 ${s.section}`}
            >
              <img
                className={s.image}
                src={product.image}
                alt={product.title}
              />
              <div className={`d-flex flex-column gap-4`}>
                <h3>{product.title}</h3>
                <p
                  style={{
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {product.category}
                </p>
                <p>{product.description}</p>

                <h3>{product.price} $</h3>

                <div className={s.quantity}>
                  {cartItems.map((item) => {
                    if (item.product.id === product.id) {
                      return (
                        <div className="d-flex gap-4" key={item.product.id}>
                          <div className={s.quantity__btns}>
                            <button
                              className={s.quantity__btn}
                              onClick={() =>
                                handleDecrementQuantity(item.product.id)
                              }
                            >
                              -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                              className={s.quantity__btn}
                              onClick={() =>
                                handleIncrementQuantity(item.product.id)
                              }
                            >
                              +
                            </button>
                          </div>
                          <button
                            className={s.delete}
                            onClick={() =>
                              handleRemoveFromCart(item.product.id)
                            }
                          >
                            <Image src={trash} alt="Trash" />
                          </button>
                        </div>
                      );
                    }
                  })}
                </div>

                <ButtonUi onClick={handleAddToCart}>Buy</ButtonUi>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="mt-5 mb-5">
          <Col xs={12}>
            <h3>Related Products</h3>
          </Col>
        </Row>
        <Row className="mb-5">
          <Col
            xs={12}
            className="d-flex justify-content-start justify-content-center align-items-center flex-wrap gap-3"
          >
            {relatedProducts.map((relatedProduct) => (
              <SingleProduct
                key={relatedProduct.id}
                product={relatedProduct}
              />
            ))}
          </Col>
        </Row>
      </Container>

      {showPopup && <Popup onClose={() => setShowPopup(false)} />}
    </div>
  );
};

export default SingleProductPage;
