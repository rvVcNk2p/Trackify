const express = require('express');
const router = express.Router();

const Board = require('../../models/Board');

// @route  GET api/board/:projectId
// @desc   Get Board by Project ID
// @access Private
router.get('/:projectId', async (req, res) => {
  // auth => Add auth, to make sure only logged in users can add boards
  try {
    const { projectId } = req.params;
    const board = await Board.findOne({ projectId }).populate('issues');;
    return res.status(200).json({ board, msg: 'Board found!' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/board
// @desc   Create a new Board
// @access Private
router.post('/', async (req, res) => {
  // auth => Add auth, to make sure only logged in users can add boards
  try {
    const { projectId } = req.body;
    const newBoard = await Board.create({ projectId });
    return res.status(201).json({ newBoard, msg: 'Board created!' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  DELETE api/board/:projectId
// @desc   Delete board by projectId
// @access Private
router.delete('/:projectId', async (req, res) => {
  // auth => Add auth, to make sure only logged in users can add boards
  try {
    const { projectId } = req.params;
    const board = await Board.deleteOne({ projectId });
    if(board.deletedCount === 1) {
      return res.status(204).json({ isDeleted: true, msg: 'Board has been deleted!' });
    } else {
      // TODO - Add error handling
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/board/issue
// @desc   Add issueId to Board
// @access Private
router.post('/issue', async (req, res) => {
  // auth => Add auth, to make sure only logged in users can add boards
  // TODO - Backlog
  try {
    const { newTicket } = req.body;
    const updatedBoard = await Board.findOneAndUpdate({ projectId: newTicket.projectId }, { $push: { issues: newTicket._id } }, { new: true });
    return res.status(201).json({ msg: 'TicketID added to Board!' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/board/column
// @desc   Create a new boardColumn by projectId
// @access Private
router.post('/column', async (req, res) => {
  // auth => Add auth, to make sure only logged in users can add boards
  try {
    const { column, projectId, order } = req.body
    // TODO - Add order property
    // TODO - Check if column already exists [unique state per column]
    const updatedBoard = await Board.findOneAndUpdate({ projectId }, { $push: { availableColumns: { ...column, order} } }, { new: true });
    const { availableColumns } = updatedBoard;
    return res.status(201).json({ availableColumns, msg: 'Board column added!' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/board/column
// @desc   Update boardColumn by projectId
// @access Private
router.put('/column', async (req, res) => {
  // auth => Add auth, to make sure only logged in users can add boards
  try {
    const { column, projectId } = req.body
    // TODO - Check if column is exists
    const updatedBoard = await Board.findOneAndUpdate(
      { 'availableColumns.state': column.state, projectId }, 
      { $set: { 'availableColumns.$.name': column.name, 'availableColumns.$.order': column.order } }, 
      { new: true }
    );
    const { availableColumns } = updatedBoard;
    return res.status(201).json({ availableColumns, msg: 'Board column updated!' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
