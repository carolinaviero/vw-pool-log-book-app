export const tripsHelperFn = async () => {
    try {
        const rawResponse = await fetch(`https://vw-carpool-backend.herokuapp.com/trip`);
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
        const response = await fetch(`https://vw-carpool-backend.herokuapp.com/trip/edit/${trip.id}`, options);
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
        const response = await fetch(`https://vw-carpool-backend.herokuapp.com/trip/create`, options);
        return response;
    } catch(e) {
        console.log(e);
    }
};

export const metricsHelperFn = async() => {
    try {
        const options = {
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Content-Type": "application/json"
            },
        };
        const rawResponse = await fetch(`https://vw-carpool-backend.herokuapp.com/trip/metrics`, options);
        const response = await rawResponse.json();
        console.log(response);
        return response;
    } catch(e) {
        console.log(e);
    }
};
