const postRequest = async (obj, url) => {
    console.log('url: ', url);
    const postOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(obj),
    };

    const request = await fetch(url, postOptions);
    const requestJSON = await request.json();
    return { res: requestJSON, status: request.status };
};
export default postRequest;
