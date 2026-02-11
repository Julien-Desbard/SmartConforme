import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import Hero from './Hero'

// indique que tout fetch dans le doc doit utiliser cette fonction moquée
global.fetch = jest.fn()

describe('hero', () => {
	test('renders hero component', () => {
		render(<Hero />)
	})

	test('displays drop invitation text by default', () => {
		render(<Hero />)
		expect(
			screen.getByText('Glissez votre facture PDF ici'),
		).toBeInTheDocument()
		expect(screen.getByText('Ou cliquez pour parcourir')).toBeInTheDocument()
		expect(screen.queryByText('Upload en cours...')).toBeNull()
		expect(screen.queryByText('On glisse...')).toBeNull()
		expect(screen.queryByText('...et on relâche ICI')).toBeNull()
	})

	test('applies neutral style by default', () => {
		render(<Hero />)
		const dropZone = screen.getByTestId('dropzone')
		expect(dropZone).toHaveClass('border-2', 'rounded-lg', 'bg-gray-900')
	})

	test('displays drop text when file is being dragged', () => {
		render(<Hero />)
		fireEvent.dragEnter(window)
		expect(screen.getByText('On glisse...')).toBeInTheDocument()
		expect(screen.getByText('...et on relâche ICI')).toBeInTheDocument()
	})

	test('applies active style when file is being dragged', () => {
		render(<Hero />)
		fireEvent.dragEnter(window)
		const dropZone = screen.getByTestId('dropzone')
		expect(dropZone).toHaveClass('border-dashed', 'border-[#06D6A0]')
	})

	test('displays default text when file leaves the window', () => {
		render(<Hero />)
		fireEvent.dragLeave(window)
		expect(
			screen.getByText('Glissez votre facture PDF ici'),
		).toBeInTheDocument()
		expect(screen.getByText('Ou cliquez pour parcourir')).toBeInTheDocument()
	})

	test('displays loading text during upload', async () => {
		// Configure fetch pour simuler un upload qui prend 100ms
		(global.fetch as jest.Mock).mockImplementationOnce(() => 
			new Promise(resolve => {
				setTimeout(() => {
					resolve({
						ok: true,
						json: async () => ({ message: 'upload réussi' })
					})
				}, 100)
			})
		)

		render(<Hero />)
		const dropZone = screen.getByTestId('dropzone')
		
		// Crée un fichier PDF valide
		const file = new File(['contenu pdf'], 'test.pdf', { 
			type: 'application/pdf' 
		})
		
		// Simule le drop
		fireEvent.drop(dropZone, {
			dataTransfer: { files: [file] }
		})

		// Vérifie que le texte "Upload en cours..." apparaît
		expect(screen.getByText('Upload en cours...')).toBeInTheDocument()

		// Attend que l'upload se termine
		await waitFor(() => {
			expect(screen.queryByText('Upload en cours...')).not.toBeInTheDocument()
		})
	})

	test('applies loading style during upload', async () => {
		// Configure fetch pour simuler un upload qui prend 100ms
		(global.fetch as jest.Mock).mockImplementationOnce(() => 
			new Promise(resolve => {
				setTimeout(() => {
					resolve({
						ok: true,
						json: async () => ({ message: 'upload réussi' })
					})
				}, 100)
			})
		)

		render(<Hero />)
		const dropZone = screen.getByTestId('dropzone')
		
		const file = new File(['contenu pdf'], 'test.pdf', { 
			type: 'application/pdf' 
		})
		
		fireEvent.drop(dropZone, {
			dataTransfer: { files: [file] }
		})

		// Vérifie le style pendant l'upload
		expect(dropZone).toHaveClass('border-solid', 'border-[#06D6A0]')

		// Attend la fin
		await waitFor(() => {
			expect(screen.queryByText('Upload en cours...')).not.toBeInTheDocument()
		})
	})

	test('triggers upload when file is dropped', async () => {
		// Configure fetch pour un succès immédiat
		(global.fetch as jest.Mock).mockImplementationOnce(() => 
			Promise.resolve({
				ok: true,
				json: async () => ({ message: 'upload réussi' })
			})
		)

		render(<Hero />)
		const dropZone = screen.getByTestId('dropzone')
		
		const file = new File(['contenu pdf'], 'test.pdf', { 
			type: 'application/pdf' 
		})
		
		// Simule le drop
		fireEvent.drop(dropZone, {
			dataTransfer: { files: [file] }
		})

		// Vérifie que fetch a été appelé
		await waitFor(() => {
			expect(global.fetch).toHaveBeenCalledWith(
				'/api/upload',
				expect.objectContaining({
					method: 'POST'
				})
			)
		})
	})
})