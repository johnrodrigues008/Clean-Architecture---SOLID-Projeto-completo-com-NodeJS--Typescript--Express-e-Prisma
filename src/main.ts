import { ApiExpress } from './infra/repositories/api/express/api.express';
import { CreateProductRoute } from './infra/repositories/api/express/routes/product/create-product.express.router';
import { ListProductRoute } from './infra/repositories/api/express/routes/product/list-product.express.router';
import { productRepositoryPrisma } from './infra/repositories/product/productRepository.prisma';
import { prisma } from './package/prisma/prisma';
import { CreateProductUseCase } from './usecases/create-product/create.product.usecase';
import { ListProductUseCase } from './usecases/list-product/list-product.usecase';

function main() {
  const aRepository = productRepositoryPrisma.create(prisma);

  const createProductUsecase = CreateProductUseCase.create(aRepository);
  const listProductUsecase = ListProductUseCase.create(aRepository);

  const createRoute = CreateProductRoute.create(createProductUsecase);
  const listRoute = ListProductRoute.create(listProductUsecase);

  const api = ApiExpress.create([createRoute, listRoute]);
  const port = 8000;
  api.start(port);
}

main();
