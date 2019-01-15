import fetch from "cross-fetch";

export default class PostcodeLookupGateway {
  async getCoordinates(postcodes) {
    let response = await fetch(
      `${process.env.REACT_APP_POSTCODE_API_URL}api/v1/geolocation`,
      {
        method: "POST",
        body: JSON.stringify(postcodes),
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    let jsonResponse = await response.json();

    return jsonResponse.map(({ latitude, longitude }) => ({
      lat: latitude,
      lng: longitude
    }));
  }
}
