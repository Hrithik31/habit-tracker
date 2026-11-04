import experss from 'express'

const app = experss()
console.log(' process env:: ', process.env.NODE_ENV)

app.get('/api/health', (req, res) => {
  res
    .json({
      status: 'okay',
      timestamp: new Date().toISOString(),
      message: 'Hello Health app',
    })
    .status(200)
    .send('OK')
})

export { app }
export default app
