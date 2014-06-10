describe('filters.phoneFilter', function() {
  beforeEach(module('filters.phoneFilter'));
  
  xit('formats a 10-digit phone number with dashes', inject(function(phoneFilter) {
    expect(phoneFilter('1111111111')).toEqual('111-111-1111');
  }));

  xit('returns an empty string if string length is 0', inject(function(phoneFilter) {
    expect(phoneFilter('')).toEqual(undefined);
  }));
});
