export default class ModalDemoCtrl{
    constructor($uibModal, $log, $document){
        this.$uibModal =$uibModal;
        this.$log=$log;
        this.$document=$document;
        
        this.animationsEnabled = true;
    };



        open(size, parentSelector) {
            var abc = ['item1', 'item2', 'item3'];
            var parentElem = parentSelector ? 
            angular.element($document[0].querySelector('.modal-demo ' + parentSelector)) : undefined;
            var modalInstance = this.$uibModal.open({
            animation: this.animationsEnabled,
            ariaLabelledBy: 'modal-title',
            ariaDescribedBy: 'modal-body',
            templateUrl: 'myModalContent.html',
            controller: 'ModalDemoCtrl',
            controllerAs: '$ctrl',
            size: size,
            appendTo: parentElem,
            resolve: {
                items: function () {
                return abc;
                }
            }
            });

            modalInstance.result.then(function (selectedItem) {
            this.selected = selectedItem;
            }, function () {
            this.$log.info('Modal dismissed at: ' + new Date());
            });
        };

}