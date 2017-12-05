exports.config = {
  framework: 'jasmine',
  // specs: ['spe.js'],
  // The address of a running selenium server.
  seleniumAddress: 'http://localhost:4444/wd/hub',

  // Capabilities to be passed to the webdriver instance.
  capabilities: {
    'browserName': 'chrome'
  },

  // Spec patterns are relative to the location of the spec file. They may
  // include glob patterns.
  suites: {
    login: 'test/e2e/login/**/*spec.js',
    order: [
      'test/e2e/order/redeploySpec.js',
      'test/e2e/order/orderCountSpec.js'
    ],
    configCenter: [
      // 'test/e2e/configCenter/verifySpec.js',
      // 'test/e2e/configCenter/qrCodeSpec.js',
      // 'test/e2e/configCenter/tplSpec.js',
      // 'test/e2e/configCenter/fastFoodSpec.js',
      'test/e2e/configCenter/restaurantSpec.js'
    ],
    account: [
      'test/e2e/account/accountSpec.js'
    ],
    store: [
      // 'test/e2e/store/verifySpec.js',
      'test/e2e/store/listSpec.js'
    ],
    advert: [
      'test/e2e/advert/advertSpec.js'
    ],
    managerOrder: [
      'test/e2e/managerOrder/configSpec.js',
      'test/e2e/managerOrder/orderSpec.js'
    ],
    faq: [
      'test/e2e/application/faqSpec.js'
    ]    
  },

  // Options to be passed to Jasmine-node.
  jasmineNodeOpts: {
    showColors: true // Use colors in the command line report.
  }
};