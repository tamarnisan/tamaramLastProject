const getRequest = async (url) => {
    try {
        const request = await fetch(url);
        if (!request.ok) throw Error(request.status);
        const requestJSON = await request.json();
        return requestJSON;
    } catch (err) {
        return err.message;
    }
};
export default getRequest;
