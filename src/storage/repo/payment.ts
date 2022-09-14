import { IPayment } from "../../models/Payment";

export interface PaymentRepo {
    findAll(query: Object): Promise<Object>
    create(query: IPayment): Promise<IPayment>
}