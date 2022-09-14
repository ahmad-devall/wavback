import { WavStorage } from './mongo/wav'
import { AdminStorage } from './mongo/admin'
import { DealerStorage } from './mongo/dealer'
import { ReviewStorage } from './mongo/review'
import { PriceStorage } from './mongo/price'
import { PaymentStorage } from './mongo/payment'
import { FeaturesStorage } from './mongo/features'

interface IStorage {
    wav: WavStorage
    admin: AdminStorage
    dealer: DealerStorage
    review: ReviewStorage
    price: PriceStorage
    payment: PaymentStorage
    features: FeaturesStorage
}

export let storage: IStorage = {
    wav: new WavStorage(),
    admin: new AdminStorage(),
    dealer: new DealerStorage(),
    review: new ReviewStorage(),
    price: new PriceStorage(),
    payment: new PaymentStorage(),
    features: new FeaturesStorage()
}
