import { OPENAI_API_KEY } from "$env/static/private"
import generatePrompt from "$lib/utils/generatePrompt"
import { createParser } from "eventsource-parser"

const OpenAIStream = async (payload) => {
	const encoder = new TextEncoder()
	const decoder = new TextDecoder()

	let counter = 0

	const res = await fetch("https://api.openai.com/v1/chat/completions", {
		headers: {
			"Content-Type": "application/json",
			Authorization: `Bearer ${OPENAI_API_KEY}`,
		},
		method: "POST",
		body: JSON.stringify(payload),
	})

	const stream = new ReadableStream({
		async start(controller) {
			function onParse(event) {
				if (event.type === "event") {
					const data = event.data
					// https://beta.openai.com/docs/api-reference/completions/create#completions/create-stream
					if (data === "[DONE]") {
						controller.close()
						return
					}
					try {
						const json = JSON.parse(data)
						const text = json.choices[0].delta?.content || ""
						if (counter < 2 && (text.match(/\n/) || []).length) {
							// this is a prefix character (i.e., "\n\n"), do nothing
							return
						}
						const queue = encoder.encode(text)
						controller.enqueue(queue)
						counter++
					} catch (e) {
						// maybe parse error
						controller.error(e)
					}
				}
			}

			// stream response (SSE) from OpenAI may be fragmented into multiple chunks
			// this ensures we properly read chunks and invoke an event for each SSE event stream
			const parser = createParser(onParse)
			// https://web.dev/streams/#asynchronous-iteration
			for await (const chunk of res.body) {
				parser.feed(decoder.decode(chunk))
			}
		},
	})
	return stream
}

export const POST = async ({ request }) => {
	let { bio, vibe } = await request.json()

	console.log(bio)

	bio = bio ? bio : "Product designer at @instagram"

	// const response = await openai.createChatCompletion({
	// 	model: "gpt-3.5-turbo",
	// 	messages: [{ role: "user", content: generatePrompt(bio, vibe) }],
	// 	temperature: 0.7,
	// 	max_tokens: 200,
	// })

	// const content = response.data.choices[0].message.content
	// const bios = extractList(content)

	// return new Response(JSON.stringify({ bios }));

	const payload = {
		model: "gpt-3.5-turbo",
		messages: [{ role: "user", content: generatePrompt(bio, vibe) }],
		temperature: 0.7,
		max_tokens: 2048,
		top_p: 1.0,
		frequency_penalty: 0.0,
		stream: true,
		presence_penalty: 0.0,
		n: 1,
	}

	const stream = await OpenAIStream(payload)
	return new Response(stream)
}
