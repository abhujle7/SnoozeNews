angular.module('starter.controllers', [])

.controller('AlarmCtrl', function($scope, $interval, mainFac, $rootScope) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $rootScope.lang = 'en-US';
  $scope.stories;
  var storyNum;
  $scope.alarm = {};
  $scope.alarmSet;
  var alarm;
  var isSpeaking = false;
  var timer;

  var speakTopStories = function () {
    if (!isSpeaking) {
      Chats.getTopStories().then(function (result) {
        $scope.stories = result;
        return $scope.stories;
      }).then(function (stories) {
        // console.log(stories, 'these are stories');
              storyNum = 0;
              TTS.speak({
                  text: stories[0].title,
                  locale: $rootScope.lang
                }, function () {
                  storyNum = 1;
                  TTS.speak({
                    text: stories[1].title,
                    locale: $rootScope.lang
                  }, function () {
                    storyNum = 2;
                    TTS.speak({
                      text: stories[2].title,
                      locale: $rootScope.lang
                    }, function () {
                      storyNum = 3;
                      TTS.speak({
                        text: stories[3].title,
                        locale: $rootScope.lang
                      }, function (){
                        storyNum = 4;
                        TTS.speak({
                          text: stories[4].title,
                          locale: $rootScope.lang
                        }, function () {
                          storyNum = 5;
                          TTS.speak({
                            text: stories[5].title,
                            locale: $rootScope.lang
                          }, function () {
                            storyNum = 6;
                            TTS.speak({
                              text: stories[6].title,
                              locale: $rootScope.lang
                            }, function () {
                              storyNum = 7;
                              TTS.speak({
                                text: stories[7].title,
                                locale: $rootScope.lang
                              }, function () {
                                storyNum = 8;
                                TTS.speak({
                                  text: stories[8].title,
                                  locale: $rootScope.lang
                                }, function () {
                                  storyNum = 9;
                                  TTS.speak({
                                    text: stories[9].title,
                                    locale: $rootScope.lang
                                  }, function () {
                                    isSpeaking = false;
                                  })

                                })
                              })
                            })
                          })
                        })
                      })
                    })
                  })
              })

      })
    }
  }

  $scope.onDoubleTap = function () {
    window.open('' + $scope.stories[storyNum].url)
  }

  $scope.currentHour = function () {
    today = new Date();
    var hour = today.getHours();
    if (hour>12) {
      hour -= 12;
    }
    return hour;
  }

  $scope.submit = function () {
    $scope.alarmSet = true;
    alarm = $scope.alarm;
    
    timer = $interval(function(){
      console.log('timer is on')
      var today = new Date();
      var currHour = today.getHours();
      var currMin = today.getMinutes();
      var alarmHour = parseInt(alarm.hour)
      var alarmMin = parseInt(alarm.minute)
      
      if (alarm.amOrPm == 'PM' && alarmHour < 12) {
        alarmHour += 12;
      }
      // console.log('this is alarmHour', alarmHour)
      // console.log(currHour,'this is currhour')
      
      if (currHour == alarmHour && currMin == alarmMin || currHour == alarmHour && currMin-2 == alarmMin || currHour == alarmHour && currMin-1 == alarmMin) {
        console.log('alarm ringing!!!!!')
        speakTopStories();
        isSpeaking = true;
      }

    }, 1000);
  }

  $scope.stopTimer = function(){
    console.log('this is reset');
    $interval.cancel(timer);
    $scope.alarmSet = false;
  }

})



.controller('AccountCtrl', function($scope, $rootScope) {
  
  $scope.languages = [
    {name: 'English (United States)', id: 'en-US'},
    {name: 'English (Australia)', id: 'en-AU'},
    {name: 'English (Ireland)', id: 'en-IE'},
    {name: 'English (South Africa)', id: 'en-ZA'},
    {name: 'English (United Kingdom)', id: 'en-GB'},
    {name: 'Chinese (China)', id: 'zh-CN'},
    {name: 'Dutch (Netherlands)', id: 'nl-NL'},
    {name: 'French', id: 'fr-FR'},
    {name: 'German', id: 'de-DE'},
    {name: 'Hindi', id: 'hi-IN'},
    {name: 'Italian', id: 'it-IT'},
    {name: 'Japanese', id: 'ja-JP'},
    {name: 'Russian', id: 'ru-RU'},
    {name: 'Spanish', id: 'es-ES'},   
    {name: 'Thai', id: 'th-TH'}    
  ]

  $scope.langSelected = function (language) {
    console.log('in function', language)
    for (var i = 0; i < $scope.languages.length; i++) {
      if ($scope.languages[i].name == language.name) {
        console.log('is the language changing?')
        console.log($scope.languages[i].id, 'this is language')
        $rootScope.lang = $scope.languages[i].id;
      }
    } 
  }
  $scope.langSelected('French');
  console.log('hellooooooo')

});
