/**
 * 职责
 * 操作文件中的数据，只处理数据，不关心业务
 */

const fs = require('fs');

const dbJSON = './db.json'

/**
 * 读取json文件
 * 
 */
 exports.find = (callback) => {
   fs.readFile(dbJSON, (err, data) => {
     if (err) {
       return callback(err);
     }
     callback(null, JSON.parse(data).students)
   })
 }

 /**
 * 根据id查询该学生信息
 * 
 */
exports.findById= (id, callback) => {
  fs.readFile(dbJSON, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }
    let students = JSON.parse(data).students;
    //要修改学生的id和json文件id的对比
    let ret = students.find(item => {
      return item.id === id;
    })
    callback(null, ret);
  })
}

/**
 * 增加学生数据
 * 参数1：表单数据
 * 参数2：读取文件的信息
 */
exports.save = (student, callback) => {
  fs.readFile(dbJSON, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }
    //1.拿到JSON文件并将其转为对象数据
    let students = JSON.parse(data).students;
    //2.1 处理id，把id最大值+1
    student.id = students[students.length - 1].id + 1
    //2.2将外界传入的表单数据push到JSON对象中
    students.push(student);
    //3.把JSON对象数据转为字符串
    let fileData = JSON.stringify({
      students: students
    })
    //4.并保存到JSON文件中
    fs.writeFile(dbJSON, fileData, err => {
      if (err) {
        return callback(err);
      }
      callback(null)
    })
  })
}

/**
 * 修改编辑学生数据
 * 参数1：用户提交过来的信息
 * 参数2：读取文件的信息
 */
exports.updataById = (student, callback) => {
  // 1.读文件
  fs.readFile(dbJSON, (err, data) => {
    if (err) {
      return callback(err);
    }
    // 1.2拿到文件数据并转为json对象
    let students = JSON.parse(data).students;

    student.id = parseInt(student.id)

    //1.3循环匹配id相同的数据
    let stu = students.find(item => {
      return item.id === student.id
    })

    //1.4对该id数据进行更新
    for(let key in student) {
      stu[key] = student[key]
    }

    //1.5将json对象转为字符串
    let fileData = JSON.stringify({
      students: students
    })

    //2.写文件
    fs.writeFile(dbJSON, fileData, (err) => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

/**
 *删除学生数据
 * 参数1：用户提交过来id
 * 参数2：读取文件的信息
 */
exports.deleteById = (id, callback) => {
  fs.readFile(dbJSON, 'utf8', (err, data) => {
    if (err) {
      return callback(err);
    }
    let students = JSON.parse(data).students;

    let deletesu = students.findIndex(item => {
      return item.id === parseInt(id);
    })
    students.splice(deletesu, 1);

    let deletestu = JSON.stringify({
      students
    })

    fs.writeFile(dbJSON, deletestu, err => {
      if (err) {
        return callback(err)
      }
      callback(null)
    })
  })
}

