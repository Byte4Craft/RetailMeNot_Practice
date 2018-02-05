/*Task 0 - Parse page and get coupon codes*/
//To be executed on the wiki page: https://wiki.rmn.com/display/eng/Genie+-+Ramp+Up+Program+-+Browser+Extension

const parsePage = () => {
    let returnArray = [];
    returnArray.push(getCodesAndDiscounts());
    returnArray.push(getBestCode());
    returnArray.push(getOriginalPrice());
    return returnArray;
};

const getCodesAndDiscounts = () => {
    let allCodes = {};
    let total = parseInt(getOriginalPrice().originalPrice);
    let codesElement = document.querySelector('.codes-wrapper ul');
    let codesStrings = codesElement.getElementsByTagName('span');
    for (let element of codesStrings) {
        let codeName = /[A-Z0-9]{3,}/.exec(element.innerHTML)[0];
        let newTotal = /\d{1,3}(?=\$)/.exec(element.innerHTML)[0];
        allCodes[codeName] = total-newTotal;
    }
    return allCodes;
};

const getBestCode = () => {
    let bestCode = {
        'bestCodeName':'',
        'bestCodeDiscount':0};
    let allCodes = getCodesAndDiscounts();
    Object.entries(allCodes).forEach( ([name, discount]) => {
        if (discount > bestCode.bestCodeDiscount) {
            bestCode.bestCodeName = name;
            bestCode.bestCodeDiscount = discount;
        }
    });
    return bestCode;
};

const getOriginalPrice = () => {
    let originalPrice = document.querySelector('.total-wrapper h1 span:last-child');
    return {'originalPrice': originalPrice.innerHTML.slice(0,-1)};
};
