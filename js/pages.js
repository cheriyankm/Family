var app = angular.module('familyApp', []);
app.controller('familyCtrl', function($scope,$http,$window) {
$scope.loginGrand=false;
if(localStorage.getItem("uri")=='undefined' || localStorage.getItem("uri")==null){
}
else{
	$window.location.href = 'homepage.html';
}
	
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
		url: 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/family',
               	headers: {
		'Authorization' : 'Bearer '+accessToken,
               	'Content-Type': 'application/json',
		'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
               	 	 }
        	 };
        	$http(req)
        	.then(function(response1){
			$scope.family_data=response1.data;
        	}, function(error){
			console.log(error);
               		//deferred.reject('Error fetching Options' + error);
        	});
        }, function(error){
		console.log("error on access token"+error);
               	//deferred.reject('Error fetching Options' + error);
        });
$scope.validate_login = function(){
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
		url: 'https://predix-asset.run.aws-usw02-pr.ice.predix.io/userlogin?filter=username='+$scope.userName+':password='+$scope.passWord,
               	headers: {
		'Authorization' : 'Bearer '+accessToken,
               	'Content-Type': 'application/json',
		'Predix-Zone-Id' : '3c7bc6dd-8f09-45e5-be7f-667a90292329'
               	 	 }
        	 };
        	$http(req)
        	.then(function(response1){
			if(response1.data.length==1){
				$scope.loginGrand=true;
				$window.location.href = 'homepage.html';
				if (typeof(Storage) !== "undefined") {
    				// Store
    				localStorage.setItem("uri", response1.data[0].uri);
    				// Retrieve
    				
					} else {
    				
				}
			}else{
				alert('Login incorrect');
			}
        	}, function(error){
			console.log(error);
               		//deferred.reject('Error fetching Options' + error);
        	});
        }, function(error){
		console.log("error on access token"+error);
               	//deferred.reject('Error fetching Options' + error);
        });
};
});
