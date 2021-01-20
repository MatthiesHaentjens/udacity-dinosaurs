// Create Dino Constructor
function Dino(image, species, weight, height, facts) {
    this.image = image,
    this.species = species,
    this.weight = weight,
    this.height = height,
    this.facts = facts
}

// Create Dino Object
const createDinoObjects = async() => {
    let dinos = []
    try {
        const data = await fetch("dino.json");
        const res = await data.json();
        return(
            res.Dinos.map(dino => dinos =
                new Dino(
                    `./images/${dino.species.toLowerCase()}.png`,
                    dino.species,
                    dino.weight,
                    dino.height,
                    [`${dino.diet}`,
                    `I am originally from ${dino.where}`,
                    `I lived in the ${dino.when} era`,
                    `${dino.fact}`,
                    ]
                )
            )
        );
    }
    catch (error) {
        console.log(error)
    };
};

// Create Human Constructor
function Human(name, weight, height, diet) {
    this.name = name,
    this.weight = weight,
    this.height = height,
    this.diet = diet.toLowerCase()
}

// Use IIFE to get human data from form
const createHumanObject = function() {
    return(function() {
        const name = document.getElementById('name').value
        const weight = document.getElementById('weight').value
        const height = document.getElementById('feet').value * 12 + document.getElementById('inches').value
        const diet = document.getElementById('diet').value
        return new Human(name, weight, height, diet);
    })();
};

// Create Dino Compare Method 1
// NOTE: Weight in JSON file is in lbs, height in inches. 
Dino.prototype.compareWeight = function(weight) {
    if(this.weigth > weigth) {
        this.fact.push(`I am heavier than you`);
    } else if (this.weigth === weigth) {
        this.fact.push(`Whoohoo we have the same weight`);
    } else {
        this.fact.push(`You are heavier than me`);
    }
};

// Create Dino Compare Method 2
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareHeight = function(height) {
    if(this.height > height) {
        this.fact.push(`I am taller than you`);
    } else if (this.height === height) {
        this.fact.push(`Whoohoo we have the same height`);
    } else {
        this.fact.push(`You are taller than me`);
    }
};

// Create Dino Compare Method 3
// NOTE: Weight in JSON file is in lbs, height in inches.
Dino.prototype.compareDiet = function(diet) {
    if(this.facts[0] === diet) {
        this.facts.push(`We eat the same food`);
    }
    else{
        this.facts.push(`We don't get along you are not a ${this.facts[0]}`);
    }
    
};

// Pick a random fact form the Dino fact list
const showRandomFact = function(dino) {
    return(
        dino.facts[Math.floor(Math.random() * dino.facts.length)]
    );
};

// Generate Tiles
const createTile = function(obj) {
    
    // Create new DOM elements
    const tile = document.createElement("div");
    const title = document.createElement("h3");
    const image = document.createElement("img");
    const fact = document.createElement("p");

    // Append elements to the DOM
    document.getElementById("grid").appendChild(tile);
    tile.appendChild(title);
    tile.appendChild(image);
    tile.appendChild(fact);

    // Set attributes and values of elements
    tile.setAttribute("class", "grid-item");
    
    // Check whether tile is Dino
    if(obj.constructor.name === "Dino") {
        dinoTile(obj, title, image, fact);
    }
    else if(obj.constructor.name === "Human") {
        humanTile(obj, title, image);
    }
    else {
        title.innerHTML = "Unkown species so no tile";
    };
};

// Tile layout for Dinos
const dinoTile = function(obj, title, image, fact) {
    title.innerHTML = `${obj.species}`;
    image.setAttribute("src", `${obj.image}`);
    if(obj.species === "Pigeon") {
        fact.innerHTML = "All birds are living dinosaurs.";
    }
    else {
        fact.innerHTML = `${showRandomFact(obj)}`;
    };
};

// Tile layout for Humans
const humanTile = function(obj, title, image) {
    title.innerHTML = `${obj.name}`;
    image.setAttribute("src", `./images/human.png`);
}

// Add random facts to Dino objects
const addFacts = function(dinos, human) {
    dinos.forEach(dino => {
        dino.compareWeight(human.weight);
        dino.compareHeight(human.height);
        dino.compareDiet(human.diet);
    });
};

// Logic to place the human tile in the center
const humanCenterTiles = function(dinos, human) {
    for(let i = 0; i < dinos.length; i++) {
        if(i === 4){
            createTile(human);
            createTile(dinos[i]);
        }
        else{
            createTile(dinos[i]);
        };
    };
};

// Add tiles to DOM
const addTiles = async() => {
    try {
        const dinos = await createDinoObjects();
        const human = createHumanObject();
        addFacts(dinos, human);
        humanCenterTiles(dinos, human);
    }
    catch (error) {
        console.log(error);
    }
}

// On button click, prepare and display infographic
document.getElementById("btn").onclick = function(event) {
    event.preventDefault()
    addTiles();
    document.getElementById("dino-compare").style.display = "none";
};
