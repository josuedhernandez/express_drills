const express = require("express");
const morgan = require("morgan"); // Morgan is a logging tool
const app = express();
app.use(morgan("common"));

app.get("/", (req, res) => {
  res.send("Hello Express! this is me");
});

app.get("/burgers", (req, res) => {
  res.send("We have juicy cheese burgers!");
});

app.get("/pizza/pepperoni", (req, res) => {
  res.send("Your pizza is on the way!");
});

app.get("/pizza/pineapple", (req, res) => {
  res.send("We don't serve that here. Never call again!");
});

app.get("/echo", (req, res) => {
  const responseText = `Here are some details of your request:
    Base URL: ${req.baseUrl}
    Host: ${req.hostname}
    Path: ${req.path}
    Hostname: ${req.hostname}
    Ip: ${req.ip}
  `;
  res.send(responseText);
});

app.get("/queryViewer", (req, res) => {
  console.log(req.query);
  res.send();
});

app.get("/greetings", (req, res) => {
  //1. get values from the request
  const name = req.query.name;
  const race = req.query.race;

  //2. validate the values
  if (!name) {
    //3. name was not provided
    return res.status(400).send("Please provide a name");
  }

  if (!race) {
    //3. race was not provided
    return res.status(400).send("Please provide a race");
  }

  //4. and 5. both name and race are valid so do the processing.
  const greeting = `Greetings ${name} the ${race}, Welcome to our kingdom.`;

  //6. send the response
  res.send(greeting);
});

app.get("/sum", (req, res) => {
  //1. get values from the request
  let a = req.query.a;
  let b = req.query.b;

  //2. validate the values
  if (!a || !b) {
    //3. number a/b was not provided
    return res.status(400).send("Please provide a number");
  }

  try {
    a = parseFloat(a);
    b = parseFloat(b);
  } catch (error) {
    //   console.error(error);
    return res.status(400).send("Please enter numbers only");
  }
  //4. and 5. both a and b are valid so do the processing.
  const sum = `The sum of ${a} and ${b} is ${a + b}`;

  //6. send the response
  res.send(sum);
});

app.get("/cipher", (req, res) => {
  //1. get values from the request
  let text = req.query.text;
  let shift = req.query.shift;

  //2. validate the values
  if (!text) {
    //3. number a/b was not provided
    return res.status(400).send("Please provide a text");
  }

  //2. validate the values
  if (!shift) {
    //3. number a/b was not provided
    return res.status(400).send("Please provide a shift");
  }

  try {
    shift = parseInt(shift);
  } catch (error) {
    //   console.error(error);
    return res.status(400).send("Please shift must be an integer");
  }

  //4. and 5. both text and shift are valid so do the processing.
  text = text.split(" ");
  const newText = text.map((eachWord) => {
    let newWord = [...eachWord].map((eachLetter) => {
      return `${String.fromCharCode(eachLetter.charCodeAt(0) + shift)}`;
    });
    return newWord.join("");
  });
  //6. send the response
  res.send(newText.join(" "));
});

app.get("/lotto", (req, res) => {
  //1. get values from the request
  let numbers = req.query.numbers;

  //2. validate the values
  if (!numbers) {
    //3. number a/b was not provided
    return res.status(400).send("Please provide numbers");
  }

  //2. validate the values
  if (numbers.length !== 6) {
    //3. number a/b was not provided
    return res.status(400).send("Please provide six numbers");
  }

  //4. and 5. are valid so do the processing.
  // Generate an array of 6 random numbers
  let numsRandom = new Array();
  while (numsRandom.length < 6) {
    ranNum = Math.floor(Math.random() * 20) + 1;
    if (numsRandom.indexOf(ranNum) == -1) {
      numsRandom.push(ranNum);
    }
  }

  numbers = numbers.map((elemen) => parseInt(elemen));
  const intersection = numbers.filter(number => numsRandom.indexOf(number) !== -1);
  console.log(numsRandom);
  console.log(intersection);
  let msg = "";
    if (intersection.length < 4) {
      msg = "Sorry, you lose";
    } else if (intersection.length == 4) {
      msg = "Congratulations, you win a free ticket";
    } else if (intersection.length == 5) {
      msg = "Congratulations! You win $100!";
    } else if (intersection.length == 5) {
      msg = "Wow! Unbelievable! You could have won the mega millions!";
    }
  //6. send the response
  res.send(msg);
});

app.listen(8000, () => {
  console.log("Express server is listening on port 8000!");
});
