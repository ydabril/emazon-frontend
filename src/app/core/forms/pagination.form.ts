import { Validators } from "@angular/forms";
import { PaginationValidator } from "../validators/pagination.validator";

export const paginationForm: PaginationValidator = {
    size: [0, [Validators.required]],
    sortDirection: ['ASC', [Validators.required]],
}
