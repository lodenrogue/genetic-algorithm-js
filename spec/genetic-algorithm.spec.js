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
		var mutatedIndividual; 
		var popSize;
		var mutProb;
		var breedFunction;

		beforeEach(function(done) {
			individual = [1, 1, 1, 1];
			mutatedIndividual = [1, 2, 1, 1];
			
			toolbox = new Toolbox();
			toolbox.genIndv = function() { return individual; };
			toolbox.getFitness = function(indv) { return 4; };
			toolbox.mutate = function(indv) { return mutatedIndividual; };
			toolbox.goalFitness = Toolbox.fitnessMax;

			popSize = 10;
			mutProb = .10;
			breedFunction = Algorithms.crossBreed;

			ga = new GeneticAlgorithm(toolbox, popSize, mutProb, breedFunction);
			done();
		});

		it('should return an array', function() {
			var population = ga.generatePopulation(toolbox.genIndv, popSize);
			expect(population instanceof Array).toBe(true);
		});

		it('should return an array of the same size as popSize', function() {
			var population = ga.generatePopulation(toolbox.genIndv, popSize);
			expect(population.length).toBe(popSize);
		});
	});
	


});