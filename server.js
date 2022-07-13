const express = require("express");
const path = require("path");
const router = express.Router();
const bodyParser = require("body-parser");
const cors = require('cors');
const app = express();
const port = 8000;
const fetch = require('node-fetch');
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.json());
const API_KEY = "4jggokgpepnvsb2uv4s40d59ov";
app.use("/", router);

app.use("/css", express.static(path.join(__dirname, "node_modules/bootstrap/dist/css")));
app.use("/js",express.static(path.join(__dirname, "node_modules/bootstrap/dist/js")));
app.use("/js",express.static(path.join(__dirname, "node_modules/jquery/dist")));

router.get("/", function(req, res) { res.sendFile(path.join(__dirname + "/index.html"))});

const myServer = app.listen(port, () => {console.log(`The app is listening on port: ${port}`);});


const changeDeviceMeasurement = (deviceId, payload) =>
    fetch(`http://localhost:7896/iot/json?k=${API_KEY}&i=${deviceId}`, {
        method: "POST",
        headers: {
            "fiware-service": "openiot",
            "fiware-servicepath": "/",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    .then((res) => {
        if (res.ok) {
            return res.json();
        } else {
            throw new Error(res.statusText);
        }
    })
    .then((data) => data);

    const changeActuatorState = (ActuatorID, payload) =>
    fetch(`http://localhost:1026/v2/entities/${encodeURIComponent(ActuatorID)}/attrs`, {
        method: "PATCH",
        headers: {
            "fiware-service": "openiot",
            "fiware-servicepath": "/",
            "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
    })
    .then((res) => {
        if (res.status !== 204) {
            throw new Error("Couldn't update");
        }
    });

function generateRandom(min, max) {
    let difference = max - min;
    let rand = Math.random();
    rand = Math.floor(rand * difference);
    rand = rand + min;
    return rand;
}

// Change Devices Measurments based on the dummy sensor reading
setInterval(async() => {
    const value = generateRandom(445, 655)
    await changeDeviceMeasurement('soilmoisture001', {sm: value})
    if(value < 460){
        await changeActuatorState("urn:ngsi-ld:Sprinkler:001", {
            "on": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "ON"
            }
        })
    }else{
        await changeActuatorState("urn:ngsi-ld:Sprinkler:001", {
            "off": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "OFF"
            }
        })
    }
}, 5000)

setInterval(async() => {
    const value = generateRandom(445, 655)
    await changeDeviceMeasurement('soilmoisture002', {sm: value})
    if(value < 460){
        await changeActuatorState("urn:ngsi-ld:Sprinkler:002", {
            "on": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "ON"
            }
        })
    }else{
        await changeActuatorState("urn:ngsi-ld:Sprinkler:002", {
            "off": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "OFF"
            }
        })
    }
}, 5000)

setInterval(async() => {
    const value = generateRandom(10, 40)
    await changeDeviceMeasurement('temperature001', {t: value})
    if(value < 15){
        await changeActuatorState("urn:ngsi-ld:TempBell:001", {
            "on": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "ON"
            }
        })
    }else{
        await changeActuatorState("urn:ngsi-ld:TempBell:001", {
            "off": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "OFF"
            }
        })
    }
}, 5000)

setInterval(async() => {
    const value = generateRandom(10, 40)
    await changeDeviceMeasurement('temperature002', {t: value})
    if(value < 15){
        await changeActuatorState("urn:ngsi-ld:TempBell:002", {
            "on": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "ON"
            }
        })
    }else{
        await changeActuatorState("urn:ngsi-ld:TempBell:002", {
            "off": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "OFF"
            }
        })
    }
}, 5000)

setInterval(async() => {
    const value = generateRandom(60, 85)
    await changeDeviceMeasurement('humidity001', {h: value})
    if(value < 65){
        await changeActuatorState("urn:ngsi-ld:HumidityBell:001", {
            "on": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "ON"
            }
        })
    }else{
        await changeActuatorState("urn:ngsi-ld:HumidityBell:001", {
            "off": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "OFF"
            }
        })
    }
}, 5000)

setInterval(async() => {
    const value = generateRandom(60, 85)
    await changeDeviceMeasurement('humidity002', {h: value})
    if(value < 65){
        await changeActuatorState("urn:ngsi-ld:HumidityBell:002", {
            "on": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "ON"
            }
        })
    }else{
        await changeActuatorState("urn:ngsi-ld:HumidityBell:002", {
            "off": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "OFF"
            }
        })
    }
}, 5000)

setInterval(async() => {
    const value = generateRandom(1385, 1685)
    await changeDeviceMeasurement('light001', {l: value})
    if(value < 1450){
        await changeActuatorState("urn:ngsi-ld:Lamp:001", {
            "on": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "ON"
            }
        })
    }else{
        await changeActuatorState("urn:ngsi-ld:Lamp:001", {
            "off": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "OFF"
            }
        })
    }
}, 5000)

setInterval(async() => {
    const value = generateRandom(1385, 1685)
    await changeDeviceMeasurement('light002', {l: value})
    if(value < 1450){
        await changeActuatorState("urn:ngsi-ld:Lamp:002", {
            "on": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "ON"
            }
        })
    }else{
        await changeActuatorState("urn:ngsi-ld:Lamp:002", {
            "off": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "OFF"
            }
        })
    }
}, 5000)

setInterval(async() => {
    const value = generateRandom(395, 705)
    await changeDeviceMeasurement('co2001', {c: value})
    if(value < 450){
        await changeActuatorState("urn:ngsi-ld:CO2Bell:001", {
            "on": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "ON"
            }
        })
    }else{
        await changeActuatorState("urn:ngsi-ld:CO2Bell:001", {
            "off": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "OFF"
            }
        })
    }
}, 5000)

setInterval(async() => {
    const value = generateRandom(395, 705)
    await changeDeviceMeasurement('co2002', {c: value})
    if(value < 450){
        await changeActuatorState("urn:ngsi-ld:CO2Bell:002", {
            "on": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "ON"
            }
        })
    }else{
        await changeActuatorState("urn:ngsi-ld:CO2Bell:002", {
            "off": {
                "type": "command",
                "value": ""
            },
            "state":{
                "type":"Text",
                "value": "OFF"
            }
        })
    }
}, 5000)