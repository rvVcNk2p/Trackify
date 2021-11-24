const express = require('express');
const { ObjectId } = require('mongodb');
const router = express.Router();

// const auth = require('../../middleware/auth');
const Project = require('../../models/Project');

const utils = require( '../../utils/index');

//  @route  GET api/project
//  @desc   Get projects
//  @access Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({}).populate('members', '-password -date')
    res.json({ projects, msg: 'Projects are here!' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  POST api/project
// @desc   Register a new project
// @access Private
router.post('/', async (req, res) => {
  // auth => Add auth, to make sure only logged in users can add projects
  try {
    const project = {...req.body, members: req.body.members.map(member => ObjectId(member._id))}
    let newProject = await Project.create({ ...utils.removeEmpty(project) })
    newProject = await newProject.populate('members', '-password -date').execPopulate()
    return res.status(201).json({ newProject, msg: 'Project created!' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

// @route  PUT api/project
// @desc   Update project by ID
// @access Private
router.put('/', async (req, res) => {
  // auth => Add auth, to make sure only logged in users can add projects
  try {
    const { _id } = req.body
    const updatedProject = await Project.findByIdAndUpdate(
      { _id }, 
      { ...utils.removeEmpty(req.body) }, 
      { new: true }
      ).populate('members', '-password -date');
      return res.status(201).json({ updatedProject, msg: 'Project updated!' });
    } catch (err) {
      console.log(err.message);
      res.status(500).send('Server Error');
    }
  });
  
  //  @route  DELETE api/project/:id
  //  @desc   Remove project by ID
  //  @access Private
  router.delete('/:_id', async (req, res) => {
  // auth => Add auth, to make sure only logged in users can add projects
  try {
    const _id = req.params._id;
    const project = await Project.deleteOne({ _id });
    if(project.deletedCount === 1) {
      res.status(204).json({ isDeleted: true, msg: 'Project has been deleted!' });
    } else {
      // TODO - Add error handlings
    }
  } catch (err) {
    console.log(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Project not found!' });
    }
    res.status(500).send('Server Error');
  }
});

module.exports = router;
