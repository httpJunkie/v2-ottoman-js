const express = require('express')
const app = express()

interface Params {
  a: number
  b: number
}

type Add = (x: Params) => number

const add: Add = x => {
  return x.a + x.b
}

app.get("/", (req:any) => {
  add({a:1, b:1})
})

app.listen(3001, () => {
  console.log("started")
})