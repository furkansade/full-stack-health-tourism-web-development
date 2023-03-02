const Faq = require('../models/Faq');

exports.createFaq = async (req, res) => {
  try {
    const faq = await Faq.create(req.body);

    res.status(201).redirect('/admin/faqs')
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
    console.log(error)
  }
};

exports.getAllFaqs = async (req, res) => {
  try {
    const faqs = await Faq.find();

    res.status(200).json({
      status: 'success',
      faqs,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.getOneFaq = async (req, res) => {
  try {
    const faq = await Faq.findOne({ slug: req.params.slug });

    res.status(200).json({
      status: 'success',
      faq,
    });
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

exports.deleteOneFaq = async (req, res) => {
  try {
    const faq = await Faq.findOneAndRemove({ _id: req.params.id });

    res.status(200).redirect('/admin/faqs')
  } catch (error) {
    res.status(400).json({
      status: 'error',
      error,
    });
  }
};

