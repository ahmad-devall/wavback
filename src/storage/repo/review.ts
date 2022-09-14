import { IReview } from "../../models/Review";

export interface ReviewRepo {
    findAll(query: Object): Promise<Object>
    findOne(query: Object): Promise<IReview>
    create(query: IReview): Promise<IReview>
    delete(query: Object): Promise<IReview>
}