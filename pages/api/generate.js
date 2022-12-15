import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: "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",
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  const completion = await openai.createCompletion({
    model: "text-curie-001",
    prompt: generatePrompt(req.body.animal),
    temperature: 0.6,
    max_tokens: 300,
  });
  console.log(completion.data);
  res.status(200).json({ result: completion.data.choices[0].text });
}

function generatePrompt(animal) {
  const capitalizedAnimal =
    animal[0].toUpperCase() + animal.slice(1).toLowerCase();
  return `${capitalizedAnimal}.`;
}
