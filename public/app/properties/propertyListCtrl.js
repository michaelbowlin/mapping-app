angular
	.module('app')
	.controller('propertyListCtrl', function($location, cachedPropertiesService, $scope, $http, uiGridConstants) {
		var vm = this;

		vm.properties = cachedPropertiesService.query();
		console.log('================= ' + vm.properties);

		vm.go = function( location ){
			$location.path( location );
		}

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
				{ name: 'category' },
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
					url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
					break;
				case uiGridConstants.DESC:
					// url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
					url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
					break;
				default:
					// url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';
					url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
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
