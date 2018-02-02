clear()

const parsePage = () => {
  let returnArray = [];
  returnArray.push(getCodesAndDiscounts());
  returnArray.push(getBestCode());
  returnArray.push(getOriginalPrice());
  return returnArray;
}

const getCodesAndDiscounts = () => {
  let allCodes = {};
  let total = parseInt(getOriginalPrice().originalPrice);
  let codes = document.querySelector('.codes-wrapper ul');
  let codesStrings = codes.getElementsByTagName('span');
  for (let element of codesStrings){
    let code = /[A-Z0-9]{3,}/.exec(element.innerHTML)[0];
    let newTotal = /\d{1,3}(?=\$)/.exec(element.innerHTML)[0];
    newTotal = 100-Math.round(100*(newTotal/total));
    allCodes[code] = newTotal;
  }
  return allCodes;
}

const getBestCode = () => {
  let bestCode = {'bestCodeName':'',
                  'bestCodeDiscount':0};
  let allCodes = getCodesAndDiscounts();
  Object.entries(allCodes).forEach( ([name, discount]) => {
    if (discount > bestCode.bestCodeDiscount) {
      bestCode.bestCodeName = name;
      bestCode.bestCodeDiscount = discount;
    }
  });
  return bestCode;
}

const getOriginalPrice = () => {
  let originalPrice = document.querySelector('.total-wrapper h1 span:last-child');
  return {'originalPrice': originalPrice.innerHTML.slice(0,-1)};
}

console.log(parsePage());
//console.log(getOriginalPrice())