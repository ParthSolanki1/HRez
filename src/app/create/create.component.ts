import { Component, OnInit } from '@angular/core';
import { teamsService } from '../services/teams.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.scss']
})
export class CreateComponent implements OnInit {

  team;
  user1;
  user2;
  user3;
  user4;
  allEmpty = false;
  emptyError = [false, false, false, false, false];
  userNotFound = [false, false, false, false];

  constructor(private req: teamsService) { }

  ngOnInit() {
  }

  onSubmit() {
    this.emptyError = [false, false, false, false, false];
    this.userNotFound = [false, false, false, false];

    console.log(typeof this.team);

    if(typeof this.team === "undefined" || this.team === "") {
      console.log("madeit")
      this.emptyError[0] = true;
    }

    if(typeof this.user1 === "undefined" || this.user1 === "") {
      this.emptyError[1] = true;
    }

    if(typeof this.user2 === "undefined" || this.user2 === "") {
      this.emptyError[2] = true;
    }

    if(typeof this.user3 === "undefined" || this.user3 === "") {
      this.emptyError[3] = true;
    }

    if(typeof this.user4 === "undefined" || this.user4 === "") {
      this.emptyError[4] = true;
    }

    if(this.emptyError[1] && this.emptyError[2] && this.emptyError[3] && this.emptyError[4]){
      this.allEmpty = true;
    }

    if(!this.allEmpty && !this.emptyError[0]){
      this.req.createTeam(this.team, this.user1, this.user2, this.user3, this.user4).subscribe(data => {
        let trueUsers = (data as any).verifiedUsers;

        if(typeof this.user1 !== "undefined" && this.user1 !== "" && trueUsers.indexOf(this.user1)<=-1) {
          this.userNotFound[0] = true;
        }
    
        if(typeof this.user2 !== "undefined" && this.user2 !== "" && trueUsers.indexOf(this.user2)<=-1) {
          this.userNotFound[1] = true;
        }
    
        if(typeof this.user3 !== "undefined" && this.user3 !== "" && trueUsers.indexOf(this.user3)<=-1) {
          this.userNotFound[2] = true;
        }
    
        if(typeof this.user4 !== "undefined" && this.user4 !== "" && trueUsers.indexOf(this.user4)<=-1) {
          this.userNotFound[3] = true;
        }

        if(this.userNotFound.indexOf(true) === -1){
          this.req.postTeam(this.team, this.user1, this.user2, this.user3, this.user4).subscribe(data => {
            alert("Team Formed!");
          });
        }
      });
    }
  }

}
