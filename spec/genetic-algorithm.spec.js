describe("Genetic Algorithm", function() {

	describe('Creation', function() {
		var toolbox;
		var popSize;
		var mutProb;
		var breedFunction;

		beforeEach(function(done) {
			toolbox = new Toolbox();
			popSize = 10;
			mutProb = .10;
			breedFunction = Algorithms.crossBreed;
			done();
		});

		it('should throw an exception when toolbox is undefined', function () {
			expect(function() {
				new GeneticAlgorithm();
			}).toThrow();
		});

		it('should throw an exception when population size is undefined', function() {
			expect(function() { 
				new GeneticAlgorithm(toolbox);
			}).toThrow();
		});

		it('should throw an exception when population size is 1', function() {
			expect(function() { 
				new GeneticAlgorithm(toolbox, 1);
			}).toThrow();
		});

		it('should throw an exception when population size is 2', function() {
			expect(function() { 
				new GeneticAlgorithm(toolbox, 2);
			}).toThrow();
		});

		it('should throw an exception when mutability probability is undefined', function() {
			expect(function() {
				new GeneticAlgorithm(toolbox, popSize);
			}).toThrow();
		});

		it('should throw an exception when breed function is undefined', function() {
			expect(function() {
				new GeneticAlgorithm(toolbox, popSize, mutProb);
			}).toThrow();
		});
	});

	describe('Generate Population', function() {
		var ga;
		var toolbox;
		var individual;
		var popSize;
		var mutProb;
		var breedFunction;
		var population;

		beforeEach(function(done) {
			individual = [1, 1, 1, 1];
			toolbox = new Toolbox();
			toolbox.genIndv = function() { return individual; };

			popSize = 10;
			mutProb = .10;
			breedFunction = Algorithms.crossBreed;

			ga = new GeneticAlgorithm(toolbox, popSize, mutProb, breedFunction);
			population = ga.generatePopulation(toolbox.genIndv, popSize);
			done();
		});

		it('should return an array', function() {
			expect(population instanceof Array).toBe(true);
		});

		it('should return an array of the same size as population size', function() {
			expect(population.length).toBe(popSize);
		});

		it('should generate individuals of type object', function() {
			for(var i = 0; i < population.length; i++) {
				expect(population[i] instanceof Object).toBe(true);
			}
		});

		it('should generate individuals with attribute of type array', function() {
			for(var i = 0; i < population.length; i++) {
				expect(population[i].individual instanceof Array).toBe(true);
			}
		});

		it('should generate individuals equal to test individual', function() {
			for(var i = 0; i < population.length; i++) {
				var generatedIndividual = population[i].individual;
				for(var j = 0; j < generatedIndividual.length; j++) {
					expect(generatedIndividual[i] === individual[i]).toBe(true);
				}
			}
		});
	});

	describe('Get Fitness', function() {
		var ga;
		var toolbox;
		var individual;
		var popSize;
		var mutProb;
		var breedFunction;
		var population;

		beforeEach(function(done) {
			individual = [1, 1, 1, 1];

			toolbox = new Toolbox();
			toolbox.getFitness = function(indv) { return 4; };

			popSize = 10;
			mutProb = .10;
			breedFunction = Algorithms.crossBreed;

			ga = new GeneticAlgorithm(toolbox, popSize, mutProb, breedFunction);
			population = ga.generatePopulation(toolbox.genIndv, popSize);
			done();
		});

		it('should return correct fitness value for all individuals', function() {
			var evaluatedPopulation = ga.getFitness(population, toolbox.getFitness);
			
			for(var i = 0; i < evaluatedPopulation.length; i++) {
				var individualFitness = evaluatedPopulation[i].fitness;
				expect(individualFitness).toBe(4);
			}
		})
	})
	
});