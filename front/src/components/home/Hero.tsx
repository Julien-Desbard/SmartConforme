'use client'
import { ReceiptEuro } from 'lucide-react'
import DropZone from '@/components/features/DropeZone'
import { MinimalToast } from '../ui/animated-toast'
import { useState } from 'react'
import { Button } from '../ui/button'
import Footer from '../footer/footer'

// Hero.tsx
interface ToastData {
	message: string
	open: boolean
	type: 'default' | 'info' | 'warning' | 'error' | 'success'
}

export default function Hero() {
	const [toastOpen, setToastOpen] = useState<boolean>(false)
	const [toastMessage, setToastMessage] = useState<string>('')
	const [toastType, setToastType] = useState<
		'default' | 'info' | 'warning' | 'error' | 'success'
	>('default')

	// Toast management
	const handleDropZoneResult = (data: ToastData) => {
		setToastMessage(data.message)
		setToastOpen(data.open)
		setToastType(data.type)
	}

	const closeToast = () => {
		setToastOpen(false)
		setToastType('default')
		setToastMessage('')
	}
	return (
		<>
			<div 
				className="flex flex-col items-center justify-center"
				style={{
					minHeight: "100vh",
					background: "linear-gradient(180deg, #0a0e14 0%, #14181f 100%)",
					padding: "40px 24px",
				}}
			>
				{/* Header */}
				<div className="flex items-center mb-10 gap-2.5">
					<div>
						<ReceiptEuro size={40} className="text-[#06d6a0]" />
					</div>
					<h1
						className="tracking-wide"
						style={{
							fontSize: "28px",
							fontWeight: 800,
							background: "linear-gradient(135deg, #06d6a0, #00b4d8)",
							WebkitBackgroundClip: "text",
							WebkitTextFillColor: "transparent",
							backgroundClip: "text",
							margin: 0,
						}}
					>
						SmartRelance
					</h1>
				</div>
				{/* Hero text */}
				<div>
					<div className="flex flex-col items-center mb-15">
						<h2
							className="text-center mb-6 tracking-wide"
							style={{
								fontSize: "48px",
								fontWeight: 800,
								color: "#e6edf3",
								margin: 0,
								lineHeight: "1.2",
							}}
						>
							Relancez Vos Clients <br />
							<span
								style={{
									background: "linear-gradient(135deg, #06d6a0, #00b4d8)",
									WebkitBackgroundClip: "text",
									WebkitTextFillColor: "transparent",
									backgroundClip: "text",
								}}
							>
								Automatiquement
							</span>
						</h2>
						<p className="text-[#8B949E] text-xl tracking-wide">
							Uploadez vos factures, l&apos;IA relance, vous encaissez.
						</p>
					</div>
				</div>
				{/* Zone d'upload */}
				<div className="mb-12">
					<DropZone onResult={handleDropZoneResult}/>
				</div>
				<div>
					<a href="/facture_demo.pdf" download>
						<Button className="text-lg">Télécharger une facture de test</Button>
					</a>
				</div>
				<div className='mt-auto'>
					<Footer/>
				</div>
			</div>
			<MinimalToast
				open={toastOpen}
				onClose={closeToast}
				message={toastMessage}
				type={toastType}
			/>
		</>
	)
}
