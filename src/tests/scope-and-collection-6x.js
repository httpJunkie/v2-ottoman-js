// This test should be run against Couchbase 6.6
const ottoman = require('ottoman')

const { model, Schema } = require('ottoman');

// create connection to database/bucket
// ottoman connect does not does not return a connection object anymore
ottoman.connect({
  connectionString: 'couchbase://localhost',
  bucketName: 'test',
  username: 'Administrator',
  password: 'password'
});

const schema = new Schema({
  callsign: String,
  country: String,
  name: String
})

const options = { 
  collectionName: 'Airlines', 
  scopeName: 'us'
}

const Airline = model(
  'Airline', schema, options
)

const cbAirlines = new Airline({
  callsign: 'CBA',
  country: 'United States',
  name: 'Couchbase Airlines'
})

// run the query
const saveModel = async() => {
  try {
    let result = await cbAirlines.save()
    console.log(`success: airline added`)
    console.log(result)
  } catch (error) {
    throw error
  }
  process.exit(0)
}

ottoman.start()
  .then(() => {
    saveModel()
    .catch((e) => console.error(`ERROR: saveModel(): ${e.message}`))
  })
  .catch((e) => console.error(`ERROR: ottoman.start(): ${e.message}`))

// run against CB Server 6.5
// Supplying collection should error