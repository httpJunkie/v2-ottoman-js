// This test should be run against Couchbase 6.6
let airlineDocuments = require('../data/airlines.json')
const { model, Schema, Ottoman } = require('ottoman')
const ottoman = new Ottoman({ collectionName: '_default', scopeName: '_default' })

// ottoman connect does not does not return a connection object anymore
ottoman.connect({
  connectionString: 'couchbase://localhost',
  bucketName: 'travel',
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

const Airline = ottoman.model('Airline', schema)

const mydoc = {
  "callsign": "MILE-AIR",
  "country": "United States",
  "iata": "Q5",
  "icao": "MLA",
  "tsid": 10,
  "name": "40-Mile Air"
}

const saveAirlines = async() => {
  await Airline.createMany(airlineDocuments)
    .then((res) => console.log(res))
    .catch(e => console.error(`ERR: Airline.createMany(): ${JSON.stringify(e)}`))
}

ottoman.start()
  .then(() => saveAirlines())
  .catch(e => console.error(`ERR: ottoman.start(): ${e.message}`))

// saveAirlines()


  // ISSUE #01
  // need to add erros that we can re-export from Ottoman around FeatureNotAvailableError
  // we should be able to use e instanceof ottoman.FeatureNotAvailableError to be able to react to this error.

  // ISSUE #02
  // you are proceeding with creating indexes that you should not. See above Issue and error
  // FeatureNotAvailableError && Unable To Create Indexes