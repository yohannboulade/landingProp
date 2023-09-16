import fetch from 'node-fetch';

exports.handler = async (event, context) => {
  // Récupère les données d'email et listId à partir du corps de la requête
  const { email, listId } = JSON.parse(event.body);

  // Vos clés d'API Mailjet
  const apiKey = '3d5841c70007a337011a74cfacbcc4c2';
  const apiSecret = 'e6d8db6a84f03ba81e1f27eba486a63a';

  // Construit l'URL de l'API Mailjet pour ajouter l'email à la liste
  const apiUrl = `https://api.mailjet.com/v3/REST/contact/${email}`;
  const data = {
    IsExcludedFromCampaigns: 'false',
    ContactsLists: [{ ListID: listId }],
  };

  try {
    // Effectue la requête POST à l'API Mailjet
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
      },
      body: JSON.stringify(data),
    });

    // Gère la réponse de l'API Mailjet
    if (!response.ok) {
      const errorMessage = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: `Erreur : ${errorMessage}` }),
      };
    }

    // Si la requête s'est bien passée
    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Adresse email ajoutée avec succès.' }),
    };
  } catch (error) {
    // Gère les erreurs de la requête
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Erreur serveur : ${error.message}` }),
    };
  }
};