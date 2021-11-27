import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Avion} from './avion.model';

@model()
export class Solicitud extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_solicitud: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @belongsTo(() => Avion)
  avionId: string;

  constructor(data?: Partial<Solicitud>) {
    super(data);
  }
}

export interface SolicitudRelations {
  // describe navigational properties here
}

export type SolicitudWithRelations = Solicitud & SolicitudRelations;
