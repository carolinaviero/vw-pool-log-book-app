export const tripsHelperFn = async () => {
    try {
        const rawResponse = await fetch(`http://localhost:3001/trip`);
        const response = await rawResponse.json();
        return response;
    } catch (e) {
        console.log(e);
    }
};

export const startTripHelperFn = async (trip) => {
    try {
        const options = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            method: "PUT",
            body: JSON.stringify(trip)
        };
        const response = await fetch(`http://localhost:3001/trip/edit/${trip.id}`, options);
        return response;
    } catch(e) {
        console.log(e);
    }
};

export const bookingHelperFn = async(trip) => {
    try {
        const options = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
            method: "POST",
            body: JSON.stringify(trip)
        };
        const response = await fetch(`http://localhost:3001/trip/create`, options);
        return response;
    } catch(e) {
        console.log(e);
    }
}
