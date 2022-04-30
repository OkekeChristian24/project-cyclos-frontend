const isValidUrl = (string) => {
    let url;
    try {
        url = new URL(string);
    } catch (error) {
        return false;  
    }

    return url.protocol === "http:" || url.protocol === "https:";
}

export default isValidUrl;