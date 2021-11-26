const express = require('express');
const router = express.Router();

const Ticket = require('../../models/Ticket');

// @route  GET api/ticket/:projectId
// @desc   Get Tickets by Project ID
// @access Private
router.get('/:projectId', async (req, res) => {
  // auth => Add auth, to make sure only logged in users can add boards
  try {
    const { projectId } = req.params;
    const tickets = await Ticket.findOne({ projectId }).populate('assignee', '-password -date -__v');;
    return res.status(200).json({ tickets, msg: 'Tickets found!' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/ticket
// @desc   Create a new ticket
// @access Private
router.post('/', async (req, res) => {
  // auth => Add auth, to make sure only logged in users can add boards
  try {
    const { newTicket } = req.body
    const ticketNumber = await Ticket.find({ projectId: newTicket.projectId , boardId: newTicket.boardId })
    const createdNewTicket = await Ticket.create({...newTicket, ticketNumber: ticketNumber.length + 1 }).then(t => t.populate('assignee', '-password -date -__v').execPopulate())
    return res.status(201).json({ newTicket: createdNewTicket, msg: 'Ticket created!' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/ticket
// @desc   Update ticket by ID
// @access Private
router.put('/', async (req, res) => {
  // auth => Add auth, to make sure only logged in users can add boards
  try {
    const { ticket } = req.body;
    const updatedTicket = await Ticket.findOneAndUpdate(
      { _id: ticket._id },
      { ...ticket },
      { new: true }).populate('assignee', '-password -date -__v');
    return res.status(201).json({ updatedTicket, msg: 'Ticket updated!' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});


module.exports = router;
