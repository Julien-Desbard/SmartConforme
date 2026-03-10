export default function Footer() {
	return (
		<>
			<p className="blur-in">
				Conçu et développé par{' '}
				<a
					className="hover:-translate-y-1"
					href="https://www.linkedin.com/in/julien-desbard/"
                    target="_blank"
				>
					<span
						className="underline underline-offset-2"
						style={{
							fontSize: '16px',
							fontWeight: 800,
							background: 'linear-gradient(135deg, #06d6a0, #00b4d8)',
							WebkitBackgroundClip: 'text',
							WebkitTextFillColor: 'transparent',
							backgroundClip: 'text',
							margin: 0,
						}}
					>
						Julien Desbard{' '}
					</span>
				</a>
				— Développeur Full Stack JS, expert en processus B2B
			</p>
		</>
	)
}
