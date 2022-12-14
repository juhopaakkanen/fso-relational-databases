require('dotenv').config()
const { Sequelize, QueryTypes } = require('sequelize')

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
})

const main = async () => {
  try {
    await sequelize.authenticate()
    const blogs = await sequelize.query('select * from blogs;', {
      type: QueryTypes.SELECT
    })
    blogs.map((blog) => {
      // eslint-disable-next-line quotes
      console.log(blog.author + `: '` + blog.title + `', likes: ` + blog.likes)
    })
    sequelize.close()
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}

main()

