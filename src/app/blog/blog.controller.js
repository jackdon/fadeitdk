angular.module('fadeit.blog').controller('BlogController', blogController);

blogController.$inject = ['$scope', '$stateParams','BlogService', '$state'];
function blogController($scope, $stateParams, BlogService, $state) {
  //read the project id from the state
  var vm = this;
  vm.requestUrl = $stateParams.postId;

  if(!$stateParams.postId){
    $state.go('blog');
  }

  BlogService.singlePost(vm.requestUrl)
    .then(function singlePostResponse(response){
      var pageTitle, pageDesc;
      console.log(response);

      vm.post = response;
      pageTitle = !response.error ? vm.post.title : 'Sorry, this post does not exist';
      pageDesc = !response.error ? vm.post.content.shortDescription : 'Sorry, this post does not exist';

      $scope.$emit('changedPage', pageTitle);
      $scope.$emit('changedDesc', pageDesc);
  }, function blogListError(error){
    vm.post = 'Sorry, we couldn\'t find this blog post. Will you ever forgive us?';
    vm.post += 'The server replied with the status: ' + error.status + ', ' + error.statusText + '.';
  });
}
