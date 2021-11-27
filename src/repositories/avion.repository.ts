import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Avion, AvionRelations, Usuario} from '../models';
import {UsuarioRepository} from './usuario.repository';

export class AvionRepository extends DefaultCrudRepository<
  Avion,
  typeof Avion.prototype.id,
  AvionRelations
> {

  public readonly usuarios: HasManyRepositoryFactory<Usuario, typeof Avion.prototype.id>;

  constructor(
    @inject('datasources.Mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Avion, dataSource);
    this.usuarios = this.createHasManyRepositoryFactoryFor('usuarios', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuarios', this.usuarios.inclusionResolver);
  }
}
