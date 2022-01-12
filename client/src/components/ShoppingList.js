import { useSelector, useDispatch } from "react-redux";
import { removeItem } from "../redux/shoppingListSlice";

const ShoppingList = () => {
  const { list } = useSelector((state) => state.shoppingList);
  const dispatch = useDispatch();

  return (
    <ul className="w-3/4 mx-auto mt-5">
      {list.map((item) => (
        <li
          key={item._id}
          className="flex justify-between bg-gray-100 text-neutral-900 my-2 pl-5 py-3"
        >
          <span>{item.name}</span>
          <span
            className="bg-red-600 px-2 mr-5 cursor-pointer"
            onClick={() => dispatch(removeItem({ id: item._id }))}
          >
            x
          </span>
        </li>
      ))}
    </ul>
  );
};

export default ShoppingList;
