const express = require('express');
const router = express.Router();
const stylistController = require('../controllers/stylistController');
const multer = require('multer');
const path = require('path');
const fs = require('fs');


// throw new Error("💥 Test Error: stylist route loaded!");

// Multer config for stylist images
const uploadDir = path.join(__dirname, '..', 'uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({
  storage: storage,
  fileFilter: function (req, file, cb) {
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  },
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB
  }
});

router.get('/', stylistController.getAllStylists);
router.get('/:id', stylistController.getStylistById);
router.post('/', upload.single('image'), async (req, res) => {
  try {
    let stylistData = req.body;
    if (req.file) {
      stylistData.image = `/uploads/${req.file.filename}`;
    }
    const stylist = new stylistController.Stylist(stylistData);
    await stylist.save();
    res.status(201).json(stylist);
  } catch (err) {
    res.status(400).json({ message: 'خطا در افزودن آرایشگر', error: err.message });
  }
});
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    let updateData = req.body;
    if (req.file) {
      updateData.image = `/uploads/${req.file.filename}`;
    }
    const stylist = await stylistController.Stylist.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!stylist) return res.status(404).json({ message: 'آرایشگر پیدا نشد' });
    res.json(stylist);
  } catch (err) {
    res.status(400).json({ message: 'خطا در ویرایش آرایشگر', error: err.message });
  }
});
router.delete('/:id', stylistController.deleteStylist);

module.exports = router;