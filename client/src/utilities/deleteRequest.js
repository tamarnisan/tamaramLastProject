const deleteRequest = async (url) => {

    const response = await fetch(url, {
        method: 'DELETE',
    });

    const requestJSON = await response.json();
    return { res: requestJSON, status: response.status };
}


export default deleteRequest