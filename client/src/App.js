import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchList } from "./redux/shoppingListSlice";
import Navbar from "./components/Navbar";
import ShopingListForm from "./components/ShopingListForm";

const App = () => {
  const { loading } = useSelector((state) => state.shoppingList);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchList());
  }, []);

  return (
    <>
      <Navbar />
      {loading ? <p>Loading</p> : <ShopingListForm />}
    </>
  );
};

export default App;
