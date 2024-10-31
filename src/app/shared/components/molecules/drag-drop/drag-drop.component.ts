import { Component } from "@angular/core";

@Component({
  selector: 'drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent {
  base64Image!: string
  imageName!: string
  loadImage: boolean = false

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        this.base64Image = reader.result as string;
        this.loadImage = true
      };

      reader.readAsDataURL(file);
    }
  }

  public onDragOverAction(event: Event): void {
    event.preventDefault()
  }
}