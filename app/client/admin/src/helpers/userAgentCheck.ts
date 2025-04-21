export const isBot = (): boolean => {
  const bots = [
    'googlebot',
    'adsbot-google',
    'mediapartners-google',
    'aolbuild',
    'baidu',
    'bingbot',
    'bingpreview',
    'msnbot',
    'duckduckgo',
    'teoma',
    'slurp',
    'yandex',
    'facebot',
    'ia_archiver',
    'Prerender',
  ];

  return bots.some((el) => navigator.userAgent.includes(el));
};

export const isTouchDevice = (): boolean => {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.msMaxTouchPoints > 0;
};
