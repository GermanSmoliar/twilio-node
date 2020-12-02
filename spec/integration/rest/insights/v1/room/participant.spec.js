'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var Holodeck = require('../../../../holodeck');  /* jshint ignore:line */
var Request = require(
    '../../../../../../lib/http/request');  /* jshint ignore:line */
var Response = require(
    '../../../../../../lib/http/response');  /* jshint ignore:line */
var RestException = require(
    '../../../../../../lib/base/RestException');  /* jshint ignore:line */
var Twilio = require('../../../../../../lib');  /* jshint ignore:line */


var client;
var holodeck;

describe('Participant', function() {
  beforeEach(function() {
    holodeck = new Holodeck();
    client = new Twilio('ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX', 'AUTHTOKEN', {
      httpClient: holodeck
    });
  });
  it('should generate valid fetch request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var promise = client.insights.v1.rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                      .participants('PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').fetch();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var roomSid = 'RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var participantSid = 'PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://insights.twilio.com/v1/Video/Rooms/${roomSid}/Participants/${participantSid}`;

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid fetch response',
    function(done) {
      var body = {
          'publisher_info': {},
          'edge_location': 'Ashburn',
          'join_time': '2015-07-30T20:00:00Z',
          'leave_time': '2015-07-30T20:00:00Z',
          'end_reason': 'disconnected_via_api',
          'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'error_code': 0,
          'media_region': 'us1',
          'properties': {},
          'room_sid': 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'error_code_url': 'error_code_url',
          'participant_sid': 'PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
          'codecs': [
              'VP8'
          ],
          'status': 'in_progress',
          'duration_sec': 50000000,
          'participant_identity': 'participant_identity',
          'url': 'https://insights.twilio.com/v1/Video/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
      };

      holodeck.mock(new Response(200, body));

      var promise = client.insights.v1.rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                      .participants('PAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX').fetch();
      promise.then(function(response) {
        expect(response).toBeDefined();
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
              'url': 'https://insights.twilio.com/v1/Video/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0',
              'key': 'participants',
              'first_page_url': 'https://insights.twilio.com/v1/Video/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0',
              'page_size': 50,
              'next_page_url': null,
              'page': 0,
              'previous_page_url': null
          },
          'participants': [
              {
                  'publisher_info': {},
                  'edge_location': 'Ashburn',
                  'join_time': '2015-07-30T20:00:00Z',
                  'leave_time': '2015-07-30T20:00:00Z',
                  'end_reason': 'disconnected_via_api',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'error_code': 53205,
                  'media_region': 'us1',
                  'properties': {},
                  'room_sid': 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'error_code_url': 'error_code_url',
                  'participant_sid': 'PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'codecs': [
                      'VP8'
                  ],
                  'status': 'in_progress',
                  'duration_sec': 50000000,
                  'participant_identity': 'participant_identity',
                  'url': 'https://insights.twilio.com/v1/Video/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ]
      };
      holodeck.mock(new Response(200, body));
      client.insights.v1.rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                        .participants.each(() => done());
    }
  );
  it('should treat the second arg as a callback',
    function(done) {
      var body = {
          'meta': {
              'url': 'https://insights.twilio.com/v1/Video/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0',
              'key': 'participants',
              'first_page_url': 'https://insights.twilio.com/v1/Video/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0',
              'page_size': 50,
              'next_page_url': null,
              'page': 0,
              'previous_page_url': null
          },
          'participants': [
              {
                  'publisher_info': {},
                  'edge_location': 'Ashburn',
                  'join_time': '2015-07-30T20:00:00Z',
                  'leave_time': '2015-07-30T20:00:00Z',
                  'end_reason': 'disconnected_via_api',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'error_code': 53205,
                  'media_region': 'us1',
                  'properties': {},
                  'room_sid': 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'error_code_url': 'error_code_url',
                  'participant_sid': 'PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'codecs': [
                      'VP8'
                  ],
                  'status': 'in_progress',
                  'duration_sec': 50000000,
                  'participant_identity': 'participant_identity',
                  'url': 'https://insights.twilio.com/v1/Video/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ]
      };
      holodeck.mock(new Response(200, body));
      client.insights.v1.rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                        .participants.each({pageSize: 20}, () => done());
      holodeck.assertHasRequest(new Request({
          method: 'GET',
          url: 'https://insights.twilio.com/v1/Video/Rooms/${roomSid}/Participants',
          params: {PageSize: 20},
      }));
    }
  );
  it('should find the callback in the opts object',
    function(done) {
      var body = {
          'meta': {
              'url': 'https://insights.twilio.com/v1/Video/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0',
              'key': 'participants',
              'first_page_url': 'https://insights.twilio.com/v1/Video/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0',
              'page_size': 50,
              'next_page_url': null,
              'page': 0,
              'previous_page_url': null
          },
          'participants': [
              {
                  'publisher_info': {},
                  'edge_location': 'Ashburn',
                  'join_time': '2015-07-30T20:00:00Z',
                  'leave_time': '2015-07-30T20:00:00Z',
                  'end_reason': 'disconnected_via_api',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'error_code': 53205,
                  'media_region': 'us1',
                  'properties': {},
                  'room_sid': 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'error_code_url': 'error_code_url',
                  'participant_sid': 'PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'codecs': [
                      'VP8'
                  ],
                  'status': 'in_progress',
                  'duration_sec': 50000000,
                  'participant_identity': 'participant_identity',
                  'url': 'https://insights.twilio.com/v1/Video/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ]
      };
      holodeck.mock(new Response(200, body));
      client.insights.v1.rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                        .participants.each({callback: () => done()}, () => fail('wrong callback!'));
    }
  );
  it('should generate valid list request',
    function(done) {
      holodeck.mock(new Response(500, {}));

      var promise = client.insights.v1.rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                      .participants.list();
      promise.then(function() {
        throw new Error('failed');
      }, function(error) {
        expect(error.constructor).toBe(RestException.prototype.constructor);
        done();
      }).done();

      var roomSid = 'RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
      var url = `https://insights.twilio.com/v1/Video/Rooms/${roomSid}/Participants`;

      holodeck.assertHasRequest(new Request({
        method: 'GET',
        url: url
      }));
    }
  );
  it('should generate valid read_empty response',
    function(done) {
      var body = {
          'meta': {
              'url': 'https://insights.twilio.com/v1/Video/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0',
              'key': 'participants',
              'first_page_url': 'https://insights.twilio.com/v1/Video/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0',
              'page_size': 50,
              'next_page_url': null,
              'page': 0,
              'previous_page_url': null
          },
          'participants': []
      };

      holodeck.mock(new Response(200, body));

      var promise = client.insights.v1.rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                      .participants.list();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
  it('should generate valid read_full response',
    function(done) {
      var body = {
          'meta': {
              'url': 'https://insights.twilio.com/v1/Video/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0',
              'key': 'participants',
              'first_page_url': 'https://insights.twilio.com/v1/Video/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants?PageSize=50&Page=0',
              'page_size': 50,
              'next_page_url': null,
              'page': 0,
              'previous_page_url': null
          },
          'participants': [
              {
                  'publisher_info': {},
                  'edge_location': 'Ashburn',
                  'join_time': '2015-07-30T20:00:00Z',
                  'leave_time': '2015-07-30T20:00:00Z',
                  'end_reason': 'disconnected_via_api',
                  'account_sid': 'ACaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'error_code': 53205,
                  'media_region': 'us1',
                  'properties': {},
                  'room_sid': 'RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'error_code_url': 'error_code_url',
                  'participant_sid': 'PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
                  'codecs': [
                      'VP8'
                  ],
                  'status': 'in_progress',
                  'duration_sec': 50000000,
                  'participant_identity': 'participant_identity',
                  'url': 'https://insights.twilio.com/v1/Video/Rooms/RMaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa/Participants/PAaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa'
              }
          ]
      };

      holodeck.mock(new Response(200, body));

      var promise = client.insights.v1.rooms('RMXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
                                      .participants.list();
      promise.then(function(response) {
        expect(response).toBeDefined();
        done();
      }, function() {
        throw new Error('failed');
      }).done();
    }
  );
});