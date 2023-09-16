const fetch = require('node-fetch');

exports.handler = async (event, context) => {
  const { email, listId } = JSON.parse(event.body);

  const apiKey = '3d5841c70007a337011a74cfacbcc4c2';
  const apiSecret = 'e6d8db6a84f03ba81e1f27eba486a63a';

  const apiUrl = `https://api.mailjet.com/v3/REST/contact/${email}`;
  const data = {
    IsExcludedFromCampaigns: 'false',
    ContactsLists: [{ ListID: listId }],
  };

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const errorMessage = await response.text();
      return {
        statusCode: response.status,
        body: JSON.stringify({ message: `Erreur : ${errorMessage}` }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: 'Adresse email ajoutée avec succès.' }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Erreur serveur : ${error.message}` }),
    };
  }
};
