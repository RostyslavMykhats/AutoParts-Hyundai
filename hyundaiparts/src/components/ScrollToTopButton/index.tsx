import React, { useState, useEffect } from "react";
import styles from "./ScrollToTopButton.module.scss";

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Встановлюємо прослуховувач подій для визначення видимості кнопки
    window.addEventListener("scroll", handleScroll);

    // Прибираємо прослуховувач при розмонтуванні компонента
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScroll = () => {
    // Перевіряємо, чи користувач прокрутив сторінку на відстань, яка відповідає показу кнопки
    const isTopVisible = window.pageYOffset > 200;
    setIsVisible(isTopVisible);
  };

  const scrollToTop = () => {
    // Піднімаємо користувача на верх сторінки
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className={`${styles.scrollToTopButton} ${isVisible ? styles.visible : ""}`}
      onClick={scrollToTop}
    >
      ↑
    </div>
  );
};

export default ScrollToTopButton;
