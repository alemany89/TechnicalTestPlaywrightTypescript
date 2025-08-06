export class PetBuilder {
  private pet: any = {
    category: { id: 1, name: 'dogs' },
    name: 'Luigis',
    photoUrls: ['https://example.com'],
    tags: [{ id: 1, name: 'cute' },{ id: 2, name: 'luis possesion' }],
    status: 'available',
  };

  withId(id: number) {
    this.pet.id = id;
    return this;
  }

  withName(name: string) {
    this.pet.name = name;
    return this;
  }

  withStatus(status: string) {
    this.pet.status = status;
    return this;
  }

  build() {
    return this.pet;
  }
}
