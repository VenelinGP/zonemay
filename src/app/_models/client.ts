import { BuyingProduct } from '.';

export class Client {
_id?: string;
name: string;
family: string;
email: string;
phone: string;
address: string;
address2 ?: string;
city: string;
postCode: string;
basket?: BuyingProduct[];
accepted: boolean;
approved: boolean;
fulfilled: boolean;
arhived: boolean;
deleted: boolean;
}

