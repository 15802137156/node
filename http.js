const http = require('http')

const serve = http.createServer()

serve.on('request', (req, res) => {
  const { url, method } = req
  let content = `你请求的是 URL ${ url } 和请求的 method 是 ${ method }`
  if (url === '/index.html') {
    content = '<h1>首页</h1>'
  } else if (url === '/about.html') {
    content = '<h2>关于</h2>'
  }

  res.setHeader('Content-Type', 'text/html; charset=utf-8')
  res.end(content)
})

serve.listen(80, () => {
  console.log('Http serve running at http://127.0.0.1')
})
