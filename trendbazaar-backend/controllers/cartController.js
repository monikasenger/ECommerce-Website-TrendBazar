import cartModel from "../models/cartModel.js";
import itemModel from "../models/itemModel.js";

/**
 * @desc   Get logged-in user's cart
 * @route  GET /api/cart
 * @access Private
 */
export const getCart = async (req, res) => {
  try {
    let cart = await cartModel.findOne({ user: req.userId })
      .populate("items.item");

    if (!cart) {
      cart = await cartModel.create({ user: req.userId, items: [] });
    }

    res.status(200).json({ success: true, cart });
  } catch (err) {
    console.error("Error in getCart:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * @desc   Add item to cart (or increase quantity if already exists)
 * @route  POST /api/cart
 * @access Private
 */
export const addToCart = async (req, res) => {
  const { itemId, quantity } = req.body;

  try {
    // Item check
    const itemExists = await itemModel.findById(itemId);
    if (!itemExists) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    let cart = await cartModel.findOne({ user: req.userId });

    if (!cart) {
      cart = await cartModel.create({ user: req.userId, items: [] });
    }

    const index = cart.items.findIndex(
      (i) => i.item.toString() === itemId.toString()
    );

    if (index !== -1) {
      // update quantity
      cart.items[index].quantity += quantity || 1;
    } else {
      // new item
      cart.items.push({ item: itemId, quantity: quantity || 1 });
    }

    await cart.save();
    await cart.populate("items.item");

    res.status(200).json({ success: true, cart });
  } catch (err) {
    console.error("Error in addToCart:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * @desc   Update quantity of a cart item
 * @route  PUT /api/cart/:itemId
 * @access Private
 */
export const updateCartItem = async (req, res) => {
  const { itemId } = req.params;
  const { quantity } = req.body;

  try {
    let cart = await cartModel.findOne({ user: req.userId });
    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    const index = cart.items.findIndex(
      (i) => i.item.toString() === itemId.toString()
    );

    if (index === -1) {
      return res.status(404).json({ success: false, message: "Item not in cart" });
    }

    if (quantity <= 0) {
      cart.items.splice(index, 1); // remove if quantity zero/negative
    } else {
      cart.items[index].quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.item");

    res.status(200).json({ success: true, cart });
  } catch (err) {
    console.error("Error in updateCartItem:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

/**
 * @desc   Remove item from cart
 * @route  DELETE /api/cart/:itemId
 * @access Private
 */
export const removeFromCart = async (req, res) => {
  const { itemId } = req.params;

  try {
    let cart = await cartModel.findOne({ user: req.userId });

    if (!cart) {
      return res.status(404).json({ success: false, message: "Cart not found" });
    }

    cart.items = cart.items.filter(
      (i) => i.item.toString() !== itemId.toString()
    );

    await cart.save();
    await cart.populate("items.item");

    res.status(200).json({ success: true, cart });
  } catch (err) {
    console.error("Error in removeFromCart:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
