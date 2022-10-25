function showVal(val) {
    document.getElementById('tipPercentage').value = val;
    this.calTip(document.getElementById('totalBill').value);
 }
 function calTip(bill) {
     if(Number(bill) > 0) {
         let tipPercent = document.getElementById('tipPercentage').value;
         let tipValue = tipPercent/100*bill;
         let tip = Math.round(tipValue*100)/100;
         document.getElementById('tipTotal').value = tip;
         let totalBillWithTip = Number(bill) + Number(tip) ;
         document.getElementById('totalBillWithTip').value = Math.round(totalBillWithTip*100)/100;
     }
     
 }