import Header from "../components/common/Header";
import CartFooter from "../components/common/CartFooter";
import Wrapper from "../components/Wrapper/Wrapper";
import MyRoutes from "../routes/MyRoutes";
import AuthModal from "../components/Auth/AuthModal";
import Loader from "../components/Loader/Loader";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategoriesAction } from "../store/actions/categoryActions";
import { verifyUserAction } from "../store/actions/AuthActions";
import "./App.css";

const App = () => {
  const { showAuthModal, isloggedIn } = useSelector((state) => state.authSlice);
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  // dispatching the action to get all the main categories & verify user
  useEffect(() => {
    dispatch(getCategoriesAction());
    const token = localStorage.getItem("token");

    if (token) {
      dispatch(verifyUserAction(token, setLoader));
    } else {
      setLoader(false);
    }
  }, []);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <>
          {showAuthModal && <AuthModal />}
          <Header />
          <Wrapper>
            <MyRoutes />
          </Wrapper>
          <CartFooter />
        </>
      )}
    </>
  );
};

export default App;
