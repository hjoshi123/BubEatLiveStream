let users = [];
let foods = [];
let data = {};
let socket;
const foodColors = ['#ecf0f1', '#3498db', '#2ecc71', '#ff2020'];
let name;

const submit = document.getElementById('submit');
const intro = document.getElementById('intro');

submit.addEventListener('click', () => {
    intro.style.display = "none";
});

function setup() {
    const cnv = createCanvas(windowWidth, windowHeight);
    cnv.style('display', 'block');    
    socket = io.connect();
    socket.on('tick', function(data) {
        users = data.users;
        foods = data.foods;
    });
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);

    foods.forEach((food) => {
        fill(foodColors[food.val - 1]);
        ellipse(food.x, food.y, food.r * 2, food.r * 2);
    });

    for (var i = 0; i < users.length; i++) {
        var id = users[i].id;

        if (id !== socket.id) {
            fill(users[i].col);
            ellipse(users[i].x, users[i].y, users[i].r * 2, users[i].r * 2);

            fill(255);
            textAlign(CENTER);
            text(`${users[i].name}(${users[i].speed.toFixed(2)})`, users[i].x, users[i].y - users[i].r*1.5);
        }
    }
}
