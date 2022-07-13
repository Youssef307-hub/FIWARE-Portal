document.getElementById("getInfo1").addEventListener("click", myFunction1);
document.getElementById("getInfo2").addEventListener("click", myFunction2);

document.getElementById("hideInfo1").addEventListener("click", hideFunction1);
document.getElementById("hideInfo2").addEventListener("click", hideFunction2);

function hideFunction1(){
    document.getElementById("info1").innerHTML = ` `;
}
function hideFunction2(){
    document.getElementById("info2").innerHTML = ` `;
}

const getDeviceInformation = (deviceId) =>
    fetch(`http://localhost:4041/iot/devices/${deviceId}`, {
        method: "GET",
        mode: "cors",

        headers: {
            "fiware-service": "openiot",
            "fiware-servicepath": "/",
            "content-Type": "application/json",
        },
    })
    .then((res) => {
        if (res.status === 200) {
            return res.json();
        } else {
            throw new Error(res.statusText);
        }
    })
    .then((data) => data);


const getDeviceReading = (deviceName) => {
    const headers = new Headers();
    headers.set('fiware-service', 'openiot')
    headers.set('fiware-servicepath', '/')
    return fetch(`http://localhost:1026/v2/entities/${encodeURIComponent(deviceName)}?options=keyValues`, {
            method: "GET",
            mode: 'cors',
            headers
        })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then((data) => data['count'])

    ;
}
const getActuatorState = (ActuatorID) => {
    const headers = new Headers();
    headers.set('fiware-service', 'openiot')
    headers.set('fiware-servicepath', '/')
    return fetch(`http://localhost:1026/v2/entities/${encodeURIComponent(ActuatorID)}?options=keyValues`, {
            method: "GET",
            mode: 'cors',
            headers
        })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then((data) => data)

    ;
}

const getEntityInfo = (EntityName) => {
    const headers = new Headers();
    headers.set('Content-Type', 'application/json')
    return fetch(`http://localhost:1026/v2/entities/${EntityName}`, {
            method: "GET",
            mode: 'cors',
            //headers
        })
        .then((res) => {
            if (res.status === 200) {
                return res.json();
            } else {
                throw new Error(res.statusText);
            }
        })
        .then((data) => data)
    ;
}


async function myFunction1() {
    const data = await getEntityInfo("urn:ngsi-ld:Greenhouse:001");
    document.getElementById("info1").innerHTML = 
    `<div id="firstInfo">
    <h4>ID : </h4><span>${data['id']}</span><br>
    <h4>Name : </h4><span>${data['name']['value']}</span><br>
    <h4>Description : </h4><span>${data['description']['value']}</span><br>
    <h4>Address Locality : </h4><span>${data['address']['value']['addressLocality']}</span><br>
    <h4>Country : </h4><span>${data['address']['value']['addressCountry']}</span><br>
    <h4>Street Address : </h4><span>${data['address']['value']['streetAddress']}</span><br>
    <h4>Location Coordinates : </h4><span>${data['location']['value']['coordinates']}</span></div>`;
};

async function myFunction2() {
    const data = await getEntityInfo("urn:ngsi-ld:Greenhouse:002");
    document.getElementById("info2").innerHTML = 
    `<div id="secondInfo">
    <h4>ID : </h4><span>${data['id']}</span><br>
    <h4>Name : </h4><span>${data['name']['value']}</span><br>
    <h4>Description : </h4><span>${data['description']['value']}</span><br>
    <h4>Address Locality : </h4><span>${data['address']['value']['addressLocality']}</span><br>
    <h4>Country : </h4><span>${data['address']['value']['addressCountry']}</span><br>
    <h4>Street Address : </h4><span>${data['address']['value']['streetAddress']}</span><br>
    <h4>Location Coordinates : </h4><span>${data['location']['value']['coordinates']}</span></div>`;
}

// Get the sensors reading every 5 seconds and display it 
setInterval(async() => {
    const data = await getDeviceReading("urn:ngsi-ld:SoilMoisture:001");
    document.getElementById("sm1").innerHTML = data;
    const ActuatorData = await getActuatorState("urn:ngsi-ld:Sprinkler:001");
    document.getElementById("sprinkler1").innerHTML = ActuatorData['state'];
}, 5000)

setInterval(async() => {
    const data = await getDeviceReading("urn:ngsi-ld:SoilMoisture:002");
    document.getElementById("sm2").innerHTML = data;
    const ActuatorData = await getActuatorState("urn:ngsi-ld:Sprinkler:001");
    document.getElementById("sprinkler2").innerHTML = ActuatorData['state'];
}, 5000)

setInterval(async() => {
    const data = await getDeviceReading("urn:ngsi-ld:Humidity:001");
    document.getElementById("h1").innerHTML = data;
    const ActuatorData = await getActuatorState("urn:ngsi-ld:HumidityBell:001");
    document.getElementById("humiditybell1").innerHTML = ActuatorData['state'];
}, 5000)

setInterval(async() => {
    const data = await getDeviceReading("urn:ngsi-ld:Humidity:002");
    document.getElementById("h2").innerHTML = data;
    const ActuatorData = await getActuatorState("urn:ngsi-ld:HumidityBell:002");
    document.getElementById("humiditybell2").innerHTML = ActuatorData['state'];
}, 5000)

setInterval(async() => {
    const data = await getDeviceReading("urn:ngsi-ld:Temperature:001");
    document.getElementById("t1").innerHTML = data;
    const ActuatorData = await getActuatorState("urn:ngsi-ld:TempBell:001");
    document.getElementById("tempbell1").innerHTML = ActuatorData['state'];
}, 5000)

setInterval(async() => {
    const data = await getDeviceReading("urn:ngsi-ld:Temperature:002");
    document.getElementById("t2").innerHTML = data;
    const ActuatorData = await getActuatorState("urn:ngsi-ld:TempBell:002");
    document.getElementById("tempbell2").innerHTML = ActuatorData['state'];
}, 5000)

setInterval(async() => {
    const data = await getDeviceReading("urn:ngsi-ld:Light:001");
    document.getElementById("l1").innerHTML = data;
    const ActuatorData = await getActuatorState("urn:ngsi-ld:Lamp:001");
    document.getElementById("lamp1").innerHTML = ActuatorData['state'];
}, 5000)

setInterval(async() => {
    const data = await getDeviceReading("urn:ngsi-ld:Light:002");
    document.getElementById("l2").innerHTML = data;
    const ActuatorData = await getActuatorState("urn:ngsi-ld:Lamp:002");
    document.getElementById("lamp2").innerHTML = ActuatorData['state'];
}, 5000)

setInterval(async() => {
    const data = await getDeviceReading("urn:ngsi-ld:CO2:001");
    document.getElementById("c1").innerHTML = data;
    const ActuatorData = await getActuatorState("urn:ngsi-ld:CO2Bell:001");
    document.getElementById("co2bell1").innerHTML = ActuatorData['state'];
}, 5000)

setInterval(async() => {
    const data = await getDeviceReading("urn:ngsi-ld:CO2:002");
    document.getElementById("c2").innerHTML = data;
    const ActuatorData = await getActuatorState("urn:ngsi-ld:CO2Bell:002");
    document.getElementById("co2bell2").innerHTML = ActuatorData['state'];
}, 5000)