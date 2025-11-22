import express from "express";
import Manual from "../models/Manual.js";

const router = express.Router();

const months = [
  'January', 'February', 'March', 'April', 'May', 'June', 
  'July', 'August', 'September', 'October', 'November', 'December'
];


// =========================
// GET RECOMMENDED MANUALS
// =========================
router.get('/recommended', async (req, res) => {
  try {
    const currentDate = new Date();
    const currentMonthIndex = currentDate.getMonth(); // 0-11
    const currentMonth = months[currentMonthIndex];
    const nextMonthIndex = (currentMonthIndex + 1) % 12;
    const nextMonth = months[nextMonthIndex];

    // Get up to 4 manuals from current month
    const primaryManuals = await Manual.find({ month: currentMonth })
      .sort({ order: 1 })
      .limit(4);

    // Get 1 manual from next month as a preview
    const secondaryManuals = await Manual.find({ month: nextMonth })
      .sort({ order: 1 })
      .limit(1);

    // Combine: up to 3 from current month + 1 from next month
    const recommended = [
      ...primaryManuals.slice(0, 3),
      ...(secondaryManuals.length > 0 ? secondaryManuals : primaryManuals.slice(3, 4))
    ];

    res.json({
      success: true,
      data: recommended,
      currentMonth,
      nextMonth,
      currentDate: currentDate.toISOString()
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// =========================
// GET MANUALS BY MONTH
// =========================
router.get('/month/:month', async (req, res) => {
  try {
    const formattedMonth = req.params.month.charAt(0).toUpperCase() + req.params.month.slice(1).toLowerCase();

    if (!months.includes(formattedMonth)) {
      return res.status(400).json({ success: false, message: 'Invalid month' });
    }

    const manuals = await Manual.find({ month: formattedMonth }).sort({ order: 1 });

    res.json({
      success: true,
      month: formattedMonth,
      count: manuals.length,
      data: manuals
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// =========================
// GET ALL MANUALS GROUPED BY MONTH
// =========================
router.get('/all', async (req, res) => {
  try {
    const allManuals = await Manual.find().sort({ month: 1, order: 1 });

    const grouped = {};
    months.forEach(m => grouped[m] = allManuals.filter(x => x.month === m));

    res.json({
      success: true,
      data: grouped,
      totalManuals: allManuals.length
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// =========================
// CREATE MANUAL
// =========================
router.post('/create', async (req, res) => {
  try {
    const {
      id,
      title,
      theme,
      week,
      date,
      memoryVerse,
      text,
      introduction,
      mainPoints,
      classDiscussion,
      conclusion,
      imageUrl,
      subTopics,
      coverBannerImg,
      month,
      order
    } = req.body;

    if (!title || !month || !order) {
      return res.status(400).json({ success: false, message: "Title, month, and order are required" });
    }

    if (!months.includes(month)) {
      return res.status(400).json({ success: false, message: "Invalid month" });
    }

    const manual = new Manual({
      id: id || `${month.toLowerCase()}_${order}_${Date.now()}`,
      title,
      theme,
      week,
      date,
      memoryVerse,
      text,
      introduction,
      mainPoints: mainPoints || [],
      classDiscussion,
      conclusion,
      imageUrl,
      subTopics: subTopics || [],
      coverBannerImg,
      month,
      order
    });

    const saved = await manual.save();

    res.status(201).json({
      success: true,
      message: "Manual created successfully",
      data: saved
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// =========================
// UPDATE MANUAL (using _id)
// =========================
router.put('/update/:id', async (req, res) => {
  try {
    const updates = {
      ...req.body,
      updatedAt: new Date()
    };

    if (updates.month && !months.includes(updates.month)) {
      return res.status(400).json({ success: false, message: 'Invalid month' });
    }

    const updated = await Manual.findByIdAndUpdate(req.params.id, updates, { new: true });

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Manual not found' });
    }

    res.json({
      success: true,
      message: "Manual updated successfully",
      data: updated
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// =========================
// DELETE MANUAL (using _id)
// =========================
router.delete('/delete/:id', async (req, res) => {
  try {
    const deleted = await Manual.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Manual not found' });
    }

    res.json({
      success: true,
      message: "Manual deleted successfully",
      data: deleted
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// =========================
// GET MANUALS BY MONTH (for editing UI)
// =========================
router.get('/edit/month/:month', async (req, res) => {
  try {
    const formattedMonth = req.params.month.charAt(0).toUpperCase() + req.params.month.slice(1).toLowerCase();

    if (!months.includes(formattedMonth)) {
      return res.status(400).json({ success: false, message: 'Invalid month' });
    }

    const manuals = await Manual.find({ month: formattedMonth }).sort({ order: 1 });

    res.json({
      success: true,
      month: formattedMonth,
      data: manuals
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// =========================
// GET SINGLE MANUAL BY _id (no route conflict anymore)
// =========================
router.get('/edit/manual/:id', async (req, res) => {
  try {
    const manual = await Manual.findById(req.params.id);

    if (!manual) {
      return res.status(404).json({ success: false, message: 'Manual not found' });
    }

    res.json({
      success: true,
      data: manual
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


// =========================
// CLEAR ALL MANUALS
// =========================
router.delete('/clear/all', async (req, res) => {
  try {
    const result = await Manual.deleteMany({});

    res.json({
      success: true,
      message: `Deleted ${result.deletedCount} manuals`
    });

  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});


export default router;
