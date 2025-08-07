import { Pet } from "../models/Pet";
import { PetStatus } from "../models/PetStatus";

export class PetBuilder {
  private pet: Pet = {
    category: { id: 1, name: "dogs" },
    name: "Luigis",
    photoUrls: ["https://example.com"],
    tags: [
      { id: 1, name: "cute" },
      { id: 2, name: "luis possession" },
    ],
    status: "available",
  };

  withId(id: number): this {
    this.pet.id = id;
    return this;
  }

  withName(name: string): this {
    this.pet.name = name;
    return this;
  }

  withStatus(status: PetStatus): this {
    this.pet.status = status;
    return this;
  }
  build(): Pet {
    return { ...this.pet };
  }
}
