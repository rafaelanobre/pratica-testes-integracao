import { conflictError } from "../errors/conflict-error";
import { notFoundError } from "../errors/notfound-error";
import fruitsRepository, { Fruit } from "../repositories/fruits-repository";

export type FruitInput = Omit<Fruit, "id">;

function getFruits() {
  return fruitsRepository.getFruits();
}

function getSpecificFruit(id: number) {
  const fruit = fruitsRepository.getSpecificFruit(id);
  if (!fruit) {
    throw notFoundError();
  }

  return fruit;
}

function createFruit(fruit: FruitInput): void {
  const fruitAlreadyRegistered = fruitsRepository.getSpecificFruitByName(fruit.name);
  if (fruitAlreadyRegistered) {
    throw conflictError();
  }

  fruitsRepository.insertFruit(fruit);
}

const fruitsService = {
  getFruits,
  getSpecificFruit,
  createFruit
}

export default fruitsService;