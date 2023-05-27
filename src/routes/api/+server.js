import { OPENAI_API_KEY } from "$env/static/private"
import { Configuration, OpenAIApi } from "openai"
import generatePrompt from "$lib/utils/generatePrompt"
import { extractList } from "$lib/utils/helpers.js"

const configuration = new Configuration({
	apiKey: OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)

export const POST = async ({ request }) => {
	let { bio, vibe } =
		await request.json()

	console.log(bio)

	bio = bio ? bio : 'Product designer at @instagram'

	const response = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: generatePrompt(bio, vibe) }],
		temperature: 0.7,
		max_tokens: 200,
	})

	const content = response.data.choices[0].message.content
	const bios = extractList(content)

	return new Response(JSON.stringify({ bios }));
}