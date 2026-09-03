/*
|--------------------------------------------------------------------------
| Interfaces
|--------------------------------------------------------------------------
*/

export interface Tenant {
    id?: string;
    name: string;
    description?: string | null;
    restored_at?: string | null;
    transaction_id?: string | null;
    created_at?: string;
    updated_at?: string;

    // Address fields from AddressModel
    country?: string | null;
    region?: string | null;
    city?: string | null;
    district?: string | null;
    address?: string | null;
    latitude?: number | null;
    longitude?: number | null;
    building_number?: number | null;
    secondary_number?: number | null;
    postal_code?: number | null;
    short_address?: string | null;

    // Contact fields from ContactModel
    phone_number?: string | null;
    mobile_number?: string | null;
    hotline_number?: string | null;
    fax_number?: string | null;
    email?: string | null;
    website?: string | null;
    admin_mobile_number?: string | null;
}

export interface TenantFilters {
    search?: string;
    name__contains?: string;
    company?: string;
    created_at__date__range?: string;
    updated_at__date__range?: string;
    start?: number;
    length?: number;

    // Address Filter Fields
    country?: string;
    region?: string;
    city?: string;
    district?: string;

    // Contact Filter Fields
    phone_number__contains?: string;
    email__contains?: string;
}
