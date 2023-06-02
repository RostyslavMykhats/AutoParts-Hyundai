import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface CartState {
  items: Product[]; // Масив товарів в кошику
}

const getInitialItems = (): Product[] => {
  try {
    const cartItems = localStorage.getItem("cartItems"); // Отримання збережених товарів з localStorage
    if (cartItems) {
      return JSON.parse(cartItems); // Парсинг рядка JSON у масив об'єктів товарів
    }
  } catch (error) {
    console.log("Error retrieving cart items from localStorage:", error);
  }
  return []; // Повернення пустого масиву, якщо сталася помилка або немає збережених товарів
};

const initialState: CartState = {
  items: getInitialItems(), // Початковий стан кошика зі збереженими товарами
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload; // Отримання товару, що додається до кошика
      const existingItem = state.items.find((item) => item.id === product.id); // Пошук існуючого товару в кошику
      if (existingItem) {
        existingItem.quantity += 1; // Збільшення кількості товару, якщо він вже присутній в кошику
      } else {
        state.items.push({ ...product, quantity: 1 }); // Додавання нового товару до кошика з початковою кількістю 1
      }
      try {
        localStorage.setItem("cartItems", JSON.stringify(state.items)); // Збереження змін до localStorage
      } catch (error) {
        console.log("Error saving cart items to localStorage:", error);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload; // Отримання ID товару, який видаляється з кошика
      state.items = state.items.filter((item) => item.id !== productId); // Видалення товару зі списку товарів в кошику
      try {
        localStorage.setItem("cartItems", JSON.stringify(state.items)); // Збереження змін до localStorage
      } catch (error) {
        console.log("Error saving cart items to localStorage:", error);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions; // Експорт створених дій для взаємодії зі станом кошика

export default cartSlice.reducer; // Експорт редюсера для використання в Redux store
