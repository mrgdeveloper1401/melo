const { DataTypes, Model } = require('sequelize');
const sequelize = require("../db/postgres_db");


class Audio extends Model {}
class Album extends Model {}
class Artist extends Model {}
class Song extends Model {}
class Genre extends Model {}
class Playlist extends Model {}
class FavoriteSong extends Model {}
class PlayHistory extends Model {}
class Comment extends Model {}
class PlaylistSong extends Model {}

Audio.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    audio_file: {
      type: DataTypes.STRING,
      allowNull: false
    },
    size: {
      type: DataTypes.INTEGER
    },
    hash: {
      type: DataTypes.CHAR(64)
    },
    duration: {
      type: DataTypes.INTEGER
    },
    audio_format: {
      type: DataTypes.CHAR(10)
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'Audio',
    tableName: 'audios',
    timestamps: false
  }
);

Album.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    bio: {
      type: DataTypes.STRING(255)
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    release_date: {
      type: DataTypes.DATE
    }
  },
  {
    sequelize,
    modelName: 'Album',
    tableName: 'albums',
    timestamps: false
  }
);

Artist.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    monthly_listeners: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
    bio: {
      type: DataTypes.STRING(400)
    }
  },
  {
    sequelize,
    modelName: 'Artist',
    tableName: 'artists',
    timestamps: false
  }
);

Song.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    release_date: {
      type: DataTypes.DATE
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    },
    play_count: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  },
  {
    sequelize,
    modelName: 'Song',
    tableName: 'songs',
    timestamps: false
  }
);

Genre.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'Genre',
    tableName: 'genres',
    timestamps: false
  }
);

Playlist.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'Playlist',
    tableName: 'playlists',
    timestamps: false
  }
);

FavoriteSong.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    added_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'FavoriteSong',
    tableName: 'favorite_songs',
    timestamps: false
  }
);

PlayHistory.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    played_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
  {
    sequelize,
    modelName: 'PlayHistory',
    tableName: 'play_history',
    timestamps: false
  }
);

Comment.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: false
  }
);

PlaylistSong.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    position: {
      type: DataTypes.INTEGER
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }
  },
  {
    sequelize,
    modelName: 'PlaylistSong',
    tableName: 'playlist_songs',
    timestamps: false
  }
);

const defineRelations = () => {
  // User Relations
  User.hasOne(Artist, { foreignKey: 'user_id' });
  User.hasMany(Playlist, { foreignKey: 'user_id' });
  User.hasMany(FavoriteSong, { foreignKey: 'user_id' });
  User.hasMany(PlayHistory, { foreignKey: 'user_id' });
  User.hasMany(Comment, { foreignKey: 'user_id' });

  // Artist Relations
  Artist.belongsTo(User, { foreignKey: 'user_id' });
  Artist.hasMany(Album, { foreignKey: 'artist_id' });
  Artist.hasMany(Song, { foreignKey: 'artist_id' });

  // Album Relations
  Album.belongsTo(Artist, { foreignKey: 'artist_id' });
  Album.hasMany(Song, { foreignKey: 'album_id' });

  // Song Relations
  Song.belongsTo(Artist, { foreignKey: 'artist_id' });
  Song.belongsTo(Album, { foreignKey: 'album_id' });
  Song.belongsTo(Genre, { foreignKey: 'genre_id' });
  Song.belongsTo(Audio, { foreignKey: 'audio_id' });
  Song.hasMany(FavoriteSong, { foreignKey: 'song_id' });
  Song.hasMany(PlayHistory, { foreignKey: 'song_id' });
  Song.hasMany(Comment, { foreignKey: 'song_id' });
  Song.belongsToMany(Playlist, { through: PlaylistSong, foreignKey: 'song_id' });

  // Playlist Relations
  Playlist.belongsTo(User, { foreignKey: 'user_id' });
  Playlist.belongsToMany(Song, { through: PlaylistSong, foreignKey: 'playlist_id' });

  // Genre Relations
  Genre.hasMany(Song, { foreignKey: 'genre_id' });
};

defineRelations();
