angular
	.module('app')
	.controller('propertyListCtrl', function($location, cachedPropertiesService, $scope, $http, uiGridConstants, $interval, $q) {
		var vm = this;

		vm.properties = cachedPropertiesService.query();

		vm.go = function( location ){
			$location.path( location );
		}

		//var itemsPerPage = vm.properties;
		//var itemsPerPageSkip = vm.properties;
		//var maxPaginationSize = vm.properties;
		//var totalItems = vm.properties;
		//var sortBy = vm.properties;

		/* UI GRID */
		var fakeI18n = function( title ){
			var deferred = $q.defer();
			$interval( function() {
				deferred.resolve( 'col: ' + title );
			}, 1000, 1);
			return deferred.promise;
		};

		var paginationOptions = {
			pageNumber: 1,
			pageSize: 25,
			sort: null
		};

		$scope.gridOptions = {
			exporterMenuCsv: false,
			enableGridMenu: true,
			gridMenuTitleFilter: fakeI18n,
			paginationPageSizes: [1, 3, 75],
			paginationPageSize: 5,
			useExternalPagination: true,
			useExternalSorting: true,
			columnDefs:[
				{ name: 'type' },
				{ name: 'dateComplete', enableSorting: false },
				{ name: 'address', enableSorting: false },
				{ name: 'improvementSize', enableSorting: false },
				{ name: 'acres', enableSorting: false },
				{ name: 'condition', enableSorting: false },
				{ name: 'edit'},
				{ name: 'delete'}
			],
			gridMenuCustomItems: [
				{
					title: 'Rotate Grid',
					action: function ($event) {
						this.grid.element.toggleClass('rotated');
					},
					order: 210
				}
			],
			onRegisterApi: function( gridApi ){
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
				// interval of zero just to allow the directive to have initialized
				$interval( function() {
					gridApi.core.addToGridMenu( gridApi.grid, [{ title: 'Dynamic item', order: 100}]);
				}, 0, 1);

				gridApi.core.on.columnVisibilityChanged( $scope, function( changedColumn){
					$scope.columnChanged = { name: changedColumn.colDef.name, visible: changedColumn.colDef.visible };
				});
			}
		};

		//$scope.gridOptions = {
		//	paginationPageSizes: [25, 50, 75],
		//	paginationPageSize: 5,
		//	useExternalPagination: true,
		//	useExternalSorting: true,
		//	columnDefs: [
		//		// { name: 'name' },
		//		// { name: 'gender', enableSorting: false },
		//		// { name: 'company', enableSorting: false }
		//		{ name: 'title' },
		//		{ name: '_id', enableSorting: false },
		//		{ name: 'type', enableSorting: false }
		//	],
		//	onRegisterApi: function(gridApi) {
		//		$scope.gridApi = gridApi;
		//		$scope.gridApi.core.on.sortChanged($scope, function(grid, sortColumns) {
		//			if (sortColumns.length == 0) {
		//				paginationOptions.sort = null;
		//			} else {
		//				paginationOptions.sort = sortColumns[0].sort.direction;
		//			}
		//			getPage();
		//		});
		//		gridApi.pagination.on.paginationChanged($scope, function (newPage, pageSize) {
		//			paginationOptions.pageNumber = newPage;
		//			paginationOptions.pageSize = pageSize;
		//			getPage();
		//		});
		//	}
		//};

		var getPage = function() {
			switch(paginationOptions.sort) {
			 	//case uiGridConstants.ASC:
			 	//	//  url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_ASC.json';
			 	//	// url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
			 	//	url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
			 	//	break;
			 	//case uiGridConstants.DESC:
			 	//	// url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
			 	//	// url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
			 	//	url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100_DESC.json';
			 	//	break;
			 	default:
			 		// url = 'https://cdn.rawgit.com/angular-ui/ui-grid.info/gh-pages/data/100.json';
			 		// url = 'https://flashcardapp-5daily.azure-mobile.net/tables/cards/';
			 		url = '/api/properties/';
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
