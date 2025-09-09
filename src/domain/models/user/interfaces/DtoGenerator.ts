export interface DtoGenerator<T, G> {
  toPrimitives(entity: T): G;
  fromPrimitives(primitives: G): T;
}