export function getFromSession(key) {
    if(!key){
        return null;
    }
    try {
        const valueStr = sessionStorage.getItem(key);
        if(valueStr){
            return JSON.parse(valueStr);
        }
        return null;
    } catch (e) {
        return null;
    }
}

export function setInSession(key, obj) {
    if (!key) {
        console.error('Error: key is missing');
    }
    try {
        sessionStorage.setItem(key, JSON.stringify(obj));
    } catch (e) {
        console.error(e);
    }
}

export function removeSession(key) {
    sessionStorage.removeItem(key);
}

