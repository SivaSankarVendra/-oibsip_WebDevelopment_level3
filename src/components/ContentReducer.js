import React, { createContext, useContext, useReducer } from "react";

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD":
      return [
        ...state,
        {
          _id: action._id,
          name: action.name,
          price: action.price,
          size: action.size,
          quantity: action.quantity,
          img: action.img,
          customizations: action.customizations
        },
      ];
    case "REMOVE":
      let newArr = [...state];
      newArr.splice(action.index, 1);
      return newArr;
    case "UPDATE":
        let arr=[...state]
        arr.find((food,index)=>{
            if(food._id===action._id){
                arr[index]={...food,quantity:parseInt(action.quantity)+food.quantity,price:parseInt(action.price)+food.price}
            }
            return arr
        })
        return arr
    case "DROP":
      let empArr = [];
      return empArr;
    default:
      console.log("Error in Reducer");
  }
};

const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);
  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export default CartProvider;
export const useCart = () => useContext(CartStateContext);
export const useDispatch = () => useContext(CartDispatchContext);
