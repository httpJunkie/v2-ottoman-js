const { model, Schema, Ottoman } = require('ottoman')
const ottoman = new Ottoman()

ottoman.connect({ 
  connectionString: 'couchbase://localhost', bucketName: 'travel',
  username: 'Administrator', password: 'password' })

const schema = new Schema({ name: String });
const keyGenerator = ({metadata, id}) => `${metadata.collectionName}::${id}`
const User = model('User', schema, { keyGenerator, scopeName: '_default', collectionName: '_default' })

const createUser = async () => {
  await User.create({ name: 'John' })
}

ottoman.start()
createUser()
  .then(() => console.log('document created'))
  .catch((e) => console.log(e))

// Document Created: 

// key: _default::6c5b834c-dcb8-40cc-8717-61651a5ed53d

/* 
  value: {
    "name": "John",
    "id": "6c5b834c-dcb8-40cc-8717-61651a5ed53d",
    "_type": "User"
  }
*/

/* 
  metaData: {
    "meta": {
      "id": "_default::6c5b834c-dcb8-40cc-8717-61651a5ed53d",
      "rev": "1-165e24776c1c00000000000002000000",
      "expiration": 0,
      "flags": 33554432,
      "type": "json"
    },
    "xattrs": {}
  }
*/