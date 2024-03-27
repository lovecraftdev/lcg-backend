import { Order } from "../Models/Order-Model.js";

export const createOrder = async (req, res) => {
  try {
    const { customer, product, status } = req.body;

    const newOrder = new Order({
      customer,
      product,
      status,
    });

    await newOrder.save();
    res.status(201).json("Order placed sucessfully");
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};