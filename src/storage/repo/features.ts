import { IFeatures } from "../../models/Features";

export interface FeaturesRepo {
    findAll(query: Object): Promise<Object>
    findOne(query: Object): Promise<IFeatures>
    create(query: IFeatures): Promise<IFeatures>
    update(query: Object, payload: IFeatures): Promise<IFeatures>
    updateMany(query: Object, payload: IFeatures): Promise<Object>
    delete(query: Object): Promise<IFeatures>
}