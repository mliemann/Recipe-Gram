const router = require('express').Router();
const { Table, User, Like } = require('../models');
const withAuth = require('../utils/auth');
var Sequelize = require('sequelize');
var Op = Sequelize.Op;

router.get('/', async (req, res) => {
  try {
    console.log(req.session);
    if (req.session && req.session.logged_in) {
    }
    const tableData = await Table.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
      where: {
        visibility: true,
       }
    });

    const tables = tableData.map((table) => table.get({ plain: true }));

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
    const likeCount = await Like.count({
      where: {
        recipe_id: req.params.id,
      }
    });
    var userCount = 0;
    if(req.session.user_id){
      userCount = await Like.count({
        where: {[Op.and]:[{recipe_id: req.params.id}, {user_id: req.session.user_id}]}
      });
    }
    

    res.render('recipe', {
      ...table,
      logged_in: req.session.logged_in,
      total_likes: likeCount,
      like_action: userCount >= 1 ? "Unlike": "Like",
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/profile', withAuth, async (req, res) => {
  try {
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
  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('login');
});

router.get('/signup', (req, res) => {

  if (req.session.logged_in) {
    res.redirect('/profile');
    return;
  }

  res.render('signup');
});

router.get("/filtered", async (req, res) => {
  try {
    console.log(req.session);
    if (req.session && req.session.logged_in) {
    }
    const tableData = await Table.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
      where: {
        visibility: true,
       }
    });

    const tables = tableData.map((table) => table.get({ plain: true }));

    res.render('homepage', { 
      tables, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/filtered/:id", async (req, res) => {
  try {
    const filterData = await Table.findAll({
      where: {
        visibility: true,
        category_id: {
          [Op.in]: req.params.id.split(",")
        }
      },
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ]
    });

    const filters = filterData.map((filter) => filter.get({ plain: true }));

    res.render("filtered", {
      filters,
      logged_in: req.session.logged_in,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/private', async (req, res) => {
  try {
    console.log(req.session);
    if (req.session && req.session.logged_in) {
    }
    const secretData = await Table.findAll({
      include: [
        {
          model: User,
          attributes: ['user_name'],
        },
      ],
      where: {
        visibility: false,
        user_id: req.session.user_id
       }
    });

    const secrets = secretData.map((secret) => secret.get({ plain: true }));

    res.render('private', { 
      secrets, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/recipe/:id/like', async (req,res) => {
  const action = req.body.action;
  if (!req.session.logged_in){
    res.status(500).end();
    return; 
  }

  if (action === "like"){
    Like.create({
      recipe_id: req.params.id,
      user_id: req.session.user_id
    });
  } else {
    Like.destroy({
      where: {[Op.and]:[{recipe_id: req.params.id}, {user_id: req.session.user_id}]}
    });
  }
  res.status(200).end();
})



module.exports = router;
