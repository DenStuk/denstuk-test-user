import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn("uuid")
    public id!: string;

    @Column("varchar", { unique: true, length: 150, nullable: false })
    public username!: string;

    @Column("varchar", { length: 30, nullable: true })
    public first_name!: string;

    @Column("varchar", { length: 150, nullable: true })
    public last_name!: string;

    @Column("varchar", { nullable: false })
    public password: string;

    @Column("boolean", { nullable: false })
    public is_active!: boolean;

    @Column("varchar", { nullable: true })
    public last_login!: string;

    @Column("boolean", { nullable: false, default: false })
    public is_superuser!: boolean;

}