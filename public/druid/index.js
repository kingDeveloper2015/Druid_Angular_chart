
var myApp = angular.module('myApp',['ng-fusioncharts']);

myApp.controller('MyController', function($scope,$http) {
	//Define the `myDataSource` scope variable.
	$scope.attrs = {

		"caption": "Authorization Daily",
		"subCaption": "From January to February",
		"xAxisname": "Month",
		"pYAxisName": "Amount",
		"sYAxisName": "Percent %",
		"numberPrefix": "$",
		"sNumberSuffix": "%",
		"sYAxisMaxValue": "50",
		"numDivLines": "9",
		"theme": "fint"
	};
	
	//put the Category
	
	$scope.categories = [{"category":[]}];
	$http({method:'GET',url: 'http://localhost:3000/druid/guid'}).then(function(res){
		for(var i = 0;i<res.data.length;i++){
			var j = Math.floor(res.data[i]["result"]["val"]);
			$scope.categories[0]["category"].push({"label" : res.data[i]["timestamp"][6] + "." + res.data[i]["timestamp"][8] + res.data[i]["timestamp"][9]})
			console.log($scope.categories[0]["category"][i]["label"]);
			//put the value of Account Volume
			$scope.dataset[0]["data"].push({"value" : j});
		}
	},function(res){
		console.log(res);
	});
	
	//put the Value of Attempt Volume
	$http({method:'GET',url: 'http://localhost:3000/druid/transaction1'}).then(function(res){
		for(var i = 0;i<res.data.length;i++){
			var j = Math.floor(res.data[i]["result"]["trans_action"]);
			//put the value of Attempt Volume
			console.log(j);
			$scope.dataset[1]["data"].push({"value" : j});
		}
	},function(res){
		console.log(res);
	});
	
	//put the value of Success Rate(account)
	
	$http({method:'GET',url: 'http://localhost:3000/druid/success'}).then(function(res){
		for(var i = 0;i<res.data.length;i++){
			var j = Math.floor(res.data[i]["result"]["val"]);
			//put the value of Attempt Volume
			console.log(j);
			j = j / $scope.dataset[0]["data"][i]["value"] * 100;
			$scope.dataset[2]["data"].push({"value" : j});
		}
	},function(res){
		console.log(res);
	});
	
	//put the value of Success Rate(Attempts)
	
	$http({method:'GET',url: 'http://localhost:3000/druid/transaction'}).then(function(res){
		for(var i = 0;i<res.data.length;i++){
			var j = Math.floor(res.data[i]["result"]["transaction_div"]);
			//put the value of Attempt Volume
			console.log(j);
			j = j / $scope.dataset[1]["data"][i]["value"] * 100;
			$scope.dataset[3]["data"].push({"value" : j});
		}
	},function(res){
		console.log(res);
	});
	
	
	$scope.dataset = [{
			"seriesname": "Account Volume",
			"data": []
		},

		{
			"seriesname": "Attempt Volume",		
			"data": [],
			
		},{
			"seriesname": "Success Rate(Account)",
			"parentYAxis": "S",
			"renderAs": "line",
			"showValues": "0",		
			"data": [],
		},{
			"seriesname": "Success Rate(Attempts)",
			"parentYAxis": "S",
			"renderAs": "line",
			"showValues": "0",		
			"data": [],
		}
	];
});