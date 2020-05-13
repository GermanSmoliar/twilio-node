'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Holodeck = require('../../../holodeck');  /* jshint ignore:line */
var Request = require(
    '../../../../../lib/http/request');  /* jshint ignore:line */
var Response = require(
    '../../../../../lib/http/response');  /* jshint ignore:line */
var RestException = require(
    '../../../../../lib/base/RestException');  /* jshint ignore:line */
var Twilio = require('../../../../../lib');  /* jshint ignore:line */


var client;
var holodeck;

describe('Service', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid create request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var opts = {friendlyName: 'friendly_name'};
      var promise = client.verify.v2.services.create(opts);
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var url = 'https://verify.twilio.com/v2/Services';

      var values = {FriendlyName: 'friendly_name', };
      holodeck.assertHasRequest(new Request({
          method: 'POST',
          url: url,
          data: values
      }));
    }
  );
  it('should generate valid create_record response',
    function(done) {
      var body = {
          'sid': 'VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'friendly_name': 'name',
          'code_length': 4,
          'lookup_enabled': false,
          'psd2_enabled': false,
          'skip_sms_to_landlines': false,
          'dtmf_input_required': false,
          'tts_name': 'name',
          'mailer_sid': 'MDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'do_not_share_warning_enabled': false,
          'custom_code_enabled': true,
          'date_created': '2015-07-30T20:00:00Z',
          'date_updated': '2015-07-30T20:00:00Z',
          'url': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'links': {
              'verification_checks': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck',
              'verifications': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications',
              'rate_limits': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits',
              'messaging_configurations': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessagingConfigurations'
          }
      };

      holodeck.mock(new Response(201, body));

      var opts = {friendlyName: 'friendly_name'};
      var promise = client.verify.v2.services.create(opts);
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should generate valid fetch request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var promise = client.verify.v2.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').fetch();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var sid = 'VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://verify.twilio.com/v2/Services/${sid}`;

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch_record response',
    function(done) {
      var body = {
          'sid': 'VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'friendly_name': 'name',
          'code_length': 4,
          'lookup_enabled': false,
          'psd2_enabled': false,
          'skip_sms_to_landlines': false,
          'dtmf_input_required': false,
          'tts_name': 'name',
          'mailer_sid': 'MDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'do_not_share_warning_enabled': false,
          'custom_code_enabled': true,
          'date_created': '2015-07-30T20:00:00Z',
          'date_updated': '2015-07-30T20:00:00Z',
          'url': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'links': {
              'verification_checks': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck',
              'verifications': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications',
              'rate_limits': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits',
              'messaging_configurations': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessagingConfigurations'
          }
      };

      holodeck.mock(new Response(200, body));

      var promise = client.verify.v2.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').fetch();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should generate valid remove request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var promise = client.verify.v2.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').remove();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var sid = 'VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://verify.twilio.com/v2/Services/${sid}`;

      holodeck.assertHasRequest(new Request({
        method: 'DELETE',
        url: url
      }));
    }
  );
  it('should generate valid delete response',
    function(done) {
      var body = null;

      holodeck.mock(new Response(204, body));

      var promise = client.verify.v2.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').remove();
      promise.then(function(response) {
        expect(response).toBe(true);
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should treat the first each arg as a callback',
    function(done) {
      var body = {
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://verify.twilio.com/v2/Services?PageSize=50&Page=0',
              'previous_page_url': null,
              'next_page_url': null,
              'key': 'services',
              'url': 'https://verify.twilio.com/v2/Services?PageSize=50&Page=0'
          },
          'services': [
              {
                  'sid': 'VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'friendly_name': 'name',
                  'code_length': 4,
                  'lookup_enabled': false,
                  'psd2_enabled': false,
                  'skip_sms_to_landlines': false,
                  'dtmf_input_required': false,
                  'tts_name': 'name',
                  'mailer_sid': 'MDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'do_not_share_warning_enabled': false,
                  'custom_code_enabled': true,
                  'date_created': '2015-07-30T20:00:00Z',
                  'date_updated': '2015-07-30T20:00:00Z',
                  'url': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'links': {
                      'verification_checks': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck',
                      'verifications': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications',
                      'rate_limits': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits',
                      'messaging_configurations': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessagingConfigurations'
                  }
              }
          ]
      };
      holodeck.mock(new Response(200, body));
      client.verify.v2.services.each(() => done());
    }
  );
  it('should treat the second arg as a callback',
    function(done) {
      var body = {
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://verify.twilio.com/v2/Services?PageSize=50&Page=0',
              'previous_page_url': null,
              'next_page_url': null,
              'key': 'services',
              'url': 'https://verify.twilio.com/v2/Services?PageSize=50&Page=0'
          },
          'services': [
              {
                  'sid': 'VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'friendly_name': 'name',
                  'code_length': 4,
                  'lookup_enabled': false,
                  'psd2_enabled': false,
                  'skip_sms_to_landlines': false,
                  'dtmf_input_required': false,
                  'tts_name': 'name',
                  'mailer_sid': 'MDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'do_not_share_warning_enabled': false,
                  'custom_code_enabled': true,
                  'date_created': '2015-07-30T20:00:00Z',
                  'date_updated': '2015-07-30T20:00:00Z',
                  'url': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'links': {
                      'verification_checks': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck',
                      'verifications': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications',
                      'rate_limits': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits',
                      'messaging_configurations': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessagingConfigurations'
                  }
              }
          ]
      };
      holodeck.mock(new Response(200, body));
      client.verify.v2.services.each({pageSize: 20}, () => done());
      holodeck.assertHasRequest(new Request({
          method: 'GET',
          url: 'https://verify.twilio.com/v2/Services',
          params: {PageSize: 20},
      }));
    }
  );
  it('should find the callback in the opts object',
    function(done) {
      var body = {
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://verify.twilio.com/v2/Services?PageSize=50&Page=0',
              'previous_page_url': null,
              'next_page_url': null,
              'key': 'services',
              'url': 'https://verify.twilio.com/v2/Services?PageSize=50&Page=0'
          },
          'services': [
              {
                  'sid': 'VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'friendly_name': 'name',
                  'code_length': 4,
                  'lookup_enabled': false,
                  'psd2_enabled': false,
                  'skip_sms_to_landlines': false,
                  'dtmf_input_required': false,
                  'tts_name': 'name',
                  'mailer_sid': 'MDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'do_not_share_warning_enabled': false,
                  'custom_code_enabled': true,
                  'date_created': '2015-07-30T20:00:00Z',
                  'date_updated': '2015-07-30T20:00:00Z',
                  'url': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'links': {
                      'verification_checks': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck',
                      'verifications': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications',
                      'rate_limits': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits',
                      'messaging_configurations': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessagingConfigurations'
                  }
              }
          ]
      };
      holodeck.mock(new Response(200, body));
      client.verify.v2.services.each({callback: () => done()}, () => fail('wrong callback!'));
    }
  );
  it('should generate valid list request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var promise = client.verify.v2.services.list();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var url = 'https://verify.twilio.com/v2/Services';

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_all response',
    function(done) {
      var body = {
          'meta': {
              'page': 0,
              'page_size': 50,
              'first_page_url': 'https://verify.twilio.com/v2/Services?PageSize=50&Page=0',
              'previous_page_url': null,
              'next_page_url': null,
              'key': 'services',
              'url': 'https://verify.twilio.com/v2/Services?PageSize=50&Page=0'
          },
          'services': [
              {
                  'sid': 'VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'friendly_name': 'name',
                  'code_length': 4,
                  'lookup_enabled': false,
                  'psd2_enabled': false,
                  'skip_sms_to_landlines': false,
                  'dtmf_input_required': false,
                  'tts_name': 'name',
                  'mailer_sid': 'MDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'do_not_share_warning_enabled': false,
                  'custom_code_enabled': true,
                  'date_created': '2015-07-30T20:00:00Z',
                  'date_updated': '2015-07-30T20:00:00Z',
                  'url': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'links': {
                      'verification_checks': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck',
                      'verifications': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications',
                      'rate_limits': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits',
                      'messaging_configurations': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessagingConfigurations'
                  }
              }
          ]
      };

      holodeck.mock(new Response(200, body));

      var promise = client.verify.v2.services.list();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should generate valid update request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var promise = client.verify.v2.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').update();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var sid = 'VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://verify.twilio.com/v2/Services/${sid}`;

      holodeck.assertHasRequest(new Request({
        method: 'POST',
        url: url
      }));
    }
  );
  it('should generate valid update_record response',
    function(done) {
      var body = {
          'sid': 'VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'friendly_name': 'name',
          'code_length': 4,
          'lookup_enabled': false,
          'psd2_enabled': false,
          'skip_sms_to_landlines': false,
          'dtmf_input_required': false,
          'tts_name': 'name',
          'mailer_sid': 'MDaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'do_not_share_warning_enabled': false,
          'custom_code_enabled': true,
          'date_created': '2015-07-30T20:00:00Z',
          'date_updated': '2015-07-30T20:00:00Z',
          'url': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'links': {
              'verification_checks': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/VerificationCheck',
              'verifications': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Verifications',
              'rate_limits': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/RateLimits',
              'messaging_configurations': 'https://verify.twilio.com/v2/Services/VAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/MessagingConfigurations'
          }
      };

      holodeck.mock(new Response(200, body));

      var promise = client.verify.v2.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').update();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
});
