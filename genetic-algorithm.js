function Toolbox() {
    this.genIndv = function() {};
    this.getFitness = function() {};
    this.mutate = function() {};
    this.goalFitness = Toolbox.fitnessMax;
};

Toolbox.fitnessMax = 1;
Toolbox.fitnessMin = -1;

function GeneticAlgorithm(toolbox, popSize, mutProb, breedFunction) {

    if (popSize <= 2) {
        throw "Population size must be greater than 2. Current size: " + popSize;
    }

    this.evolve = function(generations) {
        let population = generatePopulation(toolbox.genIndv, popSize);

        for (var i = 0; i < generations; i++) {
            population = sortByFitness(population, toolbox.getFitness, toolbox.goalFitness);
            population = breed(population, toolbox.mutate, mutProb, breedFunction);
        }
        population = sortByFitness(population, toolbox.getFitness, toolbox.goalFitness);
        let results = getResults(population, toolbox.getFitness, generations);
        return results;
    };


    // Generate a population with the given individual 
    // generation strategy and population size
    function generatePopulation(genIndv, popSize) {
        let pop = [];
        for (var i = 0; i < popSize; i++) {
            pop.push(genIndv());
        }
        return pop;
    };

    // Sort the population array
    function sortByFitness(population, getFitness, goalFitness) {
        population.sort(function(a, b) {
            return (getFitness(b) - getFitness(a)) * goalFitness;
        });
        return population;
    };

    // breed population and apply mutation if probability met
    function breed(population, mutate, mutProb, breedFunction) {

        // Select best individuals and remove bottom half of population
        let breeders = Math.round(population.length / 2);
        let newPopulation = population.slice(0, breeders);

        // Select parents
        while (newPopulation.length != population.length) {
            let parentAIndex = Math.floor(Math.random() * breeders);
            let parentBIndex = Math.floor(Math.random() * breeders);

            while (parentAIndex == parentBIndex) {
                parentBIndex = Math.floor(Math.random() * breeders);
            }

            let parentA = population[parentAIndex];
            let parentB = population[parentBIndex];

            // Create newborn
            let newborn = breedFunction(parentA, parentB);

            // Mutate newborn
            if (Math.random() <= mutProb) {
                newborn = mutate(newborn);
            }
            newPopulation.push(newborn);
        }
        return newPopulation;
    };

    function getResults(population, getFitness, generations) {
        let results = {
            generations: generations,
            population: []
        };
        for (var i = 0; i < population.length; i++) {
            let indv = population[i];
            let fitness = getFitness(indv);
            results.population.push({
                individual: indv,
                fitness: fitness
            });
        }
        return results;
    };
};

function Algorithms() {};

Algorithms.crossBreed = function(parentA, parentB) {
    // Select cutOff point and create newborn
    let cutOff = Math.floor(Math.random() * parentA.length);
    let newborn = parentA.slice(0, cutOff + 1);
    let parentBChrom = parentB.slice(cutOff + 1, parentB.length);

    for (var i = 0; i < parentBChrom.length; i++) {
        newborn.push(parentBChrom[i]);
    }
    return newborn;
}