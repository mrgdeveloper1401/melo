import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User";
import { Profile } from "./entity/Profile";
import { Image } from "./entity/Image";
import { UserNotification } from "./entity/UserNotification";
import { PublicNotification } from "./entity/publicNotification";
import { Follow } from "./entity/Follow";
import { Wallet } from "./entity/Wallet";
import { CartNumber } from "./entity/CartNumber";
import { Audio } from "./entity/Audio";
import { Album } from "./entity/Album";
import { Artist } from "./entity/Artist";
import { Genre } from "./entity/Genre";
import { Playlist } from "./entity/Playlist";
import { PlaylistSong } from "./entity/PlaylistSong";
import { FavoriteSong } from "./entity/FavoriteSong";
import { PlayHistory } from "./entity/PlayHistory";
import { Comment } from "./entity/Comment";
import { Subscription } from "./entity/Subscription";
import { Plan } from "./entity/Plan";
import { PlanFeature } from "./entity/PlanFuture";
import { UserPayment } from "./entity/UserPayment";
import { UserLog } from "./entity/UserLog";
import { Song } from "./entity/Song";
import { Gateway } from "./entity/Gateway";
import { UserSubscriber } from "./utils/Subscriber/UserSubscriber";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "postgres",
    password: "postgres",
    database: "music_db",
    synchronize: true,
    logging: "all",
    entities: [
        User, 
        Profile, 
        Image, 
        UserNotification, 
        PublicNotification, 
        Follow,
        Wallet,
        CartNumber,
        Audio,
        Album,
        Artist,
        Genre,
        Playlist,
        PlaylistSong,
        Song,
        FavoriteSong,
        PlayHistory,
        Comment,
        Subscription,
        Plan,
        PlanFeature,
        UserPayment,
        UserLog,
        Gateway
    ],
    migrations: [],
    subscribers: [UserSubscriber],
})
