import { Component, EventEmitter, Input, OnInit, Output } from "@angular/core";
import { EM_ICON } from "src/app/core/constants/em-icons";

@Component({
  selector: 'app-modal-message',
  templateUrl: './modal-message.component.html',
  styleUrls: ['./modal-message.component.scss']
})
export class ModalMessageComponent implements OnInit {
  @Output() closeModalValue = new EventEmitter();
  @Input() iconMessage!: string;
  @Input() titleMessage!: string;
  @Input() textMessage!: string;

  icon!: string;
  title!: string;
  message!: string;
  closeIcon = EM_ICON['close'];

  ngOnInit(): void {
    this.icon = this.iconMessage;
    this.title = this.titleMessage;
    this.message = this.textMessage;
  }

  closeModal() {
    this.closeModalValue.emit();
  }
  
  handleKeyDown(event: KeyboardEvent) {
    if (event.key === 'Enter' || event.key === ' ') {
      this.closeModal();
    }
  }
}