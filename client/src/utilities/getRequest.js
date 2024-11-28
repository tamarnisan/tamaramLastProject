const GetRequest = async (url) => {
    const request = await fetch(url);
    const requestJSON = await request.json();
    return { res: requestJSON, status: request.status };
};
export default GetRequest;

