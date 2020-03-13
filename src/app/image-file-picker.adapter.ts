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

export class ImageFilePickerAdapter extends FilePickerAdapter {
  constructor(private http: HttpClient) {
    super();
  }
  public uploadFile(fileItem: FilePreviewModel) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "undefined",
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3ODhlYjljNS1jZTU2LTRlNWEtODI1Ni0wNGM5NjE1ODgyYzMiLCJleHAiOjE1ODMxMjkzNTV9._RScADYjKGzhYJfgfpBpPBwMxbO5ywd1aeARkZQClZ9k9ldHuVdwbNWVLkeTq5y5NJvye1h49HxOXPDoE8jXUw"
      })
    };
    const form = new FormData();
    form.append("file", fileItem.file);
    const api = "http://localhost:8020/v1/saviya/upload/productImageUpload";
    //const api = "https://demo-file-uploader.free.beeceptor.com";
    const req = new HttpRequest("POST", api, form, {
      headers: new HttpHeaders({
        Authorization:
          "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI3ODhlYjljNS1jZTU2LTRlNWEtODI1Ni0wNGM5NjE1ODgyYzMiLCJleHAiOjE1ODMxMjkzNTV9._RScADYjKGzhYJfgfpBpPBwMxbO5ywd1aeARkZQClZ9k9ldHuVdwbNWVLkeTq5y5NJvye1h49HxOXPDoE8jXUw"
      }),
      reportProgress: true
    });
    return this.http.request(req).pipe(
      map((res: HttpEvent<any>) => {
        if (res.type === HttpEventType.Response) {
          return res.body.id.toString();
        } else if (res.type === HttpEventType.UploadProgress) {
          // Compute and show the % done:
          const UploadProgress = +Math.round((100 * res.loaded) / res.total);
          return UploadProgress;
        }
      })
    );
  }
  public removeFile(fileItem): Observable<any> {
    const removeApi = "https://file-remove-demo.free.beeceptor.com";
    return this.http.post(removeApi, {});
  }
}
