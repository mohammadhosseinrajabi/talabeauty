// src/context/CartContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import { cartApi } from "./cartApi";


const CartContext = createContext();

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // گرفتن سبد موقع mount شدن
  useEffect(() => {
    loadCart();
  }, []);

  async function loadCart() {
    setLoading(true);
    try {
      const data = await cartApi.getCart();
      setItems(data.items || []);
    } catch (e) {
      setError(e.message || "خطا در گرفتن سبد");
    } finally {
      setLoading(false);
    }
  }

  async function addItem(productId, qty = 1) {
    setLoading(true);
    try {
      const data = await cartApi.add(productId, qty);
      setItems(data.items || []);
    } catch (e) {
      setError(e.message || "خطا در افزودن محصول");
    } finally {
      setLoading(false);
    }
  }

  async function updateQty(productId, qty) {
    setLoading(true);
    try {
      const data = await cartApi.update(productId, qty);
      setItems(data.items || []);
    } catch (e) {
      setError(e.message || "خطا در تغییر تعداد");
    } finally {
      setLoading(false);
    }
  }

  async function removeItem(productId) {
    setLoading(true);
    try {
      const data = await cartApi.remove(productId);
      setItems(data.items || []);
    } catch (e) {
      setError(e.message || "خطا در حذف محصول");
    } finally {
      setLoading(false);
    }
  }

  async function clearCart() {
    setLoading(true);
    try {
      const data = await cartApi.clear();
      setItems(data.items || []);
    } catch (e) {
      setError(e.message || "خطا در خالی کردن سبد");
    } finally {
      setLoading(false);
    }
  }

  const subtotal = items.reduce(
    (sum, i) => sum + i.quantity * (i.price ?? i.product.price ?? 0),
    0
  );
  const totalQty = items.reduce((sum, i) => sum + i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        subtotal,
        totalQty,
        loading,
        error,
        addItem,
        updateQty,
        removeItem,
        clearCart,
        loadCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  return useContext(CartContext);
}
