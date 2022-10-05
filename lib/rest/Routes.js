'use strict';

/* jshint ignore:start */
/**
 * This code was generated by
 * \ / _    _  _|   _  _
 *  | (_)\/(_)(_|\/| |(/_  v1.0.0
 *       /       /
 */
/* jshint ignore:end */

var _ = require('lodash');  /* jshint ignore:line */
var Domain = require('../base/Domain');  /* jshint ignore:line */
var V2 = require('./routes/V2');  /* jshint ignore:line */


/* jshint ignore:start */
/**
 * Initialize routes domain
 *
 * @constructor Twilio.Routes
 *
 * @property {Twilio.Routes.V2} v2 - v2 version
 * @property {Twilio.Routes.V2.PhoneNumberList} phoneNumbers -
 *          phoneNumbers resource
 * @property {Twilio.Routes.V2.SipDomainList} sipDomains - sipDomains resource
 * @property {Twilio.Routes.V2.TrunkList} trunks - trunks resource
 *
 * @param {Twilio} twilio - The twilio client
 */
/* jshint ignore:end */
function Routes(twilio) {
  Domain.prototype.constructor.call(this, twilio, 'https://routes.twilio.com');

  // Versions
  this._v2 = undefined;
}

_.extend(Routes.prototype, Domain.prototype);
Routes.prototype.constructor = Routes;

Object.defineProperty(Routes.prototype,
  'v2', {
    get: function() {
      this._v2 = this._v2 || new V2(this);
      return this._v2;
    }
});

Object.defineProperty(Routes.prototype,
  'phoneNumbers', {
    get: function() {
      return this.v2.phoneNumbers;
    }
});

Object.defineProperty(Routes.prototype,
  'sipDomains', {
    get: function() {
      return this.v2.sipDomains;
    }
});

Object.defineProperty(Routes.prototype,
  'trunks', {
    get: function() {
      return this.v2.trunks;
    }
});

module.exports = Routes;