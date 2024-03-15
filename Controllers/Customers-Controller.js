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

export const addCustomer = async (req, res) => {
  try {
    const { first_name, last_name, email, phone, addresses } = req.body;

    if (
      (!first_name,
      !last_name,
      !email,
      !phone,
      !addresses.first_name,
      !addresses.last_name,
      !addresses.address1,
      !addresses.city,
      !addresses.province,
      !addresses.phone)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill out the details." });
    }

    // Check if the customer with the same email already exists
    const existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ message: "Customer with this Email already exists" });
    }
    // Create a new customer
    const newCustomer = new Customer({
      first_name,
      last_name,
      email,
      phone,
      addresses,
      default_address: { ...addresses },
    });

    // Save the customer to the database
    await newCustomer.save();

    res.status(201).json("Customer added sucessfully");
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

//Get Customer By Pagination

export const getCustomersByPagination = async (req, res) => {
  const { page, perPage } = req.query;

  try {
    const startIndex = (page - 1) * perPage;

    const paginatedData = await Customer.find({})
      .sort({ created_at: -1 })
      .skip(startIndex)
      .limit(perPage);

    res.json(paginatedData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};
