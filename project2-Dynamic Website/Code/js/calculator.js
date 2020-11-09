class Calculater {
  constructor(previousOperandTextElement, currentOperandTextElement){
  this.previousOperandTextElement = previousOperandTextElement;
  this.currentOperandTextElement = currentOperandTextElement;
  this.clear();
  }
  clear() {
      this.currentOperand = ''
      this.previousOperand = ''
      this.operation = undefined
  } 
  delete() {
      this.currentOperand = this.currentOperand.toString().slice(0, -1)
  }
  appendNumber(number) {
      if (number === '.' && this.currentOperand.includes('.')) return//to make the dot written for once
      this.currentOperand = this.currentOperand.toString() + number.toString() // so we can append numbers together
  }
  chooseOperation(operation) {
      // to assure that if we don't have cuurent operand the operation won't be executed
      this.operation = operation;
      if(this.currentOperand === '') return;
      switch (this.operation) {
          case '+': 
          case '-':
          case 'x':
          case '÷': 
          case 'x^':
              if(this.previousOperand !== '') {// to automaticly do the computaion
                  this.computeTwoOperands(); 
              }
              // move the number to the previous operand
              this.previousOperand = this.currentOperand; 
              // to clear the new current operand
              this.currentOperand = '' 
              break;
          case '±':
          case 'n!':
              this.computeOneOperand();
              break;
          default:
          return
      }
  }
  factorial(n) {
      if (n > 0 && n <= 1) {
          return 1;
      }else{
          return n * this.factorial((n-1));
      }
  }
  computeOneOperand(){
                          let computation; 
                          const current = parseFloat(this.currentOperand);
                          if(isNaN(current)) return;
                          switch (this.operation) {
                              case '±': 
                                  computation = Math.abs(current);
                                  break;
                              case 'n!':
                                  computation = this.factorial(current);
                                  break;
                              default:
                                  return;
                              }
                          this.currentOperand = computation  // the result of computaion
                          this.operation = undefined
                          this.previousOperand = ''  // to make the previous empty
  }
  computeTwoOperands(){
      debugger;
      let computation; 
      const prev = parseFloat(this.previousOperand) // to convert the string to number
      const current = parseFloat(this.currentOperand)
      // if U doesn't enter any thing the equal btn won't run 
      if(isNaN(prev) || isNaN(current)) return
      switch (this.operation) {
          case '+': 
          computation = prev + current
          break
          case '-': 
          computation = prev - current
          break
          case 'x': 
          computation = prev * current
          break
          case '÷': 
          computation = prev / current
          break
          case 'x^':
          computation = Math.pow(prev,current);
              break;
          default:
          return
      }
      this.currentOperand = computation  // the result of computaion
      this.operation = undefined
      this.previousOperand = ''  // to make the previous empty
  }
  getDisplayNumber(number){
  const floatNumber = parseFloat(number) // to convert the number to strign
  if(isNaN(floatNumber)) return ''
  return floatNumber.toLocaleString('en') // to make comas bstween numbers
  }
  updateDisplay(){    
      debugger;
      this.currentOperandTextElement.innerText = 
      this.getDisplayNumber(this.currentOperand) 
      // we made a concation to show the operation next to the prev number 
          if(this.operation != null){
          this.previousOperandTextElement.innerText =
          `${this.previousOperand} ${this.operation}`
      }else{   // to clear the operation sign next to the prev number
          this.previousOperandTextElement.innerText = ''
      }
  }
}
const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButtons = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButtons = document.querySelector('[data-all-clear]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const calculater = new Calculater (previousOperandTextElement, currentOperandTextElement)
numberButtons.forEach(button => {
button.addEventListener('click', () => {
calculater.appendNumber(button.innerText)
calculater.updateDisplay()
})
});
operationButtons.forEach(button => {
button.addEventListener('click', () => {
calculater.chooseOperation(button.innerText)
calculater.updateDisplay()
})
});
equalsButtons.addEventListener('click', button => {
calculater.computeTwoOperands()
calculater.updateDisplay()
});
allClearButtons.addEventListener('click', button => {
calculater.clear()
calculater.updateDisplay()
});
deleteButton.addEventListener('click', button => {
calculater.delete()
calculater.updateDisplay()
});
//  console.log(factorial(4));
function openNav() {
document.getElementById("myNav").style.display = "block";
}
function closeNav() {
document.getElementById("myNav").style.display = "none";
}

