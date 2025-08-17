import "reflect-metadata"
import { DataSource } from "typeorm"
import { User } from "./entity/User";
import { Profile } from "./entity/Profile";
import { Image } from "./entity/Image";


export const AppDataSource = new DataSource({
    type: "postgres",
    host: "localhost",
    port: 5434,
    username: "postgres",
    password: "postgres",
    database: "music_db",
    synchronize: true,
    logging: "all",
    entities: [User, Profile, Image],
    migrations: [],
    subscribers: [],
})
