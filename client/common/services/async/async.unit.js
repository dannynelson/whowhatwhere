describe('services.async', function() {
  beforeEach(module('services.async'));
  
  it('injects the async library', inject(function(async) {
    expect(async).toBeTruthy();
  }));
});
