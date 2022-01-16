import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { fetchList } from "../redux/shoppingListSlice";
import Navbar from "../components/Navbar";
import ShopingListForm from "../components/ShopingListForm";

const Home = () => {
  const { loading } = useSelector((state) => state.shoppingList);
  const { authorized } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!authorized) {
      return navigate("/login");
    }

    dispatch(fetchList());
  }, []);

  return (
    <>
      <Navbar />
      {loading ? <p>Loading</p> : <ShopingListForm />}
    </>
  );
};

export default Home;
