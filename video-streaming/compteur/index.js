const express = require("express");
const http = require("http");
const mongodb = require("mongodb");
const amqp = require("amqplib");

const app = express();


const RABBIT = process.env.RABBIT;

function connectRabbit() {

    console.log(`Connecting to RabbitMQ server at ${RABBIT}.`);
    
    amqp.connect(RABBIT,function(error0, connection) { 
        console.log(`Connecting to RabbitMQ server at ${RABBIT}.`);

    return amqp.connect(RABBIT) // Connect to the RabbitMQ server.
        .then(messagingConnection => {
            console.log("Connected to RabbitMQ.");

            return messagingConnection.createChannel(); // Create a RabbitMQ messaging channel.
        });
            });
     
    }
    
function main () {
    connectRabbit()
    app.get("/test",(req,res) =>{

    res.send("allo")

    });

   


    app.listen(3000, () => {
        console.log("compteur is up")
    });

}
main()