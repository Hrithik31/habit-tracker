import { env as loadEnv } from 'custom-env'
import { z } from 'zod' // on run time typescript doesnt exist so type script only checks type on code file not during runtime of the actual code, to check type on runtime code we use zod library to check type on runtime

process.env.APP_STAGE = process.env.APP_STAGE || 'dev'
// Node_ENV = process.env.NODE_ENV || 'development' // not a good practice, it is not meant for app envrrionment it is is mostly for production environment
const isProduction = process.env.APP_STAGE === 'production'
const isDevelopment = process.env.APP_STAGE === 'dev'
const isTesting = process.env.APP_STAGE === 'test'

if (isDevelopment) {
  loadEnv() // loads .env file from root directory
} else if (isTesting) {
  loadEnv('test') // loads .env.test file from root directory
} else if (isProduction) {
  loadEnv('production') // loads .env.production file from root directory
}

// Below are the rules for env variables what their type should be and what their default values should be if not provided in the .env file
const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),

  APP_STAGE: z.enum(['dev', 'test', 'production']).default('dev'),

  PORT: z.coerce.number().positive().default(3000),

  DATABASE_URL: z.string().startsWith('postgresql://'), //https and file are not theonly protocols for postrgress have their own url as postgresql://
  JWT_SECRET: z.string().min(32, 'Must be 32 chars long'), // JWT secret should be at least 32 chars long for security reasons
  JWT_EXPIRES_IN: z.string().default('3d'), // JWT expires in 3 days by default
  BCRYPT_ROUNDS: z.coerce.number().min(10).max(20).default(12), // bcrypt rounds should be between 10 and 20, default is 12 // Has to do something with hashing the password, the more rounds the more secure but also the more time it takes to hash the password
})

export type Env = z.infer<typeof envSchema> // infers the type of envSchema and exports it as Env type // z.infer takes the generic argument with env schema as its type value like you do in typescript generic functions.
let env: Env

try {
  env = envSchema.parse(process.env)
} catch (error) {
  if (error instanceof z.ZodError) {
    console.error('>>Invalid environment variables:', error)
    console.log(JSON.stringify(z.flattenError(error).fieldErrors, null, 2))

    error.errors.forEach((err) => {
      const path = err.path.join('.')
      console.log(`${path}: ${err.message}`)
    })
    process.exit(1) // kill the server if env variables are not valid, because the server should not run if env variables are not valid
  }
}
const isDev = () => env.APP_STAGE === 'dev'
const isTest = () => env.APP_STAGE === 'test'
const isProd = () => env.APP_STAGE === 'production'

/* 

Steps to clone a random repo from github and push it to your own repo on github: 
, keeping it still open to pull from original clone repo 
If you also want to keep pulling updates from the original repo later, rename the old remote instead of overwriting it:

git remote rename origin upstream
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main

Now origin is your repo (for pushing) and upstream is the original (for pulling updates with git pull upstream main). 
*/
