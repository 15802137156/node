const path = require('path')

const pathStr = path.join('/a', '/b/c', '../../', './d', './e')
console.log(pathStr)


const pathStr2 = path.join(__dirname + '/files/4.txt')
console.log(pathStr2)


const fpath = '/a/d/c/index.html'
const fullName = path.basename(fpath)
console.log(fullName)


const nameWithout = path.basename(fpath, '.html')
console.log(nameWithout)


const fext = path.extname(fpath)
console.log(fext)
