import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Solicitud,
  Avion,
} from '../models';
import {SolicitudRepository} from '../repositories';

export class SolicitudAvionController {
  constructor(
    @repository(SolicitudRepository)
    public solicitudRepository: SolicitudRepository,
  ) { }

  @get('/solicituds/{id}/avion', {
    responses: {
      '200': {
        description: 'Avion belonging to Solicitud',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Avion)},
          },
        },
      },
    },
  })
  async getAvion(
    @param.path.string('id') id: typeof Solicitud.prototype.id,
  ): Promise<Avion> {
    return this.solicitudRepository.avion(id);
  }
}
