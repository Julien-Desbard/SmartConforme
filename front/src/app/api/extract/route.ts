import { NextResponse } from 'next/server'
import Anthropic from '@anthropic-ai/sdk'

// Initialize the Anthropic client once (reused across requests)
const anthropic = new Anthropic()

// POST /api/extract
// Receives a prompt in the request body and returns Claude's response
export async function POST(request: Request) {
	try {
		// Parse the JSON body sent by the client
		const body = await request.json()
		const userMessage: string = body.message ?? 'Hello Claude'

		// Call the Claude API with the user's message
		const msg = await anthropic.messages.create({
			model: 'claude-haiku-4-5-20251001',
			max_tokens: 1000,
			messages: [
				{
					role: 'user',
					content: userMessage,
				},
			],
		})

		// Return the first text block from Claude's response
		return NextResponse.json({ data: msg.content, error: null })
	} catch (error) {
		// Log the error server-side and return a clean error response to the client
		console.error('[/api/extract] Error calling Anthropic API:', error)
		return NextResponse.json(
			{ data: null, error: 'Failed to call Claude API' },
			{ status: 500 }
		)
	}
}
