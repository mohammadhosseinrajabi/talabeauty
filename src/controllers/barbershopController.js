// const Barbershop = require('../models/Barbershop');

// // Get all barbershops
// exports.getAllBarbershops = async (req, res) => {
//   try {
//     const barbershops = await Barbershop.find().populate('categories');
//     res.status(200).json(barbershops);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Get single barbershop
// exports.getBarbershopById = async (req, res) => {
//   try {
//     const barbershop = await Barbershop.findById(req.params.id).populate('categories');
//     if (!barbershop) {
//       return res.status(404).json({ message: 'Barbershop not found' });
//     }
//     res.status(200).json(barbershop);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// // Create barbershop
// exports.createBarbershop = async (req, res) => {
//   try {
//     const barbershop = new Barbershop(req.body);
//     await barbershop.save();
//     res.status(201).json(barbershop);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Update barbershop
// exports.updateBarbershop = async (req, res) => {
//   try {
//     const barbershop = await Barbershop.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );
//     if (!barbershop) {
//       return res.status(404).json({ message: 'Barbershop not found' });
//     }
//     res.status(200).json(barbershop);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

// // Delete barbershop
// exports.deleteBarbershop = async (req, res) => {
//   try {
//     const barbershop = await Barbershop.findByIdAndDelete(req.params.id);
//     if (!barbershop) {
//       return res.status(404).json({ message: 'Barbershop not found' });
//     }
//     res.status(200).json({ message: 'Barbershop deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// }; 