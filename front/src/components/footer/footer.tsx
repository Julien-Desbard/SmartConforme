// footer.tsx — Pied de page de SmartConforme
// Affiche le crédit de l'auteur avec un lien vers son LinkedIn.
// Conçu pour un fond clair — texte muted et lien bleu.

export default function Footer() {
  return (
    <>
      {/*
        blur-in : animation d'apparition définie dans globals.css.
        Le texte commence flou et devient net en 0.5s.
        color #A1A1AA = text-muted de notre design system (zinc-400).
        font-family mono renforce le côté "outil technique".
      */}
      <p
        className="blur-in text-center"
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          color: '#A1A1AA',               // zinc-400 — discret, pas envahissant
          lineHeight: '1.6',
        }}
      >
        Conçu et développé par{' '}
        <a
          href="https://www.linkedin.com/in/julien-desbard/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:-translate-y-0.5 inline-block transition-transform duration-200"
        >
          {/*
            Le nom est en bleu primaire (#2563EB) et souligné —
            c'est un lien cliquable, la couleur le signale clairement.
          */}
          <span
            style={{
              fontWeight: 600,
              color: '#2563EB',           // Bleu primaire SmartConforme
              textDecoration: 'underline',
              textUnderlineOffset: '2px',
            }}
          >
            Julien Desbard
          </span>
        </a>
        {' '}— Développeur Full Stack JS, expert en processus B2B
      </p>
    </>
  )
}
