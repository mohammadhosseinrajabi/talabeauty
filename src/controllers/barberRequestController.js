const BarberRequest = require('../models/BarberRequest');
const BarberCategory = require('../models/BarberCategory');

// Create new barber request
exports.createRequest = async (req, res) => {
    try {
        const {
            category,
            serviceType,
            address,
            preferredDate,
            preferredTime,
            description
        } = req.body;

        // Check if category exists
        const categoryExists = await BarberCategory.findById(category);
        if (!categoryExists) {
            return res.status(404).json({ message: 'دسته‌بندی یافت نشد' });
        }

        const request = new BarberRequest({
            customer: req.customerId,
            category,
            serviceType,
            address,
            preferredDate,
            preferredTime,
            description
        });

        await request.save();

        res.status(201).json({
            message: 'درخواست با موفقیت ثبت شد',
            request
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get customer's requests
exports.getCustomerRequests = async (req, res) => {
    try {
        const requests = await BarberRequest.find({ customer: req.customerId })
            .populate('category', 'name')
            .populate('assignedBarber', 'name')
            .sort({ createdAt: -1 });

        res.json(requests);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get single request
exports.getRequest = async (req, res) => {
    try {
        const request = await BarberRequest.findById(req.params.id)
            .populate('category', 'name')
            .populate('assignedBarber', 'name');

        if (!request) {
            return res.status(404).json({ message: 'درخواست یافت نشد' });
        }

        // Check if request belongs to the customer
        if (request.customer.toString() !== req.customerId) {
            return res.status(403).json({ message: 'دسترسی غیرمجاز' });
        }

        res.json(request);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Cancel request
exports.cancelRequest = async (req, res) => {
    try {
        const request = await BarberRequest.findById(req.params.id);

        if (!request) {
            return res.status(404).json({ message: 'درخواست یافت نشد' });
        }

        // Check if request belongs to the customer
        if (request.customer.toString() !== req.customerId) {
            return res.status(403).json({ message: 'دسترسی غیرمجاز' });
        }

        // Check if request can be cancelled
        if (request.status !== 'pending') {
            return res.status(400).json({ message: 'این درخواست قابل لغو نیست' });
        }

        request.status = 'cancelled';
        await request.save();

        res.json({
            message: 'درخواست با موفقیت لغو شد',
            request
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}; 