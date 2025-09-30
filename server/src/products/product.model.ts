import { ObjectType, Field, ID, Float } from '@nestjs/graphql';
import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'products' })
@ObjectType()
export class Product {
  
  @PrimaryGeneratedColumn()
  @Field(() => ID)
  id: number;

  @Column()
  @Field()
  name: string;

  @Column()
  @Field()
  category_id: number;

  @Column()
  @Field(() => Float)
  price: number;

  @Column()
  @Field()
  stock_quantity: number;

  @Column()
  @Field({ nullable: true })
  description?: string;

  @Column()
  @Field()
  image_url: string;

  @CreateDateColumn()
  @Field()
  created_at: Date;
  
  @CreateDateColumn()
  @Field()
  updated_at: Date;
}