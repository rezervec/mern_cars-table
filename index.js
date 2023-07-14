require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const cors = require('cors');


const PORT = process.env.PORT || 70

const app = express()

app.use(cors());
app.use(express.json())
app.use("/api/car", require('./routes/car'))
// app.use('/', express.static(path.join(__dirname, 'public_html', 'build')))

// app.get('*', (req, res) => {
//   res.sendFile(path.resolve(__dirname, 'public_html', 'build', 'index.html'))
// })

const start = async () => {
  try {
    await mongoose.connect(process.env.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(()=> console.log('-== DB CONNECTION SUCCESSFUL ==-'))
    .catch((error)=> console.log('!!! Database Error: ', error.message));
    app.listen(PORT, () => console.log(`-== APP START ON PORT: ${PORT} ==-`))
  } catch (error) {
    console.log('!!! Server Error: ', error.message)
    process.exit(1)
  }
}

start()
