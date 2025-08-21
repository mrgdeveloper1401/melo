import { EntitySubscriberInterface, EventSubscriber, InsertEvent } from "typeorm";
import { User } from "../../entity/User";
import { Profile } from "../../entity/Profile";


@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
    listenTo(): Function | string {
        return User
    }

    async afterInsert(event: InsertEvent<User>) {
        try {
            const profileRepository = event.manager.getRepository(Profile);
            const user = event.entity;

            const profile = new Profile();
            profile.user_id = user;

            await profileRepository.save(profile);
        } catch (error) {
            throw error;
        }
    }
}
