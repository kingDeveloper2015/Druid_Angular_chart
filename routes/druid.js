var express = require('express');
var router = express.Router();
var Druid = require('druid-query');
var Client =Druid.Client;
var query = Druid.Query;
var client = new Client('http://52.91.151.121:8082');
var path = require("path")
router.get('/',function(req,res){
	res.sendFile(__dirname + '/index.html');
});

router.get('/guid',function(req,res){
	var q1 = client.timeseries();
	q1.dataSource('obi-auth-1');
	q1.granularity('day');
 // q1.aggregation('count','guid_unique');
//Query.filter('regex', dimension, pattern)
 // q1.filter('regex','auth_flag','A.........');
	q1.aggregation('cardinality','val',['guid'],true);
//  q1.postAggregation('arithmetic',"avg_random","/",[query.postAggregation('fieldAccess',"d","guid")])
 // .interval(Date.UTC(2016, 1, 30,1,20),Date.UTC(2016,2,29,1,20));
//  Query.postAggregation('fieldAccess', name, fieldName)
//Query.aggregation('cardinality', name, fieldNames, byRow)
 // q1.postAggregation('fieldAccess','d','guid').interval(Date.UTC(2015, 12, 30,1,20),Date.UTC(2016, 2, 29,1,20));
	q1.interval(Date.UTC(2015, 12, 30,0,20),Date.UTC(2016, 1, 30,0,20));
	q1.exec(function(err,result){
		if(err){
			res.send(err);
		} else {
			console.log(result);
			res.setHeader("Access-Control-Allow-Origin","*");
			res.send(result);
		}
	});
});


router.get('/success',function(req,res){
	var q1 = client.timeseries();
		q1.dataSource('obi-auth-1');
		q1.granularity('day');
	    q1.filter('regex','auth_flag','A.........');
		q1.aggregation('cardinality','val',['guid'],true);
		q1.interval(Date.UTC(2015, 12, 30,0,20),Date.UTC(2016, 1, 30,0,20));
		q1.exec(function(err,result){
			if(err){
				res.send(err);
			} else {
				console.log(result);
				res.setHeader("Access-Control-Allow-Origin","*");
				res.send(result);
			}
		});
});
router.get('/transaction',function(req,res){
	var q1 = client.timeseries();
		q1.dataSource('obi-auth-1');
		q1.granularity('day');
	    q1.filter('regex','auth_flag','A.........');
		//q1.aggregation('cardinality','val',['guid'],true);
		q1.aggregation('count','transaction_div');
		q1.interval(Date.UTC(2015, 12, 30,0,20),Date.UTC(2016, 1, 30,0,20));
		q1.exec(function(err,result){
			if(err){
				res.send(err);
			} else {
				console.log(result);
				res.setHeader("Access-Control-Allow-Origin","*");
				res.send(result);
			}
		});
});

router.get('/transaction1',function(req,res){
	var q1 = client.timeseries();
		q1.dataSource('obi-auth-1');
		q1.granularity('day');
//		q1.aggregation('cardinality','val',['transaction_div'],true);
		q1.aggregation('count','trans_action');
		q1.interval(Date.UTC(2015, 12, 30,0,20),Date.UTC(2016, 1, 30,0,20));
		q1.exec(function(err,result){
			if(err){
				res.send(err);
			} else {
				console.log(result);
				res.setHeader("Access-Control-Allow-Origin","*");
				res.send(result);
			}
		});
});

module.exports = router;