'use client'

// Hero.tsx — Page d'accueil principale de SmartConforme
// Ce composant affiche le titre, le sous-titre, la zone d'upload et le footer.
// C'est un composant "client" car il gère l'état local (toast).

import { CheckCircle } from 'lucide-react'
import DropZone from '@/components/features/DropeZone'
import { MinimalToast } from '../ui/animated-toast'
import { useState } from 'react'
import { Button } from '../ui/button'
import Footer from '../footer/footer'

// ── TYPES ──────────────────────────────────────────────────────────────────────
// ToastData définit la structure du message de notification (toast)
// que la DropZone remonte au Hero après un upload.

interface ToastData {
  message: string
  open: boolean
  type: 'default' | 'info' | 'warning' | 'error' | 'success'
}

// ── COMPOSANT HERO ─────────────────────────────────────────────────────────────

export default function Hero() {
  // ── ÉTAT LOCAL ───────────────────────────────────────────────────────────────
  // Ces trois états contrôlent le toast (notification) qui s'affiche
  // après qu'un fichier a été déposé dans la DropZone.

  // Est-ce que le toast est visible ?
  const [toastOpen, setToastOpen] = useState<boolean>(false)
  // Quel message afficher dans le toast ?
  const [toastMessage, setToastMessage] = useState<string>('')
  // Quel type de toast ? (success, error, warning, info, default)
  const [toastType, setToastType] = useState<ToastData['type']>('default')

  // ── GESTIONNAIRES D'ÉVÉNEMENTS ───────────────────────────────────────────────

  // handleDropZoneResult : reçoit les données du toast envoyées par la DropZone
  // et met à jour l'état local pour afficher la notification.
  const handleDropZoneResult = (data: ToastData) => {
    setToastMessage(data.message)
    setToastOpen(data.open)
    setToastType(data.type)
  }

  // closeToast : remet les états du toast à leur valeur par défaut
  // (appelé quand l'utilisateur ferme la notification)
  const closeToast = () => {
    setToastOpen(false)
    setToastType('default')
    setToastMessage('')
  }

  // ── RENDU ────────────────────────────────────────────────────────────────────

  return (
    <>
      {/*
        Conteneur principal — fond clair #FAFAFA (zinc-50).
        min-h-screen garantit que la page occupe toute la hauteur de l'écran.
        flex flex-col + items-center centre le contenu horizontalement.
      */}
      <div
        className="flex flex-col items-center justify-center min-h-screen"
        style={{
          backgroundColor: '#FAFAFA',
          padding: '40px 24px',
        }}
      >
        {/* ── EN-TÊTE : logo + nom de l'application ──────────────────────── */}
        <div className="flex items-center mb-12 gap-3">

          {/*
            Logo SmartConforme : carré bleu avec une icône CheckCircle dedans.
            Le CheckCircle (✓ dans un cercle) symbolise la conformité documentaire.
          */}
          <div
            style={{
              width: '36px',
              height: '36px',
              backgroundColor: '#2563EB',   // Bleu primaire SmartConforme
              borderRadius: '8px',           // --radius-md
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <CheckCircle size={20} color="#FFFFFF" />
          </div>

          {/*
            Nom de l'application.
            Police Satoshi 700 — géométrique, précise.
            Couleur sombre #18181B (zinc-900) sans gradient : on reste sobre.
          */}
          <h1
            style={{
              fontSize: '20px',
              fontWeight: 700,
              fontFamily: 'var(--font-display)',
              color: '#18181B',
              margin: 0,
              letterSpacing: '-0.01em',
            }}
          >
            SmartConforme
          </h1>
        </div>

        {/* ── TEXTE HERO : titre principal + sous-titre ──────────────────── */}
        <div className="flex flex-col items-center mb-12" style={{ maxWidth: '600px' }}>

          {/*
            Titre principal — Satoshi 900, très grand, très noir.
            Letter-spacing négatif = style "editorial" précis, comme Linear.
          */}
          <h2
            className="text-center mb-5"
            style={{
              fontSize: '52px',
              fontWeight: 900,
              fontFamily: 'var(--font-display)',
              color: '#18181B',
              lineHeight: '1.1',
              letterSpacing: '-0.03em',
              margin: 0,
            }}
          >
            Ne ratez plus jamais{' '}
            {/* Le mot "échéance" est mis en bleu primaire pour attirer l'attention */}
            <span style={{ color: '#2563EB' }}>
              une échéance.
            </span>
          </h2>

          {/*
            Sous-titre — Instrument Sans 400, taille moyenne, couleur secondaire.
            Décrit clairement la proposition de valeur du produit.
          */}
          <p
            className="text-center"
            style={{
              fontSize: '18px',
              fontFamily: 'var(--font-body)',
              color: '#3F3F46',             // zinc-700 — lisible sans être agressif
              lineHeight: '1.6',
              margin: 0,
            }}
          >
            Vos documents réglementaires expirent. SmartConforme vous prévient
            avant qu&apos;il ne soit trop tard.
          </p>
        </div>

        {/* ── ZONE D'UPLOAD ──────────────────────────────────────────────── */}
        {/*
          La DropZone gère tout le drag & drop et l'upload du fichier PDF.
          On lui passe onResult pour qu'elle puisse déclencher un toast.
        */}
        <div className="mb-10">
          <DropZone onResult={handleDropZoneResult} />
        </div>

        {/* ── BOUTON TÉLÉCHARGER UN DOCUMENT DE TEST ─────────────────────── */}
        {/*
          Permet à l'utilisateur de télécharger un exemple de document PDF
          pour tester l'application sans avoir son propre document sous la main.
        */}
        <div className="mb-auto">
          <a href="/facture_demo.pdf" download>
            <Button variant="secondary" className="text-base">
              Télécharger un document de test
            </Button>
          </a>
        </div>

        {/* ── FOOTER ─────────────────────────────────────────────────────── */}
        <div className="mt-auto pt-12">
          <Footer />
        </div>
      </div>

      {/* ── TOAST (notification) ─────────────────────────────────────────── */}
      {/*
        MinimalToast s'affiche dans un coin de l'écran après chaque upload.
        - open : est-ce que le toast est visible ?
        - onClose : fonction appelée quand l'utilisateur ferme le toast
        - message : le texte à afficher
        - type : détermine la couleur (success = vert, error = rouge, etc.)
      */}
      <MinimalToast
        open={toastOpen}
        onClose={closeToast}
        message={toastMessage}
        type={toastType}
      />
    </>
  )
}
