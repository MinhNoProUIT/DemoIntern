export interface ITransactionListItem {
  id: string | null;
  name: string | null;
  avatar: string | undefined;
  amount: number | null;
  date: Date;
  content: string | null;
}
