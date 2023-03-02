const Customer = require('../models/Customer');

exports.createCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);

    res.status(201).json({
      status: 'success',
      customer,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.getAllCustomers = async (req, res) => {
  try {

    const customers = await Customer.find();

    res.status(200).json({
      status: 'success',
      customers,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.getOneCustomer = async (req, res) => {
  try {

    const customer = await Customer.findById(req.params.id)

    res.status(200).json({
      status: 'success',
      customer,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.deleteOneCustomer = async (req, res) => {
  try {

    const customer = await Customer.findByIdAndRemove(req.params.id)

    res.status(200).json({
      status: 'success',
      customer,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};
