// This test should be run against Couchbase 6.6
let airlineDocuments = require('./data/airlines')
const { model, Schema, Ottoman } = require('ottoman')
const ottoman = new Ottoman({ collectionName: 'airlines', scopeName: 'us' })

// ottoman connect does not does not return a connection object anymore
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

// run the <query>  </query>
const saveAirlines = async() => {
  try {
    let result = await Airline.createMany(airlineDocuments)
    console.log(`success: airlines added: ${result}`)
  } catch (error) {
    throw error
  }
}

async function startOttoman() {
  try {
    await ottoman.start()
      .then(() => saveAirlines())
      .catch(e => console.error(`ERR: ottoman.start(): ${e.message}`))
  } catch (e) {
    console.log(`ERROR: ${e}`)
  }
}
startOttoman()

// ISSUE: 03 
// When running the code above for a second time we expect to just generate docs again and
// use the existing index.

// Failed creating N1QL index OttomanusAirline
// ERR: ottoman.start(): index exists