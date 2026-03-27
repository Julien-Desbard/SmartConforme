// layout.tsx — Racine de l'application Next.js
// Ce fichier enveloppe toutes les pages avec les polices et métadonnées globales.

import type { Metadata } from "next";
import { Instrument_Sans } from "next/font/google";
import "./globals.css";

// ── POLICES ────────────────────────────────────────────────────────────────────
//
// Instrument Sans : police principale pour le corps de texte et les labels UI.
// On la charge via next/font/google pour qu'elle soit optimisée automatiquement
// (pas de flash de police non stylée, hébergement sur nos propres serveurs CDN).
//
// Note : Satoshi (police d'affichage pour les titres) est chargée via une balise
// <link> dans le <head> car Fontshare n'est pas compatible avec next/font.
// Elle est déclarée dans globals.css avec @font-face comme fallback.
// Geist Mono est chargée dans le <head> également via Google Fonts.

const instrumentSans = Instrument_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  // Variable CSS utilisée dans globals.css : font-family: var(--font-body)
  variable: "--font-instrument",
  display: "swap",
});

// ── MÉTADONNÉES ────────────────────────────────────────────────────────────────
// Ces métadonnées apparaissent dans l'onglet du navigateur et les prévisualisations
// (ex: partage sur LinkedIn, Google, etc.)

export const metadata: Metadata = {
  title: "SmartConforme — Conformité documentaire par IA",
  description:
    "Uploadez vos documents réglementaires. SmartConforme extrait les dates de validité et vous alerte avant expiration.",
};

// ── LAYOUT ROOT ────────────────────────────────────────────────────────────────
// RootLayout enveloppe toutes les pages de l'application.
// On y injecte les polices et les balises <link> pour Satoshi et Geist Mono.

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <head>
        {/* Connexion anticipée aux serveurs de polices pour accélérer le chargement */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/*
          Geist Mono — chargée depuis Google Fonts.
          Utilisée pour les dates, compteurs et statuts (tabular-nums).
        */}
        <link
          href="https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />

        {/*
          Satoshi — chargée depuis Fontshare.
          Utilisée pour les titres (Hero h1, h2) en weight 700 et 900.
          Fontshare n'est pas compatible avec next/font donc on utilise une balise link.
        */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@700,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className={instrumentSans.variable}>
        {children}
      </body>
    </html>
  );
}
