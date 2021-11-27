import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Avion,
  Usuario,
} from '../models';
import {AvionRepository} from '../repositories';

export class AvionUsuarioController {
  constructor(
    @repository(AvionRepository) protected avionRepository: AvionRepository,
  ) { }

  @get('/avions/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Array of Avion has many Usuario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Usuario>,
  ): Promise<Usuario[]> {
    return this.avionRepository.usuarios(id).find(filter);
  }

  @post('/avions/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Avion model instance',
        content: {'application/json': {schema: getModelSchemaRef(Usuario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Avion.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {
            title: 'NewUsuarioInAvion',
            exclude: ['id'],
            optional: ['avionId']
          }),
        },
      },
    }) usuario: Omit<Usuario, 'id'>,
  ): Promise<Usuario> {
    return this.avionRepository.usuarios(id).create(usuario);
  }

  @patch('/avions/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Avion.Usuario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Usuario, {partial: true}),
        },
      },
    })
    usuario: Partial<Usuario>,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.avionRepository.usuarios(id).patch(usuario, where);
  }

  @del('/avions/{id}/usuarios', {
    responses: {
      '200': {
        description: 'Avion.Usuario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Usuario)) where?: Where<Usuario>,
  ): Promise<Count> {
    return this.avionRepository.usuarios(id).delete(where);
  }
}
