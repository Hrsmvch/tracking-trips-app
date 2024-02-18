const getLocationFromZipCode = async (zipCode: string): Promise<{ city: string; state: string } | any | null> => {
  try {
    if (zipCode.length !== 5 || isNaN(parseInt(zipCode))) {
      throw new Error('Please enter a valid 5-digit zip code.');
    }

    const response = await fetch(`http://api.zippopotam.us/us/${zipCode}`);

    if (!response.ok) {
      throw new Error('Failed to fetch location data');
    }

    const data = await response.json();
    const firstPlace = data.places[0];

    const { ['place name']: city, ['state abbreviation']: state_abbr, ...rest } = firstPlace;
    return { city, state_abbr, ...rest };

  } catch (error) {
    console.error('Error fetching location data:', error);
    return null;
  }
};

export default getLocationFromZipCode;
