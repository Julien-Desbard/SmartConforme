import "dotenv/config"; 

import Anthropic from '@anthropic-ai/sdk'

async function main() {
	const anthropic = new Anthropic()

	const msg = await anthropic.messages.create({
		model: 'claude-haiku-4.5',
		max_tokens: 1000,
		messages: [
			{
				role: 'user',
				content:
					'Hello Claude',
			},
		],
	})
	console.log(msg)
}

main().catch(console.error)
