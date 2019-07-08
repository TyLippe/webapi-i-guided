const express = require("express");

const Hubs = require("./data/hubs-model.js");

const server = express();

server.use(express.json())

server.get("/", (req, res) => {
    res.send("Hello web20 node edition");
});

//read
server.get("/hubs", function (req, res) {
    Hubs.find()
        .then(hubs => {
            res.status(200).json(hubs);
        })
        .catch(err => {
            res.status(500).json(err);
        });
});

//add
server.post('/hubs', (req, res) => {
    const hubInfo = req.body;
    console.log(hubInfo);

    Hubs.add(hubInfo)
        .then(hub => { 
            res.status(201).json(hub);
        })
        .catch(err => {
            res.status(500).json(err);
        });
})

//delete
server.delete('/hubs/:id', (req, res) => {
    const { id } = req.params;

    Hubs.remove(id)
        .then(deleted => { 
            if(deleted) {
                res.status(204).end();
        }   else {
            res.status(404).json({ message: 'cannot find that hub'})
        }})
        .catch(err => {
            res.status(500).json(err);
        });
})

//update
server.put('/hubs/:id', (req, res) => {
    const id = req.params.id;
    const changes = req.body

    Hubs.update(id, changes)
        .then(updated => {
            if(updated) {
                res.status(200).end();
        }   else {
            res.status(404).json({ message: 'Cannot find that hub'})
        }})
        .catch(err => {
            res.status(500).json(err);
    });
})

const port = 5000;
server.listen(port, () => console.log(`running on port ${port}`));