import * as migration_20250910_023051 from './20250910_023051';

export const migrations = [
  {
    up: migration_20250910_023051.up,
    down: migration_20250910_023051.down,
    name: '20250910_023051'
  },
];
