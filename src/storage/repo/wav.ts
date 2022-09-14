import { IWav } from "../../models/Wav";

export interface WavRepo {
    findHome(query: Object): Promise<any>
    findAll(query: Object): Promise<Object>
    findOne(query: Object): Promise<IWav>
    create(query: IWav): Promise<IWav>
    update(query: Object, payload: IWav): Promise<IWav>
    updateMany(query: Object, payload: IWav): Promise<Object>
    delete(query: Object): Promise<IWav>
}