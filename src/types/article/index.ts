/* eslint-disable no-tabs */
export type ArticleParams = {
    page: number;
    limit: number;
    search: string;
    category: string[];
    media: string[];
    vendor: string[];
    status: boolean | string;
    start_date: string;
    end_date: string;
}

export type ArticlePayloadParams = {
    page: number;
    limit: number;
    search: string;
    category: string;
    media: string;
    vendor: string;
    status: boolean;
    start_date: string;
    end_date: string;
}

export type ArticleReducer = {
    isLoading: boolean;
    isError: boolean;
    isPostError: boolean;
    isPostLoading: boolean;
    isPostSuccess: boolean;
    isDeleteError: boolean;
    isDeleteLoading: boolean;
    isDeleteSuccess: boolean;
    isUpdateError: boolean;
    isUpdateLoading: boolean;
    isUpdateSuccess: boolean;
    isListTagsError: boolean;
    isListTagsLoading: boolean;
    isListTagsSuccess: boolean;
    isPostTagsError: boolean;
    isPostTagsLoading: boolean;
    isPostTagsSuccess: boolean;
    errorMessage: null | string;
    data: [];
    metadata: ArticleMetadataReducer;
    details: ArticleDetails | null;
    categories: any[];
    params: ArticleParams;
    form: ArticleFormCreate;
    subcategories: any[];
    showSuccessModal: boolean;
	defaultOptions: IDefaultOptions;
    paramsTags: object;
    listTags: string[];
    tags: ArticleTags;
};

export type ArticleTags = {
    displayTags: any[];
    payloadTags: any[];
}

export type ArticleMetadataReducer = {
    page: number;
    per_page: number;
    total_row: number;
    total_page: number;
}

export type ArticleDetails = {
    id: number;
    name: number
    title: string;
    category: string;
    media: string;
    vendor: string;
    description: string;
    image_link: string;
    status: boolean;
    created_at: string;
    updated_at: string;
}

export type ArticleResponseSubCategory = {
    id: number;
    name: string;
}

export type ArticleResponseCategory = {
    id: number;
    name: string;
    sub: ArticleResponseSubCategory[]
}

export type ArticleResponseData = {
    message: string;
    data: ArticleResponseCategory[];
    metadata: null;
}

export interface ArticleFormCreate {
    title: string;
    description: string;
    category: string;
    subcategory: string;
    tags: number[];
    image: string | null;
    quote: string;
    vendor: string;
    media: string;
    reviewDoctor: string;
    slug: string;
}

export interface ArticleFormPayload {
    title: string;
    slug: string;
    category_id: string | number;
    sub_category_id: string | number;
    media_id: string | number;
    vendor_id: string | number;
    description: string;
    review_doctor: string;
    image_url: string;
    tags: string[] | number[];
    status: boolean;
    publish_date: string;
}

export interface ISelect {
	label: string;
	value: string;
}

export interface IDefaultOptions {
	optionCategory: ISelect[];
	optionSubCategory: ISelect[];
	optionVendor: ISelect[];
	optionMedia: ISelect[];
    optionStatus: ISelect[];
}
