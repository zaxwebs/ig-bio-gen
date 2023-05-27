const BIO_COUNT = 2;

// TODO: optimize & improve this

const generatePrompt = (bio, vibe) => {
	return `
	give me a numbered list of ${BIO_COUNT} instagram bios fulfilling:
	bio: <${bio}>
	tone: <${vibe}>
	don't use more than 150 characters - including spaces
	use descriptive words
	should lead to more follows
	`;
}

export default generatePrompt