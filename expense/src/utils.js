export function currencyFormat(number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(number);
  }
  
  export function percentFormat(number) {
    if (number <= 0) return '---';
  
    return Number(number).toLocaleString(undefined, {
      style: 'percent',
      minimumFractionDigits: 0,
    });
  }
  
 
  // export function sum(array) {
    //Implement the sum function so that it calculates the monthly income and expenditure
    function sum(list) {
      // console.log(list)
        return list.reduce((total, item) => total + item.value, 0);
      }
  
  export { sum };
