(function(angular) {

  angular.module('messenger')
    .controller('mainController',['$rootScope','$scope','$http','$state', '$stateParams',function($rootScope,$scope,$http,$state,$stateParams) {
      if(!!$rootScope.userDetails && !!$rootScope.userDetails.location){
        $scope.location = $rootScope.userDetails.location;
      }else{
        $state.go('login')
      }

      // // // // // // //
      // socket handlers //
      // // // // // // //
      socket.on('socketUsersChange',function(data){
        $http({method:'get',url:'/get/locations'}).success(function(data){
          $scope.locationData=data;
        })
/*
        $scope.locationData=data;
*/
      });

      socket.emit("joinRoom",$scope.location);

      socket.on('message',function(data,userDetails) {
        if(userDetails.user._id != $rootScope.userDetails.user._id) {
          $('.height443').append('<br><br><br><span><img src="/images/man.png"></span><span\
          style="background: transparent;font-family: cursive">&nbsp;' + userDetails.user.name + ' : ' + data + '</span>')
        }else{
          $('.height443').append('<span style="background: transparent;font-family: cursive"><p class="text-right">'+data+' &nbsp;<img\
          src="/images/man.png"></p></span>');
        }
      });


      $scope.send = function() {
        socket.emit("chat",$scope.message,$rootScope.userDetails);
        $scope.message = '';
      }

      $scope.logout=function(){
        socket.emit('leaveRoom',$scope.location);
        $state.go('login');
      }

    }])
    .controller('loginController',['$rootScope','$scope','$http','$state', '$stateParams',function($rootScope,$scope,$http,$state, $stateParams) {
      $scope.user = {}
      $scope.startChat = function() {
        $http({method: 'post',url: '/login',data: {user: $scope.user}}).success(function(data) {
          if(data.status == 'Error') {
            $state.go('login');
          } else {
            $rootScope.userDetails = data.userDetails;
            $state.go('chat');
          }
        });
      }
      navigator.geolocation.getCurrentPosition(
        function(position) {
          var geocode = $http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + position.coords.latitude + ',' + position.coords.longitude + '&sensor=true&components=postal_town');
          geocode.success(function(response) {
            if(response.status = "OK") {
              $scope.user.location = response.results[response.results.length - 1].formatted_address;
            }
          });
        },function(error) {
          console.log(error);
        });
    }])
}(window.angular));