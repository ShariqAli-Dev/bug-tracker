import { Notification } from "src/entities/Notification";
import { MyContext } from "src/types";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";

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

  @Mutation(() => Boolean)
  async deleteNotification(
    @Arg("id") id: number,
    @Ctx() { req }: MyContext
  ): Promise<Boolean> {
    await Notification.delete({ id, userId: req.session.userId });
    return true;
  }
}
