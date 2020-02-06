export const tripsHelper = async () => {
  try {
    const rawResponse = await fetch(`http://localhost:3001/trip`);
    const response = await rawResponse.json();
    return response;
  } catch (e) {
    console.log(e);
  }
};
