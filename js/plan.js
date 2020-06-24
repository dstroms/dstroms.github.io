front page  
	if (search is isbn) {
		domain.com/search/isbn?=xxxx

		get isbn from url or search field

		foreach api result as result {
			<price><link><etc>
		}
	}
	else if (search is title || author ) {
		domain.com/search/?=xxxx

		foreach search result as result {
			<title><author><isbn><link to domain.com/search/isbn?=xxxx>
		}
	}