const BIO_COUNT = 2;

const generatePrompt = (bio, vibe) => {
	return `
	give me a numbered list of ${BIO_COUNT} instagram bios fulfilling:
	bio: <${bio}>
	tone: <${vibe}>
	`;
}

export default generatePrompt