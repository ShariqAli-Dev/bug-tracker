import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { Notification } from "../entities/Notification";
import { isAuth } from "../middleware/isAuth";
import { MyContext } from "../types";

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
  @UseMiddleware(isAuth)
  async notifications(): Promise<Notification[]> {
    return await Notification.find();
  }

  @Query(() => Notification, { nullable: true })
  @UseMiddleware(isAuth)
  async notification(@Arg("id") id: number): Promise<Notification | null> {
    return await Notification.findOne({ where: { id } });
  }

  @Query(() => [Notification] || [])
  @UseMiddleware(isAuth)
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
  @UseMiddleware(isAuth)
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
  @UseMiddleware(isAuth)
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
  @UseMiddleware(isAuth)
  async deleteNotification(
    @Arg("id") id: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    await Notification.delete({ id, userId: req.session.userId });
    return true;
  }
}
