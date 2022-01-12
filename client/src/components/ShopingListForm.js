import { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";

import ShoppingList from "./ShoppingList";
import { addItem } from "../redux/shoppingListSlice";

const ShopingListForm = () => {
  const { list } = useSelector((state) => state.shoppingList);
  const dispatch = useDispatch();

  const listRef = useRef();

  function handleOnSubmit(e) {
    e.preventDefault();
    const name = listRef.current.value;

    // early return if empty name field
    if (name === "") return;

    // dispatch the action
    dispatch(addItem(name));

    // clean input
    listRef.current.value = "";
    listRef.current.focus();
  }

  return (
    <div className="w-1/2 my-5 mx-auto">
      <form className="flex justify-center" onSubmit={handleOnSubmit}>
        <input
          type="text"
          className="bg-gray-200 p-2 focus:outline-none focus:shadow-inner"
          ref={listRef}
        />
        <button
          type="submit"
          className="py-2 px-4 bg-indigo-900 rounded text-white font-bold"
        >
          Add
        </button>
      </form>

      <ShoppingList />
    </div>
  );
};

export default ShopingListForm;
