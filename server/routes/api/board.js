const express = require('express');
const router = express.Router();

const Board = require('../../models/Board');

const utils = require( '../../utils/index');


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

module.exports = router;
