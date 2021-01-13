const ottoman = require('ottoman')

const { model, Schema } = require('ottoman');

// create connection to database/bucket
const connection = ottoman.connect({
  connectionString: 'couchbase://localhost',
  bucketName: 'travel',
  username: 'Administrator',
  password: 'password'
});

const schema = new Schema({
  callsign: String,
  country: String,
  name: String,
  geo: {
    lat: Number,
    long: Number
  }
})

const options = {
  collectionName: 'Airlines',
  scopeName: 'us'
}

const Airline = connection.model(
  'Airline', schema, options
)

const whatever = {
  _type: 'Airlines', 
  geo: {
    lat: 123.45,
  }
}

// run the query
const runAsync = async () => {
  try {
    let result = await Airline.find(
      { id: '1ee5c2a1-fdd8-43a9-9355-453d5f6dc2cb' },
      { select: '{geo.lat.something} as geo.lat' }
    )
    console.log(result)
  } catch (error) {
    throw error
  }
  process.exit(0)
}

ottoman.start()

runAsync()
  .then(() => console.log('done'))
  .catch((e) => console.log(e))