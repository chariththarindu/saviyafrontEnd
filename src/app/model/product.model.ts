import { GeoLocation } from "./geo-location.model";
import { Category } from "./category.model";
import { FileResponse } from "./fileResponse.model";
export class Product {
  businessId?: string;
  description?: string;
  categoryId?: number;
  name?: string;
  status?: number;
  imgList?: Array<FileResponse>;
}
