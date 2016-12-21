/* 

This example illustrates how to use a custom breed function

You have 10 cards numbered 1 to 10
You have to divide them into two piles so that:
The sum of the first pile is as close as possible to 36.
And the product of all in the second pile is as close as possible to 360.

*/

function generateIndividual() {
	let array = [];
	let numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

	for(var i = 0; i < numbers.length; i++) {
		let randIndex = Math.floor(Math.random() * numbers.length);
		while(array[randIndex] != undefined){
			randIndex = Math.floor(Math.random() * numbers.length);
		}
		array[randIndex] = numbers[i];
	}
	return array;
};


function getFitness(indv) {
	let sum = 0;
	for(var i = 0; i < 5; i++) {
		sum += indv[i];
	}

	let product = 1;
	for(var i = 5; i < indv.length; i++){
		product *= indv[i];
	}
	return Math.abs((sum + product) - 396);
};

function mutate(indv) {
	let switch1 = Math.floor(Math.random() * indv.length);
	let switch2 = Math.floor(Math.random() * indv.length);
	while(switch1 == switch2) {
		switch2 = Math.floor(Math.random() * indv.length);
	}

	let tmp = indv[switch1];
	indv[switch1] = indv[switch2];
	indv[switch2] = tmp;
	return indv;
};

function breedFunction(parent0, parent1) {
	let protoParent = Math.round(Math.random());
	let newborn = protoParent == 0 ? parent0.slice() : parent1.slice();
	let breedPoint = Math.floor(Math.random() * parent0.length);

	let newValue = protoParent == 0 ? parent1[breedPoint] : parent0[breedPoint];
	let tmp = newborn[breedPoint];

	let indexOfExisting = newborn.indexOf(newValue);
	newborn[breedPoint] = newValue;
	newborn[indexOfExisting] = tmp;
	return newborn;
};

// Create a toolbox
var toolbox = new Toolbox();
toolbox.genIndv = generateIndividual;
toolbox.getFitness = getFitness;
toolbox.goalFitness = Toolbox.fitnessMin;
toolbox.mutate = mutate;

// Create parameters
var popSize = 100;
var mutProb = .1;
var generations = 100;

// Create genetic algorithm and evolve individuals
var gen = new GeneticAlgorithm(toolbox, popSize, mutProb, breedFunction);
console.log("Custom Breed Function Example:", gen.evolve(generations));
