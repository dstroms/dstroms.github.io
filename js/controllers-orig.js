app.controller('ISBNCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){

	$scope.reset = function() {
	  	$scope.query = '';
	  	$scope.loading1 = false;
	  	$scope.loading2 = false;
	  	$scope.show_book_info = false;
	  	$scope.show_shopping_results = false;
	  	$scope.show_text_query_results = false;
	  	$scope.text_query_loading = false;
	  	$scope.getfail1 = false;
  		$scope.getfail2 = false;
  		$scope.home = true;
  		$location.url('/');
  	};


	var url = $location.path().split('/').pop();
	$scope.query = url; 

  	query = $scope.query;

  	if (!query.match(/[a-z]/i)) {

  		$scope.sortType     = 'number'; // set the default sort type
  		$scope.sortReverse  = false;  // set the default sort order
  		$scope.loading1 = true;
  		$scope.loading2 = true;
  		$scope.show_text_query_results = false;
  		$scope.show_book_info = false;
  		$scope.getfail1 = false;
  		$scope.getfail2 = false;
  		$scope.home = false;


	  	$http.get('https://www.googleapis.com/books/v1/volumes?q=' + query + '&key=AIzaSyDIpsiNLp24gL10ZQuZk-pnC1N9IvAvuKQ&maxResults=1&items(volumeInfo(authors,averageRating,canonicalVolumeLink,categories,contentVersion,description,imageLinks(extraLarge,large,medium,small,thumbnail),industryIdentifiers,infoLink,language,mainCategory,pageCount,previewLink,printType,publishedDate,publisher,ratingsCount,subtitle,title))', {timeout: 4000})
	  		.success(function(data) {
	          $scope.data = data;
	          $scope.show_book_info = true;
	          

	        });

	  	$http.get('https://drewscors.herokuapp.com/https://api2.campusbooks.com/12/rest/prices?key=NVMv489H1glOq8FXn7pn&isbn=' + query + '&timeout=1&format=json', {timeout: 3000})

		  	.then(function(used) {
		          $scope.used = used.data.response.page.offers.condition[1].offer;
		          $scope.loading1 = false;
		          $scope.show_shopping_results = true;
		          //console.log(used);

		        }, function(used) {
			        $scope.loading1 = false;
			        $scope.getfail1 = true;
			        //console.log("Something went wrong");
			    });


	  	$http.get('https://drewscors.herokuapp.com/https://api2.campusbooks.com/12/rest/prices?key=WVuBvRgHThySPk853Tek&isbn=' + query + '&timeout=1&format=json', {timeout: 3000})
	  		.then(function(results) {
		          $scope.new_results = results.data.response.page.offers.condition[0].offer;
		          $scope.loading2 = false;
		          $scope.show_shopping_results = true;


	        	}, function(results) {
			        $scope.loading2 = false;
			        $scope.getfail2 = true;
			        //console.log("Something went wrong2");
			    });


	  		
	  		$scope.loading1 = false;
	  		$scope.loading2 = false;
	  		$scope.show_book_info = false;
	  		$scope.show_shopping_results = false;
	  		$scope.show_text_query_results = false;
	  		$scope.text_query_loading = false;
	  		$scope.getfail1 = false;
  			$scope.getfail2 = false;


  			//$location.url('/');

 
	} else {

		$scope.text_query_loading = true;
		$scope.show_text_query_results = false;
		$scope.show_book_info = false;
		$scope.show_shopping_results = false;
		$scope.home = false;
		$scope.getfail1 = false;
  		$scope.getfail2 = false;


		$http.get('https://www.googleapis.com/books/v1/volumes?q=' + query + '&key=AIzaSyDIpsiNLp24gL10ZQuZk-pnC1N9IvAvuKQ&maxResults=20&items(volumeInfo(authors,averageRating,canonicalVolumeLink,categories,contentVersion,description,imageLinks(extraLarge,large,medium,small,thumbnail),industryIdentifiers,infoLink,language,mainCategory,pageCount,previewLink,printType,publishedDate,publisher,ratingsCount,subtitle,title))').success(function(books) {
	          $scope.books = books.items;
	          $scope.show_text_query_results = true;
	          $scope.text_query_loading = false;
	          
	        });
	}




	$scope.query_search = function() {

  	query = $scope.query;

  	if (!query.match(/[a-z]/i)) {

  		$scope.sortType     = 'number'; // set the default sort type
  		$scope.sortReverse  = false;  // set the default sort order
  		$scope.loading1 = true;
  		$scope.loading2 = true;
  		$scope.show_text_query_results = false;
  		$scope.show_book_info = false;
  		$scope.getfail1 = false;
  		$scope.getfail2 = false;
  		$scope.home = false;
  		

	  	$http.get('https://www.googleapis.com/books/v1/volumes?q=' + query + '&key=AIzaSyDIpsiNLp24gL10ZQuZk-pnC1N9IvAvuKQ&maxResults=1&items(volumeInfo(authors,averageRating,canonicalVolumeLink,categories,contentVersion,description,imageLinks(extraLarge,large,medium,small,thumbnail),industryIdentifiers,infoLink,language,mainCategory,pageCount,previewLink,printType,publishedDate,publisher,ratingsCount,subtitle,title))', {timeout: 4000})
	  		.success(function(data) {
	          $scope.data = data;
	          $scope.show_book_info = true;
	          

	        });

	  	$http.get('https://drewscors.herokuapp.com/https://api2.campusbooks.com/12/rest/prices?key=NVMv489H1glOq8FXn7pn&isbn=' + query + '&timeout=1&format=json', {timeout: 3000})

		  	.then(function(used) {
		          $scope.used = used.data.response.page.offers.condition[1].offer;
		          $scope.loading1 = false;
		          $scope.show_shopping_results = true;
		          console.log(used);

		        }, function(used) {
			        $scope.loading1 = false;
			        $scope.getfail1 = true;
			        //console.log("Something went wrong");
			    });


	  	$http.get('https://drewscors.herokuapp.com/https://api2.campusbooks.com/12/rest/prices?key=WVuBvRgHThySPk853Tek&isbn=' + query + '&timeout=1&format=json', {timeout: 3000})
	  		.then(function(results) {
		          $scope.new_results = results.data.response.page.offers.condition[0].offer;
		          $scope.loading2 = false;
		          $scope.show_shopping_results = true;


	        	}, function(results) {
			        $scope.loading2 = false;
			        $scope.getfail2 = true;
			        //console.log("Something went wrong2");
			    });



	} else {

		$scope.text_query_loading = true;
		$scope.show_text_query_results = false;
		$scope.show_book_info = false;
		$scope.show_shopping_results = false;
		$scope.home = false;
		$scope.getfail1 = false;
  		$scope.getfail2 = false;


		$http.get('https://www.googleapis.com/books/v1/volumes?q=' + query + '&key=AIzaSyDIpsiNLp24gL10ZQuZk-pnC1N9IvAvuKQ&maxResults=20&items(volumeInfo(authors,averageRating,canonicalVolumeLink,categories,contentVersion,description,imageLinks(extraLarge,large,medium,small,thumbnail),industryIdentifiers,infoLink,language,mainCategory,pageCount,previewLink,printType,publishedDate,publisher,ratingsCount,subtitle,title))').success(function(books) {
	          $scope.books = books.items;
	          $scope.show_text_query_results = true;
	          $scope.text_query_loading = false;
	          
	        });
		
	}
  };


}]);

app.controller('HomeCtrl', ['$scope', '$http', '$location', function($scope, $http, $location){


	$scope.home = true;

	$scope.reset = function() {
	  	$scope.query = '';
	  	$scope.loading1 = false;
	  	$scope.loading2 = false;
	  	$scope.show_book_info = false;
	  	$scope.show_shopping_results = false;
	  	$scope.show_text_query_results = false;
	  	$scope.text_query_loading = false;
	  	$scope.getfail1 = false;
  		$scope.getfail2 = false;
  		$scope.home = true;
  		$location.url('/');
  	};

  	
  
  	$scope.query_search = function() {

  	query = $scope.query;

  	if (!query.match(/[a-z]/i)) {

  		$scope.sortType     = 'number'; // set the default sort type
  		$scope.sortReverse  = false;  // set the default sort order
  		$scope.loading1 = true;
  		$scope.loading2 = true;
  		$scope.show_text_query_results = false;
  		$scope.show_book_info = false;
  		$scope.getfail1 = false;
  		$scope.getfail2 = false;
  		$scope.home = false;
  		

	  	$http.get('https://www.googleapis.com/books/v1/volumes?q=' + query + '&key=AIzaSyDIpsiNLp24gL10ZQuZk-pnC1N9IvAvuKQ&maxResults=1&items(volumeInfo(authors,averageRating,canonicalVolumeLink,categories,contentVersion,description,imageLinks(extraLarge,large,medium,small,thumbnail),industryIdentifiers,infoLink,language,mainCategory,pageCount,previewLink,printType,publishedDate,publisher,ratingsCount,subtitle,title))', {timeout: 4000})
	  		.success(function(data) {
	          $scope.data = data;
	          $scope.show_book_info = true;
	          

	        });

	  	$http.get('https://drewscors.herokuapp.com/https://api2.campusbooks.com/12/rest/prices?key=NVMv489H1glOq8FXn7pn&isbn=' + query + '&timeout=1&format=json', {timeout: 3000})

		  	.then(function(used) {
		          $scope.used = used.data.response.page.offers.condition[1].offer;
		          $scope.loading1 = false;
		          $scope.show_shopping_results = true;
		          console.log(used);

		        }, function(used) {
			        $scope.loading1 = false;
			        $scope.getfail1 = true;
			        //console.log("Something went wrong");
			    });


	  	$http.get('https://drewscors.herokuapp.com/https://api2.campusbooks.com/12/rest/prices?key=WVuBvRgHThySPk853Tek&isbn=' + query + '&timeout=1&format=json', {timeout: 3000})
	  		.then(function(results) {
		          $scope.new_results = results.data.response.page.offers.condition[0].offer;
		          $scope.loading2 = false;
		          $scope.show_shopping_results = true;


	        	}, function(results) {
			        $scope.loading2 = false;
			        $scope.getfail2 = true;
			        //console.log("Something went wrong2");
			    });



	} else {

		$scope.text_query_loading = true;
		$scope.show_text_query_results = false;
		$scope.show_book_info = false;
		$scope.show_shopping_results = false;
		$scope.home = false;
		$scope.getfail1 = false;
  		$scope.getfail2 = false;


		$http.get('https://www.googleapis.com/books/v1/volumes?q=' + query + '&key=AIzaSyDIpsiNLp24gL10ZQuZk-pnC1N9IvAvuKQ&maxResults=20&items(volumeInfo(authors,averageRating,canonicalVolumeLink,categories,contentVersion,description,imageLinks(extraLarge,large,medium,small,thumbnail),industryIdentifiers,infoLink,language,mainCategory,pageCount,previewLink,printType,publishedDate,publisher,ratingsCount,subtitle,title))').success(function(books) {
	          $scope.books = books.items;
	          $scope.show_text_query_results = true;
	          $scope.text_query_loading = false;
	          
	        });
		
	}
  };
   
}]);