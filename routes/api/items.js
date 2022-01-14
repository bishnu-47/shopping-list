import express from "express";
import Item from "../../models/Item.js";
import { auth } from "../../middleware/auth.js";

const router = express.Router();

// @route   GET /api/items
// @desc   get all items
// @access   private
router.get("/", auth, async (req, res) => {
  try {
    const items = await Item.find().sort({ date: -1 });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ success: false });
    console.log(err);
  }
});

// @route   POST /api/items
// @desc   create an item
// @access   private
router.post("/", auth, async (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });
  try {
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({ success: false });
    console.log(err);
  }
});

// @route   DELETE /api/items/:id
// @desc   delete an item
// @access   private
router.delete("/:id", auth, async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) res.status(404).json({ success: false, msg: "No Item Found!" });

    const queryRes = await Item.deleteOne(item);
    res.status(200).json({ _id: req.params.id });
  } catch (err) {
    res.status(500).json({ success: false });
    console.log(err);
  }
});

export default router;
