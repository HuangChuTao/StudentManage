/**
 * router.js路由模块
 * 处理路由
 * 根据不同的请求方法+请求路劲设置具体请求函数
 */

const fs = require('fs');

const students = require('./students');

const express = require('express')

const router = express.Router()

router.get('/students', (req, res) => {
  students.find((err, students) => {
    if (err) {
      return status(500).send('Server error')
    }
    let fruits = ['苹果', '鸭梨', '西瓜', '哈密瓜']
    res.render('index.html', {
      fruits,
      students
    })
  })
})

/**
 * 渲染表单页 
 */
router.get('/students/new', (req, res) => {
  res.render('new.html')
})


/**
 * 增加学生
 */
router.post('/students/new', (req, res) => {
  new students(req.body).save((err) => {
    if (err) {
      return status(500).send('Server error')
    }
    res.redirect('/students')
  })
})

/**
 * 渲染编辑学生页面 
 */
router.get('/students/edit', (req, res) => {
//  1.在首页中增加修改和删除的操作
  students.findById(req.query.id, (err, student) => {
    if (err) {
      return status(500).send('Server error')
    }
    res.render('edit.html', {
      student
    })
  })
})

/**
 * 更新修改
 */
router.post('/students/edit', (req, res) => {
  students.findByIdAndUpdate(req.body.id, req.body, err => {
    if (err) {
      return status(500).send('Server error')
    }
    res.redirect('/students')
  })
})

/**
 * 删除学生
 */
router.get('/students/delete', (req, res) => {
  console.log(req.query.id);
  students.findByIdAndRemove(req.query.id, err => {
    if (err) {
      return status(500).send('Server error')
    }
    res.redirect('/students')
  })
})

module.exports = router;

