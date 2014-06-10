describe('services.foursquareService', function() {
  beforeEach(module('services.foursquareService'));
  
  describe('.search()', function () {
    it('is defined', inject(function(foursquareService) {
      expect(foursquareService.search).toBeTruthy();
    }));
  });
});
