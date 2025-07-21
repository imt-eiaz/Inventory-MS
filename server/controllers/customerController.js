import Customer from "../models/Customer.js";
import Product from "../models/Product.js";

// Route to add a new employee
const addCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;

    // Check if user already exists with the same email
    let existingCustomer = await Customer.findOne({ email });
    if (existingCustomer) {
      return res
        .status(400)
        .json({ success: false, error: "Customer already exists" });
    }

    // Hash the password before storing the user
    // const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newCustomer = new Customer({
      name,
      email,
      phone,
      address,
    });
    const customer = await newCustomere.save();

    res
      .status(201)
      .json({ success: true, message: "Customer created successfully" });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

const getCustomers = async (req, res) => {
  try {
    const customers = await Customer.find();
    res.status(201).json({ success: true, customers });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Server error " + error.message });
  }
};

const updateCustomer = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email, phone, address } = req.body;

    const customer = await Customer.findById({ _id: id });
    if (!customer) {
      res.status(404).json({ success: false, error: "Customer Not Found" });
    }

    const updateUser = await Customer.findByIdAndUpdate(
      { _id: id },
      { name, email, phone, address }
    );

    res.status(201).json({ success: true, updateUser });
  } catch (error) {
    console.error("Error editing employee:", error);
    res
      .status(500)
      .json({ success: false, error: "Server error " + error.message });
  }
};

const deleteCustomer = async (req, res) => {
  try {
    const { id } = req.params;

    const productCount = await Product.countDocuments({ customer: id });
    if (productCount > 0) {
      return res.status(400).json({
        success: false,
        error: "Cannot delete customer with associated products",
      });
    }

    const customer = await Customer.findByIdAndDelete({ _id: id });
    if (!customer) {
      res
        .status(404)
        .json({ success: false, error: "document not found " + error.message });
    }
    res.status(201).json({ success: true, customer });
  } catch (error) {
    console.error("Error editing employee:", error);
    res
      .status(500)
      .json({ success: false, error: "Server error " + error.message });
  }
};

export { addCustomer, getCustomers, updateCustomer, deleteCustomer };
