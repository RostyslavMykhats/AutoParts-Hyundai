import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useRouter } from "next/router";
import s from "./market.module.scss";
import SingleProduct from "@/components/singleProduct";
import CategoryList from "@/components/categoryList";
import { getData } from "@/utils/Fetch";

const Market = () => {
  const router = useRouter();
  const { query } = router;
  const selectedCategory = query.category || "All";

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  useEffect(() => {
    setLoading(true);

    getData("https://fakestoreapi.com/products", "").then((data) => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    setLoading(true);

    getData("https://fakestoreapi.com/products/categories", "").then(
      (data) => {
        setCategories(data);
        setLoading(false);
      }
    );
  }, []);

  useEffect(() => {
    setFilteredProducts(
      selectedCategory === "All"
        ? products
        : products.filter((product) => product.category === selectedCategory)
    );
  }, [selectedCategory, products]);

  const handleCategoryClick = (category) => {
    router.push({
      pathname: "/market/",
      query: { category },
    });
  };

  return (
    <div style={{
      minHeight:'75vh'
    }}>
      <Container className="mt-5 mb-5">
        <Row>
          <Col xs={12}>
            <div className={s.banner}></div>
          </Col>
        </Row>
        <Row>
          <Col xs={12} lg={2} className="mb-5">
            <CategoryList
              categories={categories}
              selectedCategory={selectedCategory}
              handleCategoryClick={handleCategoryClick}
            />
          </Col>
          <Col
            xs={12}
            lg={10}
            className={`d-flex align-items-center justify-content-center flex-wrap gap-3 ${s.products}`}
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
    </div>
  );
};

export default Market;
