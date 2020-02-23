import { Injectable } from "@angular/core";
import {
  FileTransferObject,
  FileTransfer
} from "@ionic-native/file-transfer/ngx";
import { File } from "@ionic-native/file/ngx";
import { Employee } from "../models/employee";
@Injectable({
  providedIn: "root"
})
export class DownloadFileService {
  private fileTransfer: FileTransferObject;
  constructor(private transfer: FileTransfer, private file: File) {}
  public download(fileName, filePath) {
    let url = encodeURI(filePath);
    this.fileTransfer = this.transfer.create();
    return this.fileTransfer.download(
      url,
      this.file.externalDataDirectory + fileName,
      true
    );
  }
  getImageUrl(imgName: string) {
    return this.file.readAsDataURL(this.file.externalDataDirectory, imgName);
  }
  async getObjectsWithImageUrl(data: Employee[]) {
    let promises = [];
    data.forEach(person => {
      promises.push(
        person.imageUrl != "undefined"
          ? this.getImageUrl(person.imageCode)
          : new Promise(resolve => resolve(""))
      );
    });
    let imgData = await Promise.all(promises);

    let dataWithImageLink: Employee[] = [];
    data.forEach((employee, index) => {
      employee.imageUrl = imgData[index];
      dataWithImageLink.push(employee);
    });
    return dataWithImageLink;
  }
}
