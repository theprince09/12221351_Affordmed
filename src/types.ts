export interface CreateUrlRequest {
  url: string;
  validity?: number;
  shortcode?: string;
}

export interface CreateUrlResponse {
  shortLink: string;
  expiry: string; 
}