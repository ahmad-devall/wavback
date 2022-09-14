import { IAdmin } from "../../models/Admin";

export interface AdminRepo {
    findAll(query: Object): Promise<Object>
    findOne(query: Object): Promise<IAdmin>
    create(query: IAdmin): Promise<IAdmin>
    update(query: Object, payload: IAdmin): Promise<IAdmin>
    updateMany(query: Object, payload: IAdmin): Promise<Object>
    delete(query: Object): Promise<IAdmin>
}