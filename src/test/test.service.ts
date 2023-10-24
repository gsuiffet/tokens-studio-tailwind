import { Injectable } from '@nestjs/common';

@Injectable()
export class TestService {
  create(createTestDto) {
    return 'Create a new sayen';
  }

  findAll() {
    return `All pokemons`;
  }

  findOne(id: number) {
    return `This is a sayen number #${id} `;
  }

  update(id: number, updateTestDto) {
    return `Modify sayn number  #${id} `;
  }

  remove(id: number) {
    return `Remove sayn number  #${id} `;
  }
}
