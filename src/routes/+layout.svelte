<script>
	import "../app.postcss"
</script>

<div class="flex max-w-5xl mx-auto flex-col min-h-screen">
	<header class="w-full border-b flex sm:flex-row flex-col p-4 py-6">
		<div class="sm:text-2xl text-xl font-bold ml-2 tracking-tight">
			Instagram Bio Generator
		</div>
	</header>
	<div class="flex-1">
		<slot />
	</div>
	<footer
		class="w-full border-t mt-5 flex sm:flex-row flex-col justify-between items-center p-4 py-8"
	>
		<div>Built by @zaxwebs</div>
		<div>
			Powered by <a
				href="https://kit.svelte.dev/"
				target="_blank"
				rel="noreferrer"
				class="font-bold hover:underline transition underline-offset-2"
				>SvelteKit</a
			>
			+
			<a
				href="https://openai.com/"
				target="_blank"
				rel="noreferrer"
				class="font-bold hover:underline transition underline-offset-2"
				>OpenAI</a
			>
		</div>
	</footer>
</div>
