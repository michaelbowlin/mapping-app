angular
	.module('app')
	.controller('propertyListCtrl', function($location, cachedPropertiesService, $scope, $http, uiGridConstants) {
		var vm = this;

		vm.properties = cachedPropertiesService.query();

		console.log('================= 1111111 ' + vm.properties);

		vm.go = function( location ){
			$location.path( location );
		}

		//0: Resource
		//$$hashKey: "00N"
		//__v: 0
		//_id: "554c1efe7fbcf5ae33c01ca3"
		//address: Array[0]
		//length: 0
		//__proto__: Array[0]
		//dateAdded: "2015-05-08T02:27:10.421Z"
		//dateComplete: "2015-05-29T11:18:04.621Z"
		//description: "Colorado Capital Building, Denver"
		//improvementSizeType: "Acres"
		//latCoord: 39.7394199
		//longCoord: -104.9847909
		//tags: Array[1]
		//0: "Denver"
		//length: 1
		//__proto__: Array[0]
		//title: "Colorado Capital"
		//type: "Commercial"
		//__proto__: Resource



		var title = vm.properties[0];
		//var itemsPerPage = vm.properties;
		//var itemsPerPageSkip = vm.properties;
		//var maxPaginationSize = vm.properties;
		//var totalItems = vm.properties;
		//var sortBy = vm.properties;

		console.log('===================== TITLE: ' + title)

		/* UI GRID */

		var paginationOptions = {
			pageNumber: 1,
			pageSize: 25,
			sort: null
		};

		$scope.gridOptions = {
			paginationPageSizes: [25, 50, 75],
			paginationPageSize: 5,
			useExternalPagination: true,
			useExternalSorting: true,
			columnDefs: [
				// { name: 'name' },
				// { name: 'gender', enableSorting: false },
				// { name: 'company', enableSorting: false }
				{ name: 'latCoord' },
				{ name: 'question', enableSorting: false },
				{ name: 'answer', enableSorting: false }
			],
			onRegisterApi: function(gridApi) {
				$scope.gridApi = gridApi;
				$scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
					if (sortColumns.length == 0) {
						paginationOptions.sort = null;
					} else {
						paginationOptions.sort = sortColumns[0].sort.direction;
					}
					getPage();
				});
				gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
					paginationOptions.pageNumber = newPage;
					paginationOptions.pageSize = pageSize;
					getPage();
				});
			}
		};

		var getPage = function() {
			var url;
			switch(paginationOptions.sort) {
				case uiGridConstants.ASC:
					//  url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_ASC.json';
					// url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
					url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
					break;
				case uiGridConstants.DESC:
					// url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
					// url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
					url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
					break;
				default:
					// url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';
					// url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
					url = 'localhost:3030/api/properties/';
					break;
			}

			$http.get(url)
				.success(function (data) {
					$scope.gridOptions.totalItems = 100;
					var firstRow = (paginationOptions.pageNumber - 1) * paginationOptions.pageSize;
					$scope.gridOptions.data = data.slice(firstRow, firstRow + paginationOptions.pageSize);
				});
		};

		getPage();
























});
