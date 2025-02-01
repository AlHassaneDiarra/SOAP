import { NextResponse } from "next/server";
import soap from "soap";

const SOAP_SERVICE_URL = "http://localhost:8081/ws/countries.wsdl";

type CountryResponse = {
  country: {
    name: string;
    capital: string;
    population: number;
    currency: string;
  };
};

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const countryName = url.searchParams.get("name");

    console.log("Nom du pays reçu : ", countryName); // Vérifiez le nom du pays ici

    if (!countryName) {
      return NextResponse.json(
        { error: "Le nom du pays est requis" },
        { status: 400 }
      );
    }

    const client = await soap.createClientAsync(SOAP_SERVICE_URL);

    // Appel SOAP avec gestion de la réponse
    const result: CountryResponse = await new Promise((resolve, reject) => {
      client.getCountry({ name: countryName }, (err: any, response: CountryResponse) => {
        if (err) {
          console.error("Erreur SOAP:", err);
          reject(err);
        } else {
          console.log("Réponse SOAP reçue:", response); // Log de la réponse
          resolve(response);
        }
      });
    });

    if (!result || !result.country) {
      console.log("Pays introuvable ou réponse vide");
      return NextResponse.json({ error: "Pays introuvable" }, { status: 404 });
    }

    const countryInfo = {
      name: result.country.name,
      capital: result.country.capital,
      population: result.country.population,
      currency: result.country.currency,
    };

    return NextResponse.json(countryInfo);
  } catch (error) {
    console.error("Erreur lors de la requête SOAP:", error);
    return NextResponse.json({ error: "Erreur interne du serveur" }, { status: 500 });
  }
}
