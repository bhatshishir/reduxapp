import classes from "./CartItem.module.css";
import { useDispatch } from "react-redux";
import { cartActions } from "../store/cartSlice";
const CartItem = (props) => {
  // debugger;
  // console.log(props);
  const dispatch = useDispatch();
  const { title, quantity, total, price, id } = props.itemInCart;
  // console.log(title);
  const handleInc = () => {
    dispatch(
      cartActions.addItemTocart({
        id,
        title,
        price
      })
    );
  };
  const handleDec = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  return (
    <li className={classes.item}>
      <header>
        <h3>{title}</h3>
        <div className={classes.price}>
          ${total.toFixed(2)}{" "}
          <span className={classes.itemprice}>(${price.toFixed(2)}/item)</span>
        </div>
      </header>
      <div className={classes.details}>
        <div className={classes.quantity}>
          x <span>{quantity}</span>
        </div>
        <div className={classes.actions}>
          <button onClick={handleDec}>-</button>
          <button onClick={handleInc}>+</button>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
