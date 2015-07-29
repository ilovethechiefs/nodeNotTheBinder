var mongoose = require('mongoose');

// Case Schema
var CaseSchema = mongoose.Schema({
  firstname: {
    type: String, required: true
  },
  lastname: {
    type: String, required: true
  },
  dob: {
    type: Date, required: true
  },
  dos: {
    type: Date, required: true
  },
  contactinfo: [{ 
    phonetype: String,
    name: String,
    number: String
  }],
  insurance: { 
    type: Array,
    "default": []
  },
  procedure: {
    type: Array,
    "default": []
  },
  duration: {
    type: Number
  },
  reservation: {
    type: String
  },
  precert: {
    type: String
  },
  coordinator: {
    type: String
  },
  idx: {
    type: String
  },
  ORSched: {
    type: String
  },
  prereg: {
    type: String
  },
  chart: {
    type: String
  },
  idxnotes: {
    type: String
  },
  confirmed: {
    type: String
  },
  coming: {
    type: String
  },
  insuranceConf: {
    type: String
  },
  preop: {
    type: String
  },
  sdm: {
    type: String
  },
  cancel: {
    type: String
  }
});

var Case = module.exports = mongoose.model('Case', CaseSchema);

module.exports.createCase = function(newCase, callback) {
  newCase.save(callback);
};

module.exports.getCaseById = function(id, callback){
  Case.findById(id, callback);
}

module.exports.findAllCases = function(callback) {
  var res = null;
  Case.find({}, {}, function (err, docs) {
    if (err) throw err;
    console.log(docs);
    return docs;
  });
  return res;
}
