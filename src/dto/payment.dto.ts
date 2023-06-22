export class PaymentAuthorizationDto {
    server_trans_id: string;
    orderid: string;
    amount: number;
    currency: string;
    card_detail: CardDetailDto;
    ds_trans_id: string;
    eci: string;
    authentication_value: string;
    message_version: string;
}
export class CardDetailDto {
    number: string;
    scheme: string;
    expiry_month: number;
    expiry_year: number;
    full_name: string;
    cvn: string;
}
export class OrderDetailDto {
    date_time_created: string;
    amount: number;
    currency: string;
    id: string;
    address_match_indicator: boolean;
    shipping_address: AddressDetailDto
}
export class AddressDetailDto {
    line1: string;
    line2: string;
    line3: string;
    city: string;
    postal_code: string;
    country: string;
}
export class PayerDetailDto {
    email: string;
    billing_address: AddressDetailDto;
    mobile_phone: {
        country_code: string;
        subscriber_number: string;
    }
}
export class BrowserDetailDto {
    accept_header: string;
    color_depth: string;
    ip: string;
    java_enabled: boolean;
    javascript_enabled: boolean;
    language: string;
    screen_height: string;
    screen_width: string;
    challenge_window_size: string;
    timezone: string;
    user_agent: string;
}
export class PaymentAuthenticationDto {
    server_trans_id: string;
    card_detail: CardDetailDto;
    order: OrderDetailDto;
    payer: PayerDetailDto;
    merchant_contact_url: string;
    browser_data: BrowserDetailDto;
}