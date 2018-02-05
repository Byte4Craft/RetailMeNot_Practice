/*Task 3: RegExp*/

/*Parse total price - create rule that cover all possible values and notations ($1.99, $ 222000.00, $ 1,000.99, 555.44 USD etc)*/
let pricesArray = ['$1.99', '$ 222,000.00', '$ 1,000.99 ', '555.44 USD', '100,256,223.56$', 'USD 123.66', '$69', '1,999', 'C$99.99'];

const getTotal = (arrayWithTotalPrices) => {
    const rule = /(\d+,?)+\.?\d+/;
    return arrayWithTotalPrices.map(price => rule.exec(price)[0]);
};

/*Parse applied codes - get all codes that listed on the page. Result should be sorted array. Codes are in string of text of certain template*/
//To be executed on the wiki page: https://wiki.rmn.com/display/eng/Genie+-+Ramp+Up+Program+-+Browser+Extension

let parseCodes = () => {
    const codeRegex = /[0-9A-Z]+(?=\sis)/;
    let tasksTable = document.getElementsByTagName('tbody')[1];
    let taskRow = tasksTable.getElementsByTagName('tr')[2];
    let taskCell = taskRow.getElementsByTagName('td')[2];
    let taskCodes = Array.from(taskCell.getElementsByTagName('p'));
    taskCodes.pop();
    let parsedCodes = taskCodes.map(element => codeRegex.exec(element.innerText)[0]);
    parsedCodes.sort();
    return parsedCodes;
};
