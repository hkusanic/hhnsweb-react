var myApp = angular.module('fupApp', ["angular-uuid"]);
    myApp.controller('fupController', function ($scope, $q, $http, uuid) {

        var noBreaks = "Hello World. My name is Jennifer. What is your name?";

        // $scope.GetPDFData = function(DataType) {
        //     // http://localhost:3000/api/pdfRead/
        //     // 
        //     $http.get('http://localhost:3000/utils/output.json').then(function (response) {
        //         $scope.PDFData = response.data;
        //         document.getElementById("demo").innerHTML = $scope.PDFData[5].en.transcription.text;
        //         // console.log($scope.PDFData.data);
        //         console.log($scope.PDFData[5].en.transcription.text);
        //     }, function(err) {
        //         console.log(err);
        //     });
        // }

        $scope.getJsonData = function() {
            $scope.audioJsonData = [];
            $http.get('http://localhost:3000/utils/audioData.json').then(function(response) { 
                $scope.audioJsonData = response.data;
                console.log($scope.audioJsonData);
                var traCount = 0;
                var resultArray = [];
                for(var i = 0; i < 100; i++){
                    console.log($scope.audioJsonData[i].en.transcription.attachment_link);
                    if($scope.audioJsonData[i].en.transcription.attachment_link != ""){
                        resultArray.push(downloadAndReadData($scope.audioJsonData[i].en.transcription.attachment_link, $scope.audioJsonData[i].en.transcription.attachment_name, $scope.audioJsonData[i]));
                    }
                    if( i == 99 ) {
                        $q.all(resultArray).then(function(response){
                            console.log(response);
                        }, function(err){
                            console.log(err);
                        });
                    }
                }
            }, function(err){
                console.log(err);
            }); 
        };

        $scope.GetPDFData = function() {
            $scope.getJsonData();
        }

        function downloadAndReadData(att_link, att_name, att_object){
            var deffer = $q.defer();
            try {
                var pdfLocation = {
                    "attachment_link" : att_link,
                    "attachment_name" : att_name
                };
                $http.post('http://localhost:3000/api/pdfDownloadAndRead/', pdfLocation).then(function (response) {
                    $scope.PDFData = response.data;
                    console.log($scope.PDFData.data);
                    att_object.en.transcription.text = $scope.PDFData.data;
                    $http.post('http://localhost:3000/api/pdfDataPushing/', att_object).then(function(response){
                        deffer.resolve(response);
                    }, function(err) {
                        console.log(err);   
                    });
                    
                }, function(err){
                    deffer.reject(err);
                });
            }
            catch (err){
                deffer.reject(err);
            }
            return deffer.promise;
        }
    });