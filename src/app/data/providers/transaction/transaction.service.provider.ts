import { Provider } from "@angular/core";
import { TransactionService } from "src/app/application/services/transaction/transaction.service";

export const TransactionServiceProvider: Provider = {
    provide: 'transactionService',
    useClass: TransactionService
  }