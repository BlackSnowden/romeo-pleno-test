module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current',
        },
      },
    ],
    '@babel/preset-typescript',
  ],
  plugins: [
    [
      'module-resolver',
      {
        alias: {
          '@config': './dist/app/shared/config',
          '@schedules': './dist/app/schedules',
          '@modules': './dist/app/modules',
          '@shared': './dist/app/shared',
        },
      },
    ],
  ],
}
