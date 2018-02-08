/*Task 4: Requests*/

/*
investigate site requests
create own request to imitate real site work
process response data
*/

//This script is to be run on `www.jcpenney.com/cart` page.

'use strict';

var discountId, discount;
var accountId = /(?<=ACCOUNT_ID=)\S+(?=;)/.exec(document.cookie)[0];
var accessToken = /(?<=Access_Token=)\S+(?=;)/.exec(document.cookie)[0];
var headers = {
        "Authorization": `Bearer ${accessToken}`,
        "content-Type": "application/json;charset=UTF-8"
        }
var codesArray = ["3BUYMORE", "AFFSHOP1", "RMN15", "SHOP43", "FUNDEAL", "23HURRY"];

console.warn(checkCodes(codesArray));

function applyCode(code) {
    let requestSuccessful;
    let request = new XMLHttpRequest();
    request.open('POST', `https://order-api.jcpenney.com/order-api/v1/accounts/${accountId}/draft-order/adjustment/discounts`, false);
    request.withCredentials = true;
    for (let headerName in headers) request.setRequestHeader(headerName, headers[headerName]);
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 201) {
            console.log(`Checking ${code}`);
            requestSuccessful = true;
        } else {
            console.error(`${code} failed check`);
        };
    };
    request.send(JSON.stringify({code: code, serialNumber: null}));
    if (requestSuccessful) return true;
};

function getDiscount() {
    let request = new XMLHttpRequest();
    request.open('GET', `https://order-api.jcpenney.com/order-api/v1/accounts/${accountId}/draft-order/`, false);
    request.withCredentials = true;
    for (let headerName in headers) request.setRequestHeader(headerName, headers[headerName]);
    request.onreadystatechange = () => {
        if (request.readyState === 4 && request.status === 200) {
			let siteResponse = JSON.parse(request.response);
			discount = siteResponse.adjustments[0].amount;
			discountId = siteResponse.adjustments[0].id;
		}
		else console.error('TOTAL NOT RECEIVED');
    };
    request.send();
	return discount
};

function deleteCode() {
    let request = new XMLHttpRequest();
    request.open('DELETE', `https://order-api.jcpenney.com/order-api/v1/accounts/${accountId}/draft-order/adjustment/discounts/${discountId}`, false);
    request.withCredentials = true;
    for (let headerName in headers) request.setRequestHeader(headerName, headers[headerName]);
    request.onreadystatechange = () => {
        if (request.readyState === 4 && !request.status === 204) {
            console.error('Code NOT Removed');
            console.error(request);
            };
    };
    request.send();
};

function checkCodes(coupons) {
    let bestCode = {
        'name': '',
        'discount': 0
    };
    for (let coupon of coupons) {
    if (applyCode(coupon)){
        let discount = getDiscount();
        if (discount > bestCode.discount) {
            bestCode.name = coupon;
            bestCode.discount = discount;
            };
        deleteCode();
        };
    };
    return bestCode;
}
