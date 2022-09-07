import { Notification } from "../entities/Notification";
import { MyContext } from "../types";
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
} from "type-graphql";

@InputType()
class UpdateNotificationInput {
  @Field()
  id!: number;

  @Field()
  read!: boolean;
}

@Resolver()
export class NotificationResolver {
  @Query(() => [Notification])
  async notifications(): Promise<Notification[]> {
    return await Notification.find();
  }

  @Query(() => Notification, { nullable: true })
  async notification(@Arg("id") id: number): Promise<Notification | null> {
    return await Notification.findOne({ where: { id } });
  }

  @Query(() => [Notification] || [])
  async userNotifications(
    @Ctx() { req }: MyContext
  ): Promise<Notification[] | []> {
    const notifications = Notification.find({
      where: { userId: req.session.userId },
    });

    if (!notifications) {
      return [];
    }

    return notifications;
  }

  @Mutation(() => Notification)
  async createNotification(
    @Arg("message") message: string,
    @Ctx() { req }: MyContext
  ): Promise<Notification> {
    if (!req.session.userId) {
      throw new Error("not authenticated");
    }

    return await Notification.create({
      message,
      userId: req.session.userId,
    }).save();
  }

  @Mutation(() => Notification, { nullable: true })
  async updateNotification(
    @Arg("options")
    options: UpdateNotificationInput
  ): Promise<Notification | undefined> {
    if (typeof options.read === "undefined" || !options.id) {
      return undefined;
    }
    const notification = await Notification.findOne({
      where: { id: options.id },
    });
    if (!notification) {
      return undefined;
    }
    await Notification.update({ id: options.id }, { read: !options.read });

    return notification;
  }

  @Mutation(() => Boolean)
  async deleteNotification(
    @Arg("id") id: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    await Notification.delete({ id, userId: req.session.userId });
    return true;
  }
}
