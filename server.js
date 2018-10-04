//declaracion de cliente mongo db y ConnectionString
var express = require("express");
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
var decks = {"decks":[
    { id: 1, name: 'Aggro',
      red:0,white:0,black:0,blue:0,green:0,lands:0},
    { id: 2, name: 'Azorius',
      red:0,white:0,black:0,blue:0,green:0,lands:0 },
    { id: 3, name: 'Golgari',
      red:0,white:0,black:0,blue:0,green:0,lands:0 },
    { id: 4, name: 'Mana Rampage',
      red:0,white:0,black:0,blue:0,green:0,lands:0 },
    { id: 5, name: 'Eldrazi Rampage',
      red:0,white:0,black:0,blue:0,green:0,lands:0 },
    { id: 6, name: 'Control',
      red:0,white:0,black:0,blue:0,green:0,lands:0 }
  ]};
  

//declaracion de los servicios API
app.get("/api/v1/deck/:id?", (req, res) => {
    var id = req.params.id;
    if (id===undefined)
    {
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify(decks));
        res.end();
    }
    else
    {
        var filtered_decks = decks.decks.filter(x => x.name==id)
        if( filtered_decks.length>0 )
        {
            res.writeHead(200, {"Content-Type": "application/json"});
            res.write(JSON.stringify(filtered_decks));
            res.end();  
            
        }
        else
        {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.write("404 Not found");
            res.end();
        }
        
    }
   });

app.post('/api/v1/deck', function(req, res) {
    var deck = req.body;
    var filtered_decks = decks.decks.filter(x => x.name===deck.name);
    if(filtered_decks.length>0)
    {
        res.writeHead(409, {"Content-Type": "text/plain"});
        res.write("409 Conflict Item already exist");
        res.end();
    }
    else
    {
        decks.decks.push(deck);
        res.writeHead(200, {"Content-Type": "application/json"});
        res.write(JSON.stringify({status:"ok"}));
        res.end();
    }  
});

app.put("/api/v1/deck/:id", (req, res) => {
    var id = req.params.id;
    var filtered_decks = decks.decks.filter(x => x.id==id)
    console.log(filtered_decks);
    if( filtered_decks.length>0 )
    { 
        //mandar a cambiar el deck
        for(var d in decks.decks)
        {
            if(d.name==id)
            {
                
                break;
            }
        }
    }
    else
    {
        res.writeHead(404, {"Content-Type": "text/plain"});
        res.write("404 Not found");
        res.end();
    }
   });

   app.delete("/api/v1/deck/:id", (req, res) => {
    var id = req.params.id;
    var filtered_decks = decks.decks.filter(x => x.name==id)
    if( filtered_decks.length>0 )
        { 
            // decks.decks.splice(x => x.id !==id)
            decks.decks = decks.decks.filter(x => x.name!==id)
            res.writeHead(200, {"Content-Type": "text/plain"});
            res.write("ok");
            res.end();
        }
        else
        {
            res.writeHead(404, {"Content-Type": "text/plain"});
            res.write("404 Not found");
            res.end();
        }
   });

//levantamos el servidor
function createServer(){
    app.listen(3000, () => {
    console.log("Server running on port 3000");
    });
}

//ejecuccion 
createServer();
