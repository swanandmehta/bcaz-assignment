import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ValidationConstants } from 'src/app/common/constants/validation';
import { Server } from 'src/app/common/dto/server';
import { ServerService } from 'src/app/common/services/server.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {

  public serverForm: FormGroup;

  constructor(formBuilder: FormBuilder, private service: ServerService, activeRoute: ActivatedRoute,
    private toastr: ToastrService, private router: Router) {
    const id: number = activeRoute.snapshot.params.id;
    this.serverForm = formBuilder.group({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required]),
      hostname: new FormControl(null, [Validators.required]),
      ip: new FormControl(null, [Validators.required]),
      weburl: new FormControl(null, [Validators.pattern(ValidationConstants.WEB_URL_REGEX)])
    }, { updateOn: 'change' });

    this.loadServerDetails(id);
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.serverForm.valid) {
      const server: Server = this.serverForm.value as Server;
      if(server.weburl != null && server.weburl.trim() == '') {
        server.weburl = null;
      }
      if (server.id == undefined) {
        this.service.save(server).subscribe({
          next: (server: Server) => {
            this.service.add(server);
            this.toastr.success("Server configuration added successfully.");
            this.router.navigate(['/dashboard/list']);
          },
          error: () => {
            this.toastr.error("Server configuration could not be added.");
          }
        });
      } else {
        this.service.update(server).subscribe({
          next: (server: Server) => {
            this.service.modify(server);
            this.toastr.success("Server configuration updated successfully.");
            this.router.navigate(['/dashboard/list']);
          },
          error: () => {
            this.toastr.error("Server configuration could not be updated.");
          }
        });
      }
    }
  }

  loadServerDetails(id: number): void {
    if (id != undefined) {
      const existing: Server | undefined = this.service.getServerList().find(element => element.id == id);
      if (existing == undefined) {
        this.service.getById(id).subscribe({
          next: (payload: Server) => {
            this.serverForm.patchValue(payload);
          }
        });
      } else {
        this.serverForm.patchValue(existing);
      }
    }

  }

  get controls(): { [key: string]: AbstractControl } {
    return this.serverForm.controls;
  }

}
