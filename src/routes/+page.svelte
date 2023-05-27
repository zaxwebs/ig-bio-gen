<script>
	import Step from '$lib/components/Step.svelte'
	import StarOnGitHub from '$lib/components/StarOnGitHub.svelte'
	import { extractList } from '$lib/utils/helpers.js'
	import { scrollBottom } from 'svelte-scrolling'
	import { fade } from 'svelte/transition'

	let bio
	let vibes = [
		{
			text: 'Professional',
		},
		{
			text: 'Casual',
		},
		{
			text: 'Funny',
		},
	]
	let vibe = vibes[0]

	let bios = []
	let biosString = ''
	let loading = false
	let endStream = true

	$: if (biosString) {
		const biosCount = bios.length
		bios = extractList(biosString)
		if (biosCount < bios.length) {
			scrollBottom({ duration: 1200 })
		}
	}

	const handleGenerate = async () => {
		const payload = {
			bio,
			vibe: vibe.text,
		}

		try {
			const response = await fetch('/api', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(payload),
			})

			if (response.ok) {
				try {
					const data = response.body
					if (!data) {
						return
					}

					const reader = data.getReader()
					const decoder = new TextDecoder()

					while (true) {
						const { value, done } = await reader.read()
						const chunkValue = decoder.decode(value)

						biosString += chunkValue

						if (done) {
							endStream = true
							break
						}
					}
				} catch (e) {
					throw new Error('Looks like OpenAI timed out :(')
				}
			} else {
				throw new Error(response.text())
			}
		} catch (error) {
			console.log(error)
		}
	}
</script>

<main
	class="flex flex-1 w-full flex-col items-center justify-center px-4 my-10 sm:my-20 text-slate-900"
>
	<StarOnGitHub />
	<h1 class="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 text-center">
		Generate your next Instagram bio using AI
	</h1>
	<div class="mt-10 max-w-xl w-full">
		<div>
			<label class="text-left font-medium" for="">
				<Step number="1" />Copy your current bio
				<span class="text-slate-500">(or write a few sentences about yourself).</span
				></label
			>
			<textarea
				rows="4"
				class="w-full rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-black px-4 py-2 placeholder-slate-500 mt-5"
				placeholder="e.g. Product designer at @instagram"
				spellcheck="false"
				bind:value={bio}
			/>
		</div>
		<div class="mt-5">
			<label class="text-left font-medium" for=""><Step number="2" /> Select your vibe.</label
			>
			<select
				bind:value={vibe}
				class="w-full rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-black px-3 py-2 mt-5"
			>
				{#each vibes as vibe}
					<option value={vibe}>{vibe.text}</option>
				{/each}
			</select>
		</div>
		<div class="mt-8 sm:mt-10">
			<button
				on:click={handleGenerate}
				class="bg-black rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80 w-full"
				>Generate your bio →</button
			>
		</div>
		{#if bios.length}
			<div class="mt-10">
				<h2 class="sm:text-4xl text-3xl font-bold text-slate-900 mx-auto text-center">
					Your generated bios
				</h2>
				{#each bios as bio, index (index)}
					<div
						in:fade
						class="bg-white rounded-xl shadow-md p-4 hover:bg-gray-100 transition cursor-copy border mt-8"
					>
						{bio}
					</div>
				{/each}
			</div>
		{/if}
	</div>
</main>
