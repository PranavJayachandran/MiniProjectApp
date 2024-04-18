import AsyncStorage from '@react-native-async-storage/async-storage';

export const getLayout = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "userId": await getUserId()
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    let response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/farm/layout`, requestOptions)
    let result = await response.json();
    let cropTypes = result.cropTypes;
    let grid = [7, 6, 5, 4, 3, 2, 1];
    let layout = [];
    let size = 0;
    for (let i = 0; i < result.layout.length; i++) {
        let tempRow = []
        await Promise.all(result.layout[i].map(async (item) => {
            let sprinklerState = await getSprinklerData(item);
            tempRow.push(sprinklerState);
        }))
        layout.unshift(tempRow);
        size = Math.max(size, grid[i]);
    }
    return { layout, size, cropTypes };
}
export const updateSprinklerState = async (id, cropType, sprinklerName, ifOn) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "id": id,
        "sprinklerName": sprinklerName,
        "cropType": cropType,
        "ifOn": ifOn
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    let response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/sprinkler/changeData`, requestOptions)
    let result = await response.json();
}
export const updateSprinklerMode = async (id, ifOn,time,amt) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    const raw = JSON.stringify({
        "id": id,
        "ifOn": ifOn,
        "time":time,
        "amt":amt
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    let response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/sprinkler/changeState`, requestOptions)
}
export const updateLayoutData = (id) => {
    return
}
export const getSprinklerData = async (id) => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "id": id
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    let response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/sprinkler`, requestOptions)
    let result = await response.json();
    return result.data;
}
export const setUserId = async (id) => {
    await AsyncStorage.setItem(
        'userId',
        id
    );
}
export const getUserId = async () => {
    return await AsyncStorage.getItem(
        'userId'
    );
}
export const getNumberofSprinklerOn = async () => {
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
        "userId": await getUserId()
    });

    const requestOptions = {
        method: "POST",
        headers: myHeaders,
        body: raw,
        redirect: "follow"
    };

    let response = await fetch(`${process.env.EXPO_PUBLIC_API_URL}/sprinkler/numberofsprinklerOn`, requestOptions);
    let result = await response.json();
    return result.number;
}