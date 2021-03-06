app.controller("ISBNCtrl", ["$scope", "$http", "$location", function(e, o, t) {
    e.reset = function() {
        e.query = "", e.loading1 = !1, e.loading2 = !1, e.show_book_info = !1, e.show_shopping_results = !1, e.show_text_query_results = !1, e.text_query_loading = !1, e.getfail1 = !1, e.getfail2 = !1, e.home = !0, t.url("/")
    };
    var s = t.path().split("/").pop();
    e.query = s, query = e.query, query.match(/[a-z]/i) ? (e.text_query_loading = !0, e.show_text_query_results = !1, e.show_book_info = !1, e.show_shopping_results = !1, e.home = !1, e.getfail1 = !1, e.getfail2 = !1, o.get("https://www.googleapis.com/books/v1/volumes?q=" + query + "&key=AIzaSyDIpsiNLp24gL10ZQuZk-pnC1N9IvAvuKQ&maxResults=20&items(volumeInfo(authors,averageRating,canonicalVolumeLink,categories,contentVersion,description,imageLinks(extraLarge,large,medium,small,thumbnail),industryIdentifiers,infoLink,language,mainCategory,pageCount,previewLink,printType,publishedDate,publisher,ratingsCount,subtitle,title))").success(function(o) {
        e.books = o.items, e.show_text_query_results = !0, e.text_query_loading = !1
    })) : (e.sortType = "number", e.sortReverse = !1, e.loading1 = !0, e.loading2 = !0, e.show_text_query_results = !1, e.show_book_info = !1, e.getfail1 = !1, e.getfail2 = !1, e.home = !1, o.get("https://www.googleapis.com/books/v1/volumes?q=" + query + "&key=AIzaSyDIpsiNLp24gL10ZQuZk-pnC1N9IvAvuKQ&maxResults=1&items(volumeInfo(authors,averageRating,canonicalVolumeLink,categories,contentVersion,description,imageLinks(extraLarge,large,medium,small,thumbnail),industryIdentifiers,infoLink,language,mainCategory,pageCount,previewLink,printType,publishedDate,publisher,ratingsCount,subtitle,title))", {
        timeout: 4e3
    }).success(function(o) {
        e.data = o, e.show_book_info = !0
    }), o.get("https://cors-anywhere.herokuapp.com/https://api2.campusbooks.com/12/rest/prices?key=NVMv489H1glOq8FXn7pn&isbn=" + query + "&timeout=1&format=json", {
        timeout: 3e3
    }).then(function(o) {
        e.used = o.data.response.page.offers.condition[1].offer, e.loading1 = !1, e.show_shopping_results = !0
    }, function() {
        e.loading1 = !1, e.getfail1 = !0
    }), o.get("https://cors-anywhere.herokuapp.com/https://api2.campusbooks.com/12/rest/prices?key=WVuBvRgHThySPk853Tek&isbn=" + query + "&timeout=1&format=json", {
        timeout: 3e3
    }).then(function(o) {
        e.new_results = o.data.response.page.offers.condition[0].offer, e.loading2 = !1, e.show_shopping_results = !0
    }, function() {
        e.loading2 = !1, e.getfail2 = !0
    }), e.loading1 = !1, e.loading2 = !1, e.show_book_info = !1, e.show_shopping_results = !1, e.show_text_query_results = !1, e.text_query_loading = !1, e.getfail1 = !1, e.getfail2 = !1), e.query_search = function() {
        query = e.query, query.match(/[a-z]/i) ? (e.text_query_loading = !0, e.show_text_query_results = !1, e.show_book_info = !1, e.show_shopping_results = !1, e.home = !1, e.getfail1 = !1, e.getfail2 = !1, o.get("https://www.googleapis.com/books/v1/volumes?q=" + query + "&key=AIzaSyDIpsiNLp24gL10ZQuZk-pnC1N9IvAvuKQ&maxResults=20&items(volumeInfo(authors,averageRating,canonicalVolumeLink,categories,contentVersion,description,imageLinks(extraLarge,large,medium,small,thumbnail),industryIdentifiers,infoLink,language,mainCategory,pageCount,previewLink,printType,publishedDate,publisher,ratingsCount,subtitle,title))").success(function(o) {
            e.books = o.items, e.show_text_query_results = !0, e.text_query_loading = !1
        })) : (e.sortType = "number", e.sortReverse = !1, e.loading1 = !0, e.loading2 = !0, e.show_text_query_results = !1, e.show_book_info = !1, e.getfail1 = !1, e.getfail2 = !1, e.home = !1, o.get("https://www.googleapis.com/books/v1/volumes?q=" + query + "&key=AIzaSyDIpsiNLp24gL10ZQuZk-pnC1N9IvAvuKQ&maxResults=1&items(volumeInfo(authors,averageRating,canonicalVolumeLink,categories,contentVersion,description,imageLinks(extraLarge,large,medium,small,thumbnail),industryIdentifiers,infoLink,language,mainCategory,pageCount,previewLink,printType,publishedDate,publisher,ratingsCount,subtitle,title))", {
            timeout: 4e3
        }).success(function(o) {
            e.data = o, e.show_book_info = !0
        }), o.get("https://cors-anywhere.herokuapp.com/https://api2.campusbooks.com/12/rest/prices?key=NVMv489H1glOq8FXn7pn&isbn=" + query + "&timeout=1&format=json", {
            timeout: 3e3
        }).then(function(o) {
            e.used = o.data.response.page.offers.condition[1].offer, e.loading1 = !1, e.show_shopping_results = !0, console.log(o)
        }, function() {
            e.loading1 = !1, e.getfail1 = !0
        }), o.get("https://cors-anywhere.herokuapp.com/https://api2.campusbooks.com/12/rest/prices?key=WVuBvRgHThySPk853Tek&isbn=" + query + "&timeout=1&format=json", {
            timeout: 3e3
        }).then(function(o) {
            e.new_results = o.data.response.page.offers.condition[0].offer, e.loading2 = !1, e.show_shopping_results = !0
        }, function() {
            e.loading2 = !1, e.getfail2 = !0
        }))
    }
}]), app.controller("HomeCtrl", ["$scope", "$http", "$location", function(e, o, t) {
    e.home = !0, e.reset = function() {
        e.query = "", e.loading1 = !1, e.loading2 = !1, e.show_book_info = !1, e.show_shopping_results = !1, e.show_text_query_results = !1, e.text_query_loading = !1, e.getfail1 = !1, e.getfail2 = !1, e.home = !0, t.url("/")
    }, e.query_search = function() {
        query = e.query, query.match(/[a-z]/i) ? (e.text_query_loading = !0, e.show_text_query_results = !1, e.show_book_info = !1, e.show_shopping_results = !1, e.home = !1, e.getfail1 = !1, e.getfail2 = !1, o.get("https://www.googleapis.com/books/v1/volumes?q=" + query + "&key=AIzaSyDIpsiNLp24gL10ZQuZk-pnC1N9IvAvuKQ&maxResults=20&items(volumeInfo(authors,averageRating,canonicalVolumeLink,categories,contentVersion,description,imageLinks(extraLarge,large,medium,small,thumbnail),industryIdentifiers,infoLink,language,mainCategory,pageCount,previewLink,printType,publishedDate,publisher,ratingsCount,subtitle,title))").success(function(o) {
            e.books = o.items, e.show_text_query_results = !0, e.text_query_loading = !1
        })) : (e.sortType = "number", e.sortReverse = !1, e.loading1 = !0, e.loading2 = !0, e.show_text_query_results = !1, e.show_book_info = !1, e.getfail1 = !1, e.getfail2 = !1, e.home = !1, o.get("https://www.googleapis.com/books/v1/volumes?q=" + query + "&key=AIzaSyDIpsiNLp24gL10ZQuZk-pnC1N9IvAvuKQ&maxResults=1&items(volumeInfo(authors,averageRating,canonicalVolumeLink,categories,contentVersion,description,imageLinks(extraLarge,large,medium,small,thumbnail),industryIdentifiers,infoLink,language,mainCategory,pageCount,previewLink,printType,publishedDate,publisher,ratingsCount,subtitle,title))", {
            timeout: 4e3
        }).success(function(o) {
            e.data = o, e.show_book_info = !0
        }), o.get("https://drewscors.herokuapp.com/https://api2.campusbooks.com/12/rest/prices?key=NVMv489H1glOq8FXn7pn&isbn=" + query + "&timeout=1&format=json", {
            timeout: 3e3
        }).then(function(o) {
            e.used = o.data.response.page.offers.condition[1].offer, e.loading1 = !1, e.show_shopping_results = !0, console.log(o)
        }, function() {
            e.loading1 = !1, e.getfail1 = !0
        }), o.get("https://drewscors.herokuapp.com/https://api2.campusbooks.com/12/rest/prices?key=WVuBvRgHThySPk853Tek&isbn=" + query + "&timeout=1&format=json", {
            timeout: 3e3
        }).then(function(o) {
            e.new_results = o.data.response.page.offers.condition[0].offer, e.loading2 = !1, e.show_shopping_results = !0
        }, function() {
            e.loading2 = !1, e.getfail2 = !0
        }))
    }
}]);