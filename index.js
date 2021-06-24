import { createAlchemyWeb3 } from "@alch/alchemy-web3";


// Using HTTPS
const web3 = createAlchemyWeb3(
  "https://eth-mainnet.alchemyapi.io/v2/lL7JKoLn0pxMORx9WwWUteHZa2Ly4aOk",

// Load express module and initialising the object
var express = require('express');
var app = express();
var router = express.Router();

var OAuth = require('OAuth');



// Load request module
var request = require('request');

// environment variables. Setting the environment as development, which will be used to fetch the development config values.
process.env.NODE_ENV = 'development';

// Load request module
var lodash = require('lodash');

// loading config values
const config = require('../config/config.json');
const defaultConfig = config.development;
const environment = process.env.NODE_ENV || 'development';
const environmentConfig = config[environment];
const finalConfig = lodash.merge(defaultConfig, environmentConfig);

// as a best practice all global variables should be referenced via global syntax and their names should always begin with g
global.gConfig = finalConfig;

// this function routes the HTTP GET Requests to the provide URL path which is being specified with the specified access token and access keys
app.get(global.gConfig.app_uri, function(req, res) {
  // Reading the tweet id passed in the request URL
	var address = req.params['address'];
	var tokenAddress = req.params['tokenAddress'];
       const isItDoneYet = new Promise((resolve, reject) => {
   web3.alchemy.getTokenBalances(address, tokenAdress).then( balances => {
	   function (error, data, response){
    if (error) console.error(error);
    data = JSON.parse(data);
    // console.log(JSON.stringify(data, 0, 2));
    // console.log(response.body);
   console.log(JSON.stringify(balances, 0, 2));
   res.end(JSON.stringify(balances, 0, 2));


}); 
	
})
.catch(err => {
      console.error(err)
    })
});
	   
	 ;

// setting the application to listen on port configured in the config file
var server = app.listen(global.gConfig.node_port, function() {
    var host = server.address().address
    var port = server.address().port
    console.log("Fetch Tweet Details app listening at %s", port)

})


module.exports = router;
