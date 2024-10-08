import { Component, OnInit ,Input, Output, EventEmitter} from '@angular/core';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-navigation-bar-button',
  templateUrl: './navigation-bar-button.component.html',
  styleUrls: ['./navigation-bar-button.component.scss']
})
export class NavigationBarButtonComponent implements OnInit {



  @Input() label: string = 'Button';
  @Input() isActive: boolean = false; 
  @Output() buttonClick = new EventEmitter<void>(); 
  @Input() icon!: IconDefinition; 

  onClick(): void {
    this.buttonClick.emit(); 
  }

  ngOnInit(): void {
  }

}
