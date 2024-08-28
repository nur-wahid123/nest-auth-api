import { Exclude, Expose } from 'class-transformer';
import { Post } from './post.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';

@Entity()
export class User {
  /**
   * Columns
   */
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 30 })
  name: string;

  @Column({ type: 'varchar', length: 15 })
  username: string;

  @Column({ type: 'varchar', length: 40 })
  email: string;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar' })
  @Exclude()
  password: string;

  @Column({ type: 'enum', enum: ['m', 'f', 'u'] })
  /**
   * m - male
   * f - female
   * u - unspecified
   */
  gender: string;

  /**
   * Relations
   */

  @OneToMany(() => Post, (post) => post.creatorId, { cascade: true })
  posts: Post[];

  @OneToOne(() => Comment, (comment) => comment.user)
  comment: Comment;

  @ManyToMany(() => Post, (post) => post.likes)
  likes: Post[];

  /**
   * Changelog
   */
  @CreateDateColumn({ type: 'timestamp' })
  @Expose({ name: 'created_at' })
  createdAt!: Date;

  @Column({ nullable: true })
  @Expose({ name: 'created_by' })
  createdBy!: number;

  @UpdateDateColumn({ nullable: true, type: 'timestamp' })
  @Expose({ name: 'updated_at' })
  updatedAt!: Date;

  @Column({ nullable: true })
  @Expose({ name: 'updated_by' })
  updatedBy!: number;

  @ManyToMany(() => User, (user) => user.followers)
  @JoinTable()
  following: User[];

  @ManyToMany(() => User, (user) => user.following)
  followers: User[];

  /**
   * Soft deletion
   */
  @DeleteDateColumn({
    type: 'timestamp',
    default: null,
    nullable: true,
  })
  @Expose({ name: 'deleted_at' })
  deletedAt!: Date;

  @Column({ default: null, nullable: true })
  @Expose({ name: 'deleted_by' })
  deletedBy!: number;
}
