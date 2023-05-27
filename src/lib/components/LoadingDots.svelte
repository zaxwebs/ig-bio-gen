<div class="flex gap-1">
	<div class="w-1 h-1 bg-white rounded-full dot-1" />
	<div class="w-1 h-1 bg-white rounded-full dot-2" />
	<div class="w-1 h-1 bg-white rounded-full dot-3" />
</div>

<style>
	.dot-1,
	.dot-2,
	.dot-3 {
		animation: bounce 1s infinite ease-in-out;
	}

	.dot-2 {
		animation-delay: 0.1s;
	}

	.dot-3 {
		animation-delay: 0.2s;
	}

	@keyframes bounce {
		0%,
		15% {
			transform: translate(0, 0);
			background: rgba(255, 255, 255, 0.3);
		}
		50% {
			transform: translate(0, -2px);
			background: rgba(255, 255, 255, 0.6);
		}
		85%,
		100% {
			transform: translate(0, 0);
			background: rgba(255, 255, 255, 1);
		}
	}
</style>
