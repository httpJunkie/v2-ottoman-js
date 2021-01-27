const { model, Schema, Ottoman } = require('ottoman')
const ottoman = new Ottoman()

ottoman.connect({ 
  connectionString: 'couchbase://localhost', bucketName: 'travel',
  username: 'Administrator', password: 'password' })

const schema = new Schema({ name: String });
const keyGenerator = ({metadata, id}) => `${metadata.collectionName}::${id}`
const User = model('User', schema, { keyGenerator, scopeName: 'USA', collectionName: 'User' })

const createUser = async () => {
  await User.create({ name: 'John' })
}

ottoman.start()
createUser()
  .then(() => console.log('document created'))
  .catch((e) => console.log(e))

  // Document Created: 

// key: User::945b2e30-fe37-44f4-aa36-4093453ca407

/* 
  value: {
    "name": "John",
    "id": "945b2e30-fe37-44f4-aa36-4093453ca407",
    "_type": "User"
  }
*/

/* 
  metaData: {
    "meta": {
      "id": "User::945b2e30-fe37-44f4-aa36-4093453ca407",
      "rev": "1-165e24adf39d000060162cfd02000000",
      "expiration": 1612066045,
      "flags": 33554432,
      "type": "json"
    },
    "xattrs": {}
  }
*/