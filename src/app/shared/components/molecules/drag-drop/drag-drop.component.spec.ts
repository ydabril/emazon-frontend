import { DragDropComponent } from "./drag-drop.component";

describe('DragDropComponent', () => {
  let component: DragDropComponent;

  beforeEach(() => {
    component = new DragDropComponent();
  });

  it('should initialize with default values', () => {
    expect(component.base64Image).toBeUndefined();
    expect(component.imageName).toBeUndefined();
    expect(component.loadImage).toBe(false);
  });

  it('should set base64Image and loadImage to true when a file is selected', (done) => {
    const file = new Blob(['test image data'], { type: 'image/png' });
    const fileEvent = {
      target: {
        files: [file]
      }
    } as unknown as Event;

    // Mock del FileReader con una simulación precisa de sus métodos y eventos
    const mockFileReader = {
      readAsDataURL: jest.fn(),
      onload: null as ((event: ProgressEvent<FileReader>) => void) | null,
      result: null as string | null,
    };

    // Simulamos FileReader en el entorno de prueba
    jest.spyOn(window, 'FileReader').mockImplementation(() => mockFileReader as unknown as FileReader);

    // Configuramos la respuesta simulada y el evento `onload` para la prueba
    mockFileReader.readAsDataURL.mockImplementation(() => {
      mockFileReader.result = 'data:image/png;base64,someBase64String';
      if (mockFileReader.onload) {
        mockFileReader.onload({ target: { result: mockFileReader.result } } as ProgressEvent<FileReader>);
      }
    });

    component.onFileSelected(fileEvent);

    // Usamos `setTimeout` para dar tiempo a la función `onload` antes de hacer las comprobaciones
    setTimeout(() => {
      expect(mockFileReader.readAsDataURL).toHaveBeenCalledWith(file);
      expect(component.base64Image).toBe('data:image/png;base64,someBase64String');
      expect(component.loadImage).toBe(true);
      done();
    }, 0);
  });

  it('should prevent default behavior on drag over action', () => {
    const dragOverEvent = new Event('dragover');
    jest.spyOn(dragOverEvent, 'preventDefault');

    component.onDragOverAction(dragOverEvent);

    expect(dragOverEvent.preventDefault).toHaveBeenCalled();
  });
});
