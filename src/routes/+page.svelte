<script>
</script>

<main
	class="flex flex-1 w-full flex-col items-center justify-center px-4 mt-12 sm:mt-20 text-slate-900"
>
	<h1 class="sm:text-6xl text-4xl max-w-[708px] font-bold text-slate-900 text-center">
		Generate your next Instagram bio using AI
	</h1>
	<div class="mt-10">
		<div>
			<label class="text-left font-medium" for="">
				Copy your current bio <span class="text-slate-500"
					>(or write a few sentences about yourself).</span
				></label
			>
			<textarea
				rows="4"
				class="w-full rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-black px-4 py-2 placeholder-slate-500 mt-5"
				placeholder="e.g. Product Designer & Developer. Posting about UI design, web development, AI, and SvelteKit."
				spellcheck="false"
			/>
		</div>
		<div class="mt-5">
			<label class="text-left font-medium" for="">Select your vibe.</label>
			<select
				class="w-full rounded-md border border-gray-300 shadow-sm focus:border-black focus:ring-black px-3 py-2 mt-5"
			>
				<option value="1">Option 1</option>
				<option value="2">Option 2</option>
				<option value="3">Option 3</option>
			</select>
		</div>
		<div class="mt-8 sm:mt-10">
			<button
				class="bg-black rounded-xl text-white font-medium px-4 py-2 hover:bg-black/80 w-full"
				>Generate your bio →</button
			>
		</div>
	</div>
</main>
