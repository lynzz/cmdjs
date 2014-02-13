define(function(require) {
    var $ = require("$");

    require('./src/jcrop');

    describe('Jcrop', function() {
        it('should has spec memeber', function() {
            expect($.Jcrop.version).to.be.a('string');
        });
    });
});