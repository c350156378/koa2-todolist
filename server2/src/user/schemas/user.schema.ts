import { Prop, raw, Schema, SchemaFactory } from '@nestjs/mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @Prop({ required: true })
  username: string;

  @Prop({ required: true })
  password: string;

  @Prop({ default: Date.now })
  createTime: Date;

  @Prop({ default: Date.now })
  updateTime: Date;

  @Prop(
    raw({
      createdAt: Date,
      updatedAt: Date,
    })
  )
  timestamps: any;
}

export const UserSchema = SchemaFactory.createForClass(User);
