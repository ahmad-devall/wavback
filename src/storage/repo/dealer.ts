import { IDealer } from "../../models/Dealer";

export interface DealerRepo {
    findAll(query: Object): Promise<Object>
    findOne(query: Object): Promise<IDealer>
    create(query: IDealer): Promise<IDealer>
    update(query: Object, payload: IDealer): Promise<IDealer>
    updateMany(query: Object, payload: IDealer): Promise<Object>
    delete(query: Object): Promise<IDealer>
}