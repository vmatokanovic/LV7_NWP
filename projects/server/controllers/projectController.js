const Project = require("../models/Project");
const User = require("../models/User");
const mongoose = require("mongoose");

// GET /
// HOMEPAGE

// exports.homepage = async (req, res) => {
//   const locals = {
//     title: "Projects",
//     description: "Projekti LV6 - NWP",
//   };

//   try {
//     const projects = await Project.find({}).limit(22);
//     res.render("index", { locals, projects });
//   } catch (error) {
//     console.log(error);
//   }
// };

exports.homepage = async (req, res) => {
  const locals = {
    title: "Projects",
    description: "Projekti LV6 - NWP",
  };

  try {
    const userId = res.locals.user._id; // Assuming the user ID is stored in the _id field of the User model
    // const projects = await Project.find({ manager: userId }).limit(22);
    const projects = await Project.find({
      $and: [{ manager: userId }, { archived: false }],
    }).limit(22);
    res.render("index", { locals, projects });
  } catch (error) {
    console.log(error);
  }
};

exports.otherProjects = async (req, res) => {
  const locals = {
    title: "Projects",
    description: "Projekti LV6 - NWP",
  };

  try {
    const userEmail = res.locals.user.email; // Assuming the user's email is stored in the email field of the User model
    const projects = await Project.find({
      members: userEmail,
      archived: false,
    }).limit(22);
    res.render("otherProjects", { locals, projects });
  } catch (error) {
    console.log(error);
  }
};

exports.archivedProjects = async (req, res) => {
  const locals = {
    title: "Projects",
    description: "Projekti LV6 - NWP",
  };

  try {
    const userId = res.locals.user._id; // Assuming the user ID is stored in the _id field of the User model
    const userEmail = res.locals.user.email; // Assuming the user's email is stored in the email field of the User model
    const projects = await Project.find({
      $or: [
        { members: userEmail, archived: true },
        { manager: userId, archived: true },
      ],
    }).limit(22);

    res.render("archivedProjects", { locals, projects });
  } catch (error) {
    console.log(error);
  }
};

// GET /
// New project form

exports.addProject = async (req, res) => {
  const locals = {
    title: "Add New Project",
    description: "Projekti LV6 - NWP",
  };

  res.render("project/add", locals);
};

// POST /
// Create new project form

exports.postProject = async (req, res) => {
  console.log(req.body);

  const newProject = new Project({
    name: req.body.name,
    price: req.body.price,
    description: req.body.description,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    jobsDone: req.body.jobsDone,
    manager: res.locals.user._id,
  });

  try {
    await Project.create(newProject);

    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

// GET /
// Project Data

exports.viewProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });

    const locals = {
      title: "View Project Data",
      description: "Projekti LV6 - NWP",
    };

    res.render("project/view", {
      locals,
      project,
    });
  } catch (error) {
    console.log(error);
  }
};

// GET /
// Edit Project Data

exports.editProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Project Data",
      description: "Projekti LV6 - NWP",
    };

    res.render("project/edit", {
      locals,
      project,
    });
  } catch (error) {
    console.log(error);
  }
};

// POST /
// Update Project Data

exports.editPost = async (req, res) => {
  try {
    await Project.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      jobsDone: req.body.jobsDone,
    });

    res.redirect(`/edit/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

// GET /
// Edit Project Data as MEMBER

exports.editMemberProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Project Data",
      description: "Projekti LV6 - NWP",
    };

    res.render("project/editMember", {
      locals,
      project,
    });
  } catch (error) {
    console.log(error);
  }
};

// POST /
// Update Project Data as MEMBER

exports.editMemberPost = async (req, res) => {
  try {
    await Project.findByIdAndUpdate(req.params.id, {
      name: req.body.name,
      description: req.body.description,
      price: req.body.price,
      startDate: req.body.startDate,
      endDate: req.body.endDate,
      jobsDone: req.body.jobsDone,
    });

    res.redirect(`/editMember/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

// DELETE /
// Delete Project

exports.deleteProject = async (req, res) => {
  try {
    await Project.deleteOne({ _id: req.params.id });
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

// GET /
// Edit Project Data

exports.addProjectMember = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });

    const locals = {
      title: "Add Project Member",
      description: "Projekti LV6 - NWP",
    };

    const users = await User.find({}, "email"); // Retrieve all users and only select the 'email' field
    res.render("project/addMember", {
      locals,
      project,
      users,
    });
  } catch (error) {
    console.log(error);
  }
};

// POST /
// Add project member

exports.addProjectMemberPost = async (req, res) => {
  try {
    await Project.findByIdAndUpdate(req.params.id, {
      $push: { members: req.body.members },
    });

    res.redirect(`/view/${req.params.id}`);
  } catch (error) {
    console.log(error);
  }
};

// GET /
// Edit Project Data as MEMBER

exports.archiveProject = async (req, res) => {
  try {
    const project = await Project.findOne({ _id: req.params.id });

    const locals = {
      title: "Edit Project Data",
      description: "Projekti LV6 - NWP",
    };

    res.render("project/archive", {
      locals,
      project,
    });
  } catch (error) {
    console.log(error);
  }
};

// POST /
// Update Project Data as MEMBER

exports.archivePost = async (req, res) => {
  try {
    await Project.findByIdAndUpdate(req.params.id, {
      archived: true,
    });

    res.redirect(`/`);
  } catch (error) {
    console.log(error);
  }
};
