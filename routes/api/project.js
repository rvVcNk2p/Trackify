const express = require('express');
const router = express.Router();

// const auth = require('../../middleware/auth');
const Project = require('../../models/Project');

const utils = require( '../../utils/index');

//  @route  GET api/project
//  @desc   Get projects
//  @access Public
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find({});
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
    const newProject = await Project.create({ ...utils.removeEmpty(req.body) });
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
    console.log(req.body);
    const updatedProject = await Project.findByIdAndUpdate(
      { _id }, 
      { ...utils.removeEmpty(req.body) }, 
      { new: true }
    );
    return res.status(201).json({ updatedProject, msg: 'Project updated!' });
  } catch (err) {
    console.log(err.message);
    res.status(500).send('Server Error');
  }
});

//  @route  DELETE api/project/:project_id
//  @desc   Remove project by ID
//  @access Private
// router.delete('/:project_id', auth, async (req, res) => {
//   try {
//     const _id = req.params.project_id;
//     res.status(200).json({ msg: 'Project has been deleted!' });
//   } catch (err) {
//     console.log(err.message);
//     if (err.kind === 'ObjectId') {
//       return res.status(404).json({ msg: 'Film not found!' });
//     }
//     res.status(500).send('Server Error');
//   }
// });

module.exports = router;
