(function (angular) {

  angular.module('messenger')
    .factory('Socket', ['$rootScope', '$window', function ($rootScope, $window) {
      var socket = $window.io.connect($window.location.origin+'/socket');
      return {
        socket: socket,
        on: function (eventName, callback) {
          socket.on(eventName, function() {
            var args = arguments;
            $rootScope.$apply(function () {
              callback.apply(socket, args);
            });
          });
        },
        error: function(callback) {
          socket.on('error', function() {
            var args = arguments;
            $rootScope.$apply(function () {
              callback.apply(socket, args);
            });
          });
        },
        disconnect: function(callback) {
          socket.on('disconnect', function() {
            var args = arguments;
            $rootScope.$apply(function () {
              callback.apply(socket, args);
            });
          });
        },
        emit: function (eventName, data, callback) {
          socket.emit(eventName, data, function () {
            var args = arguments;
            $rootScope.$apply(function () {
              if (callback) {
                callback.apply(socket, args);
              }
            });
          });
        }
      };
    }]);

}(window.angular));
