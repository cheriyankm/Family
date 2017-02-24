var app = angular.module('myApp', []);
app.controller('myCtrl', function($scope,$http,$window) {
	if(localStorage.getItem("uri")=='undefined' || localStorage.getItem("uri")==null){
		$window.location.href = 'index.html';
	}
	$scope.nameOfUser = localStorage.getItem("uri");
	$scope.lastName = "K M";
	$scope.loading=false;
	$scope.sibligs = [];
	$scope.logout = function(){
		if(typeof(Storage) !== "undefined"){
    		localStorage.setItem("uri", undefined);
    		$window.location.href = 'index.html';
		}
		else{}
	};
	$scope.goHome = function(uri){
		$window.location.href = 'homepage.html';
		$scope.getNewProfile(uri);
	};
	$scope.getNewProfile = function(uri){
		//$window.location.href = 'homepage.html';
		$scope.loading=false;
		$scope.childrens = [];
		$scope.userInfo = {};
		$scope.sibligs = [];
		var req1 = {
	method: 'POST',
	url: 'https://assetuaa.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token',
	data: 'grant_type=client_credentials',
        headers: {
        	'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization' : 'Basic YXNzZXRfY2xpZW50OmFzc2V0Q2xpZW50'
         	 }
        };
	$http(req1)
   .then(function(response){
		var accessToken=response.data.access_token;
      var req = {
      	method: 'GET',
			url: 'https://predix-asset.run.aws-usw02-pr.ice.predix.io'+uri,
         headers: {
				'Authorization' : 'Bearer '+accessToken,
            'Content-Type': 'application/json',
				'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
         	}
        	};
        	$http(req)
        	.then(function(response1){
				$scope.userInfo = response1.data[0];
				$scope.getFather(uri);
				$scope.getMother(uri);
				if(response1.data[0].spouse)
					$scope.getSpouse(response1.data[0].spouse);
				else
					$scope.spouse = {};
				if(response1.data[0].gender=='male')
					$scope.getChildrens(uri, 'father');
				else
					$scope.getChildrens(uri, 'mother');
				$scope.getSiblings(response1.data[0].mother, response1.data[0].father, response1.data[0].uri);
        	}, function(error){
			console.log(error);
               		//deferred.reject('Error fetching Options' + error);
        	});
        }, function(error){
		console.log("error on access token"+error);
               	//deferred.reject('Error fetching Options' + error);
        });
	};
	var req1 = {
	method: 'POST',
	url: 'https://assetuaa.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token',
	data: 'grant_type=client_credentials',
        headers: {
        	'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization' : 'Basic YXNzZXRfY2xpZW50OmFzc2V0Q2xpZW50'
         	 }
        };
	$http(req1)
   .then(function(response){
		var accessToken=response.data.access_token;
      var req = {
      	method: 'GET',
			url: 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/family/'+$scope.nameOfUser.split("/")[2],
         headers: {
				'Authorization' : 'Bearer '+accessToken,
            'Content-Type': 'application/json',
				'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
         	}
        	};
        	$http(req)
        	.then(function(response1){
				$scope.userInfo = response1.data[0];
				$scope.getFather('/family/'+$scope.nameOfUser.split("/")[2]);
				$scope.getMother('/family/'+$scope.nameOfUser.split("/")[2]);
				if(response1.data[0].spouse)
					$scope.getSpouse(response1.data[0].spouse);
				else
					$scope.spouse = {};
				if(response1.data[0].gender=='male')
					$scope.getChildrens('/family/'+$scope.nameOfUser.split("/")[2], 'father');
				else
					$scope.getChildrens('/family/'+$scope.nameOfUser.split("/")[2], 'mother');
				$scope.getSiblings(response1.data[0].mother, response1.data[0].father, response1.data[0].uri);
        	}, function(error){
			console.log(error);
               		//deferred.reject('Error fetching Options' + error);
        	});
        }, function(error){
		console.log("error on access token"+error);
               	//deferred.reject('Error fetching Options' + error);
        });
        
	$scope.childrens=[];
	$scope.getChildrens = function(uri,gen){
		var req1 = {
	method: 'POST',
	url: 'https://assetuaa.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token',
	data: 'grant_type=client_credentials',
        headers: {
        	'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization' : 'Basic YXNzZXRfY2xpZW50OmFzc2V0Q2xpZW50'
         	 }
        };
	$http(req1)
   .then(function(response){
		var accessToken=response.data.access_token;
      var req = {
      	method: 'GET',
			url: 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/family?filter=uri='+uri+'<'+gen+'[t1]',
         headers: {
				'Authorization' : 'Bearer '+accessToken,
            'Content-Type': 'application/json',
				'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
         	}
        	};
        	$http(req)
        	.then(function(response1){
				$scope.childrens = response1.data;
        	}, function(error){
			console.log(error);
               		//deferred.reject('Error fetching Options' + error);
        	});
        }, function(error){
		console.log("error on access token"+error);
               	//deferred.reject('Error fetching Options' + error);
        });
	};
	
	$scope.getMother = function(uri){
		var req1 = {
	method: 'POST',
	url: 'https://assetuaa.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token',
	data: 'grant_type=client_credentials',
        headers: {
        	'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization' : 'Basic YXNzZXRfY2xpZW50OmFzc2V0Q2xpZW50'
         	 }
        };
	$http(req1)
   .then(function(response){
		var accessToken=response.data.access_token;
      var req = {
      	method: 'GET',
			url: 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/family?filter=uri='+uri+'>mother[t1]',
         headers: {
				'Authorization' : 'Bearer '+accessToken,
            'Content-Type': 'application/json',
				'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
         	}
        	};
        	$http(req)
        	.then(function(response1){
				$scope.mother = response1.data[0];
        	}, function(error){
			console.log(error);
               		//deferred.reject('Error fetching Options' + error);
        	});
        }, function(error){
		console.log("error on access token"+error);
               	//deferred.reject('Error fetching Options' + error);
        });
	};
	$scope.getFather = function(uri){
		var req1 = {
	method: 'POST',
	url: 'https://assetuaa.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token',
	data: 'grant_type=client_credentials',
        headers: {
        	'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization' : 'Basic YXNzZXRfY2xpZW50OmFzc2V0Q2xpZW50'
         	 }
        };
	$http(req1)
   .then(function(response){
		var accessToken=response.data.access_token;
      var req = {
      	method: 'GET',
			url: 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/family?filter=uri='+uri+'>father[t1]',
         headers: {
				'Authorization' : 'Bearer '+accessToken,
            'Content-Type': 'application/json',
				'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
         	}
        	};
        	$http(req)
        	.then(function(response1){
				$scope.father = response1.data[0];
        	}, function(error){
			console.log(error);
               		//deferred.reject('Error fetching Options' + error);
        	});
        }, function(error){
		console.log("error on access token"+error);
               	//deferred.reject('Error fetching Options' + error);
        });
	};
	$scope.getSpouse = function(uri){
		var req1 = {
	method: 'POST',
	url: 'https://assetuaa.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token',
	data: 'grant_type=client_credentials',
        headers: {
        	'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization' : 'Basic YXNzZXRfY2xpZW50OmFzc2V0Q2xpZW50'
         	 }
        };
	$http(req1)
   .then(function(response){
		var accessToken=response.data.access_token;
      var req = {
      	method: 'GET',
			url: 'https://predix-asset.run.aws-usw02-pr.ice.predix.io'+uri,
         headers: {
				'Authorization' : 'Bearer '+accessToken,
            'Content-Type': 'application/json',
				'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
         	}
        	};
        	$http(req)
        	.then(function(response1){
				$scope.spouse = response1.data[0];
        	}, function(error){
			console.log(error);
               		//deferred.reject('Error fetching Options' + error);
        	});
        }, function(error){
		console.log("error on access token"+error);
               	//deferred.reject('Error fetching Options' + error);
        });
	};
	
	$scope.getSiblings = function(m_uri,f_uri,uri){
		var req1 = {
	method: 'POST',
	url: 'https://assetuaa.predix-uaa.run.aws-usw02-pr.ice.predix.io/oauth/token',
	data: 'grant_type=client_credentials',
        headers: {
        	'Content-Type': 'application/x-www-form-urlencoded',
		'Authorization' : 'Basic YXNzZXRfY2xpZW50OmFzc2V0Q2xpZW50'
         	 }
        };
	$http(req1)
   .then(function(response){
		var accessToken=response.data.access_token;
      var req = {
      	method: 'GET',
			url: 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/family?filter=mother='+m_uri+':father='+f_uri,
         headers: {
				'Authorization' : 'Bearer '+accessToken,
            'Content-Type': 'application/json',
				'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
         	}
        	};
        	$http(req)
        	.then(function(response1){
        		angular.forEach(response1.data, function(value, index){
        			if(value.uri==uri)
        				response1.data.splice(index, 1);
        		});
				$scope.sibligs = response1.data;
				$scope.loading=true;
        	}, function(error){
			console.log(error);
               		//deferred.reject('Error fetching Options' + error);
        	});
        }, function(error){
		console.log("error on access token"+error);
               	//deferred.reject('Error fetching Options' + error);
        });
	};
	$scope.goToAddMember = function(){
		$window.location.href = 'AddMember.html';
	};
});
