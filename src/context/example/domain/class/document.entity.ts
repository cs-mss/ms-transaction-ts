export class Document {
  constructor(
    readonly id: number,
    readonly number: string,
    readonly description: string,
    readonly date: Date,
    readonly documentType: string,
    readonly createdAt: string,
    readonly updatedAt: string,
  ) {}
}
