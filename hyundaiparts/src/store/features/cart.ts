import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
}

export interface CartState {
  items: Product[];
}

const getInitialItems = (): Product[] => {
  try {
    const cartItems = localStorage.getItem("cartItems");
    if (cartItems) {
      return JSON.parse(cartItems);
    }
  } catch (error) {
    console.log("Error retrieving cart items from localStorage:", error);
  }
  return [];
};

const initialState: CartState = {
  items: getInitialItems(),
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);
      if (existingItem) {
        existingItem.quantity += 1;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }
      try {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      } catch (error) {
        console.log("Error saving cart items to localStorage:", error);
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      try {
        localStorage.setItem("cartItems", JSON.stringify(state.items));
      } catch (error) {
        console.log("Error saving cart items to localStorage:", error);
      }
    },
  },
});

export const { addToCart, removeFromCart } = cartSlice.actions;

export default cartSlice.reducer;
