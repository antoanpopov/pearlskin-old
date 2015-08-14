'use strict';

/* Controllers */

app
  // Flot Chart controller 
  .controller('FlotChartDemoCtrl', ['$scope', function($scope) {
    $scope.d = [ [1,6.5],[2,6.5],[3,7],[4,8],[5,7.5],[6,7],[7,6.8],[8,7],[9,7.2],[10,7],[11,6.8],[12,7] ];

    $scope.d0_1 = [ [0,7],[1,6.5],[2,12.5],[3,7],[4,9],[5,6],[6,11],[7,6.5],[8,8],[9,7] ];

    $scope.d0_2 = [ [0,4],[1,4.5],[2,7],[3,4.5],[4,3],[5,3.5],[6,6],[7,3],[8,4],[9,3] ];

    $scope.d1_1 = [ [10, 120], [20, 70], [30, 70], [40, 60] ];

    $scope.d1_2 = [ [10, 50],  [20, 60], [30, 90],  [40, 35] ];

    $scope.d1_3 = [ [10, 80],  [20, 40], [30, 30],  [40, 20] ];

    $scope.d2 = [];

    for (var i = 0; i < 20; ++i) {
      $scope.d2.push([i, Math.round( Math.sin(i)*100)/100] );
    }   

    $scope.d3 = [ 
      { label: "iPhone5S", data: 40 }, 
      { label: "iPad Mini", data: 10 },
      { label: "iPad Mini Retina", data: 20 },
      { label: "iPhone4S", data: 12 },
      { label: "iPad Air", data: 18 }
    ];

    $scope.refreshData = function(){
      $scope.d0_1 = $scope.d0_2;
    };

    $scope.getRandomData = function() {
      var data = [],
      totalPoints = 150;
      if (data.length > 0)
        data = data.slice(1);
      while (data.length < totalPoints) {
        var prev = data.length > 0 ? data[data.length - 1] : 50,
          y = prev + Math.random() * 10 - 5;
        if (y < 0) {
          y = 0;
        } else if (y > 100) {
          y = 100;
        }
        data.push(Math.round(y*100)/100);
      }
      // Zip the generated y values with the x values
      var res = [];
      for (var i = 0; i < data.length; ++i) {
        res.push([i, data[i]])
      }
      return res;
    }

    $scope.d4 = $scope.getRandomData();

      $scope.rowCollectionBasic = [
        {firstName: 'Laurent', lastName: 'Renard', birthDate: new Date('1987-05-21'), balance: 102, email: 'whatever@gmail.com'},
        {firstName: 'Blandine', lastName: 'Faivre', birthDate: new Date('1987-04-25'), balance: -2323.22, email: 'oufblandou@gmail.com'},
        {firstName: 'Francoise', lastName: 'Frere', birthDate: new Date('1955-08-27'), balance: 42343, email: 'raymondef@gmail.com'}
      ];

      $scope.removeRow = function(row) {
        var index = $scope.rowCollectionBasic.indexOf(row);
        if (index !== -1) {
          $scope.rowCollectionBasic.splice(index, 1);
        }
      };

      $scope.predicates = ['firstName', 'lastName', 'birthDate', 'balance', 'email'];
      $scope.selectedPredicate = $scope.predicates[0];

      var firstnames = ['Laurent', 'Blandine', 'Olivier', 'Max'];
      var lastnames = ['Renard', 'Faivre', 'Frere', 'Eponge'];
      var dates = ['1987-05-21', '1987-04-25', '1955-08-27', '1966-06-06'];
      var id = 1;

      function generateRandomItem(id) {

        var firstname = firstnames[Math.floor(Math.random() * 3)];
        var lastname = lastnames[Math.floor(Math.random() * 3)];
        var birthdate = dates[Math.floor(Math.random() * 3)];
        var balance = Math.floor(Math.random() * 2000);

        return {
          id: id,
          firstName: firstname,
          lastName: lastname,
          birthDate: new Date(birthdate),
          balance: balance
        }
      }

      $scope.rowCollection = [];

      for (id; id < 5; id++) {
        $scope.rowCollection.push(generateRandomItem(id));
      }

      //copy the references (you could clone ie angular.copy but then have to go through a dirty checking for the matches)
      $scope.displayedCollection = [].concat($scope.rowCollection);

      //add to the real data holder
      $scope.addRandomItem = function addRandomItem() {
        $scope.rowCollection.push(generateRandomItem(id));
        id++;
      };

      //remove to the real data holder
      $scope.removeItem = function(row) {
        var index = $scope.rowCollection.indexOf(row);
        if (index !== -1) {
          $scope.rowCollection.splice(index, 1);
        }
      }

      //  pagination
      $scope.itemsByPage=10;

      $scope.rowCollectionPage = [];
      for (var j = 0; j < 200; j++) {
        $scope.rowCollectionPage.push(generateRandomItem(j));
      }

      // pip
      var promise = null;
      $scope.isLoading = false;
      $scope.rowCollectionPip = [];
      $scope.getPage = function() {
        $scope.rowCollectionPip=[];
        for (var j = 0; j < 20; j++) {
          $scope.rowCollectionPip.push(generateRandomItem(j));
        }
      }

      $scope.callServer = function getData(tableState) {
        //here you could create a query string from tableState
        //fake ajax call
        $scope.isLoading = true;

        $timeout(function () {
          $scope.getPage();
          $scope.isLoading = false;
        }, 2000);
      };

      $scope.getPage();
  }]);