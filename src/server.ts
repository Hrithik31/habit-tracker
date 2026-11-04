import experss from 'express'
import authRoutes from './routes/authRoutes.ts'
import userRoutes from './routes/userRoutes.ts'
import habitRoutes from './routes/habitRoutes.ts'
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
// Registration of sub-routes
app.use('/api/auth', authRoutes) // use is like regardless of the method, it will handle all the requests to this route
app.use('/api/habits', habitRoutes)

/*
Nested Routes: In this example, we are nesting the habitRoutes under the userRoutes. This means that any request to /api/users/:userId/habits will be handled by the habitRoutes. This is useful for organizing routes that are related to a specific resource, in this case, habits related to a specific user.
Note the habits are defined first and then we are using them in the userRoutes. This is because we want to make sure that the habitRoutes are registered before we use them in the userRoutes. If we were to define the userRoutes first and then use the habitRoutes, the habitRoutes would not be registered and we would get a 404 error when trying to access /api/users/:userId/habits.

*/
userRoutes.use('/:userId/habits', habitRoutes) // This is an example of nested routes, /api/users/:userId/habits will be handled by habitRoutes

app.use('/api/users', userRoutes) // this is like a middleware, it will handle all the requests to this route

export { app }
export default app
