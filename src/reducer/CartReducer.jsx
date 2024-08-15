export default function CartReducer(state,action){
        switch(action.type){
            case "ADD_TO_CART":
                return{
                    ...state,
                    cart:[...state.cart,action.payload]
                }

            case "REMOVE_FROM_CART":
                return{
                    ...state,
                    cart: action.payload
                }

            case "INCREASE_QTY":
                return{
                    ...state,
                    cart: state?.cart.map((item)=>{
                       
                        if(item.id === action.payload.id){
                            return { ...item,quantity: item.quantity + 1}
                        }else{
                            return item
                        }
                    })
                }

            case "DECREASE_QTY":
                return{
                    ...state,
                    cart: state?.cart.map((item)=>{
                        if(item.id === action.payload.id){
                            return { ...item,quantity: item.quantity - 1}
                        }else{
                            return item
                        }
                      
                    })
                }

            case "EMPTY_CART":
                return{
                    ...state,
                    cart:[]
                }
            
            default:
                return state
        }
}