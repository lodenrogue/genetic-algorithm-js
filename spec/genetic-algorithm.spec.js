describe("Genetic Algorithm", function() {
	var ga;
	var toolBox = new Toolbox();
	var popSize = 10;
	var mutProb = .10;
	var breedFunction = Algorithms.crossBreed;

	beforeEach(function(done) {
		done();
	});

	describe('Creation', function() {
		it('should throw an exception when toolBox is undefined', function () {
			expect(function() {
				new GeneticAlgorithm(undefined, popSize);
			}).toThrow();
		});

		it('should throw an exception when population size is undefined', function() {
			expect(function() { 
				new GeneticAlgorithm(toolBox);
			}).toThrow();
		});

		it('should throw an exception when population size is 1', function() {
			expect(function() { 
				new GeneticAlgorithm(toolBox, 1);
			}).toThrow();
		});

		it('should throw an exception when population size is 2', function() {
			expect(function() { 
				new GeneticAlgorithm(toolBox, 2);
			}).toThrow();
		});

		it('should throw an exception when mutability probability is undefined', function() {
			expect(function() {
				new GeneticAlgorithm(toolBox, popSize);
			}).toThrow();
		});

		it('should throw an exception when breed function is undefined', function() {
			expect(function() {
				new GeneticAlgorithm(toolBox, popSize, mutProb);
			}).toThrow();
		});
	});
	


});