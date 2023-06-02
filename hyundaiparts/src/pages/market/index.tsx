import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useRouter } from "next/router"; // Підключення useRouter з Next.js для отримання доступу до роутера
import s from "./market.module.scss";
import SingleProduct from "@/components/singleProduct";
import { getData } from "@/utils/Fetch";

const Market = () => {
  const router = useRouter(); // Ініціалізація useRouter для доступу до роутера
  const { query } = router; // Отримання значення параметрів запиту з роутера
  const selectedCategory = query.category || "All"; // Отримання вибраної категорії з параметрів запиту, або "All" якщо вона не задана

  const [products, setProducts] = useState([]); // Стейт для збереження списку продуктів
  const [categories, setCategories] = useState([]); // Стейт для збереження списку категорій
  const [loading, setLoading] = useState(true); // Стейт для показу індикатора завантаження
  const [filteredProducts, setFilteredProducts] = useState([]); // Стейт для збереження фільтрованих продуктів

  // Завантаження списку продуктів з API
  useEffect(() => {
    setLoading(true); // Встановлення значення loading на true під час завантаження

    getData("https://fakestoreapi.com/products", "").then((data) => {
      setProducts(data); // Збереження отриманих продуктів у стейті
      setLoading(false); // Встановлення значення loading на false після завантаження
    });
  }, []);

  // Завантаження списку категорій з API
  useEffect(() => {
    setLoading(true); // Встановлення значення loading на true під час завантаження

    getData("https://fakestoreapi.com/products/categories", "").then((data) => {
      setCategories(data); // Збереження отриманих категорій у стейті
      setLoading(false); // Встановлення значення loading на false після завантаження
    });
  }, []);

  useEffect(() => {
    // Фільтрація продуктів за вибраною категорією
    setFilteredProducts(
      selectedCategory === "All"
        ? products
        : products.filter((product) => product.category === selectedCategory)
    );
  }, [selectedCategory, products]);

  const handleCategoryClick = (category) => {
    // Обробник кліку на категорію
    router.push({
      pathname: "/market/",
      query: { category }, // Оновлення шляху з вибраною категорією у параметрах запиту
    });
  };

  return (
    <>
      <Container className="mt-5 mb-5">
        <Row>
          <Col xs={12}>
            <div className={s.banner}></div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={4}>
            <ul className={s.categories}>
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
                className={`${s.category} ${
                  selectedCategory === "All" ? s.active : ""
                }`}
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
          </Col>
          <Col
            xs={12}
            lg={8}
            className={`d-flex align-items-center justify-content-start flex-wrap gap-3 ${s.products}`}
          >
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              filteredProducts.map((p) => (
                <SingleProduct key={p.id} product={p} />
              ))
            )}
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Market;
