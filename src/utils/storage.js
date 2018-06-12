export function getFromStorage(key) {
    if(!key){
        return null;
    }
    try {
        const valueStr = localStorage.getItem(key);
        if(valueStr){
            return JSON.parse(valueStr);
        }
        return null;
    } catch (e) {
        return null;
    }
}

export function setInStorage(key, obj) {
    if (!key) {
        console.error('Error: key is missing');
    }
    try {
        localStorage.setItem(key, JSON.stringify(obj));
    } catch (e) {
        console.error(e);
    }
}

export function removeStorage(key) {
    localStorage.removeItem(key);
}

export function setupTimeOut() {
    let hours = 24; // Reset when storage is more than 24hours
    let now = new Date().getTime();
    let setupTime = localStorage.getItem('setupTime');
    if (setupTime == null) {
        localStorage.setItem('setupTime', now)
    } else {
        if(now-setupTime > hours*60*60*1000) {
            localStorage.clear()
            localStorage.setItem('setupTime', now);
        }
    }
}

