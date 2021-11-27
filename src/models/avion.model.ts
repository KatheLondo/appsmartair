import {Entity, model, property, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Avion extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  referencia: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_avion: string;

  @property({
    type: 'number',
    required: true,
  })
  valor: number;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  departamento: string;

  @property({
    type: 'string',
    required: true,
  })
  ciudad: string;

  @property({
    type: 'string',
    required: true,
  })
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  tipo_oferta: string;

  @hasMany(() => Usuario)
  usuarios: Usuario[];

  constructor(data?: Partial<Avion>) {
    super(data);
  }
}

export interface AvionRelations {
  // describe navigational properties here
}

export type AvionWithRelations = Avion & AvionRelations;
