import { Component, OnInit, Input } from '@angular/core';
import { User } from 'src/app/_models/user';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css']
})
export class MemberCardComponent implements OnInit {
  // This would be a child component of the memberlist component, so need the user to display the content here
  @Input() user: User;

  constructor() { }

  ngOnInit() {
  }

}
