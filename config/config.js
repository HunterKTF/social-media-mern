const config = {
  env: process.env.NODE_ENV || 'development',
  port: process.env.PORT || 3000,
  jwtSecret: process.env.JWT_SECRET || 
    "4e9501765dc6bb1f426b629d9039e25a7ad31b19790cccf90925ca5d6550a42b",
  mongoUri: process.env.MONGO_URI || process.env.MONGO_HOST ||
    'mongodb://127.0.0.1:27017/'
}

export default config;
