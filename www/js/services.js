angular.module('starter.main', [])

.factory('mainFac', function($http) {

  return {
 
    getTopStories: function () {
      return $http.get('https://hacker-news.firebaseio.com/v0/topstories.json?print=pretty')
      .then(function (topStories) {
          return topStories.data.slice(0,10);
      })
      .then(function (topTenIds) {
          var arr = [];
          topTenIds.forEach(function getHeadline (id) {
            arr.push($http.get('https://hacker-news.firebaseio.com/v0/item/' + id + '.json?print=pretty'))
            })
          return Promise.all(arr)
      })
      .then(function (fullStories) {
          // console.log('this are fullstories', fullStories)
          var cleanStories = fullStories.map(function keepEssentials (elem) {
            return elem = {
              id: elem.data.id,
              title: elem.data.title,
              url: elem.data.url
            }
          })
          return cleanStories;
      })
    },
    goToStory: function (url) {
      return $http.get(url);
    }

 
  }
});
