"use strict";
exports.__esModule = true;
var testing_1 = require("@angular/core/testing");
var credit_card_service_1 = require("./credit-card.service");
describe('CreditCartService', function () {
    var service;
    beforeEach(function () {
        testing_1.TestBed.configureTestingModule({});
        service = testing_1.TestBed.inject(credit_card_service_1.CreditCartService);
    });
    it('should be created', function () {
        expect(service).toBeTruthy();
    });
});
