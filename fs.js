const fs = require('fs')

// 读
fs.readFile(__dirname + '/files/1.txt', 'utf8', (err, dataStr) => {
  if (err) {
    return console.log('读取失败', err.message)
  }

  return console.log('读取成功', dataStr)
})


// 写
fs.writeFile(__dirname + '/files/2.txt', '写入文件内容', (err) => {
  if (err) {
    return console.log('写入失败', err.message)
  }

  return console.log('写入成功')
})


// 改
fs.readFile(__dirname + '/files/3.txt', 'utf8', (err, dataStr) => {
  if (err) {
    return console.log('读取失败', err.message)
  }

  const arrOld = dataStr.split(' ')
  const arrNew = []
  arrOld.forEach(item => {
    arrNew.push(item.replace('=', ':'))
  })
  const newStr = arrNew.join('\n\r')

  fs.writeFile(__dirname + '/files/4.txt', newStr, (err) => {
    if (err) {
      return console.log('写入失败', err.message)
    }
    return console.log('写入成功')
  })
})
