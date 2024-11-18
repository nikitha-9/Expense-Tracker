const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');

// Home Page
router.get('/', async (req, res) => {
  const expenses = await Expense.find({});
  res.render('index', { expenses });
});

// Add Expense Page
router.get('/add-expense', (req, res) => {
  res.render('addExpense');
});

// Add Expense (POST)
router.post('/add-expense', async (req, res) => {
  const { category, amount, description } = req.body;
  await Expense.create({ category, amount, description });
  res.redirect('/');
});

// Delete Expense
router.post('/delete-expense/:id', async (req, res) => {
  await Expense.findByIdAndDelete(req.params.id);
  res.redirect('/');
});

// Update Expense Page
router.get('/update-expense/:id', async (req, res) => {
  const expense = await Expense.findById(req.params.id);
  res.render('updateExpense', { expense });
});

// Update Expense (POST)
router.post('/update-expense/:id', async (req, res) => {
  const { category, amount, description } = req.body;
  await Expense.findByIdAndUpdate(req.params.id, { category, amount, description });
  res.redirect('/');
});

module.exports = router;
