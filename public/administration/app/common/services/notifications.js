(function () {
    'use strict';
    angular.module('app.common.services.notifications', ['toaster'])
        .service('NotificationsService', function (toaster, $translate) {

            function setMessageText(messageType, messageText) {
                messageType = messageType.toUpperCase();
                switch (messageType) {
                    case 'CREATE':
                        return $translate.instant('TOAST_NOTIFICATION.MESSAGE.CREATE.SUCCESS', {name: messageText})
                    case 'READ':
                        return $translate.instant('TOAST_NOTIFICATION.MESSAGE.READ.SUCCESS', {name: messageText})
                    case 'UPDATE':
                        return $translate.instant('TOAST_NOTIFICATION.MESSAGE.UPDATE.SUCCESS', {name: messageText})
                    case 'DELETE':
                        return $translate.instant('TOAST_NOTIFICATION.MESSAGE.DELETE.SUCCESS', {name: messageText})
                    default :
                        alert("wrong messate type");
                }
            }

            return {
                showSuccess: function (messageType, messageText) {
                    toaster.pop(
                        "success",
                        $translate.instant('TOAST_NOTIFICATION.STATUS.SUCCESS'),
                        setMessageText(messageType, messageText));
                },
                showError: function (messageText) {
                    toaster.pop(
                        "error",
                        $translate.instant('TOAST_NOTIFICATION.STATUS.ERROR'),
                        messageText);
                }

            }
        });
})();
/**
 * Created by Antoan on 21.10.2015 г..
 */