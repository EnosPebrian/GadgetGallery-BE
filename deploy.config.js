module.exports = {
  apps: [
    {
      name: 'gadget-gallery-api', // Format JCWD-{batchcode}-{groupnumber}
      script: './projects/server/src/index.js',
      env: {
        NODE_ENV: process.env.NODE_ENV || 'production',
        PORT: process.env.PORT,
        MYSQL_USER: process.env.MYSQL_USER,
        MYSQL_PASSWORD: process.env.MYSQL_PASSWORD,
        MYSQL_DATABASE: process.env.MYSQL_DATABASE,
        MYSQL_HOST: process.env.MYSQL_HOST,
        MYSQL_DIALECT: process.env.MYSQL_DIALECT || 'mysql',
        MYSQL_TIMEZONE: process.env.MYSQL_TIMEZONE || '+07:00',
        JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
        nodemailer_email:
          process.env.nodemailer_email || 'gadgetgallerygroup2@gmail.com',
        nodemailer_password:
          process.env.nodemailer_password || 'ngjodqocydilwihr',
        OpenCage_api_key:
          process.env.OpenCage_api_key || 'c79ccba183824510808d5899fc0f6e62',
        RajaOngkir_api_key:
          process.env.RajaOngkir_api_key || 'a44bb964bbfe84f56d5c38ca505def6e',
        Googlemaps_api_key:
          process.env.Googlemaps_api_key ||
          'AIzaSyD0BznkOcWn2BonYVT94uhlkwz1DycFjxg',
        URL: process.env.URL || 'https://gadget-gallery-fe.vercel.app/',
        REDIS_URL: process.env.REDIS_URL || 'redis://localhost:6379',
      },
      time: true,
    },
  ],
};
