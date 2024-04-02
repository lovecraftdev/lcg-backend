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
      !phone,
      !addresses.first_name,
      !addresses.address1,
      !addresses.city,
      !addresses.province,
      !addresses.phone)
    ) {
      return res
        .status(400)
        .json({ success: false, message: "Please fill out the details." });
    }

    const existingCustomer = await Customer.findOne({ phone });
    if (existingCustomer) {
      return res.status(400).json({
        success: false,
        message: "Customer with this Phone Number already exists",
      });
    }

    const newCustomer = new Customer({
      first_name,
      last_name,
      email,
      phone,
      addresses,
      default_address: { ...addresses },
    });

    const customer = await newCustomer.save();

    res
      .status(201)
      .json({ success: true, message: "Customer added sucessfully", customer });
  } catch (error) {
    console.error("Error creating customer:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
//Update contact info
export const updateCustomerContact = async (req, res) => {
  const { customerId } = req.params;
  const { email, phone } = req.body;

  try {
    const updatedCustomer = await Customer.findByIdAndUpdate(
      customerId,
      { email, phone },
      { new: true }
    );

    if (!updatedCustomer) {
      console.log("Customer not found");
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Customer Updated Successfully",
      updatedCustomer,
    });
  } catch (error) {
    console.error("Error updating customer:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
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

    res.status(200).json(paginatedData);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
};

// ---------------Delete customer--------------------

export const deleteCustomers = async (req, res) => {
  try {
    const { ids } = req.body; // Extract the ids directly from the request body

    // Delete customers by their IDs
    const deletedCustomers = await Customer.deleteMany({ _id: { $in: ids } });

    if (deletedCustomers.deletedCount === 0) {
      return res.status(404).json({ message: "Customers not found" });
    }

    res.status(200).json({ message: "Customers deleted successfully" });
  } catch (error) {
    console.error("Error deleting customers:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// ---------------------Search API---------------

export const searchCustomers = async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter" });
  }

  try {
    const searchRegex = new RegExp(query, "i");
    const searchResults = await Customer.find({
      $or: [
        { name: { $regex: searchRegex } },
        { email: { $regex: searchRegex } },
      ],
    });

    res.json(searchResults);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
};

//Get Customer
export const getCustomer = async (req, res) => {
  try {
    const { customerID } = req.params;

    const customer = await Customer.findById(customerID);

    res.status(200).json({
      success: true,
      customer,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};
