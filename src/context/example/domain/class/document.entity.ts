export class Document {
  constructor(
    readonly id: number,
    readonly number: string,
    readonly description: string,
    readonly date: Date,
    readonly obligationType: string,
    readonly createdAt: string,
    readonly updatedAt: string,
  ) {}
}
