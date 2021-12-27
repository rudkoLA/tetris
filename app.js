document.addEventListener("DOMContentLoaded", () => {
  const grid = document.querySelector(".grid");
  let squares = Array.from(document.querySelectorAll(".grid div"));
  const scoreDisplay = document.querySelector("#score");
  const startBtn = document.querySelector("#start-button");
  const width = 10;
  let nextRandom = Math.floor(Math.random() * 5);

  const lTetromino = [
    [1, 2, width + 1, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 2],
    [1, width + 1, width * 2 + 1, width * 2],
    [width, width * 2, width * 2 + 1, width * 2 + 2],
  ];

  const zTetromino = [
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
    [0, width, width + 1, width * 2 + 1],
    [width + 1, width + 2, width * 2, width * 2 + 1],
  ];

  const tTetromino = [
    [1, width, width + 1, width + 2],
    [1, width + 1, width + 2, width * 2 + 1],
    [width, width + 1, width + 2, width * 2 + 1],
    [1, width, width + 1, width * 2 + 1],
  ];

  const oTetromino = [
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
    [0, 1, width, width + 1],
  ];

  const iTetromino = [
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
    [1, width + 1, width * 2 + 1, width * 3 + 1],
    [width, width + 1, width + 2, width + 3],
  ];

  const theTetrominoes = [
    lTetromino,
    zTetromino,
    tTetromino,
    oTetromino,
    iTetromino,
  ];
  let currentPosition = 4;
  let currentRotation = Math.floor(Math.random() * 4);

  let randomTetromino = Math.floor(Math.random() * 5);

  let current = theTetrominoes[randomTetromino][currentRotation];

  function draw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.add("tetromino");
    });
  }

  function unDraw() {
    current.forEach((index) => {
      squares[currentPosition + index].classList.remove("tetromino");
    });
  }

  let timerId = setInterval(moveDown, 300);

  function control(e) {
    if (e.keyCode === 65) {
      moveLeft();
    }
    if (e.keyCode === 68) {
      moveRight();
    }
    if (e.keyCode === 83) {
      moveDownOnKey();
    }
    if (e.keyCode === 82) {
      unDraw();
      prevRotation = currentRotation;
      currentRotation = (currentRotation + 1) % 4;
      current = theTetrominoes[randomTetromino][currentRotation];

      if (
        current.some((index) =>
          squares[currentPosition + index].classList.contains("taken")
        )
      ) {
        currentRotation = prevRotation;
        current = theTetrominoes[randomTetromino][currentRotation];
      }

      draw();
    }
  }
  document.addEventListener("keydown", control);

  function moveDown() {
    unDraw();
    currentPosition += width;
    draw();
    freeze();
  }

  function freeze() {
    if (
      current.some((index) =>
        squares[currentPosition + index + width].classList.contains("taken")
      )
    ) {
      current.forEach((index) => {
        squares[currentPosition + index].classList.add("taken");
      });
      randomTetromino = nextRandom;
      nextRandom = Math.floor(Math.random() * 5);
      current = theTetrominoes[randomTetromino][currentRotation];
      currentPosition = 4;
      draw();
      displayShape();
    }
  }
  function moveLeft() {
    unDraw();
    const isAtLeftEdge = current.some(
      (index) => (currentPosition + index) % width === 0
    );

    if (!isAtLeftEdge) currentPosition--;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition++;
    }

    draw();
  }

  function moveRight() {
    unDraw();
    const isAtRightEdge = current.some(
      (index) => (currentPosition + index) % width === 9
    );

    if (!isAtRightEdge) currentPosition++;

    if (
      current.some((index) =>
        squares[currentPosition + index].classList.contains("taken")
      )
    ) {
      currentPosition--;
    }

    draw();
  }

  function moveDownOnKey() {
    unDraw();

    currentPosition += width;

    const isNearTaken = current.some((index) =>
      squares[currentPosition + index + width].classList.contains("taken")
    );

    if (isNearTaken) currentPosition -= width;

    draw();
    freeze();
  }

  const displaySquares = document.querySelectorAll(".mini-grid div");
  const displayWidth = 4;
  let displayIndex = 1;

  const upNextTetrominoes = [
    [1, 2, displayWidth + 1, displayWidth * 2 + 1],
    [0, displayWidth, displayWidth + 1, displayWidth * 2 + 1],
    [1, displayWidth, displayWidth + 1, displayWidth + 2],
    [0, 1, displayWidth, displayWidth + 1],
    [1, displayWidth + 1, displayWidth * 2 + 1, displayWidth * 3 + 1],
  ];

  function displayShape() {
    displaySquares.forEach((square) => {
      square.classList.remove("tetromino");
    });
    upNextTetrominoes[nextRandom].forEach((index) => {
      displaySquares[displayIndex + index].classList.add("tetromino");
    });
  }
  displayShape()
});
