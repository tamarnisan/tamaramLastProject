const deleteRequest = async (url) => {

    const response = await fetch(url, {
        method: 'DELETE',
    });

    // const requestJSON = await response.json();
    const requestJSON = "e"
    return { res: requestJSON, status: response.status };
}


export default deleteRequest