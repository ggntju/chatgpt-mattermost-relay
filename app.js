import { ChatGPTAPI } from 'chatgpt'
import * as fs from 'fs';
import express from 'express';

const app = express()
const port = 3000

/*
*   Read config
*/
const config = JSON.parse(fs.readFileSync('./config.json'));

async function example() {
  const api = new ChatGPTAPI({
    apiKey: config.OPENAI_API_KEY
  })

  const res = await api.sendMessage('Hello World!')
  console.log(res.text)
}

console.log(JSON.stringify(config));

app.post('/', (req, res) => {
    res.send('Got a POST request')
    console.log(req);
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})