'use client'
import { Upload } from 'lucide-react'
import { useEffect, useState, useRef } from 'react'

interface ToastData {
	message: string
	open: boolean
	type: 'default' | 'info' | 'warning' | 'error' | 'success'
}

interface DropZoneProps {
	onResult: (data: ToastData) => void
}

export default function DropZone(props: DropZoneProps) {
	const [isDragging, setIsDragging] = useState(false)
	const [isUploading, setIsUploading] = useState(false)
	const fileInputRef = useRef<HTMLInputElement>(null)

	// Monitoring drag & drop on the page
	const handleDragEnter = (e: DragEvent) => {
		e.preventDefault()
		setIsDragging(true)
	}
	const handleDragLeave = (e: DragEvent) => {
		if (e.relatedTarget === null) {
			setIsDragging(false)
		}
	}
	const handleDragOver = (e: DragEvent) => {
		e.preventDefault()
	}

	const handleDrop = (e: DragEvent) => {
		e.preventDefault()
		setIsDragging(false)

		const files = Array.from(e.dataTransfer?.files || [])
		validateAndUpload(files)
	}

	useEffect(() => {
		window.addEventListener('dragenter', handleDragEnter)
		window.addEventListener('dragover', handleDragOver)
		window.addEventListener('dragleave', handleDragLeave)
		window.addEventListener('drop', handleDrop)

		return () => {
			window.removeEventListener('dragenter', handleDragEnter)
			window.removeEventListener('dragover', handleDragOver)
			window.removeEventListener('dragleave', handleDragLeave)
			window.removeEventListener('drop', handleDrop)
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// Toast management
	const showToast = (message: string, type: ToastData['type']) => {
		props.onResult({
			message,
			open: true,
			type,
		})
	}

	const validateAndUpload = (files: File[]) => {
		if (files.length === 0) return

		if (files.length > 1) {
			showToast('Un seul fichier à la fois', 'warning')
			return
		}

		const file = files[0]

		if (file.type !== 'application/pdf') {
			showToast('Seuls les fichiers PDF sont acceptés', 'warning')
			return
		}

		if (file.size > 5 * 1024 * 1024) {
			showToast('Fichier trop volumineux (max 5 Mo)', 'warning')
			return
		}

		handleUpload(file)
	}

	const handleUpload = async (file: File) => {
		setIsUploading(true)

		try {
			const formData = new FormData()
			formData.append('file', file)

			const response = await fetch('/api/upload', {
				method: 'POST',
				body: formData,
			})

			const data = await response.json()

			if (response.ok) {
				console.log('upload réussi', data)
				showToast('PDF uploadé avec succès', 'success')
			} else {
				let userMessage = "Une erreur est survenue lors de l'upload"

				if (response.status === 400) {
					userMessage = 'Fichier invalide'
				} else if (response.status === 413) {
					userMessage = 'Fichier trop volumineux'
				} else if (response.status === 500) {
					userMessage = 'Erreur serveur, réessayez dans quelques instants'
				}

				showToast(userMessage, 'error')

				console.error('Erreur upload:', { status: response.status, data })
			}
		} catch (error) {
			showToast('Erreur réseau, vérifiez votre connexion', 'error')
			console.error('Erreur réseau:', error)
		} finally {
			setIsUploading(false)
		}
	}

	const handleClick = () => {
		fileInputRef.current?.click()
	}

	const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = Array.from(e.target.files || [])
		validateAndUpload(files)
		e.target.value = ''
	}

	const baseStyle =
		'flex flex-col items-center text-center py-12 px-24 w-3xl border-2 rounded-lg transition duration-200 cursor-pointer '
	const normalStyle =
		'bg-gray-900 border-gray-800 border-dashed hover:border-[#06D6A0] hover:bg-[#06D6A0]/3 hover:-translate-y-1'
	const draggingStyle =
		'border-dashed border-[#06D6A0] bg-[#06D6A0]/3 -translate-y-1'
	const uploadingStyle =
		'border-solid border-[#06D6A0] bg-[#06D6A0]/3 -translate-y-1'

	let titre = 'Glissez votre facture PDF ici'
	let sousTitre = 'Ou cliquez pour parcourir'

	if (isUploading) {
		titre = 'Upload en cours...'
		sousTitre = ''
	} else if (isDragging) {
		titre = 'On glisse...'
		sousTitre = '...et on relâche ICI'
	}

	return (
		<div
			onClick={handleClick}
			className={`${baseStyle} ${isDragging ? draggingStyle : isUploading ? uploadingStyle : normalStyle}`}
			data-testid="dropzone"
		>
			<input
				ref={fileInputRef}
				type="file"
				accept="application/pdf"
				onChange={handleFileInputChange}
				className="hidden"
			/>
			<Upload
				size={100}
				className="p-6 mb-10 bg-[#06D6A0]/10 rounded-xl text-[#06D6A0]"
			/>
			<div className="flex flex-col items-center gap-2">
				<p className="text-2xl tracking-wide">{titre}</p>
				{sousTitre && (
					<p className="text-lg text-[#8b949e] tracking-wide">{sousTitre}</p>
				)}
			</div>
		</div>
	)
}
