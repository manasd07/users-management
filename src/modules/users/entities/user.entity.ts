import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

/**
 * User Entity
 */
@Entity('users')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid', { name: 'user_id' })
  id: string;

  @Column({ name: 'email', type: 'varchar', length: 100, nullable: false })
  email: string;

  @Column({ name: 'givenName', type: 'varchar', length: 100, nullable: false })
  givenName: string;

  @Column({ name: 'familyName', type: 'varchar', length: 100, nullable: false })
  familyName: string;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @DeleteDateColumn()
  deletedAt: string;
}
