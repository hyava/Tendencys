const axios = require("axios");

const generateGuide = async (guiaCounter, API_KEY) => {
  const apiUrl = "https://api-test.envia.com/ship/generate/";

  const params = {
    origin: {
      name: "Envia",
      company: "Test",
      email: "test@envia.com",
      phone: "8182000536",
      street: "351523",
      number: "crest ave",
      district: "",
      city: "dallas",
      state: "tx",
      category: 1,
      country: "US",
      postalCode: "75205",
      reference: "",
      coordinates: {
        latitude: "32.776272",
        longitude: "-96.796856",
      },
    },
    destination: {
      name: "Envia",
      company: "Test",
      email: "test@envia.com",
      phone: "8180127128",
      street: "New port",
      number: "1400",
      district: "",
      city: "South Beach",
      state: "fl",
      category: 1,
      country: "US",
      postalCode: "33182",
      reference: "",
      coordinates: {
        latitude: "25.786362",
        longitude: "-80.417856",
      },
    },
    packages: [
      {
        content: "zapatos",
        boxCode: "",
        amount: 1,
        type: "box",
        weight: 1,
        insurance: 0,
        declaredValue: 0,
        weightUnit: "KG",
        lengthUnit: "CM",
        dimensions: {
          length: 11,
          width: 15,
          height: 20,
        },
      },
    ],
    shipment: {
      carrier: "ups",
      type: 1,
      service: "ground",
    },
    settings: {
      printFormat: "PDF",
      printSize: "STOCK_4X6",
      currency: "USD",
    },
    additionalServices: ["electronic_signature"],
  };

  try {
    const response = await axios.post(apiUrl, params, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    });

    console.log("Guía generada con éxito:", response.data);
    guiaCounter++;
    return { guiaCounter, result: response.data };
  } catch (error) {
    console.error("Error al generar la guía:", error.message);
    return { guiaCounter, error: error.message };
  }
};

module.exports = generateGuide;
