"use client";

import React, { useState } from "react";

type CountryInfo = {
  name: string;
  capital: string;
  population: number;
  currency: string;
};

export default function HomePage() {
  const [country, setCountry] = useState("");
  const [countryInfo, setCountryInfo] = useState<CountryInfo | null>(null);
  const [error, setError] = useState("");

  const fetchCountryInfo = async () => {
    try {
      console.log("Nom du pays recherché:", country);  // Ajout d'un log pour afficher la valeur du pays
      const response = await fetch(`/api/country?name=${country}`);
      if (!response.ok) {
        throw new Error("Pays introuvable");
      }
      const data: CountryInfo = await response.json();
      console.log("Données reçues:", data);  // Vérification des données retournées
      setCountryInfo(data);
      setError("");
    } catch (err: any) {
      console.error("Erreur lors de la récupération des données:", err);  // Log de l'erreur
      setError(err.message);
      setCountryInfo(null);
    }
  };

  return (
    <div>
      <h1>Rechercher un pays</h1>
      <input
        type="text"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        placeholder="Nom du pays"
      />
      <button onClick={fetchCountryInfo}>Rechercher</button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {countryInfo && (
        <div>
          <h2>{countryInfo.name}</h2>
          <p>Capitale: {countryInfo.capital}</p>
          <p>Population: {countryInfo.population}</p>
          <p>Devise: {countryInfo.currency}</p>
        </div>
      )}
    </div>
  );
}
