import path from 'path'
import customEnv from 'custom-env'

if (process.env.NODE_ENV === 'development') {
  customEnv.env(process.env.APP_ENV, path.resolve(`${__dirname}/../../../../`))
}
