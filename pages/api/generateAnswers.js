
import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
    apiKey: process.env.OPENAI_SECRET_KEY
});

const openai = new OpenAIApi(configuration);

export const config = {
    runtime: 'edge',
  }
export default async function handler(req,res){
    const prompt = req.body.prompt;
    if(!prompt || prompt == '')
    {
        return new Response('Please send your prompt',{status: 400});
    }
    const aiResult = await openai.createCompletion({
            model: "text-davinci-003",
            prompt: `${prompt}`,
            temperature: 0.9,
            max_tokens: 500,
            frequency_penalty: 0.5,
            presence_penalty: 0
    })
    const response = aiResult.data.choices[0].text?.trim() || 'Sorry there was a problem fetching your data!';
    res.status(200).json({text: response});
}