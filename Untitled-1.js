function ProcessOptionChart() {

    var IRCallLTP = 0;
    var IRPutLTP = 0;
    var IRCallDelta = 0;
    var IRPutDelta = 0;

    var ISCallLTP = 0;
    var ISPutLTP = 0;
    var ISCallDelta = 0;
    var ISPutDelta = 0;

    var callMaxVol = 0;
    var callMaxVolEle = {};
    var callMaxOI = 0;
    var putMaxVol = 0;
    var putMaxVolEle = {};
    var putMaxOI = 0;
    var callMaxOIEle = {};
    var putMaxOIEle = {};

    var IRFound = false;
    $('.rt-tr-group>.rt-tr').each(
        (i, v) => {
            var prev = $(v).parent().prev();


            var calLTP = $(v).find('div:nth-child(4) .style__LtpChangesWrapper-sc-gxgqe9-12:nth-child(1)').text().split(' ')[0];
            var putLTPPrev = 0;
            putLTPPrev = prev.find('div:nth-child(6) .style__LtpChangesWrapper-sc-gxgqe9-12:nth-child(1)').text().split(' ')[0];
            putLTPPrev = putLTPPrev == "" ? "0" : putLTPPrev;
            // console.log(calLTP +"<-->"+  putLTPPrev+ "  " + (parseFloat(putLTPPrev) > parseFloat(calLTP)));


            var _calVolEle = $(v).find('>div:nth-child(2)');
            var _putVolEle = $(v).find('>div:nth-child(8)');
            var _calOIEle = $(v).find('>div:nth-child(3) .style__OiprogressBarValue-sc-qybflf-2');
            var _putOIEle = $(v).find('>div:nth-child(7) .style__OiprogressBarValue-sc-qybflf-2');

            var _callMaxVol = parseFloat(_calVolEle.text());
            var _putMaxVol = parseFloat(_putVolEle.text());
            var _callMaxOI = parseFloat(_calOIEle.text());
            var _putMaxOI = parseFloat(_putOIEle.text());

            

            if (_callMaxVol > callMaxVol) { callMaxVol = _callMaxVol; callMaxVolEle = _calVolEle; }
            if (_putMaxVol > putMaxVol) { putMaxVol = _putMaxVol; putMaxVolEle = _putVolEle; }

            if (_callMaxOI > callMaxOI) { callMaxOI = _callMaxOI; callMaxOIEle = _calOIEle; }
            if (_putMaxOI > putMaxOI) { putMaxOI = _putMaxOI; putMaxOIEle = _putOIEle }

            //$(v).find('div:nth-child(2)').css('border-top','3px solid blue');

            if (parseFloat(putLTPPrev) > parseFloat(calLTP) && IRFound == false) {
                IRFound = true;
                IRCallLTP = calLTP;
                IRPutLTP = putLTPPrev;

                IRCallDelta = $(v).find('div:first').text();
                IRPutDelta = prev.find('div:nth-child(9)').text()
                prev.find('div:nth-child(5)').css('border-top', '3px solid blue');
            }
            if (parseFloat(calLTP) > parseFloat(putLTPPrev)) {
                ISCallLTP = calLTP;
                ISPutLTP = putLTPPrev;
                ISCallDelta = $(v).find('div:first').text();

            }
        }
    )
    console.log("Immidiate Resistance " + IRCallLTP + " <--> " + IRPutLTP);
    console.log("Immidiate Support " + ISCallLTP + " <--> " + ISPutLTP);
    $('.style__TickerButtonText-sc-r8xy9h-3 .style__StyledTicker-sc-bsxn7-0').text('')
    var spotPrice = parseFloat($('.style__TickerButtonText-sc-r8xy9h-3').not('.style__StyledTicker-sc-bsxn7-0').text().split(' ')[1])
    console.log("Spot Price " + spotPrice);
    console.log("Immidiate Resistance Delta " + IRCallDelta + " <--> " + IRPutDelta);
    callMaxVolEle.css('background', 'red');
    putMaxVolEle.css('background', 'green');
    callMaxOIEle.css('background', 'red');
    putMaxOIEle.css('background', 'green');
    console.log('$.post( "https://investingdaddy.com/calculator/index.php",{cmp: ' + spotPrice + ',direction: "bullish",call_ltp: ' + IRCallLTP + ',call_delta: ' + IRCallDelta + ',put_ltp: ' + IRPutLTP + ',put_delta: ' + Math.abs(IRPutDelta) + ',"calculate-form-submit": "calculate"}, function( data ) {  console.log("Support "+ $(\'<div>\').append(data).find(\'h3.text-center\').html().replace(/<br>/gi,\' ,  \'));});');
    console.log('$.post( "https://investingdaddy.com/calculator/index.php",{cmp: ' + spotPrice + ',direction: "bearish",call_ltp: ' + ISCallLTP + ',call_delta: ' + ISCallDelta + ',put_ltp: ' + ISPutLTP + ',put_delta: ' + Math.abs(ISPutDelta) + ',"calculate-form-submit": "calculate"}, function( data ) {  console.log("Resistance "+ $(\'<div>\').append(data).find(\'h3.text-center\').html().replace(/<br>/gi,\' ,  \'));});');

}

ProcessOptionChart();
var intObj = setInterval(()=>{ProcessOptionChart();},3000);





//clearInterval(intObj)