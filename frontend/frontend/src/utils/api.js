export const API_URL = 'http://localhost:5000'

export const postData = async (url, data) => {
    const res = await fetch(`${API_URL}${url}`, {
        method: 'post',
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
    });

    return res.json();
}

export const getData = async(url) => {
    const res = await fetch(`${API_URL}${url}`)
    return res.json();
}