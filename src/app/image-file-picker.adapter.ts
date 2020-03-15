import { FilePreviewModel } from "ngx-awesome-uploader";
import {
  HttpRequest,
  HttpClient,
  HttpEvent,
  HttpEventType,
  HttpHeaders
} from "@angular/common/http";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { FilePickerAdapter } from "ngx-awesome-uploader";
import { FileResponse } from "./model/fileResponse.model";

export class ImageFilePickerAdapter extends FilePickerAdapter {
  private baseUrl = "http://localhost:8020/v1/saviya/upload/productImageUpload";
  constructor(
    private http: HttpClient,
    private imageMap: Map<string, FileResponse>
  ) {
    super();
  }
  public uploadFile(fileItem: FilePreviewModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "multipart/form-data"
      })
    };
    const form = new FormData();
    form.append("file", fileItem.file);
    const api = "http://localhost:8020/v1/saviya/upload/productImageUpload";
    const req = new HttpRequest("POST", api, form, {
      headers: new HttpHeaders({
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3ODhlYjljNS1jZTU2LTRlNWEtODI1Ni0wNGM5NjE1ODgyYzMiLCJleHAiOjE1ODMxMjkzNTV9._RScADYjKGzhYJfgfpBpPBwMxbO5ywd1aeARkZQClZ9k9ldHuVdwbNWVLkeTq5y5NJvye1h49HxOXPDoE8jXUw"
      }),
      reportProgress: true
    });
    return this.http.request(req).pipe(
      map((res: HttpEvent<FileResponse>) => {
        if (res.type === HttpEventType.Response) {
          console.log("success response .......");
          console.log(res.body);
          this.imageMap.set(res.body.uploadId, res.body);
          for (let entry of this.imageMap.entries()) {
            console.log(
              "key:-" + entry[0],
              "Object value 1 :-" + entry[1].uploadId,
              entry[1].url
            );
          }
          return res.body.uploadId.toString();
        } else if (res.type === HttpEventType.UploadProgress) {
          // Compute and show the % done:
          const UploadProgress = +Math.round((100 * res.loaded) / res.total);
          return UploadProgress;
        }
      })
    );
  }
  public removeFile(fileItem: FilePreviewModel): Observable<any> {
    console.log("file remove starts... map size " + this.imageMap.size);
    console.log(fileItem);

    this.imageMap.delete(fileItem.fileId);
    return this.http.delete(`${this.baseUrl}/${fileItem.fileId}`, {});
  }
}
