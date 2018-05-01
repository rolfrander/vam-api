'use strict';

module.exports = {
  registrer: registrer,
  list: list,
  listall: list,
  ny: ny,
}

var medlemmer = [];

function ny(req, res) {
  console.log(req);
  const p = req.swagger.params;
  medlemmer.push(p.data.value);
  const id = medlemmer.length;
  res.json({
    id: id,
    links: {
      self: req.url+'/'+id,
    },
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
