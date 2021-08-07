/* eslint-disable vars-on-top */
const router = require('express').Router();
const { Table, User } = require('../models');
const withAuth = require('../utils/auth');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

router.get('/', async (req, res) => {
  try {
    console.log(req.session);
    var user_id;
    if (req.session && req.session.logged_in) {
      user_id = req.session.user_id
    }
    // Get all projects and JOIN with user data
    const tableData = await Table.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
      where: {
        visibility: true,
        //  [Op.or]: [{ id: user_id }]
       }
    });

    // Serialize data so the template can read it
    const tables = tableData.map((table) => table.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      tables, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});



router.get('/recipe/:id', async (req, res) => {
  try {
    const tableData = await Table.findByPk(req.params.id, {
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
    });

    const table = tableData.get({ plain: true });

    res.render('recipe', {
      ...table,
      logged_in: req.session.logged_in
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Use withAuth middleware to prevent access to route
router.get('/profile', withAuth, async (req, res) => {
  try {
    // Find the logged in user based on the session ID
    const userData = await User.findByPk(req.session.user_id, {
      attributes: { exclude: ['password'] },
      include: [Table],
    });

    const user = userData.get({ plain: true });

    res.render('profile', {
      ...user,
      logged_in: true
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/login', (req, res) => {
  // If the user is already logged in, redirect the request to another route
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

// Still working on getting this to go to the signup page
router.get('/signup', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});


router.get("/filtered/:id", async (req, res) => {
  try {
    // Get all projects and JOIN with user data
    const filterData = await Table.findAll({
      where: {
        category_id: {
          [Op.in]: req.params.id.split(",")
        }
      },
      include: [
        {
          model: User,
          attributes: ["user_name"],
        },
      ],
    });

    // Serialize data so the template can read it
    const filters = filterData.map((filter) => filter.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render("filtered", {
      filters,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});


module.exports = router;
