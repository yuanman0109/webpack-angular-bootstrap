export default class networkManagerCtrl{
    constructor($uibModal, $log, $document){
        this.$uibModal =$uibModal;
        this.$log=$log;
        this.$document=$document;
    }
    //删除
    open(){
        let $log=this.$log;
        let fn=function ($uibModalInstance) {
                    var $ctrl = this;
                    $ctrl.ok = function () {
                        $uibModalInstance.close();
                    };

                    $ctrl.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                };
        fn.$inject=['$uibModalInstance'];
        this.$uibModal.open({
            templateUrl: 'deleteSSID.html',
            controller: fn,
            controllerAs: '$ctrl',
        }).result.then(function () {
            $log.info('ok');
        }, function () {
            $log.info('cancle');
        });
    }
    //修改
    modify(){
        let $log=this.$log;
        let fn=function ($uibModalInstance) {
                    var $ctrl = this;
                    $ctrl.ok = function () {
                        $uibModalInstance.close();
                    };

                    $ctrl.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                };
        fn.$inject=['$uibModalInstance'];
        this.$uibModal.open({
            templateUrl: 'modifySSID.html',
            controller: fn,
            controllerAs: '$ctrl',
        }).result.then(function () {
            $log.info('ok');
        }, function () {
            $log.info('cancle');
        });

    }
    //增加名单
    addlist(){
        let $log=this.$log;
        let fn=function ($uibModalInstance) {
                    var $ctrl = this;
                    $ctrl.ok = function () {
                        $uibModalInstance.close();
                    };

                    $ctrl.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                };
        fn.$inject=['$uibModalInstance'];
        this.$uibModal.open({
            templateUrl: 'addlist.html',
            controller: fn,
            controllerAs: '$ctrl',
        }).result.then(function () {
            $log.info('ok');
        }, function () {
            $log.info('cancle');
        });
    }
    //删除名单
    deletelist(){
        let $log=this.$log;
        let fn=function ($uibModalInstance) {
                    var $ctrl = this;
                    $ctrl.ok = function () {
                        $uibModalInstance.close();
                    };

                    $ctrl.cancel = function () {
                        $uibModalInstance.dismiss();
                    };
                };
        fn.$inject=['$uibModalInstance'];
        this.$uibModal.open({
            templateUrl: 'deletelist.html',
            controller: fn,
            controllerAs: '$ctrl',
        }).result.then(function () {
            $log.info('ok');
        }, function () {
            $log.info('cancle');
        });
    }
}
networkManagerCtrl.$inject=['$uibModal', '$log', '$document'];