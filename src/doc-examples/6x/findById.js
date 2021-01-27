// run init-data-6.js first

const ottoman = require('ottoman')
const { model, Schema } = require('ottoman');

// create connection to database/bucket
ottoman.connect({
  connectionString: 'couchbase://localhost',
  bucketName: 'test',
  username: 'Administrator',
  password: 'password'
})

const schema = new Schema({
  callsign: String,
  country: String,
  iata: String,
  icao: String,
  tsid: Number,
  name: String
})

const Airline = model('Airline', schema)

const runAsync = async () => {
  try {
    await Airline.findById()
  } catch (error) {
    throw error
  }
}

ottoman.start()

runAsync()
  .then(() => console.log('done'))
  .catch((e) => console.log(e))