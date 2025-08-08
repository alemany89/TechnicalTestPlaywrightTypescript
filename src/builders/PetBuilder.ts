import { PetDTORequest } from "../dto/pet/PetDTORequest";
import { PetStatus } from "../dto/pet/PetStatus";

export class PetBuilder {
  private pet: PetDTORequest = {
    id: Date.now(),
    name: "Pet",
    photoUrls: ["https://example.com"],
  };

  withId(id: number): this {
    this.pet.id = id;
    return this;
  }

  withName(name: string): this {
    this.pet.name = name;
    return this;
  }

  withPhotoUrls(photoUrls: string[]): this {
    this.pet.photoUrls = photoUrls;
    return this;
  }

  withStatus(status: PetStatus): this {
    this.pet.status = status;
    return this;
  }
  build(): PetDTORequest {
    return { ...this.pet };
  }
  
}
