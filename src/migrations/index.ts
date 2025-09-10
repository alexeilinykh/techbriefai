import * as migration_20250910_043145 from './20250910_043145';
import * as migration_20250910_051049 from './20250910_051049';

export const migrations = [
  {
    up: migration_20250910_043145.up,
    down: migration_20250910_043145.down,
    name: '20250910_043145',
  },
  {
    up: migration_20250910_051049.up,
    down: migration_20250910_051049.down,
    name: '20250910_051049'
  },
];
