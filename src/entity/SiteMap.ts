import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { TimestampEntity } from "./Abstract";

@Entity()
export class SiteMap extends TimestampEntity{
    @PrimaryGeneratedColumn()
    id: number;

    @Column("text")
    site_text: string

    @Column(
        {
            type: "timestamp",
            default: () => "CURRENT_TIMESTAMP"
        }
    )
    last_modified: Date;

    @Column(
        {
            type: "enum",
            default: 'daily',
            enum: ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never']
        }
    )
    changefreq: string

    @Column(
        {
            type: "numeric",
            precision: 3,
            scale: 1,
            default: 0.5
        }
    )
    priority: number

    // @CreateDateColumn(
    //     {
    //         type: "timestamp",
    //         update: false,
    //         default: () => "CURRENT_TIMESTAMP"
    //     }
    // )
    // createdAt: Date;
}