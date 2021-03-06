﻿angular
    .module('bit.settings')

    .controller('settingsSessionsController', function ($scope, $state, apiService, $uibModalInstance, cryptoService, authService, toastr, $analytics) {
        $analytics.eventTrack('settingsSessionsController', { category: 'Modal' });
        $scope.submit = function (model) {
            var request = {
                masterPasswordHash: cryptoService.hashPassword(model.masterPassword)
            };

            $scope.submitPromise = apiService.accounts.putSecurityStamp(request, function () {
                $uibModalInstance.dismiss('cancel');
                authService.logOut();
                $analytics.eventTrack('Deauthorized Sessions');
                $state.go('frontend.login.info').then(function () {
                    toastr.success('Please log back in.', 'All Sessions Deauthorized');
                });
            }).$promise;
        };

        $scope.close = function () {
            $uibModalInstance.dismiss('cancel');
        };
    });
