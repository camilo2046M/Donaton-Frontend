// src/index.ts

import { Badge } from 'components/atoms/Badge';
import { Button } from 'components/atoms/Button';
import  {Input} from 'components/atoms/Input';
import { Label } from 'components/atoms/Label';
import { Select } from 'components/atoms/Select';
// 1. Exportamos los tokens de diseño (lo que me enviaste antes)
export * from './tokens'; // (Si pusiste los tokens en src/tokens/index.ts)

// 2. Exportamos los tipos y contratos de datos
export * from './types'; // (Si pusiste los tipos en src/types/index.ts)

// 3. ¡Lo más importante! Exportamos los Átomos
export * from 'components/atoms/Badge'
export * from 'components/atoms/Button'
export * from 'components/atoms/Input'
export * from 'components/atoms/Label'
export * from 'components/atoms/Select'