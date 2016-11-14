/* 

This example illustrates the simplest use of the library

You define how to create an individual
You define how to measure the fittness of an individual
and you define how to mutate an individual

*/

function generateIndividual() {
	let array = [];
	for(var i = 0; i < 10; i++){
		array.push(Math.round(Math.random()));
	}
	return array;
};

function getFitness(indv) {
	let fitness = 0;
	for(var i = 0; i < indv.length; i++) {
		fitness += indv[i] == 1 ? 1 : 0;
	}
	return fitness;
}

function mutate(indv) {
	let mutatedIndex = Math.floor(Math.random() * indv.length);
	indv[mutatedIndex] = indv[mutatedIndex] == 1 ? 0 : 1;
	return indv;
}

// Create a toolbox
var toolbox = new Toolbox();
toolbox.genIndv = generateIndividual;
toolbox.getFitness = getFitness;
toolbox.goalFitness = Toolbox.fitnessMax;
toolbox.mutate = mutate;

// Create parameters
var popSize = 10;
var mutProb = .1;
var generations = 10;
var breedFunction = Algorithms.crossBreed;

// Create 
var gen = new GeneticAlgorithm(toolbox, popSize, mutProb, breedFunction, true);
console.log("Simple Array Example:", gen.evolve(generations));
