import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Photo } from 'src/app/_models/photo';
import { FileUploader } from 'ng2-file-upload';
import { environment } from 'src/environments/environment';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  /* This would be a child of memberedit component which has
      a user with an array of photos. Would load the photos in this comp*/
  /* Creating a photos atribute of type photo*/
  @Input() photos: Photo[];
  // This output is set to change the profile image once the main is changed
  @Output() getMemberPhotoChange = new EventEmitter<string>();

  /* Copied from https://github.com/valor-software/ng2-file-upload */
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  /* Copied from https://github.com/valor-software/ng2-file-upload */

  baseUrl = environment.apiUrl;

  currentMain: Photo;

  constructor(private authService: AuthService, private userService: UserService,
              private alertify: AlertifyService) { }

  ngOnInit() {
    this.initializeUploader();
  }

  /* Copied from https://github.com/valor-software/ng2-file-upload */
  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }
  /* Copied from https://github.com/valor-software/ng2-file-upload */

  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    });

    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };

    /* Using the onsuccessItem from the class ensures that once the item is uploaded
     successfully something else can be achieved, in this case updating the photos array
     with the newly uploaded photo, which is retrieved in the response item from the api*/ 
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      const res: Photo = JSON.parse(response);
      const photo = {
        id: res.id,
        url: res.url,
        dateadded: res.dateadded,
        description: res.description,
        isMain: res.isMain
      };
      // This pushes the photo into the photo array and angular auto refreshes the view
      this.photos.push(photo);
      // If this photo is the first uploaded photo
      if(photo.isMain) {
        this.authService.changeMemberPhoto(photo.url);
        this.authService.currentUser.photoUrl = photo.url;
        localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
      }
    };
  }

  setMainPhoto(photo: Photo) {
    this.userService.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      // This is used to set the main button depending on the updating main photo
      this.currentMain = this.photos.filter(p => p.isMain === true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
      // Here we emit to the output the correct value after change
      // This would be sent to the parent component which is the member-edit component
      // this.getMemberPhotoChange.emit(photo.url);
      // This was put to match the photo flow so main photo, profile photo and navbar photo matches
      // once it is changed
      this.authService.changeMemberPhoto(photo.url);
      // With the prev line, persistency was lost and even when browser was refreshed, main photo
      // was still the same as before changing with the main button
      this.authService.currentUser.photoUrl = photo.url;
      localStorage.setItem('user', JSON.stringify(this.authService.currentUser));
    }, error => {
      this.alertify.error(error);
    });
  }

  deletePhoto(id: number) {
    this.alertify.confirm('Are you sure you want to delete this photo?', () => {
      this.userService.deletePhoto(this.authService.decodedToken.nameid, id).subscribe(() => {
        this.photos.splice(this.photos.findIndex(p => p.id === id), 1);
        this.alertify.success('Photo has been deleted!');
      }, error => {
        this.alertify.error('Failed to delete the photo');
      });
    });
  }
}
