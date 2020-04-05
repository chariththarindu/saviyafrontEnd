import { GeoLocation } from "./geo-location.model";
import { Category } from "./category.model";
import { FileResponse } from "./fileResponse.model";
export class Product {
  uuid?: string;
  description?: string;
  categoryId?: number;
  name?: string;
  status?: number;
  image?: File | Blob;
  images?: FileResponse[];
}
