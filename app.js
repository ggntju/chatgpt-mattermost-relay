import * as fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser'

const app = express()
const port = 3000

/*
*   Read config
*/
const config = JSON.parse(fs.readFileSync('./config.json'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

console.log(JSON.stringify(config));

app.post('/', (req, res) => {
    let data = req.body;
    console.log(JSON.stringify(data));
    res.status(200);
    res.send('Get POST request from Mattermost Outgoing Webhook: ' + JSON.stringify(data));
})
  
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})