'use strict';

module.exports = {
  registrer: registrer,
  list: list,
  listall: list,
  ny: ny,
}

var medlemmer = [];

function ny(req, res) {
  const p = req.swagger.params;
  console.log(p.data.value);
  const id = medlemmer.length;
  medlemmer.push(p.data.value);
  res.json({
    id: id,
    links: {
      self: req.url+'/'+id,
    },
    object: p.data.value,
  })
}

function registrer(req, res) {
  const p = req.swagger.params;
  if(medlemmer[p.id.value]) {
    medlemmer[p.id.value] = p.data.value;
    res.json(p);
  } else {
    res.status(404);
    res.send("Medlem ikke funnet");
  }
}

function list(req, res) {
  if(req.swagger.params.id) {
    res.json(medlemmer[req.swagger.params.id.value]);
  } else {
    res.json(medlemmer.map((o, i) => {
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
