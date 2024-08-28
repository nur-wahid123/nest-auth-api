import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Expose } from 'class-transformer';
import { Post } from './post.entity';
import { Hashtag } from './hashtag.entity';

@Entity()
export class Comment {
  /**
   * Column
   */

  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  content: string;

  /**
   * Relation
   */
  @JoinColumn()
  @OneToOne(() => User, (user) => user.comment, { cascade: true })
  user: User;

  @ManyToOne(() => Post, (post) => post.comments)
  post: Post;

  @ManyToMany(() => Hashtag, (hashtags) => hashtags.comments)
  hashtags: Hashtag[];

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
