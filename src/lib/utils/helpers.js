export const extractList = (text) => {
	const regex = /^\d+\.\s(.*)$/gm
	const listItems = []
	let match

	while ((match = regex.exec(text)) !== null) {
		listItems.push(match[1])
	}

	return listItems
}