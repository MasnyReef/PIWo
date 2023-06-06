import {createContext, useReducer} from 'react';

export const initialCartState = {
    cartItems: [],
  };
  
  export const cartReducer = (state, action) => {
    switch (action.type) {
      case 'ADD_TO_CART':
        return {
          ...state,
          cartItems: [...state.cartItems, action.payload],
        };
      case 'REMOVE_FROM_CART':
        return {
          ...state,
          cartItems: state.cartItems.filter(
            (item) => item.id !== action.payload.id
          ),
        };
      default:
        return state;
    }
  };
  
  export const CartContext = createContext();
  
  export const CartProvider = ({ children }) => {
    const [cartState, dispatch] = useReducer(cartReducer, initialCartState);
  
    return (
      <CartContext.Provider value={{ cartState, dispatch }}>
        {children}
      </CartContext.Provider>
    );
  };
  