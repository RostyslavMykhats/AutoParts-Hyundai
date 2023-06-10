import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[]; // Масив товарів в кошику з кількістю
}

export const getInitialItems = (): CartItem[] => {
  let initialItems: CartItem[] = [];

  if (typeof window !== "undefined" && window.localStorage) {
    try {
      const cartItems = window.localStorage.getItem("cartItems");
      if (cartItems) {
        initialItems = JSON.parse(cartItems);
      }
    } catch (error) {
      console.log("Error retrieving cart items from localStorage:", error);
    }
  }

  return initialItems;
};

const initialState: CartState = {
  items: getInitialItems(), // Початковий стан кошика зі збереженими товарами
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.product.id === product.id);
    
      if (existingItem) {
        // Якщо товар вже присутній в кошику, збільшуємо його кількість на 1
        existingItem.quantity += 1;
      } else {
        // Якщо товар не знайдено, додаємо його до кошика з кількістю 1
        state.items.push({ product, quantity: 1 });
      }
      
      saveCartItemsToLocalStorage(state.items);
    },
    
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const itemIndex = state.items.findIndex((item) => item.product.id === productId);
      if (itemIndex !== -1) {
        state.items.splice(itemIndex, 1);
      }
      saveCartItemsToLocalStorage(state.items);
    },
    updateCartItemQuantity: (
      state,
      action: PayloadAction<{ productId: number; quantity: number }>
    ) => {
      const { productId, quantity } = action.payload;
      const item = state.items.find((item) => item.product.id === productId);
      if (item) {
        item.quantity = quantity;
      }
      saveCartItemsToLocalStorage(state.items);
    },
  },
});

const saveCartItemsToLocalStorage = (items: CartItem[]) => {
  try {
    window.localStorage.setItem("cartItems", JSON.stringify(items));
  } catch (error) {
    console.log("Помилка при збереженні товарів кошика в localStorage:", error);
  }
};

export const { addToCart, removeFromCart , updateCartItemQuantity} = cartSlice.actions; // Експорт створених дій для взаємодії зі станом кошика

export default cartSlice.reducer; // Експорт редюсера для використання в Redux store
