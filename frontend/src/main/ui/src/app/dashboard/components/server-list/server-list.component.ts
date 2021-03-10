import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faTrash, IconDefinition, faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { Server } from 'src/app/common/dto/server';
import { ServerService } from 'src/app/common/services/server.service';
import { ToastrService } from 'ngx-toastr';
import { WeburlDetails } from 'src/app/common/dto/weburl-details';

@Component({
  selector: 'app-server-list',
  templateUrl: './server-list.component.html',
  styleUrls: ['./server-list.component.css']
})
export class ServerListComponent implements OnInit {

  public deleteIcon: IconDefinition = faTrash;
  public checkIcon: IconDefinition = faCheckCircle;
  public serverList: Array<Server>;

  constructor(private router: Router, private route: ActivatedRoute, private service: ServerService,
    private toastr: ToastrService) {
    this.serverList = service.getServerList();
  }

  ngOnInit(): void {

  }

  onAddNew(): void {
    this.router.navigate(['../create'], {relativeTo: this.route})
  }

  onDelete(server: Server): void {
    this.service.delete(server).subscribe({
      next: () => {
        this.service.remove(server);
        this.toastr.success("Server configuration removed.")
      },
      error: () => {
        this.toastr.error("Could not remove server configuration.")
      }
    })
  }

  getTitle(server: Server): void {
    this.service.getTitle(server).subscribe({
      next: (element: WeburlDetails) => {
        if(element.title == undefined || (element.title != undefined && element.title.trim() == '')){
          this.toastr.success("Weburl does not use HTML based webpage");
        } else {
          this.toastr.success("Title for the web url is '"+element.title+"'");
        }

      },
      error: () => {
        this.toastr.error("Could not get the title for the web url")
      }
    })
  }

}
