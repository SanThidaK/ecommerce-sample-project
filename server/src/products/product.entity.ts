// import { Field, Float } from '@nestjs/graphql';
// import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// @Entity()
// export class Product {
//   @PrimaryGeneratedColumn()
//   @Field(() => Number)
//   id: number;

//   @Column()
//   @Field(() => String)
//   name: string;

//   @Column()
//   category_id: number;

//   @Column('decimal', { precision: 10, scale: 2 })
//   @Field(() => Float)
//   price: number;

//   @Column()
//   stock_quantity: number;

//   @Column({ nullable: true })
//   @Field(() => String)
//   description?: string;

//   @Column()
//   @Field(() => String)
//   image_url: string;
// }

import { Field, Float, ID, Int, ObjectType } from '@nestjs/graphql';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity('products')
@ObjectType()
export class Product {
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => Number)
  category_id: number;

  @Column('decimal', { precision: 10, scale: 2 })
  @Field(() => Float)
  price: number;

  @Column()
  @Field(() => Number)
  stock_quantity: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  description?: string;

  @Column()
  @Field(() => String)
  image_url: string;

  @CreateDateColumn()
  @Field(() => String)
  created_at: Date;

  @UpdateDateColumn()
  @Field(() => String)
  updated_at: Date;
}
