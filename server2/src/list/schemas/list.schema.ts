import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';

export type ListDocument = List & Document;

@Schema()
export class List {
  @Prop({ required: true })
  uid: string;

  @Prop({ required: true })
  content: string;

  @Prop({ required: true })
  status: number;
}

export const ListSchema = SchemaFactory.createForClass(List);
