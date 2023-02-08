import * as fs from 'fs';
import express from 'express';
import bodyParser from 'body-parser'
import { Configuration, OpenAIApi } from "openai";
import axios from 'axios';

const app = express()
const port = 3000
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

/*
*   Read config
*/
const config = JSON.parse(fs.readFileSync('./config.json'));
console.log(JSON.stringify(config));

const configuration = new Configuration({
    apiKey: config.OPENAI_API_KEY,
  });
const openai = new OpenAIApi(configuration);


app.post(config.MM_OUTGOING_WEBHOOK, async (req, res) => {
    let data = req.body.text;
    // console.log(JSON.stringify(data));
    let post_processed_data = data.slice(8);
    // console.log(post_processed_data);
    let openai_input = {
        model: "text-davinci-003",
        prompt: post_processed_data,
        temperature: 0.9,
        max_tokens: 2000
    };
    // console.log(openai_input);
    try {
        const openai_response = await openai.createCompletion(openai_input);
        let openai_answer = openai_response.data.choices[0].text;
        // console.log(openai_answer);
        axios.post(config.MM_INCOMING_WEBHOOK, {
            text: openai_answer
        })
        .then(function (response) {
            // console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        });
        res.send('Get POST request from Mattermost Outgoing Webhook: ' + JSON.stringify(data));
        res.status(200);
    } catch (error) {
        res.send(error);
        res.status(500);
    }
})
  
app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})