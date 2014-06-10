describe('filters.phoneFilter', function() {
  beforeEach(module('filters.phoneFilter'));
  
  it('formats a 10-digit phone number with dashes', inject(function(phoneFilter) {
    expect(phoneFilter('1111111111')).toEqual('111-111-1111');
  }));

  it('returns an empty string if string length is 0', inject(function(phoneFilter) {
    expect(phoneFilter('')).toEqual('');
  }));
});
