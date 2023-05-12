const express = require("express");
const router = express.Router();
const projectController = require("../controllers/projectController");
const { requireAuth, checkUser } = require("../middleware/authMiddleware");

// Project Routes

// Home
router.get("/", requireAuth, projectController.homepage);
router.get("/otherProjects", requireAuth, projectController.otherProjects);
router.get(
  "/archivedProjects",
  requireAuth,
  projectController.archivedProjects
);
router.get("/add", checkUser, projectController.addProject);
router.post("/add", checkUser, projectController.postProject);

router.get("/view/:id", projectController.viewProject);

router.get("/view/:id", (req, res) => {
  const previousPage = req.headers.referer || "/";
  res.render("current-page", { previousPage: previousPage });
});

router.get("/edit/:id", projectController.editProject);
router.put("/edit/:id", projectController.editPost);
router.get("/editMember/:id", projectController.editMemberProject);
router.put("/editMember/:id", projectController.editMemberPost);
router.delete("/edit/:id", projectController.deleteProject);

router.get("/archive/:id", projectController.archiveProject);
router.put("/archive/:id", projectController.archivePost);

router.get("/addMember/:id", projectController.addProjectMember);
router.put("/addMember/:id", projectController.addProjectMemberPost);

module.exports = router;
