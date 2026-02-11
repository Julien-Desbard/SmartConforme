import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
	const formData = await req.formData()
	const file = formData.get('file')

	if (file === null) {
		return NextResponse.json({ error: 'aucun fichier fourni' }, { status: 400 })
	}

	if (!(file instanceof File)) {
		return NextResponse.json({ error: 'Format invalide' }, { status: 400 })
	}

	if (!(file.type === 'application/pdf')) {
		return NextResponse.json(
			{ error: 'Le fichier n\'est pas un pdf' },
			{ status: 400 },
		)
	}

	if (file.size > 5 * 1024 * 1024) {
		return NextResponse.json(
			{ error: 'La taille de votre fichier doit être inférieure à 5 Mo' },
			{ status: 400 },
		)
	}

	const arrayBuffer = await file.arrayBuffer()
	const buffer = Buffer.from(arrayBuffer)
	const bufferTest = buffer.subarray(0, 5).toString()

	if (bufferTest === '%PDF-') {
		return NextResponse.json({ message: 'appel api réussi' }, { status: 200 })
	}

    return NextResponse.json(
    { error: 'Le fichier n\'est pas un PDF valide' }, 
    { status: 400 }
)
}
