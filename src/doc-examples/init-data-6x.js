// This test should be run against Couchbase 6.6
let airlineDocuments = require('./data/airlines')
const { model, Schema, Ottoman } = require('ottoman')
const ottoman = new Ottoman({ collectionName: 'xxx' })

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
// const keyGenerator = (tsid) => `airline_${tsid}`
// const idKey = 'id'
// const Airline = model('airline', schema, { keyGenerator, idKey })

// run the query
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

  // ISSUE #01
  // need to add erros that we can re-export from Ottoman around FeatureNotAvailableError
  // we should be able to use e instanceof ottoman.FeatureNotAvailableError to be able to react to this error.

  // ISSUE #02
  // you are proceeding with creating indexes that you should not. See above Issue and error
  // FeatureNotAvailableError && Unable To Create Indexes