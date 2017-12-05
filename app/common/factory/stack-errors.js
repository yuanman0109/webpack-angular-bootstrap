import StackTrace from 'stacktrace-js';
export default class StackdriverErrorReporter {
  constructor() {  
    this.baseAPIUrl = 'http://localhost:8088/projects/';
  }
  start(config) {
    if (!config.key) {
      throw new Error('Cannot initialize: No API key provided.');
    }
    if (!config.projectId) {
      throw new Error('Cannot initialize: No project ID provided.');
    }
    if (!config.emails) {
      throw new Error('Cannot initialize: No emails provided.');
    }
    this.baseAPIUrl = config.baseAPIUrl || this.baseAPIUrl;
    this.apiKey = config.key;
    this.projectId = config.projectId;
    this.emails = config.emails;
    this.serviceContext = { service: config.service || 'web' };
    if (config.version) {
      this.serviceContext.version = config.version;
    }
    this.reportUncaughtExceptions = config.reportUncaughtExceptions !== false;
    this.disabled = config.disabled || false;

    // Register as global error handler if requested
    var that = this;
    if (this.reportUncaughtExceptions) {      
      var oldErrorHandler = window.onerror || function() {};
      window.onerror = function(message, source, lineno, colno, error) {
        if (error) {
          console.error(error);
          that.report(error);
        }
        oldErrorHandler(message, source, lineno, colno, error);
        return true;
      };
    }
  }
  report(err, callback) {
    if (this.disabled || !err) {
      return typeof callback === 'function' && callback();
    }   
    var payload = {};
    payload.serviceContext = this.serviceContext;
    payload.emails = this.emails;
    payload.context = {
      httpRequest: {
        userAgent: window.navigator.userAgent,
        url: window.location.href
      }
    };

    var firstFrameIndex = 0;
    if (typeof err === 'string' || err instanceof String) {
      // Transform the message in an error, use try/catch to make sure the stacktrace is populated.
      try {
        throw new Error(err);
      } catch (e) {
        err = e;
      }
      // the first frame when using report() is always this library
      firstFrameIndex = 1;
    }
    var that = this;
    // This will use sourcemaps and normalize the stack frames
    StackTrace.fromError(err).then(function(stack) {
      payload.message = err.toString();
      for (var s = firstFrameIndex; s < stack.length; s++) {
        payload.message += '\n';
        // Reconstruct the stackframe to a JS stackframe as expected by Error Reporting parsers.
        // stack[s].source should not be used because not populated when created from source map.
        payload.message += ['    at ', stack[s].getFunctionName(), ' (', stack[s].getFileName(), ':', stack[s].getLineNumber(), ':', stack[s].getColumnNumber(), ')'].join('');
      }
      that.sendErrorPayload(payload, callback);
    });
  }
  sendErrorPayload (payload, callback) {
    var url = this.baseAPIUrl + this.projectId + '?key=' + this.apiKey;
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onloadend = function() {
      return typeof callback === 'function' && callback();
    };
    xhr.onerror = function(e) {
      return typeof callback === 'function' && callback(e);
    };
    xhr.send(JSON.stringify(payload));
  }  
}
