import Customer from "../Models/CustomersModel.js";

export const getAllCustomer = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
