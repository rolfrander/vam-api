'use strict';

module.exports = {
  registrer: registrer,
  list: list,
  listall: list,
  ny: ny,
  hentInstrumenter: hentInstrumenter
}

/*
Standard struktur for medlemsinfo:

{"id":0,
 "links":{
   "self":"/medlemmer/0"
  },
  "object":{
    "navn":"rolf",
    "hovedinstrument":"slagverk",
    "biinstrumenter": ["obo", "fagott"],
    "status": "aktiv"
  }
}
*/

var medlemmer = [];

var instrumenter = [
  "fløyte",
  "obo",
  "klarinett",
  "fagott",
  "saxofon",
  "horn",
  "trompet",
  "trombone",
  "euphonium",
  "tuba",
  "slagverk",
  "piano",
  "bass"
];

var status = [
  "aktiv",
  "permisjon",
  "slettet"
];

function hentInstrumenter(req, res) {
  res.json(instrumenter);
}

function lagre(id, input) {
  input.hovedinstrument = input.hovedinstrument.toLowerCase();
  if(!instrumenter.includes(input.hovedinstrument)) {
    res.statusCode = 400;
    res.statusMessage = "Ikke instrument: "+input.hovedinstrument;
    return;
  }
  var biinst = [];
  var i;
  for(i of input.biinstrumenter) {
    i = i.toLowerCase();
    if(!instrumenter.includes(i)) {
      res.statusCode=400;
      res.statusMessage="Ikke bi-instrument: "+i;
    }
    biinst.push(i);
  }
  var nytt_medlem = {
    navn: input.navn,
    hovedinstrument: input.hovedinstrument,
    biinstrumenter: biinst,
    status: "aktiv"
  }
  medlemmer[id]=nytt_medlem;
  return nytt_medlem;
}

function endre(req, res) {
  const input = req.swagger.params.data.value;
  const id = input.id;
  // TODO sjekke at id finnes
  const nytt_medlem = lagre(id, input);

  res.json({
    id: id,
    links: {
      self: req.url+'/'+id,
    },
    object: nytt_medlem,
  })

}

function ny(req, res) {
  const input = req.swagger.params.data.value;
  const id = medlemmer.length;

  const nytt_medlem = lagre(id, input);

  res.json({
    id: id,
    links: {
      self: req.url+'/'+id,
    },
    object: nytt_medlem,
  })

}

function registrer(req, res) {
  const p = req.swagger.params;
  if(medlemmer[p.id.value]) {
    medlemmer[p.id.value] = p.data.value;
    res.json(p);
  } else {
    res.statusCode = 404;
    res.statusMessage = "Medlem ikke funnet";
  }
}

function list(req, res) {
  if(req.swagger.params.id) {
    res.json(medlemmer[req.swagger.params.id.value]);
  } else {
    res.json(medlemmer.filter(o => o.status !== "slettet").map((o, i) => {
      return({
        id: i,
        links: {
          self: req.url+"/"+i
        },
        object: o,
      });
    }));
  }
}
