describe('services.lodash', function() {
  beforeEach(module('services.lodash'));
  
  it('injects the lodash library as _', inject(function(_) {
    expect(_).toBeTruthy();
  }));
});
