import { Provider } from "@angular/core";
import { UserService } from "src/app/application/services/user/user.service";

export const UserServiceProvider: Provider = {
    provide: 'userService',
    useClass: UserService
}