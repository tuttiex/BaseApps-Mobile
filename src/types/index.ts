export interface Category {
    id: string;
    name: string;
    slug: string;
    count?: number;
}

export interface Dapp {
    id: number;
    name: string;
    description: string;
    logo: string;
    logo_url: string;
    url: string;
    website_url: string;
    category: string;
    chain: string;
    score: string;
    status: string;
    created_at: string;
    subcategory?: string | null;
    submitted_by?: string | null;
}

export interface DappsResponse {
    count: number;
    dapps: Dapp[];
}

export interface SearchParams {
    query?: string;
    category?: string;
    page?: number;
    limit?: number;
}
