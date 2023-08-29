export const defineContext = (context: string) => {
  switch (context) {
    case 'user':
      return 'UserController';
    case 'track':
      return 'TrackController';
    case 'favs':
      return 'FavoritesController';
    case 'album':
      return 'AlbumController';
    case 'artist':
      return 'ArtistController';
    case 'auth':
      return 'AuthController';
    default:
      return 'LoggerMiddleware';
  }
};

export const getContext = (url: string) => {
  const indexSecondSlash = url.indexOf('/', 1);
  let currentIndex = indexSecondSlash;
  if (indexSecondSlash === -1) {
    currentIndex = url.length;
  }
  const context = url.slice(1, currentIndex);
  return defineContext(context);
};
