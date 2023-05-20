/*
Tambola ticket generatation rule:

    # The numbers 1 to 90 are used once only. 
    # In the first column are the numbers 1 to 9, the second column has numbers 10 to 19, etc, all the way to the 9th column which has numbers 80 to 90 in it.
    # Every row must have exactly 5 numbers in it. 
    # In a specific column, numbers must be arranged in ascending order from top to bottom.
    # All the numbers 1 to 90 are used only once in each set of 6 tickets. 
    # Each column must have at least 1 number
    # Blank Cell fill by zero or “x”
*/

// Generate Random Tambola ticket
const generateTicket = function generateTicket(number) {
  let tickets = [];
  for (let i = 0; i < number; i++) {
    let flag = true;
    // continue generate tickets until valid one is found
    while (flag) {
      //define column
      let column = Array(9).fill(2);
      // define the ticket array
      var ticket = Array(3)
        .fill(0)
        .map(() => new Array(9).fill(0));
      // randomly choose 3 column to have only one number filled to make sure no column is empty
      let random = generateRandomNumber(0, 8, 3);
      for (let i = 0; i < random.length; i++) {
        column[random[i]] = 1;
      }
      // for each column  choosing random number to fill it
      let columnWrapper = [];
      for (let i = 0; i < column.length; i++) {
        columnWrapper.push(generateRandomNumber(0, 2, column[i]));
      }
      for (let i = 0; i < columnWrapper.length; i++) {
        // generating random number as per requirement
        let min = i === 0 ? i * 10 + 1 : i * 10;
        let max = i * 10 + 9;
        let number = generateRandomNumber(min, max, columnWrapper[i].length);
        for (let j = 0; j < columnWrapper[i].length; j++) {
          ticket[columnWrapper[i][j]][i] = number[j];
        }
      }
      // check if the generated ticket is valid or not
      flag = checkTicket(ticket);
    }
    // creating ticket array
    tickets.push(ticket);
  }
  return tickets;
};

// Helper function to generate random number
function generateRandomNumber(min, max, count, sort = true) {
  let numbers = [];
  for (let i = min; i <= max; i++) {
    numbers.push(i);
  }
  let result = [];
  for (let i = 0; i < count; i++) {
    let randomIndex = Math.floor(Math.random() * numbers.length);
    let randomNum = numbers.splice(randomIndex, 1)[0];
    result.push(randomNum);
  }
  if (sort) {
    result.sort((a, b) => a - b);
  }
  return result;
}

// helper funcion to check ticket is valid or not
function checkTicket(ticket) {
  for (let i = 0; i < 3; i++) {
    let arr = ticket[i];
    let count = 0;
    for (let j = 0; j < arr.length; j++) {
      // checking foor all zero column
      if (arr[j] === 0) {
        count++;
      }
    }
    // check for 5 numbers in a row
    if (count !== 4) {
      return true;
    }
  }
  return false;
}

export default generateTicket;
