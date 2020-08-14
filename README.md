# JSDarwin - Genetic Algorithm JS
Genetic algorithm library written in JavaScript


## How To Use
The library lets you define specific functions for your particular application

### Generating an individual
Define how to generate an individual. Function must return the constructed individual.

Example:

```javascript
function generateIndividual() {
    let array = [];
    for(let i = 0; i < 10; i++) {
        array.push(Math.round(Math.random()));
    }
    return array;
}
```

### Get the fitness for the individual
Define the fitness function. Function takes in an individual and returns its fitness value.

Example:

```javascript
function getFitness(indv) {
    let fitness = 0;
    for(let i = 0; i < indv.length; i++) {
        fitness += indv[i] == 1 ? 1 : 0;
    }
    return fitness;
}
```

### Mutate an individual
Define how to mutate an individual. Function takes in an individual, mutates, and returns it.

Example:

```javascript
function mutate(indv) {
    let mutatedIndex = Math.floor(Math.random() * indv.length);
    indv[mutatedIndex] = indv[mutatedIndex] == 1 ? 0 : 1;
    return indv;
}
```
   
### (Optional) Breed two individuals
Define how to breed two individuals and produce a newborn. Function takes in two individuals and 
returns a new individual produced from both individuals

```javascript
function breedFunction(parent0, parent1) {
    let newborn = parent0.slice();
    let randIndex = Math.round(Math.random() * parent1.length);
    newborn[randIndex] = parent1[randIndex];
    return newborn;
}
```

### Toolbox
Create a toolbox that will hold your created functions

```javascript
let toolbox = new Toolbox();
toolbox.genIndv = generateIndividual;
toolbox.getFitness = getFitness;
toolbox.mutate = mutate;
```
    
Set the goal fitness. If a larger fitness is desired than use Toolbox.fitnessMax; otherwise use Toolbox.fitnessMin.

```javascript
toolbox.goalFitness = Toolbox.fitnessMax;
 ```   
    
### Define evolution parameters

```javascript
let populationSize = 100;
let mutationProbability = .1;
let generations = 100;
```

### Run evolution
Create Genetic Algorithm object and run evolution

```javascript
let gen = new GeneticAlgorithm(toolbox, populationSize, mutationProbability, breedFunction);

let results = gen.evolve(generations);
// Do something with the results
```
