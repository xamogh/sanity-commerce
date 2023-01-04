import { client } from ".";

export interface Product {
    banner_image_url: string;
    caption: string;
    description: string;
    icon_url: string;
    is_immediately_purchasable: boolean;
    name: string;
    main_image_url: string;
    product_type: {
        _id: string;
        name: string;
    };
    tag: Array<{
        _id: string;
        name: string;
    }>;
    _id: string;
    price: number;
}

export interface ProductType {
    _id: string;
    name: string;
}

export interface Tag {
    _id: string;
    name: string;
}

export async function getAllProducts(): Promise<Array<Product>> {
    return client.fetch(`*[_type=='product']{
        "banner_image_url": banner_image.asset->url,
        description,
        "icon_url": icon.asset->url,
        is_immediately_purchasable,
        name,
        price,
        caption,
        "main_image_url": main_image.asset->url,
        product_type->{_id,name},
        tag[]->{_id,name},
        _id
    }`);
}

export async function getProductById(id: string): Promise<Product> {
    return client.fetch(`*[_type=="product" && _id=="${id}"]{
        "banner_image_url": banner_image.asset->url,
        description,
        "icon_url": icon.asset->url,
        is_immediately_purchasable,
        name,
        price,
        caption,
        "main_image_url": main_image.asset->url,
        product_type->{_id,name},
        tag[]->{_id,name},
        _id
    }[0]`);
}

export async function getAllProductTypes() {
    return client.fetch(`*[_type=="product_type"]{
        name,
        _id
    }`);
}

export async function getAllTags() {
    return client.fetch(`*[_type=="tag"]{
        name,
        _id
    }`);
}
