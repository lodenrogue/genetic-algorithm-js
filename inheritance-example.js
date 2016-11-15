/*
	Given a number of inheritors and a list of values 
	for items, how do we evenly split up these items 
	so that the difference in value per inheritor is minimized?
*/

let inheritors = 3;
let values = [100.76, 22.12, 90, 150, 70, 100, 22.9, 8, 150, 220, 75, 69, 104.46];

function generateIndividual(){
	let indv = []
	for(var i = 0; i < values.length; i++) {
		indv[i] = Math.floor(Math.random() * inheritors);
	}
	return indv;
}

function getFitness(indv) {
	let sums = [];
	for(var i = 0; i < indv.length; i++) {
		if(sums[indv[i]] == undefined){
			sums[indv[i]] = 0;
		}
		sums[indv[i]] += values[i];
	}

	let total = 0;
	for(var i = 0; i < sums.length; i++) {
		total += sums[i];
	}

	let average = total / sums.length;
	let fitness = 0;
	for(var i = 0; i < sums.length; i++){
		fitness += Math.abs(sums[i] - average);
	}
	return fitness;
}	

function mutate(indv) {
	let randIndex = Math.floor(Math.random() * indv.length);
	indv[randIndex] = Math.floor(Math.random() * inheritors) + 1;
	return indv;
}

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
var breedFunction = Algorithms.crossBreed;

// Create genetic algorithm and evolve individuals
var gen = new GeneticAlgorithm(toolbox, popSize, mutProb, breedFunction);
console.log("Inheritance Example:", gen.evolve(generations));