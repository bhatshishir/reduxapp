import Cart from "./components/Cart/Cart";
import Layout from "./components/Layout/Layout";
import Products from "./components/Shop/Products";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { uiActions } from "./components/store/uiSlice";
import Notification from "./components/UI/Notification";

let isInitial=true;
function App() {
  const showCart = useSelector((state) => state.ui.showCart);
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.ui.notification);

  useEffect(() => {
    const sendCartData = async () => {
      dispatch(
        uiActions.showNotification({
          status: "sending",
          title: "Pending",
          message: "Sending cart data!",
        })
      );
      const response = await fetch(
        "https://redux-2af3c-default-rtdb.firebaseio.com/cart.json",
        { method: "PUT", body: JSON.stringify(cart) }
      );

      if (!response.ok) {
        console.log("inside");
        throw new Error("Sending cart data failed");

      }
      console.log(response.ok);

      const responseData = await response.JSON;
      
    };
    if(isInitial){
      isInitial = false;
      return;
    }
    sendCartData().catch((error) =>{
      console.log(error);
      dispatch(
        uiActions.showNotification({
          status: "error",
          title: "Error!",
          message: "Sending cart data failed!",
        })
      )}
    );
    dispatch(
      uiActions.showNotification({
        status: "success",
        title: "Success!",
        message: "Sent cart data!"  
      })
    );
  }, [cart, dispatch]);

  return (
    <>
      {notification && (
        <Notification
          status={notification.status}
          title={notification.title}
          message={notification.message}
        />
      )}
      <Layout>
        {showCart && <Cart />}
        <Products />
      </Layout>
    </>
  );
}

export default App;
