module.exports = function UiSelect(elem) {
  var self = this;
  self._input = elem;
  self._selectInput = self._input.element(by.css('.ui-select-search'));
  self._choices = self._input.all(by.css('.ui-select-choices .ui-select-choices-row-inner'));

  self.sendKeys = function(val) {
    self._input.click();
    //self._selectInput.clear();
    //return self._selectInput.sendKeys(val);
  };

  self.pickChoice = function(index) {
    browser.waitForAngular();
    expect(self._choices.count()).not.toBeLessThan(index + 1);
    return self._choices.get(index).click();
  };
};
