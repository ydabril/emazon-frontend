import { Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'drag-drop',
  templateUrl: './drag-drop.component.html',
  styleUrls: ['./drag-drop.component.scss']
})
export class DragDropComponent {
  @Output() imageSelected = new EventEmitter<File>();

  base64Image!: string;
  imageName!: string;
  loadImage: boolean = false;
  private selectedFile!: File; // Almacenar el archivo seleccionado

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.selectedFile = file; // Guardar el archivo
      const reader = new FileReader();

      reader.onload = () => {
        this.base64Image = reader.result as string;
        this.loadImage = true;
        this.imageSelected.emit(file); // Emitir el archivo
      };

      reader.readAsDataURL(file);
    }
  }

  public onDragOverAction(event: Event): void {
    event.preventDefault();
  }
}