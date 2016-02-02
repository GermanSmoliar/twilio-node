'use strict';

var _ = require('lodash');
var Q = require('q');
var FeedbackList = require('./call/feedback').FeedbackList;
var FeedbackSummaryList = require('./call/feedbackSummary').FeedbackSummaryList;
var InstanceContext = require('../../../../base/InstanceContext');
var InstanceResource = require('../../../../base/InstanceResource');
var NotificationList = require('./call/notification').NotificationList;
var Page = require('../../../../base/Page');
var RecordingList = require('./call/recording').RecordingList;
var deserialize = require('../../../../base/deserialize');
var serialize = require('../../../../base/serialize');
var values = require('../../../../base/values');

var CallPage;
var CallList;
var CallInstance;
var CallContext;

/**
 * Initialize the CallPage
 *
 * @param {Version} version - Version that contains the resource
 * @param {Response} response - Response from the API
 * @param {string} accountSid -
 *          The unique id of the Account responsible for creating this Call
 *
 * @returns CallPage
 */
function CallPage(version, response, accountSid) {
  Page.prototype.constructor.call(this, version, response);

  // Path Solution
  this._solution = {
    accountSid: accountSid
  };
}

_.extend(CallPage.prototype, Page.prototype);
CallPage.prototype.constructor = CallPage;

/**
 * Build an instance of CallInstance
 *
 * @param {obj} payload - Payload response from the API
 *
 * @returns CallInstance
 */
CallPage.prototype.getInstance = function getInstance(payload) {
  return new CallInstance(
    this._version,
    payload,
    this._solution.accountSid
  );
};


/**
 * Initialize the CallList
 *
 * @param {Version} version - Version that contains the resource
 * @param {string} accountSid -
 *          The unique id of the Account responsible for creating this Call
 *
 * @returns CallList
 */
function CallList(version, accountSid) {
  function CallListInstance(sid) {
    return CallListInstance.get(sid);
  }

  CallListInstance._version = version;
  // Path Solution
  CallListInstance._solution = {
    accountSid: accountSid
  };
  CallListInstance._uri = _.template(
    '/Accounts/<%= accountSid %>/Calls.json' // jshint ignore:line
  )(CallListInstance._solution);

  // Components
  CallListInstance._feedbackSummaries = undefined;

  /**
   * Create a new CallInstance
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {string} opts.to - Phone number, SIP address or client identifier to call
   * @param {string} opts.from - Twilio number from which to originate the call
   * @param {string} [opts.method] - HTTP method to use to fetch TwiML
   * @param {string} [opts.fallbackUrl] - Fallback URL in case of error
   * @param {string} [opts.fallbackMethod] - HTTP Method to use with FallbackUrl
   * @param {string} [opts.statusCallback] - Status Callback URL
   * @param {string} [opts.statusCallbackMethod] -
   *          HTTP Method to use with StatusCallback
   * @param {string} [opts.sendDigits] - Digits to send
   * @param {string} [opts.ifMachine] -
   *          Action to take if a machine has answered the call
   * @param {string} [opts.timeout] - Number of seconds to wait for an answer
   * @param {string} [opts.record] - Whether or not to record the Call
   * @param {string} [opts.url] - Url from which to fetch TwiML
   * @param {string} [opts.applicationSid] -
   *          ApplicationSid that configures from where to fetch TwiML
   * @param {Function} [callback] - Callback to handle created record
   *
   * @returns {Promise} Resolves to newly created CallInstance
   */
  CallListInstance.create = function create(opts, callback) {
    if (_.isUndefined(opts)) {
      throw new Error('Required parameters to, from are missing.');  // jshint ignore:line
    }
    if (_.isUndefined(opts.to)) {
      throw new Error('Required parameter "to" missing.');
    }
    if (_.isUndefined(opts.from)) {
      throw new Error('Required parameter "from" missing.');
    }

    var deferred = Q.defer();
    var data = values.of({
      'To': opts.to,
      'From': opts.from,
      'Method': opts.method,
      'FallbackUrl': opts.fallbackUrl,
      'FallbackMethod': opts.fallbackMethod,
      'StatusCallback': opts.statusCallback,
      'StatusCallbackMethod': opts.statusCallbackMethod,
      'SendDigits': opts.sendDigits,
      'IfMachine': opts.ifMachine,
      'Timeout': opts.timeout,
      'Record': opts.record,
      'Url': opts.url,
      'ApplicationSid': opts.applicationSid
    });

    var promise = this._version.create({
      uri: this._uri,
      method: 'POST',
      data: data
    });

    promise = promise.then(function(payload) {
      deferred.resolve(new CallInstance(
        this._version,
        payload,
        this._solution.accountSid
      ));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  /**
   * Streams CallInstance records from the API.
   *
   * This operation lazily loads records as efficiently as possible until the limit
   * is reached.
   *
   * The results are passed into the callback function, so this operation is memory efficient.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize=50] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no pageSize is defined but a limit is defined,
   *         list() will attempt to read the limit with the most efficient
   *         page size, i.e. min(limit, 1000)
   * @param {Function} [opts.callback] -
   *         Function to process each record. If this and a positional
   * callback are passed, this one will be used
   * @param {Function} [opts.done] -
   *          Function to be called upon completion of streaming
   * @param {Function} [callback] - Function to process each record
   */
  CallListInstance.each = function each(opts, callback) {
    opts = opts || {};
    if (_.isFunction(opts)) {
      opts = { callback: opts };
    } else if (_.isFunction(callback) && !_.isFunction(opts.callback)) {
      opts.callback = callback;
    }

    if (_.isUndefined(opts.callback)) {
      throw new Error('Callback function must be provided');
    }

    var done = false;
    var currentPage = 1;
    var limits = this._version.readLimits({
      limit: opts.limit,
      pageSize: opts.pageSize
    });

    function onComplete(error) {
      done = true;
      if (_.isFunction(opts.done)) {
        opts.done(error);
      }
    }

    function fetchNextPage(fn) {
      var promise = fn();
      if (_.isUndefined(promise)) {
        onComplete();
        return;
      }

      promise.then(function(page) {
        _.each(page.instances, function(instance) {
          if (done) {
            return false;
          }

          opts.callback(instance, onComplete);
        });

        if ((limits.pageLimit && limits.pageLimit <= currentPage)) {
          onComplete();
        } else if (!done) {
          currentPage++;
          fetchNextPage(_.bind(page.nextPage, page));
        }
      });

      promise.catch(onComplete);
    }

    fetchNextPage(_.bind(this.page, this, opts));
  };

  /**
   * Lists CallInstance records from the API as a list.
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {string} [opts.to] - Phone number or Client identifier to filter `to` on
   * @param {string} [opts.from] -
   *          Phone number or Client identifier to filter `from` on
   * @param {string} [opts.parentCallSid] - Parent Call Sid to filter on
   * @param {call.status} [opts.status] - Status to filter on
   * @param {Date} [opts.startTimeBefore] - StartTime to filter on
   * @param {Date} [opts.startTime] - StartTime to filter on
   * @param {Date} [opts.startTimeAfter] - StartTime to filter on
   * @param {Date} [opts.endTimeBefore] - EndTime to filter on
   * @param {Date} [opts.endTime] - EndTime to filter on
   * @param {Date} [opts.endTimeAfter] - EndTime to filter on
   * @param {number} [opts.limit] -
   *         Upper limit for the number of records to return.
   *         list() guarantees never to return more than limit.
   *         Default is no limit
   * @param {number} [opts.pageSize] -
   *         Number of records to fetch per request,
   *         when not set will use the default value of 50 records.
   *         If no page_size is defined but a limit is defined,
   *         list() will attempt to read the limit with the most
   *         efficient page size, i.e. min(limit, 1000)
   * @param {Function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  CallListInstance.list = function list(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};
    var deferred = Q.defer();
    var allResources = [];
    opts.callback = function(resource) {
      allResources.push(resource);
    };

    opts.done = function(error) {
      if (_.isUndefined(error)) {
        deferred.resolve(allResources);
      } else {
        deferred.reject(error);
      }
    };

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    this.each(opts);
    return deferred.promise;
  };

  /**
   * Retrieve a single page of CallInstance records from the API.
   * Request is executed immediately
   *
   * If a function is passed as the first argument, it will be used as the callback function.
   *
   * @param {string} [opts.to] - Phone number or Client identifier to filter `to` on
   * @param {string} [opts.from] -
   *          Phone number or Client identifier to filter `from` on
   * @param {string} [opts.parentCallSid] - Parent Call Sid to filter on
   * @param {call.status} [opts.status] - Status to filter on
   * @param {Date} [opts.startTimeBefore] - StartTime to filter on
   * @param {Date} [opts.startTime] - StartTime to filter on
   * @param {Date} [opts.startTimeAfter] - StartTime to filter on
   * @param {Date} [opts.endTimeBefore] - EndTime to filter on
   * @param {Date} [opts.endTime] - EndTime to filter on
   * @param {Date} [opts.endTimeAfter] - EndTime to filter on
   * @param {string} [opts.pageToken] - PageToken provided by the API
   * @param {number} [opts.pageNumber] -
   *          Page Number, this value is simply for client state
   * @param {number} [opts.pageSize] - Number of records to return, defaults to 50
   * @param {Function} [callback] - Callback to handle list of records
   *
   * @returns {Promise} Resolves to a list of records
   */
  CallListInstance.page = function page(opts, callback) {
    if (_.isFunction(opts)) {
      callback = opts;
      opts = {};
    }
    opts = opts || {};

    var deferred = Q.defer();
    var data = values.of({
      'To': opts.to,
      'From': opts.from,
      'ParentCallSid': opts.parentCallSid,
      'Status': opts.status,
      'StartTime<': serialize.iso8601Date(opts.startTimeBefore),
      'StartTime': serialize.iso8601Date(opts.startTime),
      'StartTime>': serialize.iso8601Date(opts.startTimeAfter),
      'EndTime<': serialize.iso8601Date(opts.endTimeBefore),
      'EndTime': serialize.iso8601Date(opts.endTime),
      'EndTime>': serialize.iso8601Date(opts.endTimeAfter),
      'PageToken': opts.pageToken,
      'Page': opts.pageNumber,
      'PageSize': opts.pageSize
    });

    var promise = this._version.page({
      uri: this._uri,
      method: 'GET',
      params: data
    });

    promise = promise.then(function(payload) {
      deferred.resolve(new CallPage(
        this._version,
        payload,
        this._solution.accountSid
      ));
    }.bind(this));

    promise.catch(function(error) {
      deferred.reject(error);
    });

    if (_.isFunction(callback)) {
      deferred.promise.nodeify(callback);
    }

    return deferred.promise;
  };

  Object.defineProperty(CallListInstance,
    'feedbackSummaries', {
    get: function feedbackSummaries() {
      if (!this._feedbackSummaries) {
        this._feedbackSummaries = new FeedbackSummaryList(
          this._version,
          this._solution.accountSid
        );
      }

      return this._feedbackSummaries;
    },
  });

  /**
   * Constructs a CallContext
   *
   * @param {string} sid - Call Sid that uniquely identifies the Call to fetch
   *
   * @returns CallContext
   */
  CallListInstance.get = function get(sid) {
    return new CallContext(
      this._version,
      this._solution.accountSid,
      sid
    );
  };

  return CallListInstance;
}


/**
 * Initialize the CallContext
 *
 * @param {Version} version - Version that contains the resource
 * @param {object} payload - The instance payload
 * @param {sid} accountSid - The account_sid
 * @param {sid} sid - Call Sid that uniquely identifies the Call to fetch
 *
 * @returns {CallContext}
 */
function CallInstance(version, payload, accountSid, sid) {
  InstanceResource.prototype.constructor.call(this, version);

  // Marshaled Properties
  this._properties = {
    accountSid: payload.account_sid, // jshint ignore:line,
    annotation: payload.annotation, // jshint ignore:line,
    answeredBy: payload.answered_by, // jshint ignore:line,
    apiVersion: payload.api_version, // jshint ignore:line,
    callerName: payload.caller_name, // jshint ignore:line,
    dateCreated: deserialize.rfc2822DateTime(payload.date_created), // jshint ignore:line,
    dateUpdated: deserialize.rfc2822DateTime(payload.date_updated), // jshint ignore:line,
    direction: payload.direction, // jshint ignore:line,
    duration: payload.duration, // jshint ignore:line,
    endTime: deserialize.rfc2822DateTime(payload.end_time), // jshint ignore:line,
    forwardedFrom: payload.forwarded_from, // jshint ignore:line,
    from: payload.from, // jshint ignore:line,
    fromFormatted: payload.from_formatted, // jshint ignore:line,
    groupSid: payload.group_sid, // jshint ignore:line,
    parentCallSid: payload.parent_call_sid, // jshint ignore:line,
    phoneNumberSid: payload.phone_number_sid, // jshint ignore:line,
    price: deserialize.decimal(payload.price), // jshint ignore:line,
    priceUnit: payload.price_unit, // jshint ignore:line,
    sid: payload.sid, // jshint ignore:line,
    startTime: deserialize.rfc2822DateTime(payload.start_time), // jshint ignore:line,
    status: payload.status, // jshint ignore:line,
    subresourceUris: payload.subresource_uris, // jshint ignore:line,
    to: payload.to, // jshint ignore:line,
    toFormatted: payload.to_formatted, // jshint ignore:line,
    uri: payload.uri, // jshint ignore:line,
  };

  // Context
  this._context = undefined;
  this._solution = {
    accountSid: accountSid,
    sid: sid || this._properties.sid,
  };
}

_.extend(CallInstance.prototype, InstanceResource.prototype);
CallInstance.prototype.constructor = CallInstance;

Object.defineProperty(CallInstance.prototype,
  '_proxy', {
  get: function() {
    if (!this._context) {
      this._context = new CallContext(
        this._version,
        this._solution.accountSid,
        this._solution.sid
      );
    }

    return this._context;
  },
});

Object.defineProperty(CallInstance.prototype,
  'accountSid', {
  get: function() {
    return this._properties.accountSid;
  },
});

Object.defineProperty(CallInstance.prototype,
  'annotation', {
  get: function() {
    return this._properties.annotation;
  },
});

Object.defineProperty(CallInstance.prototype,
  'answeredBy', {
  get: function() {
    return this._properties.answeredBy;
  },
});

Object.defineProperty(CallInstance.prototype,
  'apiVersion', {
  get: function() {
    return this._properties.apiVersion;
  },
});

Object.defineProperty(CallInstance.prototype,
  'callerName', {
  get: function() {
    return this._properties.callerName;
  },
});

Object.defineProperty(CallInstance.prototype,
  'dateCreated', {
  get: function() {
    return this._properties.dateCreated;
  },
});

Object.defineProperty(CallInstance.prototype,
  'dateUpdated', {
  get: function() {
    return this._properties.dateUpdated;
  },
});

Object.defineProperty(CallInstance.prototype,
  'direction', {
  get: function() {
    return this._properties.direction;
  },
});

Object.defineProperty(CallInstance.prototype,
  'duration', {
  get: function() {
    return this._properties.duration;
  },
});

Object.defineProperty(CallInstance.prototype,
  'endTime', {
  get: function() {
    return this._properties.endTime;
  },
});

Object.defineProperty(CallInstance.prototype,
  'forwardedFrom', {
  get: function() {
    return this._properties.forwardedFrom;
  },
});

Object.defineProperty(CallInstance.prototype,
  'from', {
  get: function() {
    return this._properties.from;
  },
});

Object.defineProperty(CallInstance.prototype,
  'fromFormatted', {
  get: function() {
    return this._properties.fromFormatted;
  },
});

Object.defineProperty(CallInstance.prototype,
  'groupSid', {
  get: function() {
    return this._properties.groupSid;
  },
});

Object.defineProperty(CallInstance.prototype,
  'parentCallSid', {
  get: function() {
    return this._properties.parentCallSid;
  },
});

Object.defineProperty(CallInstance.prototype,
  'phoneNumberSid', {
  get: function() {
    return this._properties.phoneNumberSid;
  },
});

Object.defineProperty(CallInstance.prototype,
  'price', {
  get: function() {
    return this._properties.price;
  },
});

Object.defineProperty(CallInstance.prototype,
  'priceUnit', {
  get: function() {
    return this._properties.priceUnit;
  },
});

Object.defineProperty(CallInstance.prototype,
  'sid', {
  get: function() {
    return this._properties.sid;
  },
});

Object.defineProperty(CallInstance.prototype,
  'startTime', {
  get: function() {
    return this._properties.startTime;
  },
});

Object.defineProperty(CallInstance.prototype,
  'status', {
  get: function() {
    return this._properties.status;
  },
});

Object.defineProperty(CallInstance.prototype,
  'subresourceUris', {
  get: function() {
    return this._properties.subresourceUris;
  },
});

Object.defineProperty(CallInstance.prototype,
  'to', {
  get: function() {
    return this._properties.to;
  },
});

Object.defineProperty(CallInstance.prototype,
  'toFormatted', {
  get: function() {
    return this._properties.toFormatted;
  },
});

Object.defineProperty(CallInstance.prototype,
  'uri', {
  get: function() {
    return this._properties.uri;
  },
});

/**
 * Deletes the CallInstance
 *
 * @param {Function} [callback] - Callback to handle deleted record
 *
 * @returns Resolves to true if delete succeeds, false otherwise
 */
CallInstance.prototype.remove = function remove(callback) {
  var deferred = Q.defer();
  var promise = this._version.remove({
    uri: this._uri,
    method: 'DELETE'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(payload);
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/**
 * Fetch a CallInstance
 *
 * @param {Function} [callback] - Callback to handle fetched record
 *
 * @returns {Promise} Resolves to fetched CallInstance
 */
CallInstance.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({
    uri: this._uri,
    method: 'GET'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(new CallInstance(
      this._version,
      payload,
      this._solution.accountSid,
      this._solution.sid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/**
 * Update the CallInstance
 *
 * If a function is passed as the first argument, it will be used as the callback function.
 *
 * @param {string} [opts.url] - URL that returns TwiML
 * @param {string} [opts.method] - HTTP method to use to fetch TwiML
 * @param {call.status} [opts.status] - Status to update the Call with
 * @param {string} [opts.fallbackUrl] - Fallback URL in case of error
 * @param {string} [opts.fallbackMethod] - HTTP Method to use with FallbackUrl
 * @param {string} [opts.statusCallback] - Status Callback URL
 * @param {string} [opts.statusCallbackMethod] -
 *          HTTP Method to use with StatusCallback
 * @param {Function} [callback] - Callback to handle updated record
 *
 * @returns {Promise} Resolves to updated CallInstance
 */
CallInstance.prototype.update = function update(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({
    'Url': opts.url,
    'Method': opts.method,
    'Status': opts.status,
    'FallbackUrl': opts.fallbackUrl,
    'FallbackMethod': opts.fallbackMethod,
    'StatusCallback': opts.statusCallback,
    'StatusCallbackMethod': opts.statusCallbackMethod
  });

  var promise = this._version.update({
    uri: this._uri,
    method: 'POST',
    data: data
  });

  promise = promise.then(function(payload) {
    deferred.resolve(new CallInstance(
      this._version,
      payload,
      this._solution.accountSid,
      this._solution.sid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/**
 * Access the recordings
 *
 * @returns recordings
 */
CallInstance.prototype.recordings = function recordings() {
  return this._proxy.recordings;
};

/**
 * Access the notifications
 *
 * @returns notifications
 */
CallInstance.prototype.notifications = function notifications() {
  return this._proxy.notifications;
};

/**
 * Access the feedback
 *
 * @returns feedback
 */
CallInstance.prototype.feedback = function feedback() {
  return this._proxy.feedback;
};


/**
 * Initialize the CallContext
 *
 * @param {Version} version - Version that contains the resource
 * @param {sid} accountSid - The account_sid
 * @param {sid} sid - Call Sid that uniquely identifies the Call to fetch
 *
 * @returns {CallContext}
 */
function CallContext(version, accountSid, sid) {
  InstanceContext.prototype.constructor.call(this, version);

  // Path Solution
  this._solution = {
    accountSid: accountSid,
    sid: sid,
  };
  this._uri = _.template(
    '/Accounts/<%= accountSid %>/Calls/<%= sid %>.json' // jshint ignore:line
  )(this._solution);

  // Dependents
  this._recordings = undefined;
  this._notifications = undefined;
  this._feedback = undefined;
}

_.extend(CallContext.prototype, InstanceContext.prototype);
CallContext.prototype.constructor = CallContext;

/**
 * Deletes the CallInstance
 *
 * @param {Function} [callback] - Callback to handle deleted record
 *
 * @returns Resolves to true if delete succeeds, false otherwise
 */
CallContext.prototype.remove = function remove(callback) {
  var deferred = Q.defer();
  var promise = this._version.remove({
    uri: this._uri,
    method: 'DELETE'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(payload);
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/**
 * Fetch a CallInstance
 *
 * @param {Function} [callback] - Callback to handle fetched record
 *
 * @returns {Promise} Resolves to fetched CallInstance
 */
CallContext.prototype.fetch = function fetch(callback) {
  var deferred = Q.defer();
  var promise = this._version.fetch({
    uri: this._uri,
    method: 'GET'
  });

  promise = promise.then(function(payload) {
    deferred.resolve(new CallInstance(
      this._version,
      payload,
      this._solution.accountSid,
      this._solution.sid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

/**
 * Update the CallInstance
 *
 * If a function is passed as the first argument, it will be used as the callback function.
 *
 * @param {string} [opts.url] - URL that returns TwiML
 * @param {string} [opts.method] - HTTP method to use to fetch TwiML
 * @param {call.status} [opts.status] - Status to update the Call with
 * @param {string} [opts.fallbackUrl] - Fallback URL in case of error
 * @param {string} [opts.fallbackMethod] - HTTP Method to use with FallbackUrl
 * @param {string} [opts.statusCallback] - Status Callback URL
 * @param {string} [opts.statusCallbackMethod] -
 *          HTTP Method to use with StatusCallback
 * @param {Function} [callback] - Callback to handle updated record
 *
 * @returns {Promise} Resolves to updated CallInstance
 */
CallContext.prototype.update = function update(opts, callback) {
  if (_.isFunction(opts)) {
    callback = opts;
    opts = {};
  }
  opts = opts || {};

  var deferred = Q.defer();
  var data = values.of({
    'Url': opts.url,
    'Method': opts.method,
    'Status': opts.status,
    'FallbackUrl': opts.fallbackUrl,
    'FallbackMethod': opts.fallbackMethod,
    'StatusCallback': opts.statusCallback,
    'StatusCallbackMethod': opts.statusCallbackMethod
  });

  var promise = this._version.update({
    uri: this._uri,
    method: 'POST',
    data: data
  });

  promise = promise.then(function(payload) {
    deferred.resolve(new CallInstance(
      this._version,
      payload,
      this._solution.accountSid,
      this._solution.sid
    ));
  }.bind(this));

  promise.catch(function(error) {
    deferred.reject(error);
  });

  if (_.isFunction(callback)) {
    deferred.promise.nodeify(callback);
  }

  return deferred.promise;
};

Object.defineProperty(CallContext.prototype,
  'recordings', {
  get: function() {
    if (!this._recordings) {
      this._recordings = new RecordingList(
        this._version,
        this._solution.accountSid,
        this._solution.sid
      );
    }
    return this._recordings;
  },
});

Object.defineProperty(CallContext.prototype,
  'notifications', {
  get: function() {
    if (!this._notifications) {
      this._notifications = new NotificationList(
        this._version,
        this._solution.accountSid,
        this._solution.sid
      );
    }
    return this._notifications;
  },
});

Object.defineProperty(CallContext.prototype,
  'feedback', {
  get: function() {
    if (!this._feedback) {
      this._feedback = new FeedbackList(
        this._version,
        this._solution.accountSid,
        this._solution.sid
      );
    }
    return this._feedback;
  },
});

module.exports = {
  CallPage: CallPage,
  CallList: CallList,
  CallInstance: CallInstance,
  CallContext: CallContext
};