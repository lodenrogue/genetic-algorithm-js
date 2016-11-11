
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

var popSize = 10;
var fitnessGoal = 1;
var mutProb = .1;
var generations = 10;

var gen = new GeneticAlgorithm(generateIndividual, popSize, getFitness, fitnessGoal, mutate, mutProb);
console.log(gen.runSimulation(generations));