import { IDictionary } from './IDictionary';
import { IFunction } from './IFunction';

export type IActionUnion<K extends IDictionary<IFunction>> = ReturnType<K[keyof K]>;
