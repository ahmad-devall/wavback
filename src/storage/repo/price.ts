import { IPrice } from "../../models/Price";

export interface PriceRepo {
    findAll(query: Object): Promise<Object>
    create(query: IPrice): Promise<IPrice>
    update(query: Object, payload: IPrice): Promise<IPrice>
}