import seedDatabase from "./MySqlSeed/seedDatabase"
import app from "./app"
import dotenv from 'dotenv'

//SET PORT
dotenv.config()
const PORT = process.env.PORT || 4000

app.listen(PORT, () => {
   console.log(`Server is running on port ${PORT}`)
   seedDatabase()
})