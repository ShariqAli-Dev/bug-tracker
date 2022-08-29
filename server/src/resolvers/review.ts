import { isAuth } from "src/middleware/isAuth";
import { Arg, Mutation, Query, Resolver, UseMiddleware } from "type-graphql";
import { Review } from "../entities/Review";
@Resolver()
export class ReviewResolver {
  @Query(() => [Review])
  async posts(): Promise<Review[]> {
    return Review.find();
  }

  @Query(() => Review, { nullable: true })
  post(@Arg("id") id: number): Promise<Review | undefined | null> {
    return Review.findOne({ where: { id } });
  }

  @Mutation(() => Review)
  @UseMiddleware(isAuth)
  async createReview(
    @Arg("userId") userId: number,
    @Arg("review") review: string,
    @Arg("rating") rating: number
  ): Promise<Review> {
    if (!userId || !review || !rating) {
      throw new Error("invalid input");
    }

    return Review.create({
      review,
      rating,
      creatorId: userId,
    }).save();
  }

  @Mutation(() => Review, { nullable: true })
  async updateReview(
    @Arg("id") id: number,
    @Arg("review") review: string,
    @Arg("rating") rating: number
  ): Promise<Review | undefined | null> {
    const userReview = await Review.findOne({ where: { id } });
    if (!userReview) return null;

    if (typeof review !== "undefined" && typeof rating !== "undefined") {
      Review.update({ id }, { review, rating });
    }

    return userReview;
  }

  @Mutation(() => Boolean)
  async deleteReview(@Arg("id") id: number) {
    Review.delete(id);
    return true;
  }
}
