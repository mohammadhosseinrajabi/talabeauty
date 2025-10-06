const Stylist = require('../models/Stylist');

// دریافت همه آرایشگرها
exports.getAllStylists = async (req, res) => {
  try {
    const stylists = await Stylist.find().sort({ appointments: -1 });
    res.json({ stylists });
  } catch (err) {
    res.status(500).json({ message: 'خطا در دریافت آرایشگرها', error: err.message });
  }
};

// دریافت یک آرایشگر خاص
exports.getStylistById = async (req, res) => {
  try {
    const stylist = await Stylist.findById(req.params.id);
    if (!stylist) return res.status(404).json({ message: 'آرایشگر پیدا نشد' });
    res.json(stylist);
  } catch (err) {
    res.status(500).json({ message: 'خطا در دریافت آرایشگر', error: err.message });
  }
};

// افزودن آرایشگر جدید
exports.createStylist = async (req, res) => {
  try {
    const stylist = new Stylist(req.body);
    await stylist.save();
    res.status(201).json(stylist);
  } catch (err) {
    res.status(400).json({ message: 'خطا در افزودن آرایشگر', error: err.message });
  }
};

// ویرایش آرایشگر
exports.updateStylist = async (req, res) => {
  try {
    const stylist = await Stylist.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!stylist) return res.status(404).json({ message: 'آرایشگر پیدا نشد' });
    res.json(stylist);
  } catch (err) {
    res.status(400).json({ message: 'خطا در ویرایش آرایشگر', error: err.message });
  }
};

// حذف آرایشگر
exports.deleteStylist = async (req, res) => {
  try {
    const stylist = await Stylist.findByIdAndDelete(req.params.id);
    if (!stylist) return res.status(404).json({ message: 'آرایشگر پیدا نشد' });
    res.json({ message: 'آرایشگر حذف شد' });
  } catch (err) {
    res.status(500).json({ message: 'خطا در حذف آرایشگر', error: err.message });
  }
};

exports.Stylist = Stylist;