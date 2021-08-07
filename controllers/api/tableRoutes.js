const router = require("express").Router();
const { Table } = require("../../models");
const withAuth = require("../../utils/auth");

router.post("/", withAuth, async (req, res) => {
  try {
    const newTable = await Table.create({
      ...req.body,
      user_id: req.session.user_id,
    });

    res.status(200).json(newTable);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id", withAuth, async (req, res) => {
  try {
    const tableData = await Table.destroy({
      where: {
        id: req.params.id,
        user_id: req.session.user_id,
      },
    });

    if (!tableData) {
      res.status(404).json({ message: "No project found with this id!" });
      return;
    }

    res.status(200).json(tableData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
