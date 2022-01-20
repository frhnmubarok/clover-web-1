import callAPI from '@/config/api';
import React, { createContext, useContext, useReducer } from 'react';
import toast from 'react-hot-toast';

export const CartContext = createContext();

// export const CartProvider = (props) => {}

const initialState = {
  cart: [],
  buff: false,
  get: true,
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
    case 'GET_CARTS':
      return {
        ...state,
        cart: action.payload,
      };

    default:
      console.log('Awokwokwkwok');
  }
};

export default function CartProvider(props) {
  const [state, dispatch] = useReducer(Reducer, initialState);
  return <CartContext.Provider value={[state, dispatch]} {...props} />;
}