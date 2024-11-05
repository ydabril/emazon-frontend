import { Validators } from "@angular/forms";

export const supplyForm = {
  quantity: [0, [Validators.required, Validators.min(1)]]
};