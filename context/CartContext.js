import React, { createContext, useContext, useReducer } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext();

// export const CartProvider = (props) => {}

const initialState = {
  cart: {},
  totalPrice: 0,
};

export const useCartContext = () => {
  const [state, dispatch] = useContext(CartContext);

  if (!state || !dispatch) {
    throw new Error('useCartContext must be used within a Provider');
  }

  return { state, dispatch };
};

const Reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TO_CART':
      if (state.cart[action.item.product.id]?.product.id !== action.item.product.id) {
        toast.success(`Produk Berhasil Dimasukan Ke Keranjang`);
      } else {
        toast.success(`Produk Sudah Ada Di Keranjang`);
      }

      return {
        ...state,
        cart: state.cart
          ? {
              ...state.cart,
              [action.item.product.id]: action.item,
            }
          : { [action.item.product.id]: action.item },
      };

    case 'REMOVE_FROM_CART':
      toast.success(`Produk Berhasil Dihapus Dari Keranjang`);

      return {
        ...state,
        cart: Object.keys(state.cart)
          .filter((key) => +key !== +action.id)
          .reduce((acc, key) => {
            const item = state.cart[key];
            // console.log(item);
            acc[item.product.id] = item;
            // console.info(acc[item.product.id]);
            return acc;
          }, {}),
      };

    case 'RESET_CART':
      return {
        ...state,
        cart: initialState.cart,
        totalPrice: initialState.totalPrice,
      };

    default: {
      throw new Error(`Unhandled action type ${action.type}`);
    }
  }
};

export default function Provider(props) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  console.info(state);
  return <CartContext.Provider value={[state, dispatch]} {...props} />;
}
