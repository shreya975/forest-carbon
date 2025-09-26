import random

# Single Point Crossover
def single_point_crossover(parent1, parent2):
    point = random.randint(1, len(parent1)-1)
    offspring1 = parent1[:point] + parent2[point:]
    offspring2 = parent2[:point] + parent1[point:]
    return offspring1, offspring2

# Two Point Crossover
def two_point_crossover(parent1, parent2):
    p1, p2 = sorted(random.sample(range(1, len(parent1)-1), 2))
    offspring1 = parent1[:p1] + parent2[p1:p2] + parent1[p2:]
    offspring2 = parent2[:p1] + parent1[p1:p2] + parent2[p2:]
    return offspring1, offspring2

# Uniform Crossover
def uniform_crossover(parent1, parent2, prob=0.5):
    offspring1, offspring2 = "", ""
    for i in range(len(parent1)):
        if random.random() < prob:
            offspring1 += parent1[i]
            offspring2 += parent2[i]
 else:
            offspring1 += parent2[i]
            offspring2 += parent1[i]
    return offspring1, offspring2


# Example usage
if _name_ == "_main_":
    # Example parents (binary strings)
    parent1 = "11001010"
    parent2 = "00110111"

    print("Parent1:", parent1)
    print("Parent2:", parent2)

    child1, child2 = single_point_crossover(parent1, parent2)
    print("\nSingle Point Crossover ->", child1, child2)

    child1, child2 = two_point_crossover(parent1, parent2)
    print("Two Point Crossover   ->", child1, child2)

    child1, child2 = uniform_crossover(parent1, parent2)
    print("Uniform Crossover     ->", child1, child2)