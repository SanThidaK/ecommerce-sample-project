import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('customers')
@ObjectType()
export class Customer {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => ID)
  id: string;

  @Column({ nullable: true })
  @Field(() => String)
  firstName: string;

  @Column({ nullable: true })
  @Field(() => String)
  lastName: string;

  @Column({ unique: true })
  @Field(() => String)
  email: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  phone: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  birthday: Date;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  hashedRt: string;

  @Column({ nullable: true })
  @Field(() => String)
  address: string;

  @CreateDateColumn()
  @Field(() => String)
  createdAt: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updatedAt: Date;
}